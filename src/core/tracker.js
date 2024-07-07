import { getSessionId, getVisitorId } from '../utils/session.js';
import { parseUrlParams, getCurrentUrl, getReferrer } from '../utils/url.js';
import { getBasicFingerprint, getEnhancedBrowserInfo, getInputMethod, getCanvasFingerprint } from '../utils/fingerprint.js';
import { BehaviorTracker } from '../utils/behavior.js';

class Tracker {
  constructor() {
    this.apiKey = null;
    this.apiEndpoint = 'https://api.adtruth.io/track';
    this.initialized = false;
    this.debug = false;
    this.behaviorTracker = null;
    this.fingerprint = null;
    this.hasUnloadListener = false;
    this.periodicTimer = null;
    this.unloadEventSent = false;
  }

  /**
   * Initialize the tracker with an API key
   * @param {string} apiKey - The API key for authentication
   * @param {object} options - Optional configuration
   */
  init(apiKey, options = {}) {
    try {
      if (this.initialized) {
        return;
      }

      if (!apiKey) {
        this.log('AdTruth: API key is required');
        return;
      }

      this.apiKey = apiKey;
      this.debug = options.debug || false;

      // Allow custom endpoint for testing
      if (options.endpoint) {
        this.apiEndpoint = options.endpoint;
      }

      this.initialized = true;
      this.log('AdTruth: Initialized');

      // Initialize behavior tracker and generate fingerprints
      this.behaviorTracker = new BehaviorTracker();
      this.fingerprint = getBasicFingerprint();

      // Phase 2: Canvas fingerprinting with error handling
      try {
        this.canvasFingerprint = getCanvasFingerprint();
      } catch (e) {
        this.log('AdTruth: Canvas fingerprinting failed (browser restriction)', e);
        this.canvasFingerprint = null;
      }

      // Set up page unload tracking for accurate behavior data
      this.setupUnloadTracking();

      // Optional: Enable periodic updates (default: disabled)
      // Users can enable with: AdTruth.init(apiKey, { periodicUpdates: true })
      if (options.periodicUpdates) {
        this.startPeriodicUpdates(options.updateInterval || 30000);
      }
    } catch (error) {
      // Don't let initialization errors break client sites
      this.log('AdTruth: Initialization error', error);
    }
  }

  /**
   * Set up page unload tracking to capture complete behavior data
   * Uses sendBeacon for guaranteed delivery even as page unloads
   */
  setupUnloadTracking() {
    if (this.hasUnloadListener) {
      return; // Already set up
    }

    const sendFinalEvent = () => {
      try {
        if (!this.initialized || !this.behaviorTracker) {
          return;
        }

        // Use atomic flag to prevent duplicate sends (both events fire nearly simultaneously)
        if (this.unloadEventSent) {
          this.log('AdTruth: Final event already sent');
          return;
        }
        this.unloadEventSent = true;

        // Clean up periodic updates to prevent memory leaks
        this.stopPeriodicUpdates();

        // Collect final data with all behavior metrics
        const data = this.collectData('pageview');
        const payload = JSON.stringify(data);
        const payloadSize = new Blob([payload]).size;

        this.log('AdTruth: Sending final event on page unload');
        this.log(`AdTruth: Payload size: ${payloadSize} bytes`);
        this.log('AdTruth: Behavior data:', data.behavior);

        // Use sendBeacon for guaranteed delivery
        if (navigator.sendBeacon) {
          const blob = new Blob([payload], { type: 'application/json' });

          // SECURITY NOTE: API key in query param is necessary because sendBeacon
          // doesn't support custom headers. Key is validated server-side and has
          // limited permissions (write-only to page_views table).
          const urlWithKey = `${this.apiEndpoint}?apiKey=${encodeURIComponent(this.apiKey)}`;

          const success = navigator.sendBeacon(urlWithKey, blob);
          this.log(`AdTruth: sendBeacon ${success ? 'succeeded' : 'failed'}`);

          // Fallback if sendBeacon fails (network issue, size limit, etc.)
          if (!success && payloadSize < 60 * 1024) {
            this.log('AdTruth: sendBeacon failed, trying fetch fallback');
            this.sendViaFetch(payload);
          }
        } else {
          // Fallback to fetch with keepalive for older browsers
          this.log('AdTruth: sendBeacon not available, using fetch');
          this.sendViaFetch(payload);
        }
      } catch (error) {
        this.log('AdTruth: Error sending final event', error);
      }
    };

    // Set up multiple events for cross-browser compatibility
    // Desktop browsers: beforeunload fires reliably
    // Mobile Safari: Only pagehide fires reliably
    // Back/Forward Cache: pagehide fires, beforeunload doesn't
    window.addEventListener('beforeunload', sendFinalEvent);
    window.addEventListener('pagehide', sendFinalEvent);
    window.addEventListener('unload', sendFinalEvent); // Legacy browser fallback

    this.hasUnloadListener = true;
    this.log('AdTruth: Page unload tracking enabled');
  }

  /**
   * Start periodic updates for long sessions
   * @param {number} interval - Update interval in milliseconds (default: 30000 = 30 seconds)
   */
  startPeriodicUpdates(interval = 30000) {
    if (this.periodicTimer) {
      return; // Already running
    }

    this.periodicTimer = setInterval(() => {
      try {
        if (this.initialized && this.behaviorTracker) {
          this.log('AdTruth: Sending periodic update');
          this.track();
        }
      } catch (error) {
        this.log('AdTruth: Error in periodic update', error);
      }
    }, interval);

    this.log(`AdTruth: Periodic updates enabled (every ${interval}ms)`);
  }

  /**
   * Stop periodic updates
   */
  stopPeriodicUpdates() {
    if (this.periodicTimer) {
      clearInterval(this.periodicTimer);
      this.periodicTimer = null;
      this.log('AdTruth: Periodic updates stopped');
    }
  }

  /**
   * Track a pageview event
   */
  track(eventType = 'pageview') {
    try {
      if (!this.initialized) {
        this.log('AdTruth: Not initialized. Call init() first.');
        return;
      }

      const data = this.collectData(eventType);
      this.sendData(data);
    } catch (error) {
      // Don't let tracking errors break client sites
      this.log('AdTruth: Tracking error', error);
    }
  }

  /**
   * Collect data for tracking
   */
  collectData(eventType) {
    const url = getCurrentUrl();
    const params = parseUrlParams(url);

    // Collect enhanced browser info and behavior metrics
    const enhancedBrowser = getEnhancedBrowserInfo();
    const inputMethod = getInputMethod();
    const behaviorMetrics = this.behaviorTracker ? this.behaviorTracker.getMetrics() : {};

    const data = {
      event_type: eventType,
      timestamp: new Date().toISOString(),
      session_id: getSessionId(),
      visitor_id: getVisitorId(),
      page: {
        url: url,
        title: document.title || '',
        referrer: getReferrer()
      },
      utm: {
        source: params.utm_source || null,
        medium: params.utm_medium || null,
        campaign: params.utm_campaign || null,
        term: params.utm_term || null,
        content: params.utm_content || null
      },
      click_ids: {
        gclid: params.gclid || null,
        fbclid: params.fbclid || null
      },
      browser: {
        ...enhancedBrowser,
        screen: {
          width: screen.width,
          height: screen.height,
          colorDepth: screen.colorDepth
        },
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      },
      fingerprint: {
        hash: this.fingerprint ? this.fingerprint.hash : null,
        timezone: this.fingerprint ? this.fingerprint.details.timezone : null,
        timezoneOffset: this.fingerprint ? this.fingerprint.details.timezoneOffset : null,
        // Phase 2: Canvas fingerprint
        canvas: this.canvasFingerprint ? this.canvasFingerprint.hash : null
      },
      input: inputMethod,
      behavior: behaviorMetrics
    };

    return data;
  }

  /**
   * Send data to the API endpoint
   */
  sendData(data) {
    // Always use fetch for better header support
    // sendBeacon doesn't support custom headers well
    const payload = JSON.stringify(data);
    this.sendViaFetch(payload);
  }

  /**
   * Send data using fetch API with timeout
   */
  sendViaFetch(payload) {
    // Validate payload size for keepalive limit (64KB browser-wide limit)
    const payloadSize = new Blob([payload]).size;
    const KEEPALIVE_LIMIT = 60 * 1024; // 60KB (leave 4KB buffer)

    if (payloadSize > KEEPALIVE_LIMIT) {
      this.log(`AdTruth: Warning - Payload size ${payloadSize} bytes exceeds keepalive limit`);
      // In production, consider truncating behavior arrays here
    }

    // Create abort controller for timeout (5 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    fetch(this.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey
      },
      body: payload,
      keepalive: true,
      signal: controller.signal
    })
      .then(() => {
        clearTimeout(timeoutId);
        this.log('AdTruth: Data sent via fetch');
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        // Fail silently in production
        if (error.name === 'AbortError') {
          this.log('AdTruth: Request timeout');
        } else {
          this.log('AdTruth: Failed to send data', error);
        }
        // TODO: For production, queue in IndexedDB for retry on next page load
      });
  }

  /**
   * Log messages if debug mode is enabled
   */
  log(...args) {
    if (this.debug && typeof console !== 'undefined' && console.log) {
      console.log(...args);
    }
  }
}

// Create singleton instance
const tracker = new Tracker();

export default tracker;
// Note: This project is still under development.

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

      // Track the initial pageview
      this.track();
    } catch (error) {
      // Don't let initialization errors break client sites
      this.log('AdTruth: Initialization error', error);
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

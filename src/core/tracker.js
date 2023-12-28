import { getSessionId } from '../utils/session.js';
import { parseUrlParams, getCurrentUrl, getReferrer } from '../utils/url.js';

class Tracker {
  constructor() {
    this.apiKey = null;
    this.apiEndpoint = 'https://api.adtruth.io/track';
    this.initialized = false;
    this.debug = false;
  }

  /**
   * Initialize the tracker with an API key
   * @param {string} apiKey - The API key for authentication
   * @param {object} options - Optional configuration
   */
  init(apiKey, options = {}) {
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

    // Track the initial pageview
    this.track();
  }

  /**
   * Track a pageview event
   */
  track(eventType = 'pageview') {
    if (!this.initialized) {
      this.log('AdTruth: Not initialized. Call init() first.');
      return;
    }

    const data = this.collectData(eventType);
    this.sendData(data);
  }

  /**
   * Collect data for tracking
   */
  collectData(eventType) {
    const url = getCurrentUrl();
    const params = parseUrlParams(url);

    const data = {
      event_type: eventType,
      timestamp: new Date().toISOString(),
      session_id: getSessionId(),
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
        user_agent: navigator.userAgent,
        language: navigator.language || navigator.userLanguage || '',
        screen: {
          width: screen.width,
          height: screen.height
        },
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }
    };

    return data;
  }

  /**
   * Send data to the API endpoint
   */
  sendData(data) {
    // Use sendBeacon if available for better reliability
    const payload = JSON.stringify(data);

    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      const sent = navigator.sendBeacon(
        this.apiEndpoint,
        blob
      );

      if (sent) {
        this.log('AdTruth: Data sent via sendBeacon');
        return;
      }
    }

    // Fallback to fetch
    this.sendViaFetch(payload);
  }

  /**
   * Send data using fetch API
   */
  sendViaFetch(payload) {
    fetch(this.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey
      },
      body: payload,
      keepalive: true
    })
      .then(() => {
        this.log('AdTruth: Data sent via fetch');
      })
      .catch((error) => {
        // Fail silently in production
        this.log('AdTruth: Failed to send data', error);
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
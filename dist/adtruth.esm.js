/* AdTruth SDK v0.1.0 | MIT License | https://github.com/papa-torb/adtruth */
/**
 * Generate a unique session ID
 * Uses crypto.randomUUID if available, falls back to Math.random
 */
function generateSessionId() {
  // Try to use crypto.randomUUID (modern browsers)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Get or create a session ID, stored in sessionStorage
 */
function getSessionId() {
  const SESSION_KEY = '_adtruth_session';

  try {
    // Try to get existing session
    let sessionId = sessionStorage.getItem(SESSION_KEY);

    if (!sessionId) {
      sessionId = generateSessionId();
      sessionStorage.setItem(SESSION_KEY, sessionId);
    }

    return sessionId;
  } catch (e) {
    // If sessionStorage is not available, generate a new ID each time
    return generateSessionId();
  }
}

/**
 * Parse URL parameters including UTM parameters
 */
function parseUrlParams(url) {
  const params = {};

  try {
    const urlObj = new URL(url);
    const searchParams = urlObj.searchParams;

    // Extract UTM parameters and other query params
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

    utmParams.forEach(param => {
      const value = searchParams.get(param);
      if (value) {
        params[param] = value;
      }
    });

    // Also get gclid (Google Click ID) if present
    const gclid = searchParams.get('gclid');
    if (gclid) {
      params.gclid = gclid;
    }

    // Facebook click ID
    const fbclid = searchParams.get('fbclid');
    if (fbclid) {
      params.fbclid = fbclid;
    }

  } catch (e) {
    // Fail silently if URL parsing fails
  }

  return params;
}

/**
 * Get the current page URL
 */
function getCurrentUrl() {
  return window.location.href;
}

/**
 * Get the referrer URL
 */
function getReferrer() {
  return document.referrer || '';
}

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

/**
 * AdTruth SDK - Open-source fraud detection for paid advertising
 * @version 0.1.0
 * @license MIT
 */


// Public API
const AdTruth = {
  /**
   * Initialize AdTruth with API key
   * @param {string} apiKey - Your AdTruth API key
   * @param {object} options - Optional configuration
   */
  init: function(apiKey, options) {
    tracker.init(apiKey, options);
  },

  /**
   * Manually track a pageview
   */
  trackPageview: function() {
    tracker.track('pageview');
  },

  /**
   * Track a custom event (for future use)
   * @param {string} eventName - The name of the event
   * @param {object} data - Optional event data
   */
  track: function(eventName, data) {
    // For MVP, just track as pageview
    // Future versions will support custom events
    tracker.track(eventName || 'pageview');
  },

  /**
   * Version information
   */
  version: '0.1.0'
};

// Auto-initialize if script tag has data-api-key attribute
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    const script = document.querySelector('script[data-adtruth-api-key]');
    if (script) {
      const apiKey = script.getAttribute('data-adtruth-api-key');
      const debug = script.getAttribute('data-adtruth-debug') === 'true';
      AdTruth.init(apiKey, { debug });
    }
  });
}

export { AdTruth as default };

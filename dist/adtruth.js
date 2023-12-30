/* AdTruth SDK v0.1.0 | MIT License | https://github.com/papa-torb/adtruth */
var AdTruth = (function () {
  'use strict';

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
   * Get or create a visitor ID, stored in localStorage (persistent)
   */
  function getVisitorId() {
    const VISITOR_KEY = '_adtruth_visitor';

    try {
      // Try to get existing visitor ID
      let visitorId = localStorage.getItem(VISITOR_KEY);

      if (!visitorId) {
        visitorId = generateSessionId();
        localStorage.setItem(VISITOR_KEY, visitorId);
      }

      return visitorId;
    } catch (e) {
      // If localStorage is not available, use sessionStorage as fallback
      try {
        let visitorId = sessionStorage.getItem(VISITOR_KEY);
        if (!visitorId) {
          visitorId = generateSessionId();
          sessionStorage.setItem(VISITOR_KEY, visitorId);
        }
        return visitorId;
      } catch (e2) {
        // Generate a new ID each time as last resort
        return generateSessionId();
      }
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

  /**
   * Browser fingerprinting utilities for fraud detection
   * Phase 1: Basic fingerprinting
   */

  /**
   * Generate a basic device fingerprint
   * @returns {object} Basic fingerprint data
   */
  function getBasicFingerprint() {
    const fingerprint = {
      screen: `${screen.width}x${screen.height}x${screen.colorDepth}`,
      timezone: getTimezone(),
      timezoneOffset: new Date().getTimezoneOffset(),
      hardwareConcurrency: navigator.hardwareConcurrency || 0,
      deviceMemory: navigator.deviceMemory || 0
    };

    // Create simple hash from fingerprint data
    const hash = hashFingerprint(fingerprint);

    return {
      hash,
      details: fingerprint
    };
  }

  /**
   * Get timezone information
   */
  function getTimezone() {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (e) {
      return 'unknown';
    }
  }

  /**
   * Get enhanced browser information
   * @returns {object} Enhanced browser data
   */
  function getEnhancedBrowserInfo() {
    return {
      user_agent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages ? Array.from(navigator.languages).join(',') : '',
      platform: navigator.platform,
      vendor: navigator.vendor || '',
      cookieEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack || 'unknown',
      maxTouchPoints: navigator.maxTouchPoints || 0,
      hardwareConcurrency: navigator.hardwareConcurrency || 0,
      deviceMemory: navigator.deviceMemory || 0
    };
  }

  /**
   * Simple hash function for fingerprint data
   * @param {object} data - Data to hash
   * @returns {string} Hash string
   */
  function hashFingerprint(data) {
    const str = JSON.stringify(data);
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
    }

    return Math.abs(hash).toString(36);
  }

  /**
   * Get input method detection data
   * @returns {object} Input method information
   */
  function getInputMethod() {
    const hasTouch = 'ontouchstart' in window;
    const hasMouse = typeof matchMedia !== 'undefined' ? matchMedia('(pointer: fine)').matches : false;
    const hasHover = typeof matchMedia !== 'undefined' ? matchMedia('(hover: hover)').matches : false;

    return {
      hasTouch,
      hasMouse,
      hasHover,
      maxTouchPoints: navigator.maxTouchPoints || 0,
      inputInconsistency: hasTouch && hasMouse && hasHover // Potential fraud signal
    };
  }

  /**
   * Behavioral tracking utilities for fraud detection
   * Phase 1: Time-based metrics
   */

  /**
   * BehaviorTracker class - Tracks user behavior on the page
   */
  class BehaviorTracker {
    constructor() {
      this.pageLoadTime = Date.now();
      this.firstInteractionTime = null;
      this.lastInteractionTime = null;
      this.clickCount = 0;
      this.clickTimes = [];

      // Set up event listeners
      this.setupListeners();
    }

    /**
     * Set up event listeners for behavior tracking
     */
    setupListeners() {
      // Track clicks
      document.addEventListener('click', this.handleClick.bind(this), { passive: true });

      // Track first user interaction
      const interactionEvents = ['click', 'keydown', 'touchstart', 'mousemove'];
      const recordFirstInteraction = () => {
        if (!this.firstInteractionTime) {
          this.firstInteractionTime = Date.now();
        }
      };

      interactionEvents.forEach(eventType => {
        document.addEventListener(eventType, recordFirstInteraction, {
          passive: true,
          once: true
        });
      });
    }

    /**
     * Handle click events
     */
    handleClick(e) {
      const now = Date.now();
      this.clickCount++;
      this.clickTimes.push(now);
      this.lastInteractionTime = now;

      // Keep only last 20 clicks to limit memory usage
      if (this.clickTimes.length > 20) {
        this.clickTimes.shift();
      }
    }

    /**
     * Calculate average interval between clicks
     * @returns {number|null} Average interval in milliseconds
     */
    calculateAvgInterval() {
      if (this.clickTimes.length < 2) {
        return null;
      }

      let totalInterval = 0;
      for (let i = 1; i < this.clickTimes.length; i++) {
        totalInterval += this.clickTimes[i] - this.clickTimes[i - 1];
      }

      return Math.round(totalInterval / (this.clickTimes.length - 1));
    }

    /**
     * Get all behavioral metrics
     * @returns {object} Behavioral metrics
     */
    getMetrics() {
      const now = Date.now();
      const timeOnPage = now - this.pageLoadTime;

      return {
        timeOnPage,
        timeToFirstInteraction: this.firstInteractionTime
          ? this.firstInteractionTime - this.pageLoadTime
          : null,
        timeToFirstClick: this.clickTimes.length > 0
          ? this.clickTimes[0] - this.pageLoadTime
          : null,
        clickCount: this.clickCount,
        avgClickInterval: this.calculateAvgInterval(),
        hasInteracted: this.firstInteractionTime !== null
      };
    }

    /**
     * Clean up event listeners
     */
    cleanup() {
      // Remove listeners if needed
      // For now, we'll let them stay as they're passive
    }
  }

  class Tracker {
    constructor() {
      this.apiKey = null;
      this.apiEndpoint = 'https://api.adtruth.io/track/';
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

      // Initialize behavior tracker and generate fingerprint
      this.behaviorTracker = new BehaviorTracker();
      this.fingerprint = getBasicFingerprint();

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
          timezoneOffset: this.fingerprint ? this.fingerprint.details.timezoneOffset : null
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

  return AdTruth;

})();

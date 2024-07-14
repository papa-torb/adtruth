/**
 * AdTruth SDK - Open-source fraud detection for paid advertising
 * @version 0.2.1
 * @license MIT
 */

import tracker from './core/tracker.js';

// Public API
const AdTruth = {
  /**
   * Initialize AdTruth with API key
   * @param {string} apiKey - Your AdTruth API key
   * @param {object} options - Optional configuration
   */
  init: function(apiKey, options) {
    try {
      tracker.init(apiKey, options);
    } catch (error) {
      console.error('AdTruth: Initialization failed', error);
    }
  },

  /**
   * Manually track a pageview
   */
  trackPageview: function() {
    try {
      tracker.track('pageview');
    } catch (error) {
      console.error('AdTruth: Tracking failed', error);
    }
  },

  /**
   * Track a custom event (for future use)
   * @param {string} eventName - The name of the event
   * @param {object} data - Optional event data
   */
  track: function(eventName, data) {
    try {
      // For MVP, just track as pageview
      // Future versions will support custom events
      tracker.track(eventName || 'pageview');
    } catch (error) {
      console.error('AdTruth: Tracking failed', error);
    }
  },

  /**
   * Get current metrics (debug only)
   * @returns {object} Current tracking metrics
   */
  getMetrics: function() {
    if (!tracker.behaviorTracker) {
      return { error: 'Tracker not initialized. Call AdTruth.init() first.' };
    }
    return {
      behavior: tracker.behaviorTracker.getMetrics(),
      fingerprint: tracker.fingerprint,
      canvasFingerprint: tracker.canvasFingerprint
    };
  },

  /**
   * Version information
   */
  version: '0.2.1',

  // Expose tracker for debugging (only in debug mode)
  get _debug() {
    return tracker;
  }
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

// Export for different environments
export default AdTruth;
// Note: This project is still under development.

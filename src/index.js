/**
 * AdTruth SDK - Open-source fraud detection for paid advertising
 * @version 0.1.0
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

// Export for different environments
export default AdTruth;
/**
 * Browser fingerprinting utilities for fraud detection
 * Phase 1: Basic fingerprinting
 */

/**
 * Generate a basic device fingerprint
 * @returns {object} Basic fingerprint data
 */
export function getBasicFingerprint() {
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
export function getEnhancedBrowserInfo() {
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
export function getInputMethod() {
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

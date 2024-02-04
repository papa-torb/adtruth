/**
 * Browser fingerprinting utilities for fraud detection
 * Phase 1: Basic fingerprinting
 * Phase 2: Canvas fingerprinting
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
    hash = (hash << 5) - hash + str.charCodeAt(i);
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
  const hasMouse =
    typeof matchMedia !== 'undefined' ? matchMedia('(pointer: fine)').matches : false;
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
 * Generate canvas fingerprint (Phase 2)
 * Creates unique hash based on how browser renders canvas
 * @returns {string|null} Canvas fingerprint hash
 */
export function getCanvasFingerprint() {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return null;
    }

    // Set canvas size
    canvas.width = 200;
    canvas.height = 50;

    // Draw text with specific styling
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);

    // Draw text
    ctx.fillStyle = '#069';
    ctx.font = '11pt no-real-font-123';
    ctx.fillText('AdTruth🔒', 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.font = '18pt Arial';
    ctx.fillText('AdTruth', 4, 17);

    // Get canvas data and create hash
    const dataURL = canvas.toDataURL();

    // Use last 50 characters as fingerprint (most variable part)
    const canvasHash = dataURL.slice(-50);

    // Also create a simple numeric hash for the full data
    let numericHash = 0;
    for (let i = 0; i < dataURL.length; i++) {
      numericHash = (numericHash << 5) - numericHash + dataURL.charCodeAt(i);
      numericHash = numericHash & numericHash;
    }

    return {
      hash: Math.abs(numericHash).toString(36),
      partial: canvasHash
    };
  } catch (e) {
    // Canvas fingerprinting might be blocked or fail
    return null;
  }
}

// Note: This project is still under development.

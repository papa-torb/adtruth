/**
 * Generate a unique session ID
 * Uses crypto.randomUUID if available, falls back to Math.random
 */
export function generateSessionId() {
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
export function getSessionId() {
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
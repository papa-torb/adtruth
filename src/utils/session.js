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

/**
 * Get or create a visitor ID, stored in localStorage (persistent)
 */
export function getVisitorId() {
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
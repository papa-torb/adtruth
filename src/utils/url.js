/**
 * Parse URL parameters including UTM parameters
 */
export function parseUrlParams(url) {
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
export function getCurrentUrl() {
  return window.location.href;
}

/**
 * Get the referrer URL
 */
export function getReferrer() {
  return document.referrer || '';
}
// Note: This project is still under development.

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
// Note: This project is still under development.

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
// Note: This project is still under development.

/**
 * Browser fingerprinting utilities for fraud detection
 * Phase 1: Basic fingerprinting
 * Phase 2: Canvas fingerprinting
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
 * Generate canvas fingerprint (Phase 2)
 * Creates unique hash based on how browser renders canvas
 * @returns {string|null} Canvas fingerprint hash
 */
function getCanvasFingerprint() {
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
      numericHash = ((numericHash << 5) - numericHash) + dataURL.charCodeAt(i);
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

/**
 * Behavioral tracking utilities for fraud detection
 * Phase 1: Time-based metrics
 * Phase 2: Scroll depth, mouse tracking, touch tracking
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

    // Phase 2: Scroll tracking
    this.maxScrollDepth = 0;
    this.scrollEvents = 0;

    // Phase 2: Mouse tracking
    this.mouseSamples = [];
    this.lastMouseSample = 0;
    this.mouseMovementDetected = false;

    // Phase 2: Touch tracking
    this.touchSamples = [];
    this.touchStartTime = null;
    this.touchStartPos = null;
    this.tapCount = 0;
    this.tapTimes = [];
    this.swipeDetected = false;

    // Set up event listeners
    this.setupListeners();
  }

  /**
   * Set up event listeners for behavior tracking
   */
  setupListeners() {
    // Track clicks
    document.addEventListener('click', this.handleClick.bind(this), { passive: true });

    // Phase 2: Track scroll depth
    document.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });

    // Phase 2: Track mouse movement (sampled to reduce overhead)
    document.addEventListener('mousemove', this.handleMouseMove.bind(this), { passive: true });

    // Phase 2: Track touch events for mobile
    document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
    document.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });

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
   * Handle scroll events (Phase 2)
   * Tracks maximum scroll depth as percentage of page height
   */
  handleScroll() {
    this.scrollEvents++;

    // Calculate scroll depth percentage
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const scrollDepth = (scrollTop + windowHeight) / documentHeight;

    // Update max scroll depth
    if (scrollDepth > this.maxScrollDepth) {
      this.maxScrollDepth = scrollDepth;
    }
  }

  /**
   * Handle mouse move events (Phase 2)
   * Samples mouse positions every 100ms to track movement patterns
   */
  handleMouseMove(e) {
    const now = Date.now();
    this.mouseMovementDetected = true;

    // Sample every 100ms to avoid overwhelming data collection
    if (now - this.lastMouseSample < 100) {
      return;
    }

    this.lastMouseSample = now;

    // Store sampled position
    this.mouseSamples.push({
      x: e.clientX,
      y: e.clientY,
      t: now
    });

    // Keep only last 50 samples (~5 seconds of movement)
    if (this.mouseSamples.length > 50) {
      this.mouseSamples.shift();
    }
  }

  /**
   * Handle touch start events (Phase 2)
   */
  handleTouchStart(e) {
    const now = Date.now();
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      this.touchStartTime = now;
      this.touchStartPos = { x: touch.clientX, y: touch.clientY };

      // Record tap time
      this.tapTimes.push(now);
      if (this.tapTimes.length > 10) {
        this.tapTimes.shift();
      }
    }
  }

  /**
   * Handle touch move events (Phase 2)
   */
  handleTouchMove(e) {
    if (e.touches.length > 0 && this.touchStartPos) {
      const touch = e.touches[0];
      this.touchSamples.push({
        x: touch.clientX,
        y: touch.clientY,
        t: Date.now()
      });

      // Keep only last 30 samples
      if (this.touchSamples.length > 30) {
        this.touchSamples.shift();
      }
    }
  }

  /**
   * Handle touch end events (Phase 2)
   * Detects taps and swipes
   */
  handleTouchEnd(e) {
    if (!this.touchStartTime || !this.touchStartPos) {
      return;
    }

    const duration = Date.now() - this.touchStartTime;
    const lastTouch = e.changedTouches[0];
    const endPos = { x: lastTouch.clientX, y: lastTouch.clientY };

    const dx = endPos.x - this.touchStartPos.x;
    const dy = endPos.y - this.touchStartPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Detect tap (short duration, minimal movement)
    if (duration < 300 && distance < 10) {
      this.tapCount++;
    }

    // Detect swipe (significant movement)
    if (distance > 50) {
      this.swipeDetected = true;
    }

    // Reset
    this.touchStartTime = null;
    this.touchStartPos = null;
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
   * Analyze mouse movement patterns (Phase 2)
   * @returns {object|null} Mouse pattern analysis
   */
  analyzeMousePatterns() {
    if (this.mouseSamples.length < 3) {
      return null;
    }

    const velocities = [];
    const angles = [];

    // Calculate velocities and angles between consecutive samples
    for (let i = 1; i < this.mouseSamples.length; i++) {
      const prev = this.mouseSamples[i - 1];
      const curr = this.mouseSamples[i];

      const dx = curr.x - prev.x;
      const dy = curr.y - prev.y;
      const dt = (curr.t - prev.t) / 1000; // Convert to seconds

      // Calculate velocity (pixels per second)
      const distance = Math.sqrt(dx * dx + dy * dy);
      const velocity = distance / dt;
      velocities.push(velocity);

      // Calculate angle changes (for linearity detection)
      if (i > 1) {
        const prevDx = prev.x - this.mouseSamples[i - 2].x;
        const prevDy = prev.y - this.mouseSamples[i - 2].y;
        const angle = Math.atan2(dy, dx) - Math.atan2(prevDy, prevDx);
        angles.push(Math.abs(angle));
      }
    }

    // Calculate statistics
    const avgVelocity = velocities.reduce((a, b) => a + b, 0) / velocities.length;
    const velocityVariance = this.calculateVariance(velocities);
    const avgAngleChange = angles.length > 0
      ? angles.reduce((a, b) => a + b, 0) / angles.length
      : 0;

    return {
      avgVelocity: Math.round(avgVelocity),
      velocityVariance: Math.round(velocityVariance),
      avgAngleChange: Math.round(avgAngleChange * 100) / 100,
      sampleCount: this.mouseSamples.length,
      hasHumanPatterns: velocityVariance > 100 && avgAngleChange > 0.1 // Bot detection heuristic
    };
  }

  /**
   * Calculate variance of an array of numbers
   * @param {Array<number>} arr - Array of numbers
   * @returns {number} Variance
   */
  calculateVariance(arr) {
    if (arr.length === 0) return 0;

    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    const squareDiffs = arr.map(value => Math.pow(value - mean, 2));
    return squareDiffs.reduce((a, b) => a + b, 0) / arr.length;
  }

  /**
   * Analyze touch patterns (Phase 2)
   * @returns {object|null} Touch pattern analysis
   */
  analyzeTouchPatterns() {
    // Calculate tap speed if we have multiple taps
    let avgTapInterval = null;
    if (this.tapTimes.length >= 2) {
      let totalInterval = 0;
      for (let i = 1; i < this.tapTimes.length; i++) {
        totalInterval += this.tapTimes[i] - this.tapTimes[i - 1];
      }
      avgTapInterval = Math.round(totalInterval / (this.tapTimes.length - 1));
    }

    // Analyze swipe velocity if we have touch samples
    let swipeVelocity = null;
    if (this.touchSamples.length >= 2) {
      const first = this.touchSamples[0];
      const last = this.touchSamples[this.touchSamples.length - 1];
      const dx = last.x - first.x;
      const dy = last.y - first.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const duration = (last.t - first.t) / 1000; // seconds
      swipeVelocity = duration > 0 ? Math.round(distance / duration) : 0;
    }

    return {
      tapCount: this.tapCount,
      avgTapInterval,
      swipeDetected: this.swipeDetected,
      swipeVelocity,
      touchSampleCount: this.touchSamples.length
    };
  }

  /**
   * Get all behavioral metrics
   * @returns {object} Behavioral metrics
   */
  getMetrics() {
    const now = Date.now();
    const timeOnPage = now - this.pageLoadTime;
    const mousePatterns = this.analyzeMousePatterns();
    const touchPatterns = this.analyzeTouchPatterns();

    return {
      // Phase 1 metrics
      timeOnPage,
      timeToFirstInteraction: this.firstInteractionTime
        ? this.firstInteractionTime - this.pageLoadTime
        : null,
      timeToFirstClick: this.clickTimes.length > 0
        ? this.clickTimes[0] - this.pageLoadTime
        : null,
      clickCount: this.clickCount,
      avgClickInterval: this.calculateAvgInterval(),
      hasInteracted: this.firstInteractionTime !== null,

      // Phase 2 metrics
      scrollDepth: Math.round(this.maxScrollDepth * 100) / 100, // Round to 2 decimals
      scrollEvents: this.scrollEvents,
      mouseMovementDetected: this.mouseMovementDetected,
      mousePatterns: mousePatterns,
      touchPatterns: touchPatterns
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

// Note: This project is still under development.

class Tracker {
  constructor() {
    this.apiKey = null;
    this.apiEndpoint = 'https://api.adtruth.io/track';
    this.initialized = false;
    this.debug = false;
    this.behaviorTracker = null;
    this.fingerprint = null;
    this.hasUnloadListener = false;
    this.periodicTimer = null;
    this.unloadEventSent = false;
  }

  /**
   * Initialize the tracker with an API key
   * @param {string} apiKey - The API key for authentication
   * @param {object} options - Optional configuration
   */
  init(apiKey, options = {}) {
    try {
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

      // Initialize behavior tracker and generate fingerprints
      this.behaviorTracker = new BehaviorTracker();
      this.fingerprint = getBasicFingerprint();

      // Phase 2: Canvas fingerprinting with error handling
      try {
        this.canvasFingerprint = getCanvasFingerprint();
      } catch (e) {
        this.log('AdTruth: Canvas fingerprinting failed (browser restriction)', e);
        this.canvasFingerprint = null;
      }

      // Set up page unload tracking for accurate behavior data
      this.setupUnloadTracking();

      // Optional: Enable periodic updates (default: disabled)
      // Users can enable with: AdTruth.init(apiKey, { periodicUpdates: true })
      if (options.periodicUpdates) {
        this.startPeriodicUpdates(options.updateInterval || 30000);
      }
    } catch (error) {
      // Don't let initialization errors break client sites
      this.log('AdTruth: Initialization error', error);
    }
  }

  /**
   * Set up page unload tracking to capture complete behavior data
   * Uses sendBeacon for guaranteed delivery even as page unloads
   */
  setupUnloadTracking() {
    if (this.hasUnloadListener) {
      return; // Already set up
    }

    const sendFinalEvent = () => {
      try {
        if (!this.initialized || !this.behaviorTracker) {
          return;
        }

        // Use atomic flag to prevent duplicate sends (both events fire nearly simultaneously)
        if (this.unloadEventSent) {
          this.log('AdTruth: Final event already sent');
          return;
        }
        this.unloadEventSent = true;

        // Clean up periodic updates to prevent memory leaks
        this.stopPeriodicUpdates();

        // Collect final data with all behavior metrics
        const data = this.collectData('pageview');
        const payload = JSON.stringify(data);
        const payloadSize = new Blob([payload]).size;

        this.log('AdTruth: Sending final event on page unload');
        this.log(`AdTruth: Payload size: ${payloadSize} bytes`);
        this.log('AdTruth: Behavior data:', data.behavior);

        // Use sendBeacon for guaranteed delivery
        if (navigator.sendBeacon) {
          const blob = new Blob([payload], { type: 'application/json' });

          // SECURITY NOTE: API key in query param is necessary because sendBeacon
          // doesn't support custom headers. Key is validated server-side and has
          // limited permissions (write-only to page_views table).
          const urlWithKey = `${this.apiEndpoint}?apiKey=${encodeURIComponent(this.apiKey)}`;

          const success = navigator.sendBeacon(urlWithKey, blob);
          this.log(`AdTruth: sendBeacon ${success ? 'succeeded' : 'failed'}`);

          // Fallback if sendBeacon fails (network issue, size limit, etc.)
          if (!success && payloadSize < 60 * 1024) {
            this.log('AdTruth: sendBeacon failed, trying fetch fallback');
            this.sendViaFetch(payload);
          }
        } else {
          // Fallback to fetch with keepalive for older browsers
          this.log('AdTruth: sendBeacon not available, using fetch');
          this.sendViaFetch(payload);
        }
      } catch (error) {
        this.log('AdTruth: Error sending final event', error);
      }
    };

    // Set up multiple events for cross-browser compatibility
    // Desktop browsers: beforeunload fires reliably
    // Mobile Safari: Only pagehide fires reliably
    // Back/Forward Cache: pagehide fires, beforeunload doesn't
    window.addEventListener('beforeunload', sendFinalEvent);
    window.addEventListener('pagehide', sendFinalEvent);
    window.addEventListener('unload', sendFinalEvent); // Legacy browser fallback

    this.hasUnloadListener = true;
    this.log('AdTruth: Page unload tracking enabled');
  }

  /**
   * Start periodic updates for long sessions
   * @param {number} interval - Update interval in milliseconds (default: 30000 = 30 seconds)
   */
  startPeriodicUpdates(interval = 30000) {
    if (this.periodicTimer) {
      return; // Already running
    }

    this.periodicTimer = setInterval(() => {
      try {
        if (this.initialized && this.behaviorTracker) {
          this.log('AdTruth: Sending periodic update');
          this.track();
        }
      } catch (error) {
        this.log('AdTruth: Error in periodic update', error);
      }
    }, interval);

    this.log(`AdTruth: Periodic updates enabled (every ${interval}ms)`);
  }

  /**
   * Stop periodic updates
   */
  stopPeriodicUpdates() {
    if (this.periodicTimer) {
      clearInterval(this.periodicTimer);
      this.periodicTimer = null;
      this.log('AdTruth: Periodic updates stopped');
    }
  }

  /**
   * Track a pageview event
   */
  track(eventType = 'pageview') {
    try {
      if (!this.initialized) {
        this.log('AdTruth: Not initialized. Call init() first.');
        return;
      }

      const data = this.collectData(eventType);
      this.sendData(data);
    } catch (error) {
      // Don't let tracking errors break client sites
      this.log('AdTruth: Tracking error', error);
    }
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
        timezoneOffset: this.fingerprint ? this.fingerprint.details.timezoneOffset : null,
        // Phase 2: Canvas fingerprint
        canvas: this.canvasFingerprint ? this.canvasFingerprint.hash : null
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
   * Send data using fetch API with timeout
   */
  sendViaFetch(payload) {
    // Validate payload size for keepalive limit (64KB browser-wide limit)
    const payloadSize = new Blob([payload]).size;
    const KEEPALIVE_LIMIT = 60 * 1024; // 60KB (leave 4KB buffer)

    if (payloadSize > KEEPALIVE_LIMIT) {
      this.log(`AdTruth: Warning - Payload size ${payloadSize} bytes exceeds keepalive limit`);
      // In production, consider truncating behavior arrays here
    }

    // Create abort controller for timeout (5 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    fetch(this.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey
      },
      body: payload,
      keepalive: true,
      signal: controller.signal
    })
      .then(() => {
        clearTimeout(timeoutId);
        this.log('AdTruth: Data sent via fetch');
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        // Fail silently in production
        if (error.name === 'AbortError') {
          this.log('AdTruth: Request timeout');
        } else {
          this.log('AdTruth: Failed to send data', error);
        }
        // TODO: For production, queue in IndexedDB for retry on next page load
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
// Note: This project is still under development.

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
  version: '0.1.0',

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
// Note: This project is still under development.

export { AdTruth as default };

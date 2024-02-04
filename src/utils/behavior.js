/**
 * Behavioral tracking utilities for fraud detection
 * Phase 1: Time-based metrics
 * Phase 2: Scroll depth, mouse tracking, touch tracking
 */

/**
 * BehaviorTracker class - Tracks user behavior on the page
 */
export class BehaviorTracker {
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
  handleClick(_e) {
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
    const avgAngleChange =
      angles.length > 0 ? angles.reduce((a, b) => a + b, 0) / angles.length : 0;

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
    if (arr.length === 0) {
      return 0;
    }

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
      timeToFirstClick: this.clickTimes.length > 0 ? this.clickTimes[0] - this.pageLoadTime : null,
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

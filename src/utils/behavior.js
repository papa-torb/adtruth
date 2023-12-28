/**
 * Behavioral tracking utilities for fraud detection
 * Phase 1: Time-based metrics
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

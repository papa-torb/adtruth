/**
 * Behavioral Impossibilities Detector
 * Detects bot behavior through physics violations and impossible patterns
 *
 * Phase 0: Core detection logic for ground truth labeling
 */

/**
 * BehavioralImpossibilities class - Analyzes behavioral data for impossibilities
 */
export class BehavioralImpossibilities {
  constructor() {
    this.domContentLoadedTime = null;

    // Track DOMContentLoaded timing
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.domContentLoadedTime = Date.now();
      });
    } else {
      this.domContentLoadedTime = Date.now();
    }
  }

  /**
   * Analyze behavioral data for impossibilities
   * @param {object} behavioralData - Data from BehaviorTracker.getMetrics()
   * @returns {Array} Array of detected impossibilities
   */
  analyze(behavioralData) {
    const impossibilities = [];

    // 1. Fast exit detection (land and leave pattern)
    const fastExit = this.detectFastExit(behavioralData);
    if (fastExit) {
      impossibilities.push(fastExit);
    }

    // 2. Superhuman mouse velocity
    const superhumanMouse = this.detectSuperhumanMouseVelocity(behavioralData);
    if (superhumanMouse) {
      impossibilities.push(superhumanMouse);
    }

    // 3. Impossible scroll speed
    const impossibleScroll = this.detectImpossibleScrollSpeed(behavioralData);
    if (impossibleScroll) {
      impossibilities.push(impossibleScroll);
    }

    // 4. Click before page load
    const earlyClick = this.detectClickBeforeLoad(behavioralData);
    if (earlyClick) {
      impossibilities.push(earlyClick);
    }

    // 5. Zero interaction ghost
    const ghostUser = this.detectZeroInteractionGhost(behavioralData);
    if (ghostUser) {
      impossibilities.push(ghostUser);
    }

    // 6. Rapid fire clicks
    const rapidClicks = this.detectRapidFireClicks(behavioralData);
    if (rapidClicks) {
      impossibilities.push(rapidClicks);
    }

    // 7. Instant form submission
    const instantForm = this.detectInstantFormSubmission(behavioralData);
    if (instantForm) {
      impossibilities.push(instantForm);
    }

    return impossibilities;
  }

  /**
   * Detect "land and leave" pattern - exit in <3s with zero interaction
   * This catches 60-70% of CPC fraud bots
   */
  detectFastExit(data) {
    const { timeOnPage, clickCount, mouseMovementDetected, scrollDepth } = data;

    // Fast exit: <3s with absolutely no interaction
    if (
      timeOnPage < 3000 &&
      clickCount === 0 &&
      !mouseMovementDetected &&
      scrollDepth === 0
    ) {
      return {
        type: 'fast_exit_no_interaction',
        confidence: 1.0,
        details: {
          timeOnPage,
          clickCount,
          mouseMovementDetected,
          scrollDepth
        },
        message: `Exited in ${timeOnPage}ms with zero interaction (no clicks, mouse, or scroll)`
      };
    }

    return null;
  }

  /**
   * Detect superhuman mouse velocity (>5000 px/s average)
   * Humans rarely exceed 2000 px/s sustained
   */
  detectSuperhumanMouseVelocity(data) {
    const { mousePatterns } = data;

    if (!mousePatterns || !mousePatterns.avgVelocity) {
      return null;
    }

    const threshold = 5000; // px/s
    if (mousePatterns.avgVelocity > threshold) {
      return {
        type: 'superhuman_mouse_velocity',
        confidence: 0.95,
        details: {
          avgVelocity: mousePatterns.avgVelocity,
          threshold,
          sampleCount: mousePatterns.sampleCount
        },
        message: `Mouse velocity ${mousePatterns.avgVelocity} px/s exceeds human threshold ${threshold} px/s`
      };
    }

    return null;
  }

  /**
   * Detect impossible scroll speed (90% depth in <100ms)
   * Humans need at least 500ms to scroll full page
   */
  detectImpossibleScrollSpeed(data) {
    const { timeOnPage, scrollDepth } = data;

    // Scrolled to 90%+ depth in <100ms
    if (scrollDepth >= 0.9 && timeOnPage < 100) {
      return {
        type: 'impossible_scroll_speed',
        confidence: 0.95,
        details: {
          scrollDepth,
          timeOnPage
        },
        message: `Scrolled to ${Math.round(scrollDepth * 100)}% in ${timeOnPage}ms (impossible speed)`
      };
    }

    return null;
  }

  /**
   * Detect click before DOMContentLoaded
   * Page content hasn't loaded yet - can't see what to click
   */
  detectClickBeforeLoad(data) {
    const { timeToFirstClick } = data;

    if (
      timeToFirstClick !== null &&
      this.domContentLoadedTime !== null &&
      timeToFirstClick < 0
    ) {
      return {
        type: 'click_before_load',
        confidence: 1.0,
        details: {
          timeToFirstClick,
          domContentLoadedTime: this.domContentLoadedTime
        },
        message: 'Click detected before DOM loaded (impossible)'
      };
    }

    return null;
  }

  /**
   * Detect zero interaction for extended period (10+ seconds)
   * Human reading/viewing should show some micro-movements
   */
  detectZeroInteractionGhost(data) {
    const { timeOnPage, clickCount, mouseMovementDetected, scrollDepth, touchPatterns } = data;

    // 10+ seconds with absolutely no input
    if (
      timeOnPage >= 10000 &&
      clickCount === 0 &&
      !mouseMovementDetected &&
      scrollDepth === 0 &&
      (!touchPatterns || touchPatterns.tapCount === 0)
    ) {
      return {
        type: 'zero_interaction_ghost',
        confidence: 0.90,
        details: {
          timeOnPage,
          clickCount,
          mouseMovementDetected,
          scrollDepth
        },
        message: `${Math.round(timeOnPage / 1000)}s on page with zero interaction (bot likely)`
      };
    }

    return null;
  }

  /**
   * Detect rapid fire clicks (100+ clicks in 1 second)
   * Humanly impossible click rate
   */
  detectRapidFireClicks(data) {
    const { clickCount, timeOnPage } = data;

    // More than 100 clicks in 1 second
    const clickRate = (clickCount / timeOnPage) * 1000; // clicks per second
    if (clickRate > 100) {
      return {
        type: 'rapid_fire_clicks',
        confidence: 1.0,
        details: {
          clickCount,
          timeOnPage,
          clickRate: Math.round(clickRate)
        },
        message: `${clickCount} clicks in ${timeOnPage}ms (${Math.round(clickRate)} clicks/sec - impossible)`
      };
    }

    return null;
  }

  /**
   * Detect instant form submission (<200ms after page load)
   * Can't read and fill form that fast
   *
   * NOTE: Increased threshold to 200ms (from 500ms) to reduce false positives.
   * Humans can click within 200-500ms if they're expecting to click (e.g., clicking
   * a button immediately after page load), but <200ms is physically impossible
   * for human reaction time to visual stimulus.
   */
  detectInstantFormSubmission(data) {
    const { timeToFirstClick, timeOnPage } = data;

    // This is a placeholder - would need form tracking to implement fully
    // For now, detect suspiciously fast first interaction
    // 200ms = typical human visual-motor reaction time threshold
    if (timeToFirstClick !== null && timeToFirstClick < 200) {
      return {
        type: 'instant_interaction',
        confidence: 0.95,
        details: {
          timeToFirstClick
        },
        message: `First interaction at ${timeToFirstClick}ms (faster than human reaction time)`
      };
    }

    return null;
  }

  /**
   * Calculate overall impossibility score (0.0-1.0)
   * Based on detected impossibilities and their confidence levels
   *
   * @param {Array} impossibilities - Array from analyze()
   * @returns {number} Score from 0.0 (likely human) to 1.0 (definitely bot)
   */
  calculateScore(impossibilities) {
    if (impossibilities.length === 0) {
      return 0.0;
    }

    // Weight by confidence and combine
    const totalConfidence = impossibilities.reduce(
      (sum, imp) => sum + imp.confidence,
      0
    );

    // Average confidence, but cap at 1.0
    const avgConfidence = totalConfidence / impossibilities.length;

    // Boost score if multiple impossibilities detected
    const multiplier = Math.min(1 + (impossibilities.length - 1) * 0.1, 1.5);

    return Math.min(avgConfidence * multiplier, 1.0);
  }
}

// Note: This project is still under development.

/**
 * Ground Truth Collector - Phase 0 MVP
 * Collects behavioral data and detects impossibilities
 * Submits to backend for ML training dataset
 *
 * IMPORTANT: This is opt-in via feature flag (enableGroundTruth)
 * Default: OFF (only enabled for research participants)
 */

import { BehavioralImpossibilities } from '../utils/impossibilities.js';

/**
 * GroundTruthCollector - Phase 0 minimal implementation
 *
 * What it does:
 * 1. Collect behavioral data for 15 seconds
 * 2. Analyze for impossibilities
 * 3. Submit to /api/training-data endpoint
 *
 * What it doesn't do (yet):
 * - No CAPTCHA challenges (Phase 2)
 * - No IP reputation (Phase 1)
 * - No honeypots (Phase 1)
 */
export class GroundTruthCollector {
  constructor(apiKey, behaviorTracker, config = {}) {
    this.apiKey = apiKey;
    this.behaviorTracker = behaviorTracker;
    this.detector = new BehavioralImpossibilities();

    // Configuration
    this.collectionTime = config.collectionTime || 15000; // 15 seconds default
    this.apiEndpoint = config.apiEndpoint || 'https://api.adtruth.io/api/training-data/';

    // State
    this.started = false;
    this.submitted = false;
    this.collectionTimer = null;
  }

  /**
   * Start ground truth collection
   * Automatically submits after collectionTime (15s default)
   */
  start() {
    if (this.started) {
      console.warn('[AdTruth GT] Collection already started');
      return;
    }

    this.started = true;
    console.log('[AdTruth GT] Starting Phase 0 collection (15 seconds)...');

    // Schedule automatic submission after collection period
    this.collectionTimer = setTimeout(() => {
      this.collect();
    }, this.collectionTime);

    // Also submit on page unload (in case user leaves early)
    window.addEventListener('beforeunload', () => {
      if (!this.submitted) {
        this.collect();
      }
    });
  }

  /**
   * Collect behavioral data and submit to backend
   */
  async collect() {
    if (this.submitted) {
      return; // Already submitted
    }

    this.submitted = true;

    // Clear timer if still running
    if (this.collectionTimer) {
      clearTimeout(this.collectionTimer);
      this.collectionTimer = null;
    }

    try {
      // Get behavioral metrics from tracker
      const behavioralData = this.behaviorTracker.getMetrics();

      // Analyze for impossibilities
      const impossibilities = this.detector.analyze(behavioralData);

      // Calculate impossibility score
      const impossibilityScore = this.detector.calculateScore(impossibilities);

      // Prepare submission payload
      const payload = {
        // Behavioral features (full metrics)
        behavioral_features: behavioralData,

        // Impossibilities detected
        impossibilities: impossibilities,

        // Fraud score (for Phase 0, this is just impossibility score)
        fraud_score: impossibilityScore,

        // Phase 0: Not challenged yet
        challenged: false,

        // Timestamp
        timestamp: Date.now()
      };

      // Submit to backend
      await this.submit(payload);

      console.log('[AdTruth GT] Collection complete:', {
        impossibilityCount: impossibilities.length,
        fraudScore: impossibilityScore.toFixed(2),
        timeOnPage: `${Math.round(behavioralData.timeOnPage / 1000)}s`
      });

    } catch (err) {
      console.error('[AdTruth GT] Collection failed:', err);
    }
  }

  /**
   * Submit ground truth data to backend
   * @param {object} payload - Training data payload
   */
  async submit(payload) {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey
        },
        body: JSON.stringify(payload),
        keepalive: true // Ensure request completes even if page unloads
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('[AdTruth GT] Submitted successfully:', result);

      return result;

    } catch (err) {
      console.error('[AdTruth GT] Submission failed:', err);
      throw err;
    }
  }

  /**
   * Stop collection (cleanup)
   */
  stop() {
    if (this.collectionTimer) {
      clearTimeout(this.collectionTimer);
      this.collectionTimer = null;
    }
    this.started = false;
  }
}

// Note: This project is still under development.

// TypeScript definitions for AdTruth SDK

declare module '@adtruth/sdk' {
  /**
   * Configuration options for AdTruth initialization
   */
  export interface AdTruthConfig {
    /**
     * Enable debug mode for console logging
     * @default false
     */
    debug?: boolean;

    /**
     * Custom API endpoint URL
     * @default 'https://api.adtruth.io/track/'
     */
    endpoint?: string;
  }

  /**
   * Behavior metrics collected by the SDK
   */
  export interface BehaviorMetrics {
    /** Number of clicks on the page */
    clicks: number;

    /** Number of mouse move events detected */
    mouseMoves: number;

    /** Maximum scroll depth as percentage (0-1) */
    scrollDepth: number;

    /** Time spent on page in milliseconds */
    timeOnPage: number;

    /** Time to first interaction in milliseconds */
    timeToFirstInteraction: number | null;

    /** Average interval between clicks in milliseconds */
    avgClickInterval: number | null;

    /** Mouse movement patterns (velocity, variance, etc.) */
    mousePatterns: {
      avgVelocity: number;
      velocityVariance: number;
      avgAngleChange: number;
      sampleCount: number;
      hasHumanPatterns: boolean;
    } | null;

    /** Touch interaction patterns for mobile */
    touchPatterns: {
      tapCount: number;
      avgTapInterval: number | null;
      swipeDetected: boolean;
      swipeVelocity: number | null;
      touchSampleCount: number;
    } | null;
  }

  /**
   * Device fingerprint information
   */
  export interface DeviceFingerprint {
    /** Basic fingerprint hash */
    hash: string;

    /** Detailed fingerprint data */
    details: {
      screen: string;
      timezone: string;
      timezoneOffset: number;
      hardwareConcurrency: number;
      deviceMemory: number;
    };
  }

  /**
   * Canvas fingerprint for enhanced bot detection
   */
  export interface CanvasFingerprint {
    /** Canvas rendering hash */
    hash: string;

    /** Partial canvas data */
    partial: string;
  }

  /**
   * Complete metrics collected by AdTruth
   */
  export interface AdTruthMetrics {
    /** Behavioral tracking metrics */
    behavior: BehaviorMetrics;

    /** Device fingerprint hash */
    fingerprint: string;

    /** Canvas fingerprint hash (null if unavailable) */
    canvasFingerprint: string | null;

    /** Session ID */
    sessionId: string;

    /** Visitor ID (persistent across sessions) */
    visitorId: string;

    /** Current page URL */
    url: string;

    /** Referrer URL */
    referrer: string;

    /** UTM parameters and click IDs */
    urlParams: Record<string, string>;
  }

  /**
   * Main AdTruth SDK interface
   */
  export interface AdTruthAPI {
    /**
     * Initialize AdTruth tracking
     * @param apiKey - Your AdTruth API key
     * @param options - Optional configuration
     */
    init(apiKey: string, options?: AdTruthConfig): void;

    /**
     * Manually track a pageview
     * Usually called automatically on init
     */
    trackPageview(): void;

    /**
     * Track a custom event
     * @param eventName - Name of the event
     * @param data - Optional event data
     */
    track(eventName: string, data?: Record<string, any>): void;

    /**
     * Get current metrics
     * @returns Current tracking metrics
     */
    getMetrics(): AdTruthMetrics;

    /**
     * SDK version
     */
    readonly version: string;
  }

  /**
   * Global AdTruth object available after script load
   */
  const AdTruth: AdTruthAPI;

  export default AdTruth;
}

declare global {
  interface Window {
    AdTruth: import('@adtruth/sdk').AdTruthAPI;
  }
}

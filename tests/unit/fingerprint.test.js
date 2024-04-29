import {
  getBasicFingerprint,
  getEnhancedBrowserInfo,
  getInputMethod,
  getCanvasFingerprint
} from '../../src/utils/fingerprint';

describe('Fingerprint Utilities', () => {
  describe('getBasicFingerprint', () => {
    it('should return fingerprint with hash and details', () => {
      const result = getBasicFingerprint();

      expect(result).toHaveProperty('hash');
      expect(result).toHaveProperty('details');
      expect(typeof result.hash).toBe('string');
      expect(result.hash.length).toBeGreaterThan(0);
    });

    it('should include screen dimensions in fingerprint', () => {
      const result = getBasicFingerprint();

      expect(result.details.screen).toMatch(/^\d+x\d+x\d+$/);
      expect(result.details.timezoneOffset).toBe(new Date().getTimezoneOffset());
    });

    it('should include hardware concurrency', () => {
      const result = getBasicFingerprint();

      expect(typeof result.details.hardwareConcurrency).toBe('number');
      expect(result.details.hardwareConcurrency).toBeGreaterThanOrEqual(0);
    });

    it('should generate consistent hash for same fingerprint', () => {
      const result1 = getBasicFingerprint();
      const result2 = getBasicFingerprint();

      expect(result1.hash).toBe(result2.hash);
    });
  });

  describe('getEnhancedBrowserInfo', () => {
    it('should return all browser information fields', () => {
      const info = getEnhancedBrowserInfo();

      expect(info).toHaveProperty('user_agent');
      expect(info).toHaveProperty('language');
      expect(info).toHaveProperty('languages');
      expect(info).toHaveProperty('platform');
      expect(info).toHaveProperty('vendor');
      expect(info).toHaveProperty('cookieEnabled');
      expect(info).toHaveProperty('doNotTrack');
      expect(info).toHaveProperty('maxTouchPoints');
      expect(info).toHaveProperty('hardwareConcurrency');
      expect(info).toHaveProperty('deviceMemory');
    });

    it('should return correct values from navigator', () => {
      const info = getEnhancedBrowserInfo();

      expect(info.user_agent).toBe(navigator.userAgent);
      expect(info.language).toBe(navigator.language);
      expect(info.platform).toBe(navigator.platform);
      expect(info.cookieEnabled).toBe(navigator.cookieEnabled);
    });

    it('should handle missing navigator properties', () => {
      const originalVendor = navigator.vendor;
      Object.defineProperty(navigator, 'vendor', { value: undefined, configurable: true });

      const info = getEnhancedBrowserInfo();

      expect(info.vendor).toBe('');

      Object.defineProperty(navigator, 'vendor', { value: originalVendor, configurable: true });
    });

    it('should format languages as comma-separated string', () => {
      const info = getEnhancedBrowserInfo();

      expect(info.languages).toBe('en-US,en');
    });
  });

  describe('getInputMethod', () => {
    it('should detect input capabilities', () => {
      const input = getInputMethod();

      expect(input).toHaveProperty('hasTouch');
      expect(input).toHaveProperty('hasMouse');
      expect(input).toHaveProperty('hasHover');
      expect(input).toHaveProperty('maxTouchPoints');
      expect(input).toHaveProperty('inputInconsistency');
    });

    it('should detect touch support', () => {
      const input = getInputMethod();

      expect(typeof input.hasTouch).toBe('boolean');
      expect(input.maxTouchPoints).toBe(0);
    });

    it('should flag input inconsistency when all methods present', () => {
      // Mock matchMedia to return true for both
      global.matchMedia = jest.fn((query) => ({
        matches: true,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      }));

      // Mock touch support
      global.window.ontouchstart = {};

      const input = getInputMethod();

      expect(input.inputInconsistency).toBe(true);

      delete global.window.ontouchstart;
    });

    it('should handle missing matchMedia', () => {
      const originalMatchMedia = global.matchMedia;
      global.matchMedia = undefined;

      const input = getInputMethod();

      expect(input.hasMouse).toBe(false);
      expect(input.hasHover).toBe(false);

      global.matchMedia = originalMatchMedia;
    });
  });

  describe('getCanvasFingerprint', () => {
    it('should return canvas fingerprint with hash and partial', () => {
      const fingerprint = getCanvasFingerprint();

      expect(fingerprint).toHaveProperty('hash');
      expect(fingerprint).toHaveProperty('partial');
      expect(typeof fingerprint.hash).toBe('string');
      expect(typeof fingerprint.partial).toBe('string');
    });

    it('should return consistent fingerprint', () => {
      const fp1 = getCanvasFingerprint();
      const fp2 = getCanvasFingerprint();

      expect(fp1.hash).toBe(fp2.hash);
      expect(fp1.partial).toBe(fp2.partial);
    });

    it('should return null if canvas context unavailable', () => {
      const originalGetContext = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = jest.fn(() => null);

      const fingerprint = getCanvasFingerprint();

      expect(fingerprint).toBeNull();

      HTMLCanvasElement.prototype.getContext = originalGetContext;
    });

    it('should handle canvas errors gracefully', () => {
      const originalGetContext = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = jest.fn(() => {
        throw new Error('Canvas not supported');
      });

      const fingerprint = getCanvasFingerprint();

      expect(fingerprint).toBeNull();

      HTMLCanvasElement.prototype.getContext = originalGetContext;
    });

    it('should create 200x50 canvas', () => {
      const createElementSpy = jest.spyOn(document, 'createElement');

      getCanvasFingerprint();

      const canvasCall = createElementSpy.mock.results.find(
        result => result.value && result.value.tagName === 'CANVAS'
      );

      expect(canvasCall).toBeDefined();

      createElementSpy.mockRestore();
    });
  });
});

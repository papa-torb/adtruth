import { parseUrlParams, getCurrentUrl, getReferrer } from '../../src/utils/url';

describe('URL Utilities', () => {
  describe('parseUrlParams', () => {
    it('should extract UTM parameters from URL', () => {
      const url = 'https://example.com/?utm_source=google&utm_medium=cpc&utm_campaign=summer';
      const params = parseUrlParams(url);

      expect(params).toEqual({
        utm_source: 'google',
        utm_medium: 'cpc',
        utm_campaign: 'summer'
      });
    });

    it('should extract all UTM parameters when present', () => {
      const url = 'https://example.com/?utm_source=facebook&utm_medium=social&utm_campaign=spring&utm_term=shoes&utm_content=blue';
      const params = parseUrlParams(url);

      expect(params).toEqual({
        utm_source: 'facebook',
        utm_medium: 'social',
        utm_campaign: 'spring',
        utm_term: 'shoes',
        utm_content: 'blue'
      });
    });

    it('should extract gclid parameter', () => {
      const url = 'https://example.com/?gclid=abc123xyz';
      const params = parseUrlParams(url);

      expect(params).toEqual({
        gclid: 'abc123xyz'
      });
    });

    it('should extract fbclid parameter', () => {
      const url = 'https://example.com/?fbclid=def456uvw';
      const params = parseUrlParams(url);

      expect(params).toEqual({
        fbclid: 'def456uvw'
      });
    });

    it('should extract both UTM and click ID parameters', () => {
      const url = 'https://example.com/?utm_source=google&utm_campaign=test&gclid=123&fbclid=456';
      const params = parseUrlParams(url);

      expect(params).toEqual({
        utm_source: 'google',
        utm_campaign: 'test',
        gclid: '123',
        fbclid: '456'
      });
    });

    it('should return empty object for URL without parameters', () => {
      const url = 'https://example.com/';
      const params = parseUrlParams(url);

      expect(params).toEqual({});
    });

    it('should ignore non-UTM parameters', () => {
      const url = 'https://example.com/?utm_source=google&other_param=value&random=123';
      const params = parseUrlParams(url);

      expect(params).toEqual({
        utm_source: 'google'
      });
    });

    it('should handle URL with hash fragment', () => {
      const url = 'https://example.com/?utm_source=twitter#section';
      const params = parseUrlParams(url);

      expect(params).toEqual({
        utm_source: 'twitter'
      });
    });

    it('should handle encoded URL parameters', () => {
      const url = 'https://example.com/?utm_source=google&utm_campaign=test%20campaign';
      const params = parseUrlParams(url);

      expect(params).toEqual({
        utm_source: 'google',
        utm_campaign: 'test campaign'
      });
    });

    it('should handle invalid URL gracefully', () => {
      const url = 'not-a-valid-url';
      const params = parseUrlParams(url);

      expect(params).toEqual({});
    });

    it('should handle malformed URL gracefully', () => {
      const url = 'https://[::1]:80/path?utm_source=test';
      // This might throw in some environments, should handle gracefully
      const params = parseUrlParams(url);

      // Should not throw and return object (empty or with params)
      expect(typeof params).toBe('object');
    });
  });

  describe('getCurrentUrl', () => {
    it('should return current window location href', () => {
      // Set up window.location.href mock
      delete window.location;
      window.location = { href: 'https://test.example.com/page' };

      const url = getCurrentUrl();

      expect(url).toBe('https://test.example.com/page');
    });

    it('should reflect changes to window location', () => {
      window.location = { href: 'https://example.com/page1' };
      expect(getCurrentUrl()).toBe('https://example.com/page1');

      window.location = { href: 'https://example.com/page2' };
      expect(getCurrentUrl()).toBe('https://example.com/page2');
    });
  });

  describe('getReferrer', () => {
    it('should return document referrer', () => {
      // Mock document.referrer
      Object.defineProperty(document, 'referrer', {
        value: 'https://google.com',
        configurable: true
      });

      const referrer = getReferrer();

      expect(referrer).toBe('https://google.com');
    });

    it('should return empty string when no referrer', () => {
      Object.defineProperty(document, 'referrer', {
        value: '',
        configurable: true
      });

      const referrer = getReferrer();

      expect(referrer).toBe('');
    });

    it('should handle undefined referrer', () => {
      Object.defineProperty(document, 'referrer', {
        value: undefined,
        configurable: true
      });

      const referrer = getReferrer();

      expect(referrer).toBe('');
    });
  });
});

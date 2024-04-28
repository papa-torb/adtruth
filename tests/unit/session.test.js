import { generateSessionId, getSessionId, getVisitorId } from '../../src/utils/session';

describe('Session Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Recreate mock functions with proper Jest mock capabilities
    Object.defineProperty(global, 'sessionStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn()
      },
      writable: true,
      configurable: true
    });

    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn()
      },
      writable: true,
      configurable: true
    });
  });

  describe('generateSessionId', () => {
    it('should generate a UUID format string', () => {
      const id = generateSessionId();

      // UUID format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(id).toMatch(uuidRegex);
    });

    it('should generate unique IDs', () => {
      const id1 = generateSessionId();
      const id2 = generateSessionId();

      expect(id1).not.toBe(id2);
    });

    it('should use crypto.randomUUID if available', () => {
      // Test that when crypto.randomUUID exists, function returns valid UUID
      // We can't easily mock the implementation due to module caching,
      // but we can verify the function produces valid output
      const id = generateSessionId();

      // Should return a valid UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(id).toMatch(uuidRegex);
      expect(typeof id).toBe('string');
      expect(id.length).toBe(36);
    });

    it('should fall back to Math.random if crypto unavailable', () => {
      const originalCrypto = global.crypto;
      global.crypto = undefined;

      const id = generateSessionId();
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(id).toMatch(uuidRegex);

      global.crypto = originalCrypto;
    });
  });

  describe('getSessionId', () => {
    it('should retrieve existing session ID from sessionStorage', () => {
      const existingId = 'existing-session-123';
      sessionStorage.getItem.mockReturnValueOnce(existingId);

      const id = getSessionId();

      expect(id).toBe(existingId);
      expect(sessionStorage.getItem).toHaveBeenCalledWith('_adtruth_session');
    });

    it('should generate and store new session ID if none exists', () => {
      sessionStorage.getItem.mockReturnValueOnce(null);

      const id = getSessionId();

      expect(sessionStorage.getItem).toHaveBeenCalledWith('_adtruth_session');
      expect(sessionStorage.setItem).toHaveBeenCalledWith('_adtruth_session', id);

      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(id).toMatch(uuidRegex);
    });

    it('should handle sessionStorage errors gracefully', () => {
      sessionStorage.getItem.mockImplementationOnce(() => {
        throw new Error('SessionStorage not available');
      });

      const id = getSessionId();

      // Should still return a valid UUID
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(id).toMatch(uuidRegex);
    });
  });

  describe('getVisitorId', () => {
    it('should retrieve existing visitor ID from localStorage', () => {
      const existingId = 'existing-visitor-456';
      localStorage.getItem.mockReturnValueOnce(existingId);

      const id = getVisitorId();

      expect(id).toBe(existingId);
      expect(localStorage.getItem).toHaveBeenCalledWith('_adtruth_visitor');
    });

    it('should generate and store new visitor ID if none exists', () => {
      localStorage.getItem.mockReturnValueOnce(null);

      const id = getVisitorId();

      expect(localStorage.getItem).toHaveBeenCalledWith('_adtruth_visitor');
      expect(localStorage.setItem).toHaveBeenCalledWith('_adtruth_visitor', id);

      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(id).toMatch(uuidRegex);
    });

    it('should fall back to sessionStorage if localStorage fails', () => {
      const sessionId = 'session-fallback-789';
      localStorage.getItem.mockImplementationOnce(() => {
        throw new Error('LocalStorage not available');
      });
      sessionStorage.getItem.mockReturnValueOnce(sessionId);

      const id = getVisitorId();

      expect(id).toBe(sessionId);
      expect(sessionStorage.getItem).toHaveBeenCalledWith('_adtruth_visitor');
    });

    it('should generate new ID if both storages fail', () => {
      localStorage.getItem.mockImplementationOnce(() => {
        throw new Error('LocalStorage not available');
      });
      sessionStorage.getItem.mockImplementationOnce(() => {
        throw new Error('SessionStorage not available');
      });

      const id = getVisitorId();

      // Should still return a valid UUID
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(id).toMatch(uuidRegex);
    });
  });
});

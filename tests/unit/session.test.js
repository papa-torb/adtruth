import { generateSessionId, getSessionId, getVisitorId } from '../../src/utils/session';

describe('Session Utilities', () => {
  beforeEach(() => {
    // Clear mocks before each test
    localStorage.clear();
    sessionStorage.clear();
    jest.clearAllMocks();
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
      const mockUUID = '550e8400-e29b-41d4-a716-446655440000';
      global.crypto = {
        randomUUID: jest.fn(() => mockUUID)
      };

      const id = generateSessionId();
      expect(id).toBe(mockUUID);
      expect(global.crypto.randomUUID).toHaveBeenCalled();
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
      sessionStorage.getItem.mockReturnValue(existingId);

      const id = getSessionId();

      expect(id).toBe(existingId);
      expect(sessionStorage.getItem).toHaveBeenCalledWith('_adtruth_session');
    });

    it('should generate and store new session ID if none exists', () => {
      sessionStorage.getItem.mockReturnValue(null);

      const id = getSessionId();

      expect(sessionStorage.getItem).toHaveBeenCalledWith('_adtruth_session');
      expect(sessionStorage.setItem).toHaveBeenCalledWith('_adtruth_session', id);

      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(id).toMatch(uuidRegex);
    });

    it('should handle sessionStorage errors gracefully', () => {
      sessionStorage.getItem.mockImplementation(() => {
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
      localStorage.getItem.mockReturnValue(existingId);

      const id = getVisitorId();

      expect(id).toBe(existingId);
      expect(localStorage.getItem).toHaveBeenCalledWith('_adtruth_visitor');
    });

    it('should generate and store new visitor ID if none exists', () => {
      localStorage.getItem.mockReturnValue(null);

      const id = getVisitorId();

      expect(localStorage.getItem).toHaveBeenCalledWith('_adtruth_visitor');
      expect(localStorage.setItem).toHaveBeenCalledWith('_adtruth_visitor', id);

      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(id).toMatch(uuidRegex);
    });

    it('should fall back to sessionStorage if localStorage fails', () => {
      const sessionId = 'session-fallback-789';
      localStorage.getItem.mockImplementation(() => {
        throw new Error('LocalStorage not available');
      });
      sessionStorage.getItem.mockReturnValue(sessionId);

      const id = getVisitorId();

      expect(id).toBe(sessionId);
      expect(sessionStorage.getItem).toHaveBeenCalledWith('_adtruth_visitor');
    });

    it('should generate new ID if both storages fail', () => {
      localStorage.getItem.mockImplementation(() => {
        throw new Error('LocalStorage not available');
      });
      sessionStorage.getItem.mockImplementation(() => {
        throw new Error('SessionStorage not available');
      });

      const id = getVisitorId();

      // Should still return a valid UUID
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(id).toMatch(uuidRegex);
    });
  });
});

// Jest setup file
// This file runs before all tests

// Mock browser APIs that may not exist in jsdom
global.navigator = {
  ...global.navigator,
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  language: 'en-US',
  languages: ['en-US', 'en'],
  platform: 'Win32',
  hardwareConcurrency: 8,
  maxTouchPoints: 0,
  vendor: 'Google Inc.',
  vendorSub: '',
  cookieEnabled: true,
  doNotTrack: null,
  appName: 'Netscape',
  appVersion: '5.0'
};

// Mock screen
global.screen = {
  width: 1920,
  height: 1080,
  availWidth: 1920,
  availHeight: 1040,
  colorDepth: 24,
  pixelDepth: 24,
  orientation: {
    type: 'landscape-primary',
    angle: 0
  }
};

// Mock localStorage
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

// Mock sessionStorage
global.sessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

// Mock canvas for fingerprinting tests
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  fillStyle: '',
  fillRect: jest.fn(),
  fillText: jest.fn(),
  getImageData: jest.fn(() => ({
    data: new Uint8ClampedArray(4)
  }))
}));

HTMLCanvasElement.prototype.toDataURL = jest.fn(() => 'data:image/png;base64,mock');

// Suppress console errors during tests (optional)
// global.console.error = jest.fn();

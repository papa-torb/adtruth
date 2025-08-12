import { BehaviorTracker } from '../../src/utils/behavior';

describe('BehaviorTracker', () => {
  let tracker;

  beforeEach(() => {
    // Reset DOM and create fresh tracker
    document.body.innerHTML = '';
    tracker = new BehaviorTracker();
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    if (tracker) {
      tracker.cleanup();
    }
    jest.useRealTimers();
  });

  describe('initialization', () => {
    it('should initialize with default values', () => {
      expect(tracker.pageLoadTime).toBeDefined();
      expect(tracker.firstInteractionTime).toBeNull();
      expect(tracker.clickCount).toBe(0);
      expect(tracker.maxScrollDepth).toBe(0);
      expect(tracker.mouseMovementDetected).toBe(false);
    });

    it('should set up event listeners', () => {
      const addEventListenerSpy = jest.spyOn(document, 'addEventListener');

      const newTracker = new BehaviorTracker();

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'click',
        expect.any(Function),
        expect.any(Object)
      );
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
        expect.any(Object)
      );
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'mousemove',
        expect.any(Function),
        expect.any(Object)
      );

      newTracker.cleanup();
      addEventListenerSpy.mockRestore();
    });
  });

  describe('click tracking', () => {
    it('should increment click count on click', () => {
      document.dispatchEvent(new Event('click'));

      expect(tracker.clickCount).toBe(1);
    });

    it('should record multiple clicks', () => {
      document.dispatchEvent(new Event('click'));
      document.dispatchEvent(new Event('click'));
      document.dispatchEvent(new Event('click'));

      expect(tracker.clickCount).toBe(3);
      expect(tracker.clickTimes).toHaveLength(3);
    });

    it('should limit click times array to 20 items', () => {
      for (let i = 0; i < 25; i++) {
        document.dispatchEvent(new Event('click'));
      }

      expect(tracker.clickTimes).toHaveLength(20);
      expect(tracker.clickCount).toBe(25);
    });

    it('should update last interaction time on click', () => {
      const beforeClick = Date.now();
      document.dispatchEvent(new Event('click'));

      expect(tracker.lastInteractionTime).toBeGreaterThanOrEqual(beforeClick);
    });
  });

  describe('scroll tracking', () => {
    it('should track scroll events', () => {
      document.dispatchEvent(new Event('scroll'));
      document.dispatchEvent(new Event('scroll'));

      expect(tracker.scrollEvents).toBe(2);
    });

    it('should update max scroll depth', () => {
      // Mock window dimensions for scroll calculation
      Object.defineProperty(window, 'innerHeight', { value: 1000, configurable: true });
      Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, configurable: true });
      Object.defineProperty(window, 'pageYOffset', { value: 500, configurable: true });

      document.dispatchEvent(new Event('scroll'));

      // Expected: (500 + 1000) / 2000 = 0.75
      expect(tracker.maxScrollDepth).toBeCloseTo(0.75, 2);
    });

    it('should only update max scroll depth when increasing', () => {
      Object.defineProperty(window, 'innerHeight', { value: 1000, configurable: true });
      Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, configurable: true });

      // Scroll to 75%
      Object.defineProperty(window, 'pageYOffset', { value: 500, configurable: true });
      document.dispatchEvent(new Event('scroll'));
      expect(tracker.maxScrollDepth).toBeCloseTo(0.75, 2);

      // Scroll back to 50%
      Object.defineProperty(window, 'pageYOffset', { value: 0, configurable: true });
      document.dispatchEvent(new Event('scroll'));

      // Should still be 75%
      expect(tracker.maxScrollDepth).toBeCloseTo(0.75, 2);
    });
  });

  describe('mouse tracking', () => {
    it('should detect mouse movement', () => {
      const mouseEvent = new MouseEvent('mousemove', { clientX: 100, clientY: 200 });
      document.dispatchEvent(mouseEvent);

      expect(tracker.mouseMovementDetected).toBe(true);
    });

    it('should sample mouse positions every 100ms', () => {
      const event1 = new MouseEvent('mousemove', { clientX: 100, clientY: 100 });
      const event2 = new MouseEvent('mousemove', { clientX: 200, clientY: 200 });
      const event3 = new MouseEvent('mousemove', { clientX: 300, clientY: 300 });

      document.dispatchEvent(event1);
      jest.advanceTimersByTime(50);
      document.dispatchEvent(event2); // Should be ignored (< 100ms)
      jest.advanceTimersByTime(60);
      document.dispatchEvent(event3); // Should be recorded (> 100ms total)

      expect(tracker.mouseSamples).toHaveLength(2);
      expect(tracker.mouseSamples[0]).toMatchObject({ x: 100, y: 100 });
      expect(tracker.mouseSamples[1]).toMatchObject({ x: 300, y: 300 });
    });

    it('should limit mouse samples to 50 items', () => {
      for (let i = 0; i < 60; i++) {
        const event = new MouseEvent('mousemove', { clientX: i, clientY: i });
        document.dispatchEvent(event);
        jest.advanceTimersByTime(100);
      }

      expect(tracker.mouseSamples).toHaveLength(50);
    });
  });

  describe('touch tracking', () => {
    it('should track touch start', () => {
      const touch = { clientX: 100, clientY: 200 };
      const touchEvent = new TouchEvent('touchstart', {
        touches: [touch]
      });

      document.dispatchEvent(touchEvent);

      expect(tracker.touchStartPos).toEqual({ x: 100, y: 200 });
      expect(tracker.tapTimes).toHaveLength(1);
    });

    it('should detect taps (short duration, minimal movement)', () => {
      const startTouch = { clientX: 100, clientY: 100 };
      const endTouch = { clientX: 102, clientY: 102 };

      const startEvent = new TouchEvent('touchstart', { touches: [startTouch] });
      document.dispatchEvent(startEvent);

      jest.advanceTimersByTime(200); // Less than 300ms

      const endEvent = new TouchEvent('touchend', { changedTouches: [endTouch] });
      document.dispatchEvent(endEvent);

      expect(tracker.tapCount).toBe(1);
    });

    it('should detect swipes (significant movement)', () => {
      const startTouch = { clientX: 100, clientY: 100 };
      const endTouch = { clientX: 200, clientY: 100 };

      const startEvent = new TouchEvent('touchstart', { touches: [startTouch] });
      document.dispatchEvent(startEvent);

      jest.advanceTimersByTime(100);

      const endEvent = new TouchEvent('touchend', { changedTouches: [endTouch] });
      document.dispatchEvent(endEvent);

      expect(tracker.swipeDetected).toBe(true);
    });

    it('should not count swipe as tap', () => {
      const startTouch = { clientX: 100, clientY: 100 };
      const endTouch = { clientX: 200, clientY: 100 };

      const startEvent = new TouchEvent('touchstart', { touches: [startTouch] });
      document.dispatchEvent(startEvent);

      jest.advanceTimersByTime(200);

      const endEvent = new TouchEvent('touchend', { changedTouches: [endTouch] });
      document.dispatchEvent(endEvent);

      expect(tracker.tapCount).toBe(0);
      expect(tracker.swipeDetected).toBe(true);
    });
  });

  describe('calculateAvgInterval', () => {
    it('should return null with less than 2 clicks', () => {
      expect(tracker.calculateAvgInterval()).toBeNull();

      document.dispatchEvent(new Event('click'));
      expect(tracker.calculateAvgInterval()).toBeNull();
    });

    it('should calculate average interval between clicks', () => {
      document.dispatchEvent(new Event('click'));
      jest.advanceTimersByTime(1000);
      document.dispatchEvent(new Event('click'));
      jest.advanceTimersByTime(1000);
      document.dispatchEvent(new Event('click'));

      const avg = tracker.calculateAvgInterval();
      expect(avg).toBeCloseTo(1000, -2); // Within 100ms
    });
  });

  describe('analyzeMousePatterns', () => {
    it('should return null with insufficient samples', () => {
      const patterns = tracker.analyzeMousePatterns();
      expect(patterns).toBeNull();
    });

    it('should analyze mouse patterns with sufficient samples', () => {
      // Simulate natural mouse movement
      for (let i = 0; i < 10; i++) {
        const event = new MouseEvent('mousemove', {
          clientX: i * 10,
          clientY: i * 10 + Math.random() * 5
        });
        document.dispatchEvent(event);
        jest.advanceTimersByTime(100);
      }

      const patterns = tracker.analyzeMousePatterns();

      expect(patterns).toHaveProperty('avgVelocity');
      expect(patterns).toHaveProperty('velocityVariance');
      expect(patterns).toHaveProperty('avgAngleChange');
      expect(patterns).toHaveProperty('sampleCount');
      expect(patterns).toHaveProperty('hasHumanPatterns');
      expect(patterns.sampleCount).toBeGreaterThan(0);
    });
  });

  describe('getMetrics', () => {
    it('should return all behavioral metrics', () => {
      const metrics = tracker.getMetrics();

      expect(metrics).toHaveProperty('timeOnPage');
      expect(metrics).toHaveProperty('timeToFirstInteraction');
      expect(metrics).toHaveProperty('clickCount');
      expect(metrics).toHaveProperty('scrollDepth');
      expect(metrics).toHaveProperty('mouseMovementDetected');
      expect(metrics).toHaveProperty('mousePatterns');
      expect(metrics).toHaveProperty('touchPatterns');
    });

    it('should calculate time on page', () => {
      jest.advanceTimersByTime(5000);
      const metrics = tracker.getMetrics();

      expect(metrics.timeOnPage).toBeGreaterThanOrEqual(5000);
    });

    it('should track time to first interaction', () => {
      jest.advanceTimersByTime(1000);
      document.dispatchEvent(new Event('click'));

      const metrics = tracker.getMetrics();

      expect(metrics.timeToFirstInteraction).toBeGreaterThanOrEqual(1000);
      expect(metrics.hasInteracted).toBe(true);
    });

    it('should return null for timeToFirstInteraction if no interaction', () => {
      const metrics = tracker.getMetrics();

      expect(metrics.timeToFirstInteraction).toBeNull();
      expect(metrics.hasInteracted).toBe(false);
    });

    it('should round scroll depth to 2 decimals', () => {
      Object.defineProperty(window, 'innerHeight', { value: 1000, configurable: true });
      Object.defineProperty(document.documentElement, 'scrollHeight', { value: 3000, configurable: true });
      Object.defineProperty(window, 'pageYOffset', { value: 333, configurable: true });

      document.dispatchEvent(new Event('scroll'));
      const metrics = tracker.getMetrics();

      expect(metrics.scrollDepth.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
    });
  });
});

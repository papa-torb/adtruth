# AdTruth Architecture

System design and architecture documentation for the AdTruth fraud detection SDK.

## Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Data Flow](#data-flow)
- [Module Design](#module-design)
- [Fraud Detection Pipeline](#fraud-detection-pipeline)
- [Storage Strategy](#storage-strategy)
- [API Communication](#api-communication)
- [Security Considerations](#security-considerations)
- [Performance Optimizations](#performance-optimizations)
- [Future Architecture](#future-architecture)

---

## Overview

AdTruth is a client-side fraud detection SDK that collects behavioral and technical data to identify bot traffic and click fraud. The system follows a modular, event-driven architecture optimized for minimal performance impact.

### Design Goals

1. **Minimal footprint**: < 15KB minified
2. **Non-blocking**: Async data collection
3. **Privacy-first**: No PII collection
4. **Resilient**: Graceful error handling
5. **Extensible**: Easy to add new detection methods

### Technology Stack

- **Language**: ES6+ JavaScript
- **Build**: Rollup (module bundler)
- **Minification**: Terser
- **Format**: IIFE (browser), ES Modules (bundlers)
- **Browser APIs**: Canvas, Storage, Fetch

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User's Website                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ <script> tag
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   AdTruth SDK (Client)                       │
│  ┌────────────┐  ┌───────────────┐  ┌──────────────────┐   │
│  │   Public   │  │   Tracking    │  │   Behavior       │   │
│  │    API     │→ │     Core      │→ │   Trackers       │   │
│  └────────────┘  └───────────────┘  └──────────────────┘   │
│                            │                                 │
│                            ▼                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │            Fingerprinting Engine                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                            │                                 │
│                            ▼                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Data Aggregation & Transmission              │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS POST
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Backend API (FastAPI)                      │
│  ┌────────────┐  ┌───────────────┐  ┌──────────────────┐   │
│  │   Auth     │→ │  Fraud        │→ │   Database       │   │
│  │   Layer    │  │  Detection    │  │   (Supabase)     │   │
│  └────────────┘  └───────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Component Layers

**Layer 1: Public API** (`src/index.js`)
- User-facing methods
- Error boundaries
- Auto-initialization

**Layer 2: Core Tracking** (`src/core/`)
- Session management
- Event coordination
- Data aggregation

**Layer 3: Data Collection** (`src/fingerprint/`, `src/behavior/`)
- Browser fingerprinting
- Behavioral tracking
- Device detection

**Layer 4: Utilities** (`src/utils/`)
- Hashing functions
- Storage management
- URL parsing

---

## Data Flow

### Initialization Flow

```
User calls AdTruth.init()
         │
         ▼
   Validate API key
         │
         ▼
Generate session/visitor IDs
         │
         ▼
  Create fingerprint
         │
         ▼
 Attach event listeners
    (mouse, touch, scroll)
         │
         ▼
   Track initial pageview
         │
         ▼
  Start behavior monitoring
```

### Event Collection Flow

```
User interacts with page
         │
         ▼
  Event listener fires
         │
         ▼
  Update behavior metrics
    (debounced, throttled)
         │
         ▼
  Store in memory buffer
         │
         ▼
  Page unload detected
         │
         ▼
 Aggregate all metrics
         │
         ▼
 Send to API (fetch + keepalive)
         │
         ▼
  Clear session data
```

### Tracking Event Data Structure

```javascript
{
  // Identity
  session_id: "uuid",
  visitor_id: "uuid",
  api_key: "string",

  // Page Info
  url: "https://example.com/page",
  referrer: "https://google.com",
  title: "Page Title",

  // Campaign Data
  utm_source: "google",
  utm_medium: "cpc",
  utm_campaign: "summer-sale",
  // ... other UTM params

  // Fingerprint
  fingerprint: "hash",
  canvas_fingerprint: "hash",

  // Device
  screen_width: 1920,
  screen_height: 1080,
  timezone: "America/New_York",
  language: "en-US",
  platform: "MacIntel",

  // Behavior
  behavior_metrics: {
    mouse_moves: 145,
    mouse_velocity_avg: 234.5,
    clicks: 3,
    scroll_depth: 85,
    time_on_page: 45.2,
    touch_events: 0,
    // ... more metrics
  },

  // Timestamps
  page_loaded_at: "2024-11-09T13:35:00Z",
  created_at: "2024-11-09T13:35:45Z"
}
```

---

## Module Design

### Core Modules

#### 1. Tracker (`src/core/tracker.js`)

**Responsibility**: Central coordinator for all tracking activities

```javascript
class Tracker {
  init(apiKey, options)      // Initialize SDK
  track(eventType)           // Send tracking event
  setupEventListeners()      // Attach listeners
  sendData(data)             // Transmit to API
}
```

**Key Design Decisions**:
- Singleton pattern (one instance per page)
- Error boundaries around all public methods
- 5-second timeout for API calls

#### 2. Session Manager (`src/core/session.js`)

**Responsibility**: Manage user session and visitor identification

```javascript
function getSessionId()      // Current session
function getVisitorId()      // Persistent visitor
function generateId()        // Create UUID
```

**Storage Strategy**:
- Session ID: `sessionStorage` (expires on tab close)
- Visitor ID: `localStorage` (persistent)
- Fallback: In-memory if storage unavailable

#### 3. Fingerprinting (`src/fingerprint/`)

**Basic Fingerprint** (`basic.js`):
- Screen resolution
- Timezone offset
- Language preferences
- Platform/OS
- Hardware concurrency
- Device memory

**Canvas Fingerprint** (`canvas.js`):
- Render text to canvas
- Extract pixel data
- Hash to unique string
- ~99.5% unique across devices

**Design Pattern**:
```javascript
export function generateFingerprint() {
  const components = [
    getScreenResolution(),
    getTimezone(),
    getLanguage(),
    getPlatform()
  ];
  return hashComponents(components);
}
```

#### 4. Behavior Tracking (`src/behavior/`)

**Mouse Tracking** (`mouse.js`):
- Movement coordinates
- Velocity calculation
- Movement patterns
- Click locations

**Touch Tracking** (`touch.js`):
- Touch events (mobile)
- Swipe gestures
- Multi-touch detection

**Scroll Tracking** (`scroll.js`):
- Scroll depth percentage
- Scroll velocity
- Scroll patterns

**Event Optimization**:
- Throttle: Mouse moves (100ms)
- Debounce: Scroll events (250ms)
- RequestAnimationFrame: Smooth tracking

---

## Fraud Detection Pipeline

### Client-Side Detection (Minimal)

The SDK focuses on **data collection**, not detection. Minimal client-side checks:

1. **Basic Bot UA Detection**: Check for obvious bot user agents
2. **Missing Features**: Detect headless browsers
3. **Impossible Values**: Screen 0x0, negative velocities

### Server-Side Detection (Primary)

Backend API performs comprehensive fraud analysis:

```
Receive tracking data
       │
       ▼
Extract fraud signals (17+)
       │
       ├─ Bot user agent patterns
       ├─ Behavioral anomalies
       ├─ Device fingerprint analysis
       ├─ Mouse/touch patterns
       └─ Time-based signals
       │
       ▼
Calculate fraud score (0-1)
       │
       ▼
Assign fraud risk (low/medium/high)
       │
       ▼
Store with page view record
```

**Why Server-Side?**
- Can't be bypassed by bots
- Access to historical data
- ML model complexity
- Centralized logic updates

---

## Storage Strategy

### SessionStorage

**Purpose**: Temporary session data

```javascript
sessionStorage.setItem('adtruth_session_id', uuid);
```

**Lifetime**: Until tab closes

**Data Stored**:
- Session ID
- Temporary metrics buffer

### LocalStorage

**Purpose**: Persistent visitor tracking

```javascript
localStorage.setItem('adtruth_visitor_id', uuid);
```

**Lifetime**: Indefinite (unless cleared)

**Data Stored**:
- Visitor ID
- First visit timestamp

### Memory Fallback

If storage unavailable (private mode, disabled):

```javascript
const memoryStorage = {
  sessionId: null,
  visitorId: null
};
```

**Limitation**: Lost on page refresh

---

## API Communication

### Endpoint

```
POST https://api.adtruth.io/track/
```

### Request Format

**Headers**:
```
X-API-Key: user_api_key_here
Content-Type: application/json
```

**Body**: JSON tracking event (see Data Flow section)

### Transmission Strategy

**On Page Load**: Send initial pageview immediately

**On Page Unload**: Send final metrics with all behavior data

**Method**: `fetch()` with `keepalive: true`

```javascript
fetch(API_ENDPOINT, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': apiKey
  },
  body: JSON.stringify(data),
  keepalive: true  // Important for unload events
});
```

**Why not sendBeacon?**
- CORS limitations
- No custom headers support
- Less control over requests

### Error Handling

```javascript
try {
  const response = await fetch(API_ENDPOINT, config);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
} catch (error) {
  console.error('Tracking failed:', error);
  // Silent failure - don't break user's site
}
```

**Philosophy**: Never break the website, even if tracking fails

---

## Security Considerations

### API Key Protection

**Not Sensitive**: API keys are public (visible in client code)

**Why It's OK**:
- Read-only for client
- Rate limited by backend
- Tied to specific domain

**Best Practice**: Still don't commit to public repos

### Data Privacy

**No PII Collected**:
- No names, emails, phone numbers
- No credit card data
- No precise geolocation
- No browsing history

**GDPR/CCPA Compliant**:
- Behavioral data only
- Anonymous fingerprints
- No cross-site tracking

### XSS Prevention

**Input Validation**:
```javascript
function sanitizeUrl(url) {
  try {
    return new URL(url).href;  // Validates URL format
  } catch {
    return '';
  }
}
```

**Output Encoding**: All data sent as JSON (auto-encoded)

---

## Performance Optimizations

### Bundle Size

**Current**: 12KB minified (well under 15KB target)

**Techniques**:
- Tree shaking (Rollup)
- Terser minification
- No external dependencies
- Minimal polyfills

### Runtime Performance

**Non-Blocking**:
- Async initialization
- Background data collection
- No synchronous XHR

**Event Optimization**:
```javascript
// Throttle: Limit execution frequency
const throttledMouseMove = throttle(handleMouseMove, 100);

// Debounce: Wait for inactivity
const debouncedScroll = debounce(handleScroll, 250);
```

**Memory Management**:
- Clear old data on page unload
- Limit event buffer size
- Use weak references where possible

### Network Optimization

**Single Request**: Aggregate all data into one POST

**Compression**: Let browser handle gzip/brotli

**CDN**: jsDelivr for fast global delivery

---

## Future Architecture

### Planned Enhancements

**1. Batch Processing** (v0.3.0)
```
Event buffer → Batch every 30s → Send aggregate
```

**2. Retry Logic** (v0.3.0)
```javascript
async function sendWithRetry(data, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await send(data);
    } catch (error) {
      if (i === retries - 1) throw error;
      await delay(1000 * Math.pow(2, i));
    }
  }
}
```

**3. WebGL Fingerprinting** (v0.3.0)
- More unique than canvas
- Better bot detection
- Higher computational cost

**4. Web Workers** (v1.0.0)
```
Main Thread → Pass data → Worker → Process → Return
```
Benefits: No UI blocking, better performance

**5. TypeScript Definitions** (v0.3.0)
```typescript
interface AdTruthConfig {
  debug?: boolean;
  endpoint?: string;
}

declare const AdTruth: {
  init(apiKey: string, options?: AdTruthConfig): void;
  trackPageview(): void;
  // ...
};
```

### Scaling Considerations

**Current**: Handles ~1M pageviews/day per site

**Target**: 100M pageviews/day

**Required Changes**:
- Backend horizontal scaling
- Database sharding
- CDN edge caching
- Real-time processing pipeline

---

## Design Principles

1. **Privacy First**: No PII, anonymous by design
2. **Fail Gracefully**: Never break the user's website
3. **Performance Matters**: < 15KB, async, optimized
4. **Extensibility**: Easy to add new detection methods
5. **Transparency**: Open source, auditable code

---

## Related Documentation

- **API Reference**: [API.md](API.md)
- **Development Guide**: [DEVELOPMENT.md](DEVELOPMENT.md)
- **Security Policy**: [../SECURITY.md](../SECURITY.md)
- **Changelog**: [../CHANGELOG.md](../CHANGELOG.md)

---

*Last updated: November 2024*
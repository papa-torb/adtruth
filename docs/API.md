# AdTruth SDK API Reference

Complete reference for the AdTruth JavaScript SDK (v0.2.1).

## Table of Contents

- [Installation](#installation)
- [Initialization](#initialization)
- [Methods](#methods)
- [Configuration Options](#configuration-options)
- [Events](#events)
- [Error Handling](#error-handling)
- [TypeScript Support](#typescript-support)
- [Browser Compatibility](#browser-compatibility)

---

## Installation

### CDN (Recommended)

```html
<script>
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://cdn.jsdelivr.net/gh/papa-torb/adtruth@latest/dist/adtruth.min.js';
    js.onload = function() {
        AdTruth.init('YOUR_API_KEY_HERE');
    };
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'adtruth-js'));
</script>
```

### NPM (Coming Soon)

```bash
npm install adtruth
```

```javascript
import AdTruth from 'adtruth';
AdTruth.init('YOUR_API_KEY_HERE');
```

---

## Initialization

### `AdTruth.init(apiKey, options)`

Initialize the AdTruth SDK with your API key.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiKey` | `string` | Yes | Your AdTruth API key from [adtruth.io](https://adtruth.io) |
| `options` | `object` | No | Configuration options (see below) |

**Example:**

```javascript
// Basic initialization
AdTruth.init('your_api_key_here');

// With options
AdTruth.init('your_api_key_here', {
  debug: true,
  endpoint: 'https://api.adtruth.io'
});
```

**Auto-initialization:**

You can also use the `data-adtruth-api-key` attribute for automatic initialization:

```html
<script
  src="https://cdn.jsdelivr.net/gh/papa-torb/adtruth@latest/dist/adtruth.min.js"
  data-adtruth-api-key="your_api_key_here"
  data-adtruth-debug="false">
</script>
```

---

## Methods

### `AdTruth.trackPageview()`

Manually track a pageview. Normally pageviews are tracked automatically on page load.

**Returns:** `void`

**Example:**

```javascript
// Track a pageview for single-page applications
window.addEventListener('popstate', () => {
  AdTruth.trackPageview();
});
```

**When to use:**
- Single-page applications (SPAs) when route changes
- After dynamic content loads
- Manual tracking requirements

---

### `AdTruth.track(eventName, data)`

Track a custom event (future feature).

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `eventName` | `string` | Yes | Name of the event to track |
| `data` | `object` | No | Additional event data |

**Returns:** `void`

**Example:**

```javascript
// Future use - currently tracks as pageview
AdTruth.track('button_click', {
  button: 'signup',
  location: 'header'
});
```

**Note:** Custom events are planned for v0.3.0. Currently, all events are tracked as pageviews.

---

### `AdTruth.getMetrics()`

Get current tracking metrics (debug only).

**Returns:** `object`

```javascript
{
  behavior: {
    clicks: number,
    mouseMoves: number,
    scrollDepth: number,
    timeOnPage: number,
    // ... other metrics
  },
  fingerprint: string,
  canvasFingerprint: string
}
```

**Example:**

```javascript
// View current metrics in console
console.log(AdTruth.getMetrics());
```

**Use cases:**
- Debugging integration issues
- Verifying data collection
- Testing behavioral tracking

**Security note:** Do not expose this data to end users. For development/debugging only.

---

### `AdTruth.version`

Get the current SDK version.

**Type:** `string`

**Example:**

```javascript
console.log(AdTruth.version); // "0.2.1"
```

---

## Configuration Options

Configure AdTruth behavior during initialization.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `debug` | `boolean` | `false` | Enable console logging for debugging |
| `endpoint` | `string` | `'https://api.adtruth.io'` | Custom API endpoint (advanced) |

**Example:**

```javascript
AdTruth.init('your_api_key', {
  debug: true,  // Enable debug logs
  endpoint: 'https://api.adtruth.io'  // Default endpoint
});
```

### Debug Mode

When `debug: true`:
- Console logs for all tracking events
- Detailed error messages
- Network request logging
- Behavioral metrics in real-time

**Warning:** Never enable debug mode in production. It exposes tracking details and increases console noise.

---

## Events

AdTruth automatically tracks the following events:

### Page Load
Tracked automatically when the SDK initializes.

**Data collected:**
- URL and referrer
- UTM parameters
- Page title
- Timestamp

### User Behavior
Tracked continuously during the session:

**Mouse Events:**
- Mouse movements (velocity, patterns)
- Click events (location, timing)
- Hover duration

**Touch Events (Mobile):**
- Touch gestures
- Swipe patterns
- Tap locations

**Scroll Events:**
- Scroll depth (percentage)
- Scroll speed
- Scroll patterns

### Page Unload
Tracked when user leaves the page.

**Data collected:**
- Total time on page
- Final scroll depth
- Interaction counts

---

## Error Handling

AdTruth handles errors gracefully and never breaks your site.

### Common Errors

**1. Invalid API Key**
```javascript
// Error logged to console:
// "AdTruth: Authentication failed - Invalid API key"
```

**Solution:** Verify your API key at [adtruth.io/dashboard](https://adtruth.io/dashboard)

**2. Network Timeout**
```javascript
// Error logged to console:
// "AdTruth: Network timeout after 5000ms"
```

**Solution:** Check your network connection. Data will be lost (no retry in v0.2.1).

**3. CORS Issues**
```javascript
// Error logged to console:
// "AdTruth: CORS error - check domain whitelist"
```

**Solution:** Ensure your domain is whitelisted in your AdTruth account settings.

### Error Recovery

All errors are caught internally:
- Your site continues to function normally
- Errors are logged to console (if debug mode enabled)
- Failed tracking events are not retried (current behavior)

---

## TypeScript Support

TypeScript definitions coming in v0.3.0.

**Current workaround:**

```typescript
// Declare module to avoid type errors
declare const AdTruth: {
  init: (apiKey: string, options?: { debug?: boolean }) => void;
  trackPageview: () => void;
  track: (eventName: string, data?: any) => void;
  getMetrics: () => object;
  version: string;
};

// Usage
AdTruth.init('your_api_key');
```

---

## Browser Compatibility

AdTruth supports modern browsers:

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 60+ |
| Firefox | 60+ |
| Safari | 12+ |
| Edge | 79+ |
| Opera | 50+ |

**Mobile:**
- iOS Safari 12+
- Chrome for Android 60+
- Samsung Internet 8+

**Not supported:**
- Internet Explorer (all versions)
- Opera Mini
- UC Browser

### Feature Detection

AdTruth uses modern JavaScript (ES6+):
- Promise
- Fetch API
- sessionStorage/localStorage
- Canvas API

**Polyfills:** Not included. If you need legacy browser support, add polyfills before loading AdTruth.

---

## Advanced Usage

### Single-Page Applications (SPA)

Track route changes manually:

```javascript
// React Router example
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    AdTruth.trackPageview();
  }, [location]);
}
```

### Custom Integration

```javascript
// Wait for SDK to load
window.addEventListener('load', function() {
  if (typeof AdTruth !== 'undefined') {
    AdTruth.init('your_api_key');
  } else {
    console.error('AdTruth SDK failed to load');
  }
});
```

### Multiple Websites

Use different API keys for different sites:

```javascript
// Site A
AdTruth.init('site_a_api_key');

// Site B
AdTruth.init('site_b_api_key');
```

**Note:** Calling `init()` multiple times replaces the previous configuration.

---

## Rate Limits

| Action | Limit |
|--------|-------|
| Page views per session | Unlimited |
| Events per minute | 60 |
| API key requests per day | 100,000 |

Exceeding limits results in HTTP 429 responses. Contact support for higher limits.

---

## Security & Privacy

### What AdTruth Collects

- **Behavioral signals**: Mouse/touch patterns, scroll depth
- **Technical data**: Browser, screen resolution, timezone
- **Campaign data**: UTM parameters from ad links

### What AdTruth Does NOT Collect

- Personal information (names, emails, phone numbers)
- Passwords or payment information
- Precise geolocation
- Browsing history outside your site

### GDPR & CCPA Compliance

AdTruth is designed to be compliant by default:
- No personal data collection
- Cookie-less tracking
- User consent not required (behavioral analytics only)

**However:** Always consult your legal team for compliance requirements specific to your business.

---

## Support

- **Documentation**: [github.com/papa-torb/adtruth](https://github.com/papa-torb/adtruth)
- **Issues**: [github.com/papa-torb/adtruth/issues](https://github.com/papa-torb/adtruth/issues)
- **Changelog**: [CHANGELOG.md](../CHANGELOG.md)
- **Security**: [SECURITY.md](../SECURITY.md)

---

## Version History

See [CHANGELOG.md](../CHANGELOG.md) for detailed version history.

**Current Version:** v0.2.1 (July 2024)

---

*Last updated: October 2024*
# AdTruth JavaScript SDK

Lightweight fraud detection SDK for identifying invalid traffic in paid advertising campaigns.

## Quick Start

Add this script to your website:

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

## Features (MVP - Phase 1)

- Automatic pageview tracking
- Session ID generation
- UTM parameter collection
- Browser fingerprinting basics
- Lightweight (< 3KB minified)

## File Structure

```
src/
  ├── index.js          # Main entry point
  ├── core/
  │   └── tracker.js    # Core tracking logic
  └── utils/
      ├── session.js    # Session ID management
      └── url.js        # URL parsing utilities
dist/
  ├── adtruth.js        # Full IIFE build
  ├── adtruth.min.js    # Minified for production
  └── adtruth.esm.js    # ES module build
test/
  └── manual.html       # Manual testing page
examples/
  └── integration.html  # Integration example
```

## API Reference

### `AdTruth.init(apiKey, options)`
Initialize the tracker with your API key.

**Parameters:**
- `apiKey` (string, required): Your AdTruth API key
- `options` (object, optional):
  - `debug` (boolean): Enable debug logging
  - `endpoint` (string): Custom API endpoint (for testing)

### `AdTruth.trackPageview()`
Manually track a pageview (called automatically on init).

### `AdTruth.track(eventName, data)`
Track custom events (future implementation).

## Development

```bash
# Install dependencies
npm install

# Build the SDK
npm run build

# Watch mode for development
npm run dev

# Test locally
open test/manual.html
```

## Data Collected

The SDK collects:
- Page URL, title, and referrer
- UTM parameters (source, medium, campaign, term, content)
- Click IDs (gclid, fbclid)
- Browser information (user agent, language, screen size)
- Session ID (stored in sessionStorage)
- Timestamp

## Privacy & Security

- No cookies are used
- Session data stored in sessionStorage (cleared on browser close)
- All data transmission uses HTTPS
- Fails silently to never break host pages

## Browser Support

- Modern browsers with ES5 support
- Fallbacks for older browsers
- Progressive enhancement approach

## License

MIT License - see LICENSE file for details.
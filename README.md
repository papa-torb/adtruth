<p align="center">
  <img src="docs/github_banner.PNG" alt="AdTruth - Stop Fake Traffic. Start Real Growth." width="600">
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
  <a href="https://cdn.jsdelivr.net/gh/papa-torb/adtruth@v0.1.2/dist/adtruth.min.js"><img src="https://img.shields.io/badge/CDN-jsDelivr-orange" alt="CDN"></a>
</p>

<p align="center">
  Open-source fraud detection SDK that helps small and medium businesses identify fraudulent traffic from paid advertising campaigns.
</p>

**Live Demo**: [adtruth.io](https://adtruth.io)
**Documentation**: [adtruth.io/docs](https://adtruth.io/docs)
**API**: [api.adtruth.io](https://api.adtruth.io)

## Quick Start

Add this script to your website to start detecting fraud:

```html
<script>
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://cdn.jsdelivr.net/gh/papa-torb/adtruth@v0.1.2/dist/adtruth.min.js';
    js.onload = function() {
        AdTruth.init('YOUR_API_KEY_HERE');
    };
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'adtruth-js'));
</script>
```

## Installation

### Via CDN (Recommended)
```html
<script src="https://cdn.jsdelivr.net/gh/papa-torb/adtruth@v0.1.2/dist/adtruth.min.js"></script>
```

## Features

- **Browser Fingerprinting**: Advanced device and browser identification
- **Behavior Analysis**: Track user interactions and patterns
- **Bot Detection**: Identify automated traffic and crawlers
- **UTM Tracking**: Capture and analyze campaign parameters
- **Real-time Data**: Immediate fraud signal detection
- **Privacy-Focused**: GDPR and CCPA compliant
- **Lightweight**: < 15KB minified and gzipped

## Usage

### Basic Initialization
```javascript
AdTruth.init('YOUR_API_KEY_HERE');
```

### With Configuration Options
```javascript
AdTruth.init('YOUR_API_KEY_HERE', {
    trackingEnabled: true,
    sessionTimeout: 30, // minutes
    debug: false,
    apiEndpoint: 'https://api.adtruth.io',
    sampling: 1.0, // 100% of traffic
});
```

### Manual Page View Tracking
```javascript
AdTruth.trackPageView({
    url: window.location.href,
    title: document.title,
    referrer: document.referrer
});
```

### Custom Event Tracking
```javascript
AdTruth.track('purchase', {
    value: 99.99,
    currency: 'USD',
    items: ['product-123']
});
```

## API Reference

### `AdTruth.init(apiKey, options)`
Initializes the AdTruth SDK with your API key.

**Parameters:**
- `apiKey` (string, required): Your AdTruth API key
- `options` (object, optional): Configuration options

**Options:**
- `trackingEnabled` (boolean): Enable/disable tracking (default: true)
- `sessionTimeout` (number): Session timeout in minutes (default: 30)
- `debug` (boolean): Enable debug logging (default: false)
- `apiEndpoint` (string): API endpoint URL
- `sampling` (number): Traffic sampling rate 0-1 (default: 1.0)

### `AdTruth.trackPageView(data)`
Manually track a page view.

### `AdTruth.track(eventName, data)`
Track custom events.

### `AdTruth.identify(userId, traits)`
Identify a user (for logged-in users).

### `AdTruth.reset()`
Reset the current session.

## Fraud Detection Methods

AdTruth uses multiple techniques to detect fraudulent traffic:

1. **Browser Fingerprinting**
   - Canvas fingerprinting
   - WebGL fingerprinting
   - Audio context fingerprinting
   - Font detection

2. **Behavioral Analysis**
   - Mouse movement patterns
   - Click/tap patterns
   - Scroll behavior
   - Time on page

3. **Technical Indicators**
   - User agent analysis
   - IP reputation
   - Timezone mismatches
   - WebDriver detection

4. **Honeypot Traps**
   - Invisible form fields
   - Hidden links
   - Bot trap elements

## Privacy & Compliance

AdTruth is designed with privacy in mind:

- GDPR compliant
- CCPA compliant
- No personal data storage
- Cookie-less tracking available
- Respects Do Not Track headers
- Data encrypted in transit

## Integration Examples

### React
```jsx
import { useEffect } from 'react';

function App() {
    useEffect(() => {
        // Add AdTruth script dynamically
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/papa-torb/adtruth@v0.1.2/dist/adtruth.min.js';
        script.onload = () => {
            window.AdTruth.init('YOUR_API_KEY_HERE');
        };
        document.head.appendChild(script);
    }, []);

    return <div>Your App</div>;
}
```

### Vue.js
```javascript
export default {
    mounted() {
        // Add AdTruth script dynamically
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/papa-torb/adtruth@v0.1.2/dist/adtruth.min.js';
        script.onload = () => {
            window.AdTruth.init('YOUR_API_KEY_HERE');
        };
        document.head.appendChild(script);
    }
}
```

### WordPress
```php
function add_adtruth_script() {
    ?>
    <script>
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = 'https://cdn.jsdelivr.net/gh/papa-torb/adtruth@v0.1.2/dist/adtruth.min.js';
            js.onload = function() {
                AdTruth.init('YOUR_API_KEY_HERE');
            };
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'adtruth-js'));
    </script>
    <?php
}
add_action('wp_head', 'add_adtruth_script');
```

## Testing

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Building from Source

```bash
# Clone the repository
git clone https://github.com/papa-torb/adtruth.git
cd adtruth

# Install dependencies
npm install

# Build for production
npm run build

# Build for development (with watch)
npm run dev
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- [Website](https://adtruth.io)
- [Documentation](https://docs.adtruth.io)
- [API Reference](https://api.adtruth.io/docs)
- [Dashboard](https://adtruth.io/dashboard)
- [Support](https://adtruth.io/support)

## Support

- Email: support@adtruth.io
- Discord: [Join our community](https://discord.gg/adtruth)
- Issues: [GitHub Issues](https://github.com/papa-torb/adtruth/issues)

## Acknowledgments

- Thanks to all contributors who have helped shape AdTruth
- Special thanks to the open-source community
- Built for small and medium businesses

---

**AdTruth** - Protecting your ad spend from fraud
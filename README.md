<p align="center">
  <img src="docs/logos/github_banner.PNG" alt="AdTruth - Stop Fake Traffic. Start Real Growth." width="800">
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
  <a href="https://github.com/papa-torb/adtruth"><img src="https://img.shields.io/github/stars/papa-torb/adtruth?style=social" alt="GitHub Stars"></a>
  <a href="https://github.com/papa-torb/adtruth/commits/main"><img src="https://img.shields.io/github/last-commit/papa-torb/adtruth" alt="Last Commit"></a>
  <br>
  <a href="https://cdn.jsdelivr.net/gh/papa-torb/adtruth@v0.1.2/dist/adtruth.min.js"><img src="https://img.shields.io/badge/CDN-jsDelivr-orange" alt="CDN"></a>
  <a href="https://adtruth.io"><img src="https://img.shields.io/badge/Demo-Live-green" alt="Live Demo"></a>
  <img src="https://img.shields.io/badge/Bundle%20Size-9.6KB-blue" alt="Bundle Size">
</p>

<p align="center">
  <strong>Free ad fraud detection that helps everyone fight back.</strong>
</p>

<p align="center">
  <a href="https://adtruth.io">Live Demo</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#features">Features</a> •
  <a href="#how-were-different">Why AdTruth</a> •
  <a href="#contributing">Contribute</a>
</p>

<p align="center">
  <em>Founded by <a href="https://github.com/papa-torb">Hongyi Shui</a></em>
</p>

---

## Why AdTruth Exists

### The Problem

Your campaigns show 5-10% conversion rates. You optimize daily. **But what if 40% of your traffic is fake?**

AI-powered fraud is now indistinguishable from real users. Bot farms simulate mouse movements, scroll patterns, and form interactions perfectly.

**Enterprise fraud detection costs $5,000-50,000 per month.** SMBs pay for fake clicks without protection.

---

### Why Platforms Won't Fix This

Major advertising platforms profit from every click—real or fake.

Fighting fraud means rejecting traffic and losing billions in revenue. Small businesses get the least protection because you can't demand transparency.

---

### Our Mission: Strength in Numbers

AdTruth is **free forever.** We built a collective defense network where small businesses protect each other.

**How it works:**
- Every website shares anonymized fraud signals
- ML models learn from data across all businesses
- Fraud detected on one site protects every other site
- The network gets smarter as more businesses join

**Stop funding fraud operations. Get the visibility you deserve.**

---

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

**Get your free API key at [adtruth.io](https://adtruth.io)**

---

## How It Works

**1. Install** → Add one line of code to your website (takes 60 seconds)

**2. Collect** → AdTruth automatically tracks visitor behavior and fraud signals

**3. Analyze** → Our ML models identify suspicious patterns in real-time

**4. Protect** → View your fraud analytics dashboard and optimize campaigns

**5. Contribute** → Your anonymized data helps protect the entire network

Zero configuration. No maintenance. Just install and go.

---

## Who Should Use AdTruth

- **E-commerce stores** spending >$1,000/month on ads
- **SaaS companies** with paid acquisition channels
- **Local businesses** advertising on Google/Facebook/Instagram
- **Marketing agencies** managing ad spend for clients
- **Any business** that suspects fraud but can't prove it
- **Developers** who want to contribute to open-source fraud detection

If you're paying for online advertising, you need AdTruth.

---

## How We're Different

| Feature | AdTruth | Enterprise Solutions | Google Analytics |
|---------|---------|---------------------|------------------|
| **Cost** | Free forever | $5,000-50,000/year | Free |
| **Fraud Detection** | ✅ Advanced ML-based | ✅ Advanced | ⚠️ Basic (bot filtering only) |
| **Network Intelligence** | ✅ Learns from all sites | ❌ Isolated data | ❌ Isolated data |
| **Open Source** | ✅ Full transparency | ❌ Black box | ❌ Proprietary |
| **Campaign-Level Insights** | ✅ UTM tracking | ✅ Yes | ✅ Yes |
| **Real-time Detection** | ✅ Instant alerts | ✅ Yes | ❌ Delayed reporting |
| **Data Ownership** | ✅ You own it | ⚠️ Vendor owns it | ⚠️ Google owns it |
| **Setup Time** | ⏱️ 60 seconds | ⏱️ Days/weeks | ⏱️ 5 minutes |
| **Best For** | Small-medium businesses | Enterprises | Basic analytics |

**Why choose AdTruth?**
- You get enterprise-grade fraud detection without the enterprise price tag
- Your data helps improve protection for everyone (network effects)
- Complete transparency—inspect and modify the code yourself
- No vendor lock-in, no contracts, no hidden fees

---

## Features That Matter

### For Business Owners

**Stop Paying for Fake Clicks**
- Identify which ad campaigns are being targeted by fraudsters
- See exactly how much of your budget is going to bots vs. real users
- Get actionable insights to optimize your ad spend

**Know Where Your Traffic Really Comes From**
- UTM parameter tracking shows fraud by campaign, source, and medium
- Discover which platforms deliver real customers vs. fake traffic
- Make data-driven decisions about where to invest your budget

**Detect Sophisticated Fraud**
- Catches AI-powered bots that mimic human behavior
- Identifies click farms, automated scripts, and fake user patterns
- Works on desktop and mobile devices

### For Developers

**Advanced Detection Methods**
- Browser fingerprinting (Canvas, device attributes, timezone analysis)
- Behavioral analysis (mouse patterns, scroll depth, touch interactions)
- Technical indicators (user agent analysis, WebDriver detection)
- Machine learning models trained on collective network data

**Privacy-First Architecture**
- GDPR and CCPA compliant
- No personal data storage
- Anonymized data sharing
- Cookie-less tracking available
- Data encrypted in transit

**Lightweight & Fast**
- < 15KB minified bundle
- Asynchronous loading (won't slow down your site)
- Zero dependencies
- Works with all modern browsers

---

## Installation

### Via CDN (Recommended)
```html
<script src="https://cdn.jsdelivr.net/gh/papa-torb/adtruth@v0.1.2/dist/adtruth.min.js"></script>
<script>
  AdTruth.init('YOUR_API_KEY_HERE');
</script>
```

### React
```jsx
import { useEffect } from 'react';

function App() {
    useEffect(() => {
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

**Get your API key:** Sign up at [adtruth.io](https://adtruth.io) (takes 30 seconds, no credit card required)

---

## Configuration Options

### Basic Initialization
```javascript
AdTruth.init('YOUR_API_KEY_HERE');
```

### Advanced Configuration
```javascript
AdTruth.init('YOUR_API_KEY_HERE', {
    trackingEnabled: true,        // Enable/disable tracking
    sessionTimeout: 30,            // Session timeout in minutes
    debug: false,                  // Enable debug logging
    apiEndpoint: 'https://api.adtruth.io',  // API endpoint
    sampling: 1.0,                 // Traffic sampling rate (0-1)
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

---

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

---

## FAQ

### Will this slow down my website?
No. AdTruth is < 15KB minified and loads asynchronously. It won't block your page rendering or affect your site speed.

### Do I need to be technical to use this?
No. Just copy-paste one line of code into your website. The dashboard shows everything in plain English.

### How do you make money if it's free?
We don't. AdTruth is a public good project. We believe small businesses deserve fraud protection, and we're building it as an open-source community effort.

### Can I use this with Google Analytics?
Yes! AdTruth is complementary to Google Analytics. GA shows you traffic patterns; AdTruth tells you which traffic is fraudulent.

### What if I have a WordPress/Shopify/Wix site?
AdTruth works with any website. For WordPress, use the code snippet above. For Shopify/Wix, add the script to your theme's custom HTML section.

### Is my data private?
Yes. We only collect anonymized behavioral signals (mouse patterns, scroll depth, etc.). No personal information, no emails, no names. We're GDPR and CCPA compliant.

### How accurate is the fraud detection?
Our ML models are trained on millions of data points. Detection accuracy improves as more businesses join the network. Average fraud detection rate across industries is 15-40%.

### What happens to the data I share?
Your anonymized data helps train fraud detection models that protect everyone in the network. In the future, we'll open-source the dataset for researchers and security professionals.

### Can I self-host AdTruth?
Yes! It's open source. Clone the repo, modify it, host it yourself. We encourage transparency and customization.

---

## Fraud Detection Methods

AdTruth uses multiple techniques to identify fraudulent traffic:

### 1. Browser Fingerprinting
- **Canvas fingerprinting**: Unique device signatures
- **Device attributes**: Screen resolution, timezone, language, hardware
- **Font detection**: Installed fonts reveal bot environments
- **WebDriver detection**: Identifies automated browsers

### 2. Behavioral Analysis
- **Mouse movement patterns**: Velocity, acceleration, jitter detection
- **Click/tap patterns**: Timing, frequency, distribution
- **Scroll behavior**: Depth, speed, natural vs. automated patterns
- **Time on page**: Real users vs. bot dwell time

### 3. Technical Indicators
- **User agent analysis**: Identifies known bot signatures
- **IP reputation**: Flags data center IPs and known fraud sources
- **Timezone mismatches**: Detects spoofed locations
- **Browser inconsistencies**: Mismatched headers reveal bots

### 4. Machine Learning
- **Isolation Forest models**: Anomaly detection across behavioral features
- **Network intelligence**: Learns from fraud patterns across all participating sites
- **Continuous learning**: Models improve as more data is collected

---

## Privacy & Compliance

AdTruth is designed with privacy as a core principle:

- ✅ **GDPR compliant** - No personal data collection
- ✅ **CCPA compliant** - Users can opt-out anytime
- ✅ **No PII storage** - We don't collect names, emails, or addresses
- ✅ **Cookie-less tracking** - Works without third-party cookies
- ✅ **Encrypted in transit** - All data encrypted via HTTPS
- ✅ **Respects Do Not Track** - Honors browser privacy settings
- ✅ **Open source** - Audit the code yourself

**What we collect:**
- Anonymized behavioral signals (mouse patterns, scroll depth)
- Technical attributes (browser type, screen resolution)
- Campaign parameters (UTM codes from ad links)

**What we DON'T collect:**
- Personal information (names, emails, phone numbers)
- Payment information
- Precise geolocation
- Browsing history outside your website

---

## For Developers

### Building from Source

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

# Run tests
npm test
```

### Project Structure

```
adtruth/
├── src/
│   ├── core/           # Core tracking logic
│   ├── fingerprint/    # Browser fingerprinting
│   ├── behavior/       # Behavioral analysis
│   └── utils/          # Helper functions
├── dist/               # Built files
├── tests/              # Test suite
└── rollup.config.js    # Build configuration
```

### Contributing Code

We welcome contributions! Every improvement you make helps protect thousands of businesses.

**How to contribute:**

1. **Fork the repository** and create a feature branch
2. **Write tests** for your changes
3. **Follow our coding standards** (ESLint + Prettier configured)
4. **Submit a pull request** with a clear description

**Areas where we need help:**
- New fraud detection techniques
- Performance optimizations
- Browser compatibility testing
- Documentation improvements
- Translation to other languages

**Not a developer?** You can still help:
- Report bugs or fraud patterns you've discovered
- Improve documentation
- Share AdTruth with other small business owners
- Contribute to discussions and feature ideas

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## Roadmap

### Current Version (v0.1.2)
- ✅ Browser fingerprinting
- ✅ Behavioral analysis (mouse, scroll, touch)
- ✅ UTM campaign tracking
- ✅ Real-time dashboard
- ✅ ML-based fraud scoring

### Coming Soon (v0.2.0)
- 🔄 Advanced ML models (ensemble methods)
- 🔄 Honeypot trap implementation
- 🔄 WebGL fingerprinting
- 🔄 Page visibility tracking
- 🔄 Email/Slack alerts for fraud spikes

### Future Vision (v1.0+)
- 📋 Open fraud dataset for researchers
- 📋 Community-contributed fraud rules
- 📋 Plugin marketplace (WordPress, Shopify, etc.)
- 📋 API for third-party integrations
- 📋 Mobile app for on-the-go monitoring

**Want to influence the roadmap?** [Open an issue](https://github.com/papa-torb/adtruth/issues) or join the discussion.

---

## Community & Support

### Get Help
- **Documentation**: [docs.adtruth.io](https://docs.adtruth.io) *(Coming Soon - will include API reference, guides, and tutorials)*
- **GitHub Issues**: [Report bugs or request features](https://github.com/papa-torb/adtruth/issues)
- **Email**: support@adtruth.io *(Coming Soon)*
- **Discord**: [Join our community](https://discord.gg/adtruth) *(Coming Soon)*

### Stay Updated
- ⭐ **Star this repo** to show support
- 👀 **Watch releases** to get notified of updates
- 🐦 **Follow us** for announcements *(Coming Soon)*

### Spread the Word
The more businesses that use AdTruth, the better it works for everyone. Share with:
- Other small business owners
- Marketing agencies
- Developer communities
- Anyone paying for online advertising

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**What this means:**
- ✅ Use AdTruth commercially
- ✅ Modify the code
- ✅ Distribute your own versions
- ✅ Private use
- ⚠️ Must include copyright notice
- ⚠️ No warranty provided

---

## Acknowledgments

- **Founded by [Hongyi Shui](https://github.com/papa-torb)** - Building fraud protection for small businesses
- Thanks to all contributors who are helping build AdTruth
- Inspired by research from Stanford, MIT, and industry fraud detection papers
- Special thanks to the open-source community for making projects like this possible

---

<p align="center">
  <strong>AdTruth</strong> - Protecting your ad spend through collective intelligence
</p>

<p align="center">
  Made with care for small businesses everywhere
</p>

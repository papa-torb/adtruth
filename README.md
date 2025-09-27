<p align="center">
  <img src="docs/logos/github_banner.PNG" alt="AdTruth - Stop Fake Traffic. Start Real Growth." width="1000">
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
  <a href="https://github.com/papa-torb/adtruth"><img src="https://img.shields.io/github/stars/papa-torb/adtruth?style=social" alt="GitHub Stars"></a>
  <a href="https://github.com/papa-torb/adtruth/commits/main"><img src="https://img.shields.io/github/last-commit/papa-torb/adtruth" alt="Last Commit"></a>
  <a href="https://github.com/papa-torb/adtruth/actions"><img src="https://github.com/papa-torb/adtruth/actions/workflows/ci.yml/badge.svg" alt="CI Status"></a>
  <br>
  <a href="https://cdn.jsdelivr.net/gh/papa-torb/adtruth@latest/dist/adtruth.min.js"><img src="https://img.shields.io/badge/CDN-jsDelivr-orange" alt="CDN"></a>
  <a href="https://adtruth.io"><img src="https://img.shields.io/badge/Demo-Live-green" alt="Live Demo"></a>
  <img src="https://img.shields.io/badge/Bundle%20Size-12KB-blue" alt="Bundle Size">
</p>

<p align="center">
  <strong>Open-source ad fraud detection for small businesses</strong>
</p>

<p align="center">
  <a href="https://adtruth.io">Live Demo</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#installation">Installation</a> •
  <a href="#adtruth-comparison-with-industry-solutions">Why Different</a> •
  <a href="#for-developers">Contribute</a>
</p>

<p align="center">
  <em>Founded by <a href="https://github.com/papa-torb">Hongyi Shui</a></em>
</p>

---

## Ad Fraud Detection for Small Businesses

Detect click fraud, bot traffic, and fake conversions from Google Ads, Facebook Ads, Instagram, and TikTok. AdTruth is a free, open-source ad fraud detection tool that helps small businesses identify which advertising platforms waste their budget on fraudulent traffic.

You're spending $3,000/month on paid ads. Conversion rate: 5%.

**30% of those clicks might be fake.**

Not obvious bots—AI-powered ad fraud that mimics human behavior perfectly. Natural mouse movement. Human-like scrolling. They visit your page, bounce after 8 seconds. You just paid $2.50 for nothing.

Enterprise fraud detection tools (ClickCease, CHEQ, TrafficGuard) cost thousands per month.

We built AdTruth to give small businesses the same ad fraud visibility, completely free. Detect bot traffic and fraudulent clicks across all your advertising platforms. See which channels waste your budget on fake traffic and shift spending to real customers.

---

## The Reality of Ad Fraud and Click Fraud

<table>
<tr>
<td width="33%" valign="top">

### 🚨 The Problem

**30%** of paid traffic
**is fraudulent**

- Bot farms generate fake clicks
- AI mimics real user behavior perfectly
- Click fraud costs you $1-3 per $10 spent
- Platforms filter obvious bots, but sophisticated fraud slips through

> **Your campaigns look fine.** The fraud is invisible.

</td>
<td width="33%" valign="top">

### ⚠️ The Double Cost

**Two ways you're losing money**

- **Fraud waste**: $2-10K/year on bot clicks
- **Solution cost**: $5K-50K/year for enterprise tools
- Small businesses face both problems
- Can't afford visibility, can't stop the bleeding

> **Without fraud analytics, you're flying blind.**

</td>
<td width="33%" valign="top">

### ✅ The Solution

**$0 forever**
**with AdTruth**

- See fraud rates across Google, Facebook, Instagram, TikTok
- Compare: "Google 11% fraud vs Instagram 63% fraud"
- Shift budget from high-fraud to low-fraud platforms
- 12KB script—lighter than most images

> **One line of code.** Free forever. Open source.

</td>
</tr>
</table>

<div align="center">

### Know which platforms waste your money. Shift budget to what works.

**[Get Started →](https://adtruth.io/signup)** • **[View Demo](https://adtruth.io)** • **[Read Docs](#installation)**

</div>

---

## How Fraud Works

<div align="center">

<img src="docs/images/fraud-journey.png" alt="Ad fraud flow visualization" width="700">

**The fraud economy:** Fake websites generate clicks → Fraudsters profit → Your budget disappears → Real customers never see your ads

**AdTruth reveals which platforms have higher fraud rates**, so you can shift budget from high-fraud channels to low-fraud ones.

</div>

---

## See It In Action

### Calculate Your Fraud Waste (Estimated fraud rates. Real data available once you connect)

<div align="center">

<img src="docs/images/fraud_waste_calculator.png" alt="AdTruth fraud waste calculator" width="900">

**Try it yourself:** [adtruth.io](https://adtruth.io) • Enter your website to see estimated fraud rates across Google, Facebook, Instagram, and TikTok

</div>

### Your Dashboard After Connection

<div align="center">

<img src="docs/images/dashboard_demo.png" alt="AdTruth analytics dashboard" width="900">

</div>

**Real-time insights:**
- See which platforms waste money on bots vs attract real customers
- Compare your fraud rates to industry benchmarks
- Get actionable recommendations

---

## Quick Start

Add this script to your website to start detecting fraud:

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

**Get your free API key at [adtruth.io](https://adtruth.io)** • Setup takes 60 seconds • No credit card required

---

## How AdTruth Works

**1. Install** → Add one line of code to your website (takes 60 seconds)

**2. Collect** → AdTruth automatically tracks visitor behavior and fraud signals

**3. Analyze** → Our ML models calculate fraud rates for each traffic source

**4. Optimize** → See platform-by-platform fraud rates (e.g., "Google: 11%, Instagram: 63%")

**5. Reallocate** → Shift budget from high-fraud platforms to channels with real customers

Zero configuration. No maintenance. Just install and go.

---

## Who AdTruth Helps

| Business Type | Common Problem | How AdTruth Helps                                     |
|---------------|----------------|-------------------------------------------------------|
| **E-commerce** | High ad spend, low ROAS | Identify which platforms attract bots vs real shoppers |
| **SaaS Companies** | Fake signups waste sales time | Distinguish real leads from click farm accounts       |
| **Local Businesses** | Limited budget, blind spending | See which platforms deliver real foot traffic         |
| **Marketing Agencies** | Clients blame poor results on you | Prove fraud with data, not guesswork                  |
| **Developers** | Want to contribute to open source | Help build better fraud detection for everyone        |


---

## AdTruth Comparison with Industry Solutions

<table>
<tr>
<th width="25%">Feature</th>
<th width="25%">AdTruth</th>
<th width="25%">Enterprise Tools<br><sub>(ClickCease, CHEQ, etc.)</sub></th>
<th width="25%">Google Analytics</th>
</tr>
<tr>
<td><strong>Cost</strong></td>
<td>✅ <strong>$0 forever</strong></td>
<td>❌ $12K-50K/year</td>
<td>✅ Free</td>
</tr>
<tr>
<td><strong>Fraud Detection</strong></td>
<td>✅ ML-powered, real-time</td>
<td>✅ Advanced (black box)</td>
<td>⚠️ Basic bot filtering only</td>
</tr>
<tr>
<td><strong>Network Intelligence</strong></td>
<td>✅ <strong>Learns from all sites</strong></td>
<td>❌ Your data only</td>
<td>❌ No fraud focus</td>
</tr>
<tr>
<td><strong>Tracking Transparency</strong></td>
<td>✅ <strong>100% open source</strong></td>
<td>❌ Proprietary black box</td>
<td>❌ Proprietary</td>
</tr>
<tr>
<td><strong>Setup Time</strong></td>
<td>✅ <strong>60 seconds</strong></td>
<td>⏱️ Days to weeks</td>
<td>⏱️ 5 minutes</td>
</tr>
<tr>
<td><strong>Best For</strong></td>
<td>✅ <strong>Small businesses</strong></td>
<td>Large enterprises</td>
<td>Basic analytics</td>
</tr>
</table>

### The AdTruth Advantage

**Enterprise-grade fraud analytics without enterprise pricing.** Your traffic data helps train models that benefit the entire network. When we detect fraud patterns on one site, every other business gets better fraud scoring immediately.

---

## Installation

### Static HTML/JavaScript (Universal Method)

Add this script before the closing `</body>` tag on your website:

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

**Get your API key:** Sign up at [adtruth.io](https://adtruth.io) (takes 30 seconds, no credit card required)

---

### WordPress - ✅ TESTED

**Time**: 2 minutes • **Difficulty**: Easy • **Tested**: May 14, 2024

WordPress is the most popular CMS (43% of all websites). We've tested and verified this integration works perfectly.

**Quick Steps**:
1. Install the **WPCode** plugin (2M+ active installations)
2. Go to **Code Snippets → Header & Footer**
3. Paste the AdTruth script in the **Footer** section
4. Save changes

**Result**: Page views appear in your dashboard within 2 minutes.

**[→ Full WordPress Integration Guide](examples/wordpress/INTEGRATION-GUIDE.md)**

---

### Wix - ⏳ TEST PENDING

**Time**: ~5 minutes • **Difficulty**: Easy • **Status**: Documentation ready, testing needed

Wix is the fastest-growing website builder (32.6% YoY growth), popular with small businesses. Our integration guide is complete and ready to use.

**Requirements**: Paid Wix plan (Light or higher, $17/mo), connected custom domain

**Quick Steps**:
1. Go to **Settings → Custom Code** in your Wix dashboard
2. Click **+ Add Custom Code**
3. Paste the AdTruth script
4. Choose "All pages" and "Body - end"
5. Click Apply

**Note**: Custom code requires a paid Wix plan. We need users to test and verify this integration works as documented.

**[→ Full Wix Integration Guide](examples/wix/INTEGRATION-GUIDE.md)**

---

### Shopify - ✅ TESTED

**Time**: 3 minutes • **Difficulty**: Easy • **Tested**: November 1, 2025

Shopify powers 26% of all e-commerce sites and is a prime target for ad fraud. We've tested Custom Pixels integration (Shopify's 2025 recommended method) and verified it works perfectly.

**Quick Steps**:
1. Go to **Settings → Customer events** in your Shopify admin
2. Click **Add custom pixel**, name it "AdTruth Fraud Detection"
3. Paste the AdTruth pixel code
4. Click **Save** and **Connect** to activate

**Result**: Page views appear in your dashboard within 2 minutes. Works on all pages including checkout (future-proof with Shopify's Checkout Extensibility).

**Platform Note**: After activation, you may see "Pixel will not track any customer behavior because it is not subscribed to any events." This is normal - our script works independently and all fraud detection signals are being tracked correctly.

**[→ Full Shopify Integration Guide](examples/shopify/INTEGRATION-GUIDE.md)**

---

### More Platforms Coming Soon

We're actively testing integrations for:
- **Squarespace** (3.4% market share)
- **GoDaddy Website Builder** (10% among builders)

Want to help test? [Open an issue](https://github.com/papa-torb/adtruth/issues) or check [examples/](examples/) for testing guides.

---

## FAQ

<details>
<summary><b>Will this slow down my website?</b></summary>

<br>

No. AdTruth is **12KB minified** (smaller than most images) and loads **asynchronously**. It won't block your page rendering or affect your Core Web Vitals scores.

</details>

<details>
<summary><b>Do I need to be technical to use this?</b></summary>

<br>

Not at all. Copy-paste one line of code into your website (takes 60 seconds). The dashboard shows everything in plain English with color-coded fraud scores.

</details>

<details>
<summary><b>How do you make money if it's free?</b></summary>

<br>

We don't—yet. AdTruth is a public good project. Small businesses deserve the same fraud protection as Fortune 500 companies. We're building this as an open-source community effort first, monetization later (if ever).

</details>

<details>
<summary><b>Can I use this with Google Analytics?</b></summary>

<br>

Absolutely! AdTruth is **complementary** to Google Analytics. GA shows you traffic patterns; AdTruth tells you which traffic is fraudulent. Use them together for complete visibility.

</details>

<details>
<summary><b>What if I have a WordPress/Shopify/Wix site?</b></summary>

<br>

AdTruth works with **any website**:
- **WordPress**: Add the script to your theme's `header.php` or use a code injection plugin
- **Shopify**: Add to `theme.liquid` in the `<head>` section
- **Wix**: Use the Custom Code feature in Site Settings
- **Squarespace**: Use Code Injection in Settings

</details>

<details>
<summary><b>Is my data private?</b></summary>

<br>

Yes. We collect **only** anonymized behavioral signals (mouse patterns, scroll depth, device signatures). No personal information. No emails. No names. No passwords. We're **GDPR and CCPA compliant** by design.

</details>

<details>
<summary><b>How accurate is the fraud detection?</b></summary>

<br>

Our ML models are trained on collective network data from all participating sites. Average fraud detection rate across industries is **15-40%**. Accuracy improves as more businesses join the network—every fraudster we catch protects everyone.

</details>

<details>
<summary><b>Can I self-host AdTruth?</b></summary>

<br>

Yes! It's **100% open source** (MIT license). Clone the repo, modify it, host it yourself. We encourage transparency and customization. Check the [For Developers](#for-developers) section for build instructions.

</details>

---

## How AdTruth Detects Fraud

AdTruth uses a multi-layered approach to identify fraudulent traffic:

- **Browser fingerprinting** - Unique device signatures that bots can't fake
- **Behavioral analysis** - Real users scroll, move, and click differently than bots
- **Machine learning** - Isolation Forest models trained on collective network data
- **Network intelligence** - Fraud patterns detected on one site protect all sites

**Why we don't share all our methods:** Disclosing detailed detection techniques helps fraudsters bypass them. Our open-source SDK is transparent, but our ML models and detection rules remain proprietary to stay ahead of evolving fraud.

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

### Current Version (v0.2.1)
- ✅ Browser fingerprinting
- ✅ Behavioral analysis (mouse, scroll, touch)
- ✅ UTM campaign tracking
- ✅ Real-time dashboard
- ✅ ML-based fraud scoring
- ✅ Page unload tracking (accurate session duration)
- ✅ Platform integration guides (WordPress, Shopify, Wix)

### Coming Next (v0.3.0)
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
- **GitHub Issues**: [Report bugs or request features](https://github.com/papa-torb/adtruth/issues)
- **Documentation**: See [CHANGELOG.md](CHANGELOG.md), [SECURITY.md](SECURITY.md), and platform guides in [examples/](examples/)
- **Email**: *(Coming Soon - official support email)*

### Stay Updated
- ⭐ **Star this repo** to show support
- 👀 **Watch releases** to get notified of updates
- 📋 **Read the** [**CHANGELOG**](CHANGELOG.md) for version updates

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
- Inspired by research from Stanford, MIT, and industry fraud detection papers
- Special thanks to the open-source community for making projects like this possible

---

<p align="center">
  <strong>AdTruth</strong> - Protecting your ad spend through collective intelligence
</p>

<p align="center">
  Made with care for small businesses everywhere
</p>

---

> **Note:** This project is still under development.

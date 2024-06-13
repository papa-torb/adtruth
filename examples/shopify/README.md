# Shopify Integration

**Status**: ✅ TESTED & VERIFIED
**Difficulty**: Easy (3 minutes)
**Method**: Custom Pixels (Shopify's 2025 recommended approach)

## Overview

Integrate AdTruth fraud detection into your Shopify store using Custom Pixels - a secure, future-proof method that works across all pages including checkout.

## Why Shopify Stores Need Fraud Detection

E-commerce businesses are prime targets for advertising fraud:

- **26% of e-commerce sites** use Shopify (high-value target for fraudsters)
- **Higher ad spend** compared to other small businesses
- **Performance marketing** makes them vulnerable to click fraud and bot traffic
- **Conversion tracking** can be manipulated by sophisticated bots
- **Checkout fraud** from fake add-to-cart and abandoned cart patterns

AdTruth helps you identify fraudulent traffic before it wastes your ad budget.

## Market Data

- **Shopify Market Share**: 5.6% of all websites, 26% of e-commerce sites
- **Total Stores**: 4.4+ million active stores worldwide
- **SMB Focus**: 82% of Shopify stores are small to medium businesses
- **Ad Spend**: E-commerce businesses spend 2-3x more on paid ads than other SMBs

## Quick Start

### Requirements

- Shopify store (any plan, including free trial)
- Access to Settings → Customer events
- AdTruth API key from https://adtruth.io/dashboard

### Installation (3 minutes)

1. **Get your API key** from https://adtruth.io/dashboard
2. **Navigate** to Settings → Customer events in Shopify admin
3. **Add custom pixel** named "AdTruth Fraud Detection"
4. **Paste the code** (see Integration Guide)
5. **Save and Connect** to activate

Full step-by-step instructions: [INTEGRATION-GUIDE.md](./INTEGRATION-GUIDE.md)

## What Gets Tracked

- ✅ Page views across all pages (including checkout)
- ✅ Mouse movement patterns (desktop fraud detection)
- ✅ Touch interactions (mobile fraud detection)
- ✅ Scroll depth and engagement
- ✅ Time on page and session duration
- ✅ UTM parameters and traffic sources
- ✅ Device fingerprinting for bot detection

## Integration Method

**Custom Pixels** (Settings → Customer events)

This is Shopify's official 2025 method for adding tracking pixels. Benefits:

- No theme code modifications required
- Works in sandboxed checkout environment
- Future-proof (old checkout.liquid deprecated August 2025)
- Easy to add and remove
- Available on all Shopify plans

## Test Results

**Platform**: Shopify free trial account
**Integration Time**: 3 minutes
**Difficulty**: Easy (copy-paste only)
**Status**: ✅ Working perfectly

**What We Verified:**
- Page views appear in dashboard within 2 minutes
- No JavaScript errors
- No theme modifications needed
- Works on all pages including checkout
- Fraud detection functioning correctly

## Platform-Specific Considerations

### Shopify Checkout Extensibility

As of August 28, 2025, Shopify deprecated the old `checkout.liquid` method. Custom Pixels is the only way to track checkout pages now. AdTruth's integration uses Custom Pixels, so you're future-proof.

### Shopify Event Warning

After installation, you may see: "Pixel will not track any customer behavior because it is not subscribed to any events."

**This is normal.** Our script works independently and doesn't need Shopify's event API. All fraud detection signals are being tracked correctly.

### Development vs Production

Test traffic may show as "suspicious" in your dashboard. This is expected - development/testing environments trigger fraud signals. Real customer traffic from paid ads will score more accurately.

## Support & Troubleshooting

See the full [Integration Guide](./INTEGRATION-GUIDE.md) for:

- Detailed setup instructions
- Troubleshooting common issues
- Testing your integration
- Understanding the data collected

## Alternative Methods

**Theme.liquid method** (older approach) is still supported but not recommended:

- Requires theme code modifications
- Doesn't work in checkout after August 2025
- More difficult to remove/update
- Not necessary with Custom Pixels available

We recommend using Custom Pixels for all Shopify integrations.

## Next Steps

1. Complete the integration following the [Integration Guide](./INTEGRATION-GUIDE.md)
2. Visit your store to generate test data
3. Check your AdTruth dashboard to verify tracking
4. Start monitoring your paid ad traffic for fraud

---

**Questions?** Open an issue on [GitHub](https://github.com/papa-torb/adtruth/issues)

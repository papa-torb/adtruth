# Shopify Integration Guide

**Status**: ✅ TESTED & VERIFIED (November 2025)

This guide shows you how to integrate AdTruth fraud detection into your Shopify store using Custom Pixels - the recommended method for 2025 and beyond.

## Why Custom Pixels?

As of August 2025, Shopify deprecated the old `checkout.liquid` method in favor of Custom Pixels. This new approach:

- Works on all pages including checkout (sandboxed environment)
- No theme code modifications required
- Future-proof and officially supported by Shopify
- Available on all Shopify plans including trial accounts

## Requirements

- Shopify store (any plan, including free trial)
- Access to Settings → Customer events in your Shopify admin
- AdTruth API key from https://adtruth.io/dashboard

## Integration Steps

### Step 1: Access Customer Events

1. Log into your Shopify admin
2. Click **Settings** (bottom left sidebar)
3. Select **Customer events**

### Step 2: Create Custom Pixel

1. Click **Add custom pixel**
2. Enter a name: **AdTruth Fraud Detection**
3. Paste the following code in the code editor:

```javascript
(function() {
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/gh/papa-torb/adtruth@latest/dist/adtruth.min.js';
  script.onload = function() {
    if (window.AdTruth) {
      AdTruth.init('YOUR_API_KEY_HERE');
    }
  };
  document.head.appendChild(script);
})();
```

4. Replace `YOUR_API_KEY_HERE` with your actual API key
5. Click **Save**
6. Click **Connect** to activate the pixel

### Step 3: Verify Installation

1. Click **View store** (top right of Shopify admin)
2. Browse your store (homepage, product pages, etc.)
3. Wait 1-2 minutes for data to transmit
4. Check your AdTruth dashboard at https://adtruth.io/dashboard
5. You should see page views appearing under your website

## Understanding the Shopify Warning

After adding the pixel, you may see this message:

> "Pixel will not track any customer behavior because it is not subscribed to any events."

**This is normal and expected.** Here's what it means:

- The warning refers to Shopify's built-in event API (cart additions, checkouts, purchases)
- Our AdTruth script works independently and doesn't need Shopify events
- You're already tracking all fraud detection signals: page views, mouse movements, scroll depth, touch interactions, time on page, and click patterns
- No action needed - everything is working correctly

## What Gets Tracked

AdTruth automatically collects fraud detection signals without requiring Shopify event subscriptions:

**Behavioral Data:**
- Page views and session tracking
- Time spent on each page
- Mouse movement patterns (desktop)
- Touch interactions (mobile)
- Scroll depth and reading patterns
- Click frequency and intervals

**Device Fingerprinting:**
- Browser and device characteristics
- Screen resolution and timezone
- Hardware capabilities
- Canvas fingerprinting for unique device signatures

**Traffic Source:**
- UTM parameters (utm_source, utm_medium, utm_campaign)
- Referrer information
- Traffic channel classification

All of this data is analyzed to detect bot traffic, click fraud, and suspicious behavior patterns.

## Troubleshooting

### Not Seeing Data in Dashboard?

1. **Check API Key**: Make sure you replaced `YOUR_API_KEY_HERE` with your actual API key
2. **Pixel Status**: Verify the pixel shows "Connected" status in Customer events
3. **Browser Console**: Open browser dev tools (F12) and check for JavaScript errors
4. **Wait Time**: Data transmission can take 1-2 minutes - be patient
5. **Visit Store**: Make sure you're visiting the actual store, not the admin panel

### Pixel Not Saving?

- Check for syntax errors in the code (missing quotes, brackets)
- Make sure you're logged in as the store owner
- Try a different browser if issues persist

### Data Shows as "Suspicious"?

- This is expected for test traffic from development environments
- Real customer traffic will score more accurately
- Test data often triggers fraud signals (which shows the system is working!)

## Testing Your Integration

After installation, test the integration:

1. **Desktop Test**: Visit your store from a desktop browser, click around, scroll through product pages
2. **Mobile Test**: Visit from a mobile device or use Chrome DevTools device emulation
3. **Different Sources**: Test with different UTM parameters to verify source tracking
4. **Dashboard Check**: Verify all test sessions appear in your AdTruth dashboard

Expected timeline: Page views should appear in the dashboard within 2 minutes.

## Advanced: Subscribing to Shopify Events (Optional)

If you want to track e-commerce specific events like product views, cart additions, and purchases, you can subscribe to Shopify's Customer Events API. This is optional and not required for fraud detection.

To add event tracking, modify the pixel code to subscribe to events:

```javascript
// This is an advanced configuration - basic setup works without this
analytics.subscribe("product_viewed", (event) => {
  // Custom tracking logic for product views
});

analytics.subscribe("product_added_to_cart", (event) => {
  // Custom tracking logic for cart additions
});
```

For most users, the basic setup is sufficient. E-commerce event tracking will be added in future versions of AdTruth.

## Test Results (November 2025)

**Test Environment:**
- Platform: Shopify free trial account
- Method: Custom Pixels (Settings → Customer events)
- API Key: Production key from dashboard
- Integration Time: ~3 minutes

**Results:**
- ✅ Pixel installation successful
- ✅ Script loaded without errors
- ✅ Page views appeared in dashboard within 2 minutes
- ✅ Traffic source correctly identified
- ✅ Fraud detection working (test traffic flagged as expected)
- ✅ No theme modifications required
- ✅ Works on all pages including checkout

**User Experience:**
- Time to integrate: 3 minutes
- Difficulty: Easy
- Technical knowledge required: None (copy-paste only)
- Issues encountered: None

## Support

If you encounter issues:

1. Check this guide's troubleshooting section
2. Review browser console for JavaScript errors
3. Verify your API key is correct
4. Open an issue on GitHub: https://github.com/papa-torb/adtruth/issues

## Next Steps

After successful integration:

1. Remove password protection from your store (if applicable)
2. Start running paid advertising campaigns
3. Monitor your dashboard regularly for fraud insights
4. Review traffic sources and fraud scores
5. Optimize ad spend based on detected fraud patterns

---

**Integration complete!** Your Shopify store is now protected with AdTruth fraud detection. Visit your dashboard to start monitoring traffic quality.

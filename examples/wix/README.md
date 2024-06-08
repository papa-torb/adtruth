# Wix Integration

**Priority**: 🟡 HIGH (4.1% market share, 32.6% YoY growth - fastest growing!)
**Status**: ⏳ TEST PENDING (Documentation ready, testing needed)
**Market Data**: Fastest-growing website builder, popular with small businesses and creatives

This integration guide is ready but requires testing on a live Wix site. Wix is our #2 priority for testing due to its rapid growth rate and SMB-friendly platform.

## Integration Guide

**[→ Read the Full Integration Guide](INTEGRATION-GUIDE.md)**

Our guide covers:
- Method 1: Custom Code feature (RECOMMENDED - site-wide tracking)
- Method 2: HTML embed element (per-page tracking)
- Plan requirements and pricing
- Troubleshooting common issues

**Important**: Wix requires a paid plan (Light or higher, $17/mo+) to add custom code.

## Quick Start

The fastest way to integrate AdTruth with Wix:

1. Ensure you have a paid Wix plan (Light or higher)
2. Go to **Settings > Custom Code** in your Wix dashboard
3. Click **+ Add Custom Code**
4. Paste the AdTruth tracking script
5. Choose "All pages" and "Body - end"
6. Click Apply

See the [full guide](INTEGRATION-GUIDE.md) for detailed instructions.

## Plan Requirements

Wix custom code requires:
- Paid premium plan (minimum: Light at $17/month)
- Connected custom domain (no free wix.com subdomains)
- Published site (won't work in preview mode)

All paid Wix plans (Light, Core, Business, Business Elite) support custom code.

## Why We Haven't Tested Yet

Unlike WordPress (which we tested for free), Wix requires:
- Upfront payment of $17 for the Light plan
- A custom domain connection
- 14-day money-back guarantee (not a true free trial)

We've prioritized WordPress testing first but welcome Wix users to test and report results.

## Testing Needed

We need Wix users to verify this integration! If you have a Wix site on a paid plan:

1. Follow the [Integration Guide](INTEGRATION-GUIDE.md)
2. Report results on [GitHub Issues](https://github.com/papa-torb/adtruth/issues)
3. Share your experience:
   - Did the script load correctly?
   - Did data appear in your dashboard?
   - How long did integration take?
   - Any issues or conflicts?

Your feedback will help us mark this guide as "Tested & Verified" and improve it for other users.

## Expected Integration Time

Based on Wix's official documentation:
- **Custom Code method**: ~5 minutes
- **HTML Embed method**: ~2-3 minutes per page

Faster than WordPress if you're already on a paid plan.

## Files in This Directory

- **[INTEGRATION-GUIDE.md](INTEGRATION-GUIDE.md)** - Complete step-by-step instructions
- **README.md** - This file

## Need Help?

- Check your API key: [AdTruth Dashboard](https://adtruth.io/dashboard)
- Wix official docs: [Custom Code Guide](https://support.wix.com/en/article/wix-editor-embedding-custom-code-on-your-site)
- Report issues: [GitHub Issues](https://github.com/papa-torb/adtruth/issues)

## Want to Help Test?

If you're a Wix user and would like to help verify this integration:

1. Follow our [Integration Guide](INTEGRATION-GUIDE.md)
2. Take screenshots of the process
3. Report back with results (working/not working)
4. Share any issues or improvements

We'll update the status to "Tested & Verified" and credit contributors!

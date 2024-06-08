# WordPress Integration

**Priority**: 🔴 HIGH (43% of all websites, 63% of CMS market)
**Status**: ✅ TESTED & VERIFIED (May 2024)
**Market Data**: Most popular website platform, powers nearly half the internet

This integration has been tested on a live WordPress site and confirmed working. Integration takes approximately 2 minutes using the WPCode plugin method.

## Integration Guide

**[→ Read the Full Integration Guide](INTEGRATION-GUIDE.md)**

Our comprehensive guide covers:
- Method 1: Using WPCode plugin (RECOMMENDED - tested and verified)
- Method 2: Theme functions (for developers)
- Method 3: Direct theme edit (advanced users)

**Test Results**: Script loaded successfully, page views appeared in dashboard within 2 minutes.

## Quick Start

The fastest way to integrate AdTruth with WordPress:

1. Install the **WPCode** plugin from WordPress admin (Plugins > Add New)
2. Go to **Code Snippets > Header & Footer**
3. Paste the AdTruth tracking code in the **Footer** section
4. Save and verify

See the [full guide](INTEGRATION-GUIDE.md) for detailed instructions.

## Test Results (May 14, 2024)

Tested on TasteWP test environment:

- ✅ Script loaded without errors
- ✅ Page views tracked within 2 minutes
- ✅ Traffic source correctly identified
- ✅ All tracking data appeared in dashboard
- ⚠️ Test environment traffic flagged as suspicious (expected behavior)

## WordPress.com vs WordPress.org

**WordPress.org (Self-Hosted)**: All methods work. This is what most small businesses use.

**WordPress.com (Hosted)**:
- Free/Personal/Premium plans: Cannot add custom scripts
- Business plan ($25/mo) or higher: Can use custom code

## Files in This Directory

- **[INTEGRATION-GUIDE.md](INTEGRATION-GUIDE.md)** - Complete step-by-step instructions
- **[demo-output.html](demo-output.html)** - Example WordPress page with AdTruth installed
- **README.md** - This file

## Need Help?

- Check your API key: [AdTruth Dashboard](https://adtruth.io/dashboard)
- Full documentation: [GitHub Repository](https://github.com/papa-torb/adtruth)
- Report issues: [GitHub Issues](https://github.com/papa-torb/adtruth/issues)

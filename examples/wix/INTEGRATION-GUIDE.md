# Wix Integration Guide

**Status**: Test Pending (Documentation based on Wix official guidelines)
**Time Required**: ~5 minutes
**Requirements**: Paid Wix plan (Light or higher, starting at $17/month)

This guide covers how to add AdTruth tracking to your Wix website. The instructions are based on Wix's official Custom Code documentation but have not been tested with a live Wix site yet.

## Prerequisites

To add custom code to Wix, you need:
- A Wix website on a **paid premium plan** (Light plan or higher)
- A **connected custom domain** (not a free wix.com subdomain)
- Your AdTruth API key from [adtruth.io/dashboard](https://adtruth.io/dashboard)

Note: Wix's free plan does not support custom code. You must upgrade to at least the Light plan ($17/month) to add tracking scripts.

## Method 1: Custom Code Feature (Recommended)

This is the official Wix method for adding tracking scripts site-wide.

### Step 1: Access Custom Code Settings

1. Log into your Wix account and go to your site's dashboard
2. Click **Settings** in the left sidebar
3. Under the **Advanced** section, click **Custom Code**

### Step 2: Add Your Tracking Code

1. Click **+ Add Custom Code** at the top right
2. In the text box, paste this code:

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

3. Replace `YOUR_API_KEY_HERE` with your actual API key from AdTruth dashboard
4. In the **Name your code** field, enter something like "AdTruth Tracking"

### Step 3: Configure Code Settings

1. **Where to place the code**:
   - Choose **All pages** to track across your entire site (recommended)
   - Or select specific pages if you only want tracking on certain pages

2. **Place Code in**:
   - Select **Body - end** (recommended for tracking scripts)
   - This loads the script at the bottom of the page for better performance

3. Click **Apply** to save your settings

### Step 4: Verify Installation

After saving:

1. Visit your published website
2. Right-click anywhere on the page and select **View Page Source**
3. Press Ctrl+F (Windows) or Cmd+F (Mac) to search
4. Search for "adtruth"
5. You should see the tracking script near the bottom of the page

### Step 5: Check Your Dashboard

1. Visit a few pages on your Wix site (3-5 page views)
2. Wait 2-5 minutes for data to process
3. Go to [adtruth.io/dashboard](https://adtruth.io/dashboard)
4. You should see page views appearing

## Method 2: HTML Embed Element (Per-Page)

If you only want tracking on specific pages, you can use Wix's HTML embed element.

### Adding to Individual Pages

1. Open the page in Wix Editor
2. Click **Add Elements** (+) on the left panel
3. Go to **Embed Code > HTML iframe**
4. Drag the HTML element onto your page
5. Click **Enter Code**
6. Paste the tracking script (same as Method 1)
7. Replace `YOUR_API_KEY_HERE` with your API key
8. Click **Update**
9. Position the element at the bottom of your page
10. Repeat for each page where you want tracking

Note: This method is more time-consuming if you want site-wide tracking. Use Method 1 for tracking across all pages.

## Wix Plan Requirements

Custom code is only available on Wix premium plans:

| Plan | Price | Custom Code | Notes |
|------|-------|-------------|-------|
| Free | $0/mo | ❌ No | Cannot add custom scripts |
| Light | $17/mo | ✅ Yes | Minimum plan for custom code |
| Core | $29/mo | ✅ Yes | More storage and bandwidth |
| Business | $36/mo | ✅ Yes | Accept payments online |
| Business Elite | $159/mo | ✅ Yes | Full e-commerce features |

All paid plans support custom code. The Light plan is sufficient for AdTruth tracking.

## Wix Studio vs Wix Editor

Both Wix platforms support custom code:

- **Wix Editor**: Follow Method 1 instructions above
- **Wix Studio**: Similar process - Settings > Custom Code > Add Code

The Custom Code feature works identically on both platforms.

## Important Notes

### What Gets Tracked

AdTruth will automatically track:
- Page views across your Wix site
- Traffic sources (Google Ads, Facebook Ads, organic)
- Visitor behavior patterns
- Fraud detection signals

### Wix-Specific Considerations

- Custom code only works on **published sites** with connected domains
- Code will not run in Wix Editor preview mode
- Wix's built-in analytics will continue working alongside AdTruth
- Some Wix apps may conflict with custom JavaScript (rare)

### GDPR Compliance

AdTruth tracking is privacy-focused and GDPR-compliant. However:
- You may need to add AdTruth to your privacy policy
- Consider adding a cookie consent banner if required in your region
- Check local regulations for tracking requirements

## Troubleshooting

### Code Not Showing in Page Source

- Make sure your site is published (custom code doesn't run in preview)
- Verify you're on a paid Wix plan (Light or higher)
- Check that you have a connected custom domain
- Confirm the code is set to "All pages" or the specific page you're viewing

### No Data in Dashboard

- Wait 24 hours - initial data may take time to appear
- Verify your API key is correct (no extra spaces)
- Check that the script is loading by viewing page source
- Test in an incognito window (your own visits may be filtered)

### Script Conflicts

- If you have other tracking scripts (Google Analytics, Facebook Pixel), they may interfere
- Try placing AdTruth code in **Body - end** position
- Test with other scripts temporarily disabled

### Performance Issues

- Wix sites already load many scripts - adding another is usually fine
- If you notice slowness, verify the script is in **Body - end** position
- The AdTruth script is lightweight (~10KB) and loads asynchronously

## Testing Needed

This guide is based on Wix's official documentation but has not been verified with a live test. If you integrate AdTruth with Wix:

- Please report your results on [GitHub Issues](https://github.com/papa-torb/adtruth/issues)
- Share what worked and what didn't
- Help us improve this guide with real-world experience

## Need Help?

- Check your API key: [AdTruth Dashboard](https://adtruth.io/dashboard)
- Wix Custom Code docs: [Wix Support](https://support.wix.com/en/article/wix-editor-embedding-custom-code-on-your-site)
- Report issues: [GitHub Issues](https://github.com/papa-torb/adtruth/issues)

# WordPress Integration Guide

**Status**: Tested and verified working
**Time Required**: ~2 minutes
**Last Tested**: May 2024

This guide covers three ways to add AdTruth tracking to WordPress. We tested the plugin method on a live WordPress site and confirmed it works.

## Prerequisites

- WordPress admin access
- Your AdTruth API key from [adtruth.io/dashboard](https://adtruth.io/dashboard)

## Method 1: WPCode Plugin (Recommended)

This is the easiest method and what we tested. The WPCode plugin has 2+ million active installations and is specifically designed for adding scripts safely.

### Installation

1. In your WordPress admin, go to **Plugins > Add New**
2. Search for "WPCode"
3. Install and activate **WPCode – Insert Headers and Footers**
4. Go to **Code Snippets > Header & Footer**
5. Scroll to the **Footer** section and paste this code:

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

6. Replace `YOUR_API_KEY_HERE` with your actual API key
7. Click **Save Changes**

### Verification

To verify the script is loading:

1. Open your site in a private/incognito window
2. Right-click and select **View Page Source**
3. Search for "adtruth" (Ctrl+F or Cmd+F)
4. You should see the script near the bottom, before `</body>`

After visiting a few pages, check your dashboard at [adtruth.io/dashboard](https://adtruth.io/dashboard). Page views should appear within 2-5 minutes.

### Test Results

We tested this method on May 14, 2024 using a TasteWP test site:

- Script loaded without errors
- Page views appeared in dashboard within 2 minutes
- Traffic source correctly identified
- All tracking data showed up properly

Note: Test traffic from development environments may be flagged as suspicious, which is expected behavior. Real user traffic on production sites will show more accurate fraud scores.

## Method 2: Theme Functions (For Developers)

If you're comfortable with PHP, add this to your child theme's `functions.php`:

```php
<?php
// Add AdTruth tracking to footer
function adtruth_tracking_script() {
    ?>
    <script>
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://cdn.jsdelivr.net/gh/papa-torb/adtruth@latest/dist/adtruth.min.js';
        js.onload = function() {
            AdTruth.init('<?php echo esc_js( 'YOUR_API_KEY_HERE' ); ?>');
        };
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'adtruth-js'));
    </script>
    <?php
}
add_action('wp_footer', 'adtruth_tracking_script');
```

Replace `YOUR_API_KEY_HERE` with your actual API key.

## Method 3: Direct Theme Edit (Advanced)

**Warning**: Only use this if you know what you're doing. A typo can break your site, and theme updates will erase your changes. Always use a child theme and backup first.

1. Go to **Appearance > Theme File Editor**
2. Open `footer.php`
3. Find `<?php wp_footer(); ?>`
4. Add the tracking script right before the closing `</body>` tag:

```php
<!-- AdTruth Tracking -->
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
</body>
```

5. Replace `YOUR_API_KEY_HERE` with your actual API key
6. Click **Update File**

## Troubleshooting

**Script not showing up?**
- Clear your cache if you use a caching plugin (WP Super Cache, W3 Total Cache, etc.)
- Try disabling other plugins temporarily to check for conflicts
- Make sure the script is placed before the closing `</body>` tag

**No data in dashboard?**
- Wait 24 hours - initial data may take time to appear
- Verify your API key is correct (no extra spaces)
- Test in an incognito window - your own visits might be filtered

**Theme update removed the code?**
- This happens if you used Method 3. Use Method 1 (plugin) to avoid this.

## What Gets Tracked

AdTruth automatically tracks:
- Page views across your entire site
- Traffic sources (Google Ads, Facebook Ads, organic search, etc.)
- Visitor behavior patterns
- Fraud detection signals

All tracking is GDPR-compliant and privacy-focused.

## WordPress.com vs WordPress.org

**WordPress.org (Self-Hosted)**: All methods work. This is what most small businesses use.

**WordPress.com (Hosted)**:
- Free/Personal/Premium plans: Cannot add custom scripts
- Business plan ($25/mo) or higher: Can use Method 1 (plugin)

If you're on a WordPress.com free plan, you'll need to upgrade to add custom scripts.

## Need Help?

- Check your API key: [AdTruth Dashboard](https://adtruth.io/dashboard)
- Documentation: [GitHub Repository](https://github.com/papa-torb/adtruth)
- Report issues: [GitHub Issues](https://github.com/papa-torb/adtruth/issues)

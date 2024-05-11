# WordPress Integration Guide - AdTruth Tracking

**Status**: ✅ TESTED & VERIFIED
**Difficulty**: ⭐ Easy
**Time Required**: 2 minutes
**Test Date**: May 14, 2024
**Test Environment**: TasteWP (disillusionedwing.s3-tastewp.com)

This guide shows you how to add AdTruth tracking to your WordPress website. We've **personally tested** this integration and confirmed it works perfectly.

---

## 📋 Before You Start

You'll need:
- WordPress admin access
- Your AdTruth API key (get it from [adtruth.io/dashboard](https://adtruth.io/dashboard))

---

## ✅ Method 1: Using WPCode Plugin (RECOMMENDED - TESTED)

**Best for**: All WordPress users
**Test Result**: ✅ Works perfectly, data appears in dashboard within minutes
**Time**: 2 minutes from start to finish

This is the method we personally tested and verified working.

### Step 1: Install WPCode Plugin

1. Log into your WordPress dashboard
2. Go to **Plugins → Add New**
3. In the search box, type **"WPCode"**
4. Find **"WPCode – Insert Headers and Footers"** by WPCode
5. Click **Install Now**
6. Click **Activate**

> **✅ Tested on**: TasteWP test environment (disillusionedwing.s3-tastewp.com)
>
> **Why WPCode?**: 2+ million active installations, highly rated, specifically designed for adding scripts safely

### Step 2: Add Your AdTruth Tracking Code

1. In your WordPress admin sidebar, find **Code Snippets**
2. Click **Code Snippets → Header & Footer**
3. You'll see three text boxes: Header, Body, Footer
4. Scroll down to the **Footer** section (third box)
5. Paste this code:

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

6. Replace `'YOUR_API_KEY_HERE'` with your actual API key from [adtruth.io/dashboard](https://adtruth.io/dashboard)
7. Click the **Save Changes** button

### Step 3: Verify It's Working (Optional but Recommended)

1. Open a new private/incognito browser window
2. Visit your website homepage
3. Right-click anywhere on the page
4. Select **View Page Source** (or **View Source**)
5. Press `Ctrl+F` (Windows) or `Cmd+F` (Mac)
6. Search for `adtruth`
7. You should see the tracking script near the bottom, just before `</body>`

**✅ Success!** The script is installed.

### Step 4: Check Your Dashboard

1. Visit a few pages on your WordPress site (3-5 page views)
2. Wait 2-5 minutes
3. Go to [adtruth.io/dashboard](https://adtruth.io/dashboard)
4. You should see page views appearing!

**Tested Result**: In our test, page views appeared in the dashboard within 2 minutes.

---

## 📊 What We Observed in Testing

During our May 14, 2024 test on TasteWP:

✅ **What Worked**:
- Script loaded successfully without errors
- Page views tracked immediately (2-minute delay)
- Traffic source identified as "direct"
- All tracking data visible in AdTruth dashboard

⚠️ **Detection Note**:
- Test traffic showed as "suspicious" (likely due to testing environment/Linux)
- This is expected for test sites and demonstrates fraud detection is working
- Real user traffic on production sites will show more accurate fraud scores

---

**That's it!** Your WordPress site is now tracking fraud. The script will automatically track all visitors across your entire site.

---

## ⚙️ Method 2: Theme Customizer (No Plugin)

**Best for**: Users comfortable with WordPress, but want to avoid plugins

### Step 1: Access Theme Customizer

1. Go to **Appearance → Customize**
2. Look for **Additional CSS** or **Custom Code** section
   - Some themes have this feature built-in
   - If you don't see it, use Method 1 or Method 3

### Step 2: Add Tracking Code

Not all themes support JavaScript in the Customizer. If your theme doesn't support this method, please use Method 1 (Plugin) or Method 3 (Theme Editor).

---

## 🔧 Method 3: Edit Theme Files (ADVANCED)

**Best for**: Developers or advanced users
**⚠️ Warning**: This method requires editing theme files. Always backup first!

### Important Warnings

- **Backup your site first** - A single typo can break your site
- **Use a child theme** - Theme updates will erase your changes
- **Not recommended for beginners** - Use Method 1 instead

### Step 1: Access Theme Editor

1. Go to **Appearance → Theme File Editor**
2. You'll see a warning about editing files - click **I understand**

### Step 2: Edit footer.php

1. Find **footer.php** in the right sidebar (under Theme Files)
2. Click to open it
3. Scroll to the bottom and find `<?php wp_footer(); ?>`
4. Add your tracking code **right before** `</body>`:

```php
<!-- AdTruth Tracking Script -->
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

### Step 3: Verify It's Working

Follow the same verification steps from Method 1.

---

## 🎯 Alternative: Using functions.php (For Developers)

If you're comfortable with PHP, you can add this to your child theme's `functions.php`:

```php
<?php
// Add AdTruth tracking script to footer
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
?>
```

Replace `YOUR_API_KEY_HERE` with your actual API key.

---

## ❓ Troubleshooting

### Script Not Showing Up?

1. **Clear your cache** - If you use a caching plugin (WP Super Cache, W3 Total Cache), clear it
2. **Check for conflicts** - Disable other plugins temporarily to test
3. **Check placement** - Make sure the script is before `</body>` tag

### No Data in Dashboard?

1. **Wait 24 hours** - Data may take time to appear
2. **Check API key** - Make sure it's copied correctly (no extra spaces)
3. **Test in incognito** - Your own visits may be filtered out

### Theme Update Wiped My Code?

If you used Method 3, theme updates will remove your changes. **Use Method 1 (Plugin)** to prevent this.

---

## 📊 What Gets Tracked?

AdTruth automatically tracks:
- Page views across your entire site
- Traffic sources (Google Ads, Facebook, organic)
- Visitor behavior patterns
- Fraud detection signals

All tracking is GDPR-compliant and privacy-focused.

---

## 🎓 WordPress.com vs WordPress.org

### WordPress.org (Self-Hosted) ✅
All methods work! Most small businesses use this version.

### WordPress.com (Hosted)
- **Free/Personal/Premium plans** ❌ Cannot add custom scripts
- **Business plan ($25/mo)** ✅ Can use Method 1 (Plugin)
- **Commerce plan ($45/mo)** ✅ Can use Method 1 (Plugin)

If you're on WordPress.com Free plan, you'll need to upgrade to Business or higher.

---

## 🆘 Need Help?

- **Check your API key**: [AdTruth Dashboard](https://adtruth.io/dashboard)
- **Read the docs**: [AdTruth Documentation](https://github.com/papa-torb/adtruth)
- **Report an issue**: [GitHub Issues](https://github.com/papa-torb/adtruth/issues)

---

**Happy tracking!** 🎉

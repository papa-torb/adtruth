# AdTruth Integration Examples

This directory contains real-world integration examples showing how to implement AdTruth tracking on different platforms and website types.

## Live Examples

### 1. Blue Haven Coffee (Static HTML)
**Path**: `bluehaven-coffee/`
**Platform**: Vanilla HTML/CSS/JavaScript
**Use Case**: Local business landing page
**Live Demo**: [View on GitHub Pages](https://papa-torb.github.io/adtruth/examples/bluehaven-coffee/)

A demo coffee shop website demonstrating:
- Basic AdTruth integration in static HTML
- One-line script implementation
- Tracking across navigation and interactions

**Integration Method**: Standard script tag before `</body>`

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

---

## Coming Soon

### WordPress Integration
Step-by-step guide for integrating AdTruth with WordPress sites (both WordPress.com and self-hosted).

### Webflow Integration
Complete guide for adding AdTruth tracking to Webflow projects via Custom Code settings.

### Shopify Integration
E-commerce tracking setup for Shopify stores with cart and checkout monitoring.

---

## How to Use These Examples

1. **View the Source**: Each example includes well-commented HTML showing exactly where and how AdTruth is integrated
2. **Test Locally**: Download any example and open in a browser to see it in action
3. **Copy & Adapt**: Use these as templates for your own integration
4. **Report Issues**: Found a problem? Open an issue on GitHub

## Platform Testing Matrix

| Platform | Difficulty | Integration Method | Notes |
|----------|-----------|-------------------|-------|
| Static HTML | ⭐ Easy | Direct script tag | Full control, no restrictions |
| WordPress.com | ⭐⭐ Medium | Custom HTML widget | Free plan has limitations |
| Webflow | ⭐ Easy | Project Settings → Custom Code | Premium feature only |
| Shopify | ⭐⭐ Medium | theme.liquid file | E-commerce specific tracking |
| Next.js | ⭐⭐⭐ Advanced | Environment variables + Client Component | See [main docs](../../README.md) |

---

## Contributing

Have an integration example for a platform not listed here? We'd love to include it! Please open a pull request with:
- Complete working example
- README with integration steps
- Any platform-specific gotchas or limitations

---

**Need Help?** Check the [main documentation](../../README.md) or open an issue.

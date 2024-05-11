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
    js.src = 'https://cdn.jsdelivr.net/gh/papa-torb/adtruth@latest/dist/adtruth.min.js';
    js.onload = function() {
        AdTruth.init('YOUR_API_KEY_HERE');
    };
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'adtruth-js'));
</script>
```

---

## Platform Integrations (By Market Priority)

Based on 2025 small business website builder market research, we're testing and documenting integrations in priority order:

### 🔴 HIGH PRIORITY - Testing In Progress

#### 1. WordPress (43% of all websites)
- **Market Share**: 63% of CMS-powered sites
- **Status**: 🚧 Testing required
- **Versions**: WordPress.org (self-hosted) + WordPress.com (hosted)
- [View Guide →](wordpress/)

#### 2. Wix (4.1% market share, 45% among builders)
- **Market Share**: 8M live sites, 32.6% YoY growth
- **Status**: 🚧 Testing required
- **Target**: Small businesses, fastest growing platform
- [View Guide →](wix/)

#### 3. Shopify (5.6% overall, 26% of e-commerce)
- **Market Share**: 4M live sites, dominant in e-commerce
- **Status**: 🚧 Testing required
- **Target**: E-commerce businesses with high ad spend
- [View Guide →](shopify/)

### 🟡 MEDIUM PRIORITY - Planned

#### 4. Squarespace (3.4% market share)
- **Market Share**: 3M live sites, 9.7% YoY growth
- **Status**: 🚧 Testing required
- **Target**: Design-focused businesses (photographers, artists)
- [View Guide →](squarespace/)

#### 5. GoDaddy Website Builder (10% among builders)
- **Market Share**: Popular with budget-conscious SMBs
- **Status**: 🚧 Testing required
- **Target**: First-time business owners
- [View Guide →](godaddy/)

### ⚪ LOW PRIORITY - Future Consideration

#### Webflow
- **Target**: Professional/agency sites, not SMB-focused
- **Status**: Deferred
- [View Guide →](webflow/)

#### GitHub Pages
- **Target**: Developer community, open source projects
- **Status**: Deferred
- [View Guide →](github-pages/)

---

## How to Use These Examples

1. **View the Source**: Each example includes well-commented HTML showing exactly where and how AdTruth is integrated
2. **Test Locally**: Download any example and open in a browser to see it in action
3. **Copy & Adapt**: Use these as templates for your own integration
4. **Report Issues**: Found a problem? Open an issue on GitHub

## Platform Testing Matrix

| Platform | Priority | Market Share | Difficulty | Integration Method |
|----------|----------|-------------|-----------|-------------------|
| WordPress.org | 🔴 HIGH | 43% all sites | ⭐⭐ Medium | Theme footer / Plugin |
| Wix | 🔴 HIGH | 4.1% (fastest growth) | ⭐⭐ Medium | Custom Code (paid plans) |
| Shopify | 🔴 HIGH | 26% e-commerce | ⭐⭐ Medium | theme.liquid / Scripts |
| Squarespace | 🟡 MEDIUM | 3.4% | ⭐ Easy | Code Injection settings |
| GoDaddy | 🟡 MEDIUM | 10% builders | ⭐⭐ Medium | Header/Footer scripts |
| Static HTML | ✅ DONE | - | ⭐ Easy | Direct script tag |
| Webflow | ⚪ LOW | Professional | ⭐ Easy | Custom Code (paid only) |
| GitHub Pages | ⚪ LOW | Developers | ⭐⭐ Medium | Jekyll includes |
| Next.js | ✅ TESTED | Production | ⭐⭐⭐ Advanced | See [main docs](../../README.md) |

---

## Contributing

Have an integration example for a platform not listed here? We'd love to include it! Please open a pull request with:
- Complete working example
- README with integration steps
- Any platform-specific gotchas or limitations

---

**Need Help?** Check the [main documentation](../../README.md) or open an issue.

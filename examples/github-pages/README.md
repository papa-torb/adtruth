# GitHub Pages Integration (Testing Required)

**Priority**: ⚪ LOW (Developer community, not SMB target market)
**Status**: 🚧 Deferred - Testing after high-priority platforms

This integration guide is planned but requires testing before documentation.

## Testing Checklist

- [ ] Test with static HTML (no generator)
- [ ] Test with Jekyll (GitHub's default)
- [ ] Test with Hugo
- [ ] Test with custom domain
- [ ] Test with github.io subdomain
- [ ] Verify tracking works after Jekyll build
- [ ] Document _includes or _layouts integration

## Potential Integration Methods

1. **Direct HTML** (static sites)
2. **Jekyll _includes partial** (reusable across pages)
3. **Jekyll _layouts/default.html** (site-wide)
4. **Hugo baseof.html template** (Hugo sites)

## Known Considerations

- Jekyll may process HTML/JS during build
- Need to ensure CDN URL isn't modified
- May need to use {% raw %} tags in Jekyll
- Build process might affect script loading

---

**Want to help?** Test AdTruth on your GitHub Pages site and report findings!

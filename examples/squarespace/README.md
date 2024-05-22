# Squarespace Integration (Testing Required)

**Priority**: 🟡 MEDIUM (3.4% market share, 18% among website builders)
**Status**: 🚧 Not yet tested
**Market Data**: 3M live sites, 9.7% YoY growth, design-focused platform

This integration guide is planned but requires testing before documentation. Squarespace is popular with photographers, artists, and design-focused businesses.

## Testing Checklist

- [ ] Test with Personal plan ($16/mo - has Code Injection)
- [ ] Test Code Injection in Settings → Advanced → Code Injection
- [ ] Verify tracking in "Footer" injection section
- [ ] Verify tracking on published site
- [ ] Test with different Squarespace templates
- [ ] Test with Squarespace Commerce (e-commerce plans)
- [ ] Test with Squarespace's built-in analytics
- [ ] Document any conflicts with marketing pixels
- [ ] Test page transitions (Squarespace uses AJAX)

## Potential Integration Methods

1. **Settings → Advanced → Code Injection → Footer** (Recommended)
2. **Individual Page → Settings → Advanced → Page Header Code Injection** (Page-specific)
3. **Code Block** (Not recommended, limited to single page)

## Known Considerations

- Code Injection available on all paid plans (Personal $16/mo and up)
- Squarespace uses AJAX page transitions (may affect tracking)
- Built-in Squarespace Analytics may conflict
- Templates are tightly controlled (limited customization)
- Need to verify script persists across page navigations

## Market Opportunity

Squarespace targets creative professionals and premium businesses:
- Photographers running Instagram/Facebook ads
- E-commerce boutiques (Squarespace Commerce)
- Service businesses with high margins
- Design-focused businesses (portfolios, agencies)

These businesses often run paid ads and benefit from fraud detection.

---

**Want to help?** Test AdTruth on your Squarespace site and report findings!

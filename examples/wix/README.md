# Wix Integration (Testing Required)

**Priority**: 🔴 HIGH (4.1% market share, 45% among website builders)
**Status**: 🚧 Not yet tested
**Market Data**: 8M live sites, 32.6% YoY growth (fastest growing platform)

This integration guide is planned but requires testing before documentation. Wix is our #2 priority due to explosive growth and dominance in the small business segment.

## Testing Checklist

- [ ] Test with Wix free account limitations
- [ ] Test with paid plan (Custom Code access)
- [ ] Verify tracking in Wix Editor preview mode
- [ ] Verify tracking on published site
- [ ] Test with Wix ADI (Artificial Design Intelligence) sites
- [ ] Test with Wix Editor X (advanced editor)
- [ ] Test with Wix Velo (code platform)
- [ ] Document Tracking & Analytics section behavior
- [ ] Test interaction with Wix's built-in analytics

## Potential Integration Methods

1. **Tracking & Analytics → Custom Code** (Paid plans: Combo $16+/mo)
2. **Settings → Custom Code → Body - end** (Recommended location)
3. **Embed HTML iFrame** (Not recommended, limited tracking)
4. **Wix Velo (Code)** (For developers using Wix's JS platform)

## Known Considerations

- Custom Code feature requires paid plan (Combo $16/mo or higher)
- Free accounts cannot add custom scripts to head/body tags
- Wix may have conflicts with their own analytics (Wix Analytics)
- ADI sites may have different script injection points
- Need to verify script loads after Wix's page transitions

## Market Opportunity

Wix is the **fastest-growing** platform (32.6% YoY) and specifically targets small businesses. These businesses typically:
- Run Google/Facebook ads (high fraud risk)
- Have limited tech knowledge (need simple integration)
- Use Wix's built-in marketing tools (already ad-focused)

**Perfect target market for AdTruth.**

---

**Want to help?** Test AdTruth on your Wix site and report findings!

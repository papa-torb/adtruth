# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1] - 2024-07-14

### Fixed
- Page unload tracking now correctly captures session duration instead of showing 5ms
- Fixed CORS issues with fetch requests by adding `credentials: 'omit'`
- Fixed backend endpoint URLs to include trailing slash (prevents 307 redirects)

### Changed
- Replaced `sendBeacon()` with `fetch(..., {keepalive: true})` for better CORS control
- Improved reliability of behavior data transmission on page unload

## [0.2.0] - 2024-07-05

### Added
- **Page unload tracking**: Captures accurate time-on-page using beforeunload/pagehide/unload events
- **Platform integration guides**: Comprehensive guides for WordPress, Shopify, and Wix
- Integration examples with Blue Haven Coffee demo site
- CDN versioning strategy using @latest tag for automatic updates

### Changed
- Improved README structure with better visual hierarchy
- Enhanced documentation with production URLs (adtruth.io, api.adtruth.io)
- Optimized for search discoverability with keyword-rich sections

### Fixed
- Broken navigation links in README header
- Core positioning clarity: AdTruth is detection/analytics, not blocking

## [0.1.2] - 2024-01-19

### Added
- Initial public release with core fraud detection features
- Browser fingerprinting (screen resolution, timezone, language, platform)
- Basic behavior tracking (time on page, click events, scroll depth)
- Canvas fingerprinting for unique device signatures
- Mouse movement and touch tracking for bot detection
- Session and visitor ID generation
- UTM parameter and referrer tracking

### Changed
- Improved build configuration with Rollup
- Enhanced minification (bundle size: ~12KB)

## [0.1.1] - 2024-01-12

### Added
- Initial SDK development
- Basic page view tracking
- API key authentication
- Integration with backend API

### Changed
- Core tracking infrastructure
- Data transmission to api.adtruth.io

## [Unreleased]

### Planned
- TypeScript definitions for better IDE support
- Enhanced error handling and retry logic
- Batch data transmission for performance
- WebGL fingerprinting
- Custom event tracking API
- npm package publication

---

## Version Support

| Version | Supported | Status |
|---------|-----------|--------|
| 0.2.x   | ✅        | Active development |
| 0.1.x   | ❌        | No longer supported |

## Upgrade Guide

### Upgrading from 0.1.x to 0.2.x

**No breaking changes** - v0.2.x is fully backward compatible with v0.1.x.

The main improvements are:
- More accurate time-on-page tracking
- Better cross-origin request handling
- Platform integration guides

**Recommendation**: Update to v0.2.1 immediately for accurate behavior data.

```html
<!-- Update your CDN URL to @latest for automatic updates -->
<script src="https://cdn.jsdelivr.net/gh/papa-torb/adtruth@latest/dist/adtruth.min.js"></script>
```

## Release Notes Format

We follow semantic versioning (MAJOR.MINOR.PATCH):
- **MAJOR**: Breaking changes that require user action
- **MINOR**: New features, backward compatible
- **PATCH**: Bug fixes, backward compatible

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to suggest changes or report issues.

## Security

See [SECURITY.md](SECURITY.md) for our security policy and how to report vulnerabilities.

[0.2.1]: https://github.com/papa-torb/adtruth/releases/tag/v0.2.1
[0.2.0]: https://github.com/papa-torb/adtruth/releases/tag/v0.2.0
[0.1.2]: https://github.com/papa-torb/adtruth/releases/tag/v0.1.2
[0.1.1]: https://github.com/papa-torb/adtruth/releases/tag/v0.1.1
[Unreleased]: https://github.com/papa-torb/adtruth/compare/v0.2.1...HEAD

# Development Guide

Complete guide for setting up, developing, and contributing to AdTruth.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Building](#building)
- [Testing](#testing)
- [Code Style](#code-style)
- [Debugging](#debugging)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

### Required

- **Node.js**: v14.x or higher (v18.x recommended)
- **npm**: v6.x or higher (comes with Node.js)
- **Git**: v2.x or higher

### Optional

- **Code editor**: VS Code recommended (with ESLint + Prettier extensions)
- **Browser**: Chrome/Firefox with developer tools
- **HTTP server**: For testing (e.g., `python -m http.server` or `npx serve`)

### Check Your Environment

```bash
node --version  # Should be v14.x or higher
npm --version   # Should be v6.x or higher
git --version   # Should be v2.x or higher
```

---

## Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub first, then:
git clone https://github.com/YOUR_USERNAME/adtruth.git
cd adtruth
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- **Rollup**: Module bundler
- **Terser**: JavaScript minifier
- **ESLint**: Code linting
- **Prettier**: Code formatting

### 3. Verify Installation

```bash
npm run build
```

If successful, you should see:
```
dist/adtruth.js created
dist/adtruth.min.js created
dist/adtruth.esm.js created
```

---

## Project Structure

```
adtruth/
├── .github/              # GitHub templates and workflows
│   ├── ISSUE_TEMPLATE/   # Bug reports, feature requests
│   └── PULL_REQUEST_TEMPLATE.md
├── dist/                 # Built files (committed for CDN)
│   ├── adtruth.js        # Development build (IIFE)
│   ├── adtruth.min.js    # Production build (minified)
│   └── adtruth.esm.js    # ES Module build
├── docs/                 # Documentation
│   ├── API.md            # API reference
│   ├── DEVELOPMENT.md    # This file
│   ├── ARCHITECTURE.md   # System design
│   └── images/           # Screenshots and diagrams
├── examples/             # Platform integration guides
│   ├── wordpress/        # WordPress integration
│   ├── shopify/          # Shopify integration
│   └── wix/              # Wix integration
├── src/                  # Source code
│   ├── index.js          # Public API
│   ├── core/             # Core tracking logic
│   │   ├── tracker.js    # Main tracker
│   │   ├── session.js    # Session management
│   │   └── url.js        # URL parsing
│   ├── fingerprint/      # Browser fingerprinting
│   │   ├── basic.js      # Basic fingerprinting
│   │   └── canvas.js     # Canvas fingerprinting
│   ├── behavior/         # Behavioral tracking
│   │   ├── mouse.js      # Mouse tracking
│   │   ├── touch.js      # Touch tracking
│   │   └── scroll.js     # Scroll tracking
│   └── utils/            # Helper functions
│       ├── hash.js       # Hashing utilities
│       └── storage.js    # LocalStorage wrapper
├── tests/                # Test files
│   ├── integration/      # Integration tests
│   └── manual/           # Manual HTML test files
├── .editorconfig         # Editor configuration
├── .eslintrc.json        # ESLint configuration
├── .prettierrc           # Prettier configuration
├── .gitignore            # Git ignore rules
├── package.json          # NPM configuration
├── rollup.config.mjs     # Build configuration
├── CHANGELOG.md          # Version history
├── CODE_OF_CONDUCT.md    # Community standards
├── CONTRIBUTING.md       # Contribution guidelines
├── LICENSE               # MIT License
├── README.md             # Project overview
└── SECURITY.md           # Security policy
```

---

## Development Workflow

### Standard Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Edit files in `src/`
   - Follow code style guidelines
   - Add comments for complex logic

3. **Build and test**
   ```bash
   npm run build
   npm test  # When tests are available
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add feature: brief description"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   # Then create a Pull Request on GitHub
   ```

### Branch Naming Convention

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/what-changed` - Documentation updates
- `refactor/what-changed` - Code refactoring
- `test/what-added` - Test additions

---

## Building

### Build Commands

```bash
# Build all formats
npm run build

# Build with watch mode (auto-rebuild on changes)
npm run dev

# Clean dist folder
rm -rf dist/
```

### Build Outputs

| File | Format | Use Case |
|------|--------|----------|
| `dist/adtruth.js` | IIFE | Browser script tag (development) |
| `dist/adtruth.min.js` | IIFE (minified) | Production CDN |
| `dist/adtruth.esm.js` | ES Module | Modern bundlers (Webpack, Vite) |

### Build Configuration

The build is configured in `rollup.config.mjs`:

```javascript
export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/adtruth.js',
      format: 'iife',
      name: 'AdTruth'
    }
  }
  // ... other configurations
];
```

---

## Testing

### Manual Testing

**1. Create a test HTML file:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>AdTruth Test</title>
</head>
<body>
  <h1>AdTruth Development Test</h1>

  <script src="../dist/adtruth.js"></script>
  <script>
    AdTruth.init('test_api_key', { debug: true });

    // View metrics after 5 seconds
    setTimeout(() => {
      console.log('Metrics:', AdTruth.getMetrics());
    }, 5000);
  </script>
</body>
</html>
```

**2. Serve the file:**

```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve -p 8080

# Using PHP
php -S localhost:8080
```

**3. Open in browser:**

```
http://localhost:8080/tests/your-test.html
```

**4. Check console:**
- Look for "AdTruth: Initialized" message
- Check for tracking events
- Verify no errors

### Automated Testing (Coming Soon)

```bash
# Run unit tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- tests/unit/tracker.test.js
```

---

## Code Style

### ESLint

Enforce code quality standards:

```bash
# Check for linting errors
npx eslint src/

# Auto-fix issues
npx eslint src/ --fix
```

### Prettier

Format code automatically:

```bash
# Check formatting
npx prettier --check "src/**/*.js"

# Auto-format
npx prettier --write "src/**/*.js"
```

### EditorConfig

Install the EditorConfig plugin for your editor to automatically apply:
- 2-space indentation
- UTF-8 encoding
- Unix line endings
- Trim trailing whitespace

### Code Standards

**1. Naming Conventions:**
- `camelCase` for variables and functions
- `PascalCase` for classes
- `UPPER_SNAKE_CASE` for constants
- Descriptive names (avoid single letters except loop counters)

**2. Comments:**
```javascript
// Good: Explains WHY
// Cache fingerprint to avoid recalculation on every track() call
const fingerprint = generateFingerprint();

// Bad: Explains WHAT (obvious from code)
// Set fingerprint variable
const fingerprint = generateFingerprint();
```

**3. Function Length:**
- Keep functions under 50 lines
- Extract complex logic into separate functions
- One function = one responsibility

**4. Error Handling:**
```javascript
// Always wrap risky operations
try {
  const data = JSON.parse(localStorage.getItem('key'));
} catch (error) {
  console.error('Failed to parse storage:', error);
  // Provide fallback
}
```

---

## Debugging

### Browser DevTools

**Enable debug mode:**
```javascript
AdTruth.init('your_api_key', { debug: true });
```

**Check console for:**
- Initialization messages
- Tracking events
- Network requests
- Error messages

### View Metrics

```javascript
// Get current tracking data
const metrics = AdTruth.getMetrics();
console.log('Behavior:', metrics.behavior);
console.log('Fingerprint:', metrics.fingerprint);
```

### Network Monitoring

1. Open DevTools → Network tab
2. Filter by `adtruth` or API domain
3. Check request/response:
   - Status code (should be 200)
   - Request payload
   - Response time

### Common Debug Patterns

```javascript
// Log function entry/exit
function trackPageview() {
  console.log('[AdTruth] trackPageview() called');
  // ... function logic
  console.log('[AdTruth] trackPageview() completed');
}

// Time operations
console.time('fingerprint');
const fp = generateFingerprint();
console.timeEnd('fingerprint');

// Inspect objects
console.table(behaviorMetrics);
```

---

## Common Tasks

### Add a New Tracking Feature

1. Create feature file in appropriate directory:
   ```bash
   touch src/behavior/keyboard.js
   ```

2. Implement the feature:
   ```javascript
   export function trackKeyboard() {
     // Implementation
   }
   ```

3. Import in tracker:
   ```javascript
   import { trackKeyboard } from './behavior/keyboard.js';
   ```

4. Test locally
5. Update API documentation
6. Create pull request

### Update API Endpoint

Edit `src/core/tracker.js`:

```javascript
const API_ENDPOINT = 'https://api.adtruth.io';
```

### Add Configuration Option

1. Add to init options:
   ```javascript
   init: function(apiKey, options = {}) {
     const config = {
       debug: options.debug || false,
       newOption: options.newOption || 'default'  // Add here
     };
   }
   ```

2. Document in API.md
3. Update README examples

### Modify Fingerprinting

Edit files in `src/fingerprint/`:
- `basic.js` - Screen, timezone, language
- `canvas.js` - Canvas-based fingerprinting

**Important:** Changes to fingerprinting affect fraud detection accuracy. Test thoroughly.

---

## Troubleshooting

### Build Issues

**Problem:** `npm run build` fails

**Solutions:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be v14+

# Try with --legacy-peer-deps
npm install --legacy-peer-deps
```

### Import Errors

**Problem:** `Cannot find module './core/tracker.js'`

**Solution:** Ensure file extensions are included in imports:
```javascript
// Correct
import tracker from './core/tracker.js';

// Wrong
import tracker from './core/tracker';
```

### CORS Errors in Testing

**Problem:** Network requests blocked by CORS

**Solution:** Use a local server (not `file://`):
```bash
python -m http.server 8080
# Then access via http://localhost:8080
```

### Module Not Exported

**Problem:** `AdTruth is not defined`

**Solution:** Check `src/index.js` exports:
```javascript
export default AdTruth;  // Must be present
```

### Storage Issues

**Problem:** localStorage not available

**Solution:** Check browser privacy settings, use try-catch:
```javascript
try {
  localStorage.setItem('test', '1');
} catch (e) {
  console.warn('localStorage unavailable, using memory storage');
}
```

---

## Performance Tips

### Optimize Builds

```bash
# Check bundle size
ls -lh dist/adtruth.min.js

# Analyze bundle composition (if using webpack)
npm run analyze
```

### Code Optimization

- Minimize DOM operations
- Debounce event listeners
- Use requestAnimationFrame for animations
- Avoid synchronous XHR

### Testing Performance

```javascript
console.time('init');
AdTruth.init('test_key');
console.timeEnd('init');  // Should be < 50ms
```

---

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for detailed contribution guidelines.

**Quick checklist before submitting PR:**
- [ ] Code follows style guidelines
- [ ] Comments added for complex logic
- [ ] Built successfully (`npm run build`)
- [ ] Tested manually
- [ ] Documentation updated
- [ ] No console errors
- [ ] PR template filled out

---

## Additional Resources

- **API Reference**: [docs/API.md](API.md)
- **Architecture**: [docs/ARCHITECTURE.md](ARCHITECTURE.md)
- **Changelog**: [CHANGELOG.md](../CHANGELOG.md)
- **Security**: [SECURITY.md](../SECURITY.md)
- **Rollup Documentation**: https://rollupjs.org/
- **ES6 Modules**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

---

## Getting Help

- **Questions**: Open a [GitHub Discussion](https://github.com/papa-torb/adtruth/discussions)
- **Bugs**: File an [issue](https://github.com/papa-torb/adtruth/issues)
- **Feature Requests**: Use the feature request template

---

*Last updated: October 2024*
# Contributing to AdTruth SDK

First off, thank you for considering contributing to AdTruth! It's people like you that make AdTruth such a great tool for protecting businesses from ad fraud.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive criticism
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and expected**
- **Include screenshots if relevant**
- **Include your environment details** (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Provide specific examples to demonstrate the feature**
- **Describe the current behavior and expected behavior**
- **Explain why this enhancement would be useful**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code follows the existing style
6. Issue that pull request!

## Development Setup

1. **Fork and clone the repository**
```bash
git clone https://github.com/your-username/adtruth.git
cd adtruth
```

2. **Install dependencies**
```bash
npm install
```

3. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

4. **Make your changes**
- Write your code
- Add tests if applicable
- Update documentation

5. **Run tests**
```bash
npm test
```

6. **Build the project**
```bash
npm run build
```

7. **Commit your changes**
```bash
git add .
git commit -m "feat: add amazing feature"
```

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation only changes
- `style:` - Changes that don't affect code meaning
- `refactor:` - Code change that neither fixes a bug nor adds a feature
- `perf:` - Performance improvement
- `test:` - Adding missing tests
- `chore:` - Changes to build process or auxiliary tools

Examples:
```
feat: add browser fingerprinting support
fix: resolve memory leak in tracking function
docs: update API reference for init method
```

## Code Style Guidelines

### JavaScript

- Use ES6+ features
- 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Add JSDoc comments for functions

Example:
```javascript
/**
 * Initialize AdTruth tracking
 * @param {string} apiKey - The API key for authentication
 * @param {Object} options - Configuration options
 * @returns {void}
 */
function init(apiKey, options = {}) {
  // Implementation
}
```

### Testing

- Write unit tests for all new functions
- Maintain test coverage above 80%
- Use descriptive test names

Example:
```javascript
describe('AdTruth.init()', () => {
  it('should initialize with valid API key', () => {
    // Test implementation
  });

  it('should throw error with invalid API key', () => {
    // Test implementation
  });
});
```

## Documentation

- Update README.md if you change functionality
- Add JSDoc comments to all public APIs
- Include examples for new features
- Keep documentation concise and clear

## Review Process

1. All submissions require review before merging
2. We'll review your PR as soon as possible
3. We may suggest changes or improvements
4. After approval, we'll merge your PR

## Recognition

Contributors will be recognized in our:
- README.md contributors section
- Release notes
- Project website

## Questions?

Feel free to:
- Open an issue for questions
- Join our [Discord community](https://discord.gg/adtruth)
- Email us at contribute@adtruth.io

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to AdTruth! 🎉
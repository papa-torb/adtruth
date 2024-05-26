# Security Policy

## Supported Versions

We actively support the following versions of AdTruth with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 0.2.x   | :white_check_mark: |
| 0.1.x   | :x:                |

## Reporting a Vulnerability

We take the security of AdTruth seriously. If you discover a security vulnerability, please follow these steps:

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to:
- **Email**: hongyishui92@gmail.com
- **Subject**: [SECURITY] Brief description of the vulnerability

Alternatively, you can use GitHub's private security advisory feature:
1. Go to the [Security tab](https://github.com/papa-torb/adtruth/security)
2. Click "Report a vulnerability"
3. Fill in the details

### What to Include

When reporting a vulnerability, please include:

- **Description**: Clear description of the vulnerability
- **Impact**: What can an attacker do? What data is at risk?
- **Reproduction**: Step-by-step instructions to reproduce the issue
- **Environment**: Browser version, OS, AdTruth version
- **Proof of Concept**: If applicable, provide code or screenshots
- **Suggested Fix**: If you have ideas on how to fix it (optional)

### What to Expect

- **Acknowledgment**: We will acknowledge receipt of your report within 48 hours
- **Updates**: We will keep you informed of our progress every 5-7 days
- **Timeline**: We aim to release a fix within 30 days for critical vulnerabilities
- **Credit**: We will credit you in the security advisory (unless you prefer to remain anonymous)

### Security Update Process

1. **Triage**: We evaluate the severity and impact
2. **Fix Development**: We develop and test a patch
3. **Release**: We release a new version with the fix
4. **Disclosure**: We publish a security advisory with details
5. **Notification**: We notify users via GitHub releases and documentation

### Security Best Practices for Users

When integrating AdTruth:

- Always use the latest version (v0.2.1 or newer)
- Use HTTPS for your website
- Keep your API keys secure (never commit to public repositories)
- Regularly review our [CHANGELOG](CHANGELOG.md) for security updates
- Subscribe to GitHub releases for security notifications

## Security Features

AdTruth is designed with security in mind:

- **No Personal Data Collection**: We don't collect names, emails, or PII
- **Client-Side Only**: All tracking happens in the browser
- **No Cookies**: We use sessionStorage and localStorage only
- **HTTPS Required**: Our API only accepts HTTPS connections
- **API Key Authentication**: Secure authentication for all tracking requests
- **Rate Limiting**: Protection against abuse (backend)
- **Input Validation**: All data is validated before processing

## Scope

This security policy applies to:

- AdTruth tracking script (src/index.js)
- Distribution files (dist/*.js)
- Backend API (api.adtruth.io)
- Documentation and examples

Out of scope:

- Issues in third-party dependencies (report to respective maintainers)
- Issues in user's implementation (we can help, but it's not a vulnerability)
- Theoretical vulnerabilities without proof of concept

## Contact

For security-related questions or concerns:
- Email: hongyishui92@gmail.com
- GitHub: [@papa-torb](https://github.com/papa-torb)

Thank you for helping keep AdTruth and our users safe!

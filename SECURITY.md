# [PostCSS Prefix Wrap](./README.md) // Security

[![SAST GitHub Pipeline](https://img.shields.io/github/actions/workflow/status/dbtedman/postcss-prefixwrap/sast.yml?branch=main&style=for-the-badge&logo=github&label=sast)](https://github.com/dbtedman/postcss-prefixwrap/actions/workflows/sast.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/dbtedman/postcss-prefixwrap/badge?style=for-the-badge)](https://www.bestpractices.dev/en/projects/6622)

Outlines how security is considered during the development of PostCSS Prefix Wrap.

-   [Provenance](#provenance)
-   [Dependency Vulnerability and Code Scanning](#dependency-vulnerability-and-code-scanning)
-   [Security Disclosure Policy](#security-disclosure-policy)
-   [Security Update Policy](#security-update-policy)
-   [Security Related Configuration](#security-related-configuration)
-   [Known Security Gaps and Future Enhancements](#known-security-gaps-and-future-enhancements)

## Provenance

Since `v1.47.0`, [provenance attestations (docs.npmjs.com)](https://docs.npmjs.com/generating-provenance-statements) are provided alongside build artefacts.

## Dependency Vulnerability and Code Scanning

-   [GitHub code scanning](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/about-code-scanning) via [CodeQL](https://codeql.github.com) and [Snyk](https://snyk.io)
-   [GitHub dependabot alerts](https://docs.github.com/en/code-security/dependabot/dependabot-alerts/about-dependabot-alerts)
-   [GitHub dependabot security updates](https://docs.github.com/en/code-security/dependabot/dependabot-security-updates/about-dependabot-security-updates)
-   [GitHub secret scanning](https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning)
-   [OSV Scanning](https://osv.dev/)
-   [Snyk code analysis](https://snyk.io/product/snyk-code/)
-   [Snyk dependency scanning](https://snyk.io/product/open-source-security-management/)

## Security Disclosure Policy

Privately report a vulnerability using [GitHub Security Advisories](https://github.com/dbtedman/postcss-prefixwrap/security/advisories).

## Security Update Policy

Best efforts will be taken to apply code fixes or update vulnerable packages as soon as is possible, this will usually be within a couple of days.

## Security Related Configuration

None currently.

## Known Security Gaps and Future Enhancements

Look at [GitHub issues tagged **Security**](https://github.com/dbtedman/postcss-prefixwrap/labels/security).

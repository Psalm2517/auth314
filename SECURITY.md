# Security Policy

## Reporting a vulnerability

If you find a security vulnerability in Auth314, please **do not open a public
GitHub issue**. Email **hello@auth314.com** with:

- A description of the vulnerability and its impact
- Steps to reproduce it
- Any proof-of-concept code, if applicable

We'll acknowledge your report within 48 hours and aim to have a fix or
mitigation plan within 7 days for confirmed high-severity issues. We'll credit
you in the fix (unless you'd prefer to stay anonymous).

## Scope

This applies to the Auth314 core service (this repo), the dashboard, the
Discord bot, and the marketing/docs sites. It does not cover Pi Network's own
infrastructure -- report those to the Pi Core Team directly.

## What we consider in scope

- Authentication or authorization bypass (API keys, dashboard sessions, admin access)
- Leaking Pi identity (UID, username) to unauthorized parties
- Forging or replaying verification webhooks
- Injection, XSS, or SSRF in any of the hosted services
- Secrets or credentials exposed in this or related repos

## Out of scope

- Missing security headers with no demonstrated impact
- Rate limiting on non-sensitive endpoints
- Social engineering
- Denial of service against the hosted infrastructure

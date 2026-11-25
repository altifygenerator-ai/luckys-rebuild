# Lucky's Canoe Rental security operations

The current site is a Next.js application hosted on Vercel. It has no WordPress admin panel or WordPress plugins. It is not a fully static export: public weather/river endpoints and a contact email endpoint run on the server.

## Security controls

- The contact endpoint validates JSON request size, origin, phone/email fields and escapes customer content when composing emails. A hidden honeypot helps block simple spambots.
- Optionally activate Cloudflare Turnstile by setting **both** NEXT_PUBLIC_TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY in Vercel production environment variables; redeploy and send a test message. Do not expose the secret or commit it. If only one is set, the form intentionally fails closed.
- Keep the Resend key in Vercel environment variables only, never in the repository.
- Configure an additional **Vercel Firewall** rate limit specifically for POST /api/contact (for example five submissions per minute per IP with a 429 response, tuned after monitoring legitimate traffic). The GitHub code does NOT implement distributed, global rate limiting.
- Confirm CONTACT_TO_EMAIL delivers to Lucky's actual working mailbox, especially if the old caddocanoeandkayak.com domain remains with the previous provider.
- Make sure Vercel/GitHub/registrar administrator accounts use MFA. Review access to the project and rotate credentials if any were exposed.
- Regularly update framework and transitive dependencies, check GitHub Dependabot alerts, and review deployment logs and Vercel Firewall events.

## Release checks

1. Run npm ci, npm run build and npm audit --omit=dev --audit-level=high with the committed package-lock.json.
2. Confirm both new domain variants resolve over HTTPS and non-www redirects to www.
3. Test homepage, cabins, photos, map, river/weather APIs and contact form from a browser.
4. Check HTTP headers, Google Search Console warnings, and the production Vercel deployment state.
5. Verify that domain DNS, registrar control, and contact mailbox ownership are independent of the former WordPress site.

**Do not** tell the business that new security protections are live until the Vercel production deployment is verified.

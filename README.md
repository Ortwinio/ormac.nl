# Ormac.nl

Public website for **Ormac**, a boutique Dutch investor in digital and AI-driven startups and scale-ups. The site is a bilingual single-page app: Dutch at `/`, English at `/en/`.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui

## Local development

```bash
npm ci
npm run dev
```

The dev server binds to **http://127.0.0.1:43127**.

- `/` — Dutch
- `/en/` — English
- `/privacy/` and `/en/privacy/` — privacy statement

The language toggle keeps the same section hash (`#founders`, `#contact`, …) and stores the choice in an `ormac-lang` cookie. There is no redirect from browser language or location. Crawlers always see Dutch at `/`.

The contact form sends all four steps and PDF/Excel attachments from **Ormac <plan@notifications.ormac.nl>** to **plan@ormac.nl** through Resend, using the applicant’s email as Reply-To. The sender is configured with `CONTACT_FROM_EMAIL` on the server; these addresses are not displayed on the website. It includes the selected language. The server validates the request origin, fields, attachments and hidden spam field before sending. Missing configuration and provider failures cannot show a successful submission.

### Enable form delivery

1. Copy `.env.example` to `.env.local` and enter `RESEND_API_KEY` and a verified `CONTACT_FROM_EMAIL`. Keep keys out of chat and git.
2. Verify `notifications.ormac.nl` in Resend and ensure the API key has sending permission for that subdomain. Set `CONTACT_FROM_EMAIL` to `Ormac <plan@notifications.ormac.nl>`.
3. Set `CONTACT_ALLOWED_ORIGINS` to the exact public origin(s). Development additionally allows localhost/127.0.0.1 on ports 43127 and 43129. Restart the server after setting variables. The uncached configuration endpoint exposes only readiness; secrets remain on the server.
4. Submit a clearly labelled test application and confirm it arrives in plan@ormac.nl. A provider acceptance response is not proof of inbox delivery; inspect Resend delivery/bounce status if needed.

The form is disabled for sending until the Resend API key and sender are configured. Automated tests mock the external providers and never send mail (`npm test`, Node 24.x).

Uploads are limited to 5 non-empty PDF/XLS/XLSX documents and 4 MB total (4,000,000 bytes). The pitch deck must be PDF. Both client and server enforce limits; the server checks file signatures and caps the streamed request body. These checks are not malware scanning. The request body is capped at 4,250,000 bytes, below Vercel’s 4.5 MB function limit. Larger attachments require a separate private direct-upload storage integration.

Resend idempotency keys prevent duplicate email sends on retries of an unchanged application. A supplementary per-process limit allows five attempts per email address per 15 minutes. For multi-instance production hosting, use a shared rate-limit store or edge rule. No application contents, attachments or API credentials are logged or stored in a website database.

The bilingual privacy statement and cookie settings are available from every footer. The consent banner has equally prominent accept/reject actions, optional preferences, and withdrawal. `ormac-cookie-consent` remembers the choice for 180 days; old informational acknowledgements are not consent. Cookie choices sync across same-origin tabs and expire even in an open tab.

### Google Analytics

GA4 property **G-54FCVYT04J** is configured in `src/lib/analytics-core.ts`; an optional build-time `NEXT_PUBLIC_GA_MEASUREMENT_ID` overrides it (blank disables Analytics). No Google script, preconnect or measurement is loaded before analytics consent. This implements basic Consent Mode with advertising consent denied. Google Signals and ad personalisation are disabled; withdrawing consent sets Google’s disable flag, clears queued measurements and removes Analytics cookies without reloading or losing form entries.

Only `https://ormac.nl` and `https://www.ormac.nl` may collect data, so local development and Vercel previews do not pollute reports. The site sends manual `page_view` events on public route changes and `generate_lead` only after a successful email-service response, with a fixed form name and language. Form entries, references and attachments are never passed to these events. URLs are restricted to known public paths, with query strings and fragments removed. GA cookies are host-only with a non-renewing 180-day lifetime.

**Google Analytics admin setup (29 September 2026):** Enhanced Measurement is disabled for web stream `10055678257` in property `470426125`, to avoid duplicate or unintended automatic events. User and event retention are set to 2 months with reset on new activity off. User-provided data collection is off. Keep these settings aligned with the privacy statement; the retention setting does not cover aggregated standard reports. Google Signals and ad personalisation are disabled by the website configuration. Review Google’s data-processing terms and account data-sharing settings. Mark `generate_lead` as a key event if desired. The public Measurement ID does not grant access to these account settings.

Check Realtime after a consented production visit. Denied visits intentionally will not appear, and ad blockers can block allowed visits. No consent choice may be treated as evidence of inbox delivery. Automated Analytics tests use a fake adapter and never contact Google.

## Vercel deployment

See [the deployment guide](docs/vercel-deployment.md) for project settings, production environment variables, domains and launch verification. `vercel.json` configures Next.js, reproducible npm installs, lint/tests before the build and the Frankfurt function region. Node 24.x is pinned in `package.json`. Builds use Webpack, which has been verified locally.

## Production build

```bash
npm run build
npm start -- --port 43127
```

## Brand assets

Content sections on both language versions, the privacy pages and the 404 page use `ScrollBlock` for native sticky positioning and a scroll-linked fade. Tall sections remain readable before pinning; section anchors remain on the outer wrapper. Measurements update when form steps, FAQ panels or viewport dimensions change. Reduced-motion preferences and print layouts use the normal document flow, and focused content remains opaque. The contact form, footer and cookie banner stay outside the animation so later blocks cannot cover interactive controls.

Marks, favicons, photography and illustrations live in `public/brand` and `public/images`, copied from Ortwin’s local brand folders (Documents/Ormac BV and Downloads).

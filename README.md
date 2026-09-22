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

The contact form sends all four steps and PDF/Excel attachments to **plan@ormac.nl** through Resend, using the applicant’s email as Reply-To. It includes the selected language. Cloudflare Turnstile is validated on the server (including hostname and action) before sending. Missing configuration, invalid/expired/replayed tokens and provider failures cannot show a successful submission.

### Enable form delivery

1. Copy `.env.example` to `.env.local` and enter `RESEND_API_KEY`, a verified `CONTACT_FROM_EMAIL`, `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`. Keep keys out of chat and git.
2. Verify the sending domain in Resend. Create a **Managed** Turnstile widget for `ormac.nl` and `www.ormac.nl`, with **pre-clearance disabled**. For local delivery testing, use a separate real widget allowing `localhost` and `127.0.0.1`.
3. Set `CONTACT_ALLOWED_ORIGINS` to the exact public origin(s). Development additionally allows localhost/127.0.0.1 on ports 43127 and 43129. Restart the server after setting variables. The site key is provided by an uncached configuration endpoint; secrets remain on the server.
4. Submit a clearly labelled test application and confirm it arrives in plan@ormac.nl. A provider acceptance response is not proof of inbox delivery; inspect Resend delivery/bounce status if needed.

The form is disabled for sending until all credentials are configured. Public Turnstile testing keys are deliberately rejected for real email sending. Automated tests mock the external providers and never send mail (`npm test`, Node 24.x).

Uploads are limited to 5 non-empty PDF/XLS/XLSX documents and 4 MB total (4,000,000 bytes). The pitch deck must be PDF. Both client and server enforce limits; the server checks file signatures and caps the streamed request body. These checks are not malware scanning. The request body is capped at 4,250,000 bytes, below Vercel’s 4.5 MB function limit. Larger attachments require a separate private direct-upload storage integration.

Resend idempotency keys prevent duplicate email sends on retries of an unchanged application. A supplementary per-process limit allows five verified attempts per email address per 15 minutes; Turnstile is the primary abuse check. For multi-instance production hosting, use a shared rate-limit store or edge rule. No application contents, attachments or API credentials are logged or stored in a website database.

The bilingual privacy statement and cookie information are available from the footer. The informational cookie banner uses `ormac-cookie-notice` to remember dismissal for 180 days and can be reopened from the footer. There are no analytics or advertising trackers. Update the privacy copy when enabling form delivery or changing data processing; increment the notice version in `src/lib/cookie-notice.ts` when visitors need to see an updated notice.

## Vercel deployment

See [the deployment guide](docs/vercel-deployment.md) for project settings, production environment variables, domains and launch verification. `vercel.json` configures Next.js, reproducible npm installs, lint/tests before the build and the Frankfurt function region. Node 24.x is pinned in `package.json`. Builds use Webpack, which has been verified locally.

## Production build

```bash
npm run build
npm start -- --port 43127
```

## Brand assets

Content sections on both language versions, the privacy pages and the 404 page use `ScrollBlock` for native sticky positioning and a scroll-linked fade. Tall sections remain readable before pinning; section anchors remain on the outer wrapper. Measurements update when form steps, FAQ panels or viewport dimensions change. Reduced-motion preferences and print layouts use the normal document flow, and focused content remains opaque. The footer and cookie notice stay outside the animation.

Marks, favicons, photography and illustrations live in `public/brand` and `public/images`, copied from Ortwin’s local brand folders (Documents/Ormac BV and Downloads).

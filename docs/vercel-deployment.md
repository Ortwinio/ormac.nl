# Deploy Ormac to Vercel

## Project settings

Import this repository into Vercel with the repository root as **Root Directory** and **Next.js** as the framework. Commit the prepared source files and lockfile before importing. No static export or custom output directory is needed: the contact form requires a Node.js function.

The repository supplies these settings:

| Setting | Value |
| --- | --- |
| Node.js | `24.x` (`package.json`, `.nvmrc`) |
| Install command | `npm ci` |
| Build command | `npm run check && npm run build` |
| Output directory | Next.js default (`.next`) |
| Function region | Frankfurt (`fra1`) |
| Contact function duration | 60 seconds |

`npm run check` runs ESLint and contact-handler tests with mocked providers; it never sends email. `npm run build` uses Webpack. The language routing uses Next.js 16's `src/proxy.ts`; API and static assets bypass it. The function region controls application execution, not the storage locations of Resend or Cloudflare.

## Production environment variables

Add these in **Project Settings → Environment Variables**, scoped to **Production**. Use `.env.example` as the template; never upload `.env.local` or put secrets in Git or `vercel.json`. None of these names needs a `NEXT_PUBLIC_` prefix.

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | Resend API key with permission to send from the verified domain |
| `CONTACT_FROM_EMAIL` | `Ormac <plan@ormac.nl>` after verifying `ormac.nl` in Resend |
| `TURNSTILE_SITE_KEY` | Site key for the production Managed widget |
| `TURNSTILE_SECRET_KEY` | Matching secret key |
| `CONTACT_ALLOWED_ORIGINS` | `https://ormac.nl,https://www.ormac.nl` |

Create a Cloudflare Turnstile **Managed** widget with `ormac.nl` and `www.ormac.nl` allowed and **pre-clearance disabled**. The server checks both hostname and the `contact` action. Public testing keys cannot enable delivery. The recipient remains `plan@ormac.nl` on the server; the public website does not display it.

All four service settings must be present before the form enables sending. `/api/contact/` exposes only readiness and the public widget site key; readiness confirms configuration is present, not that credentials or delivery work. Redeploy after changing environment variables.

Keep delivery credentials absent from Preview deployments by default; the website can be reviewed with submission disabled. For a deliberate live preview test, configure all variables for that environment, allow its exact HTTPS origin and add its hostname to a separate real Turnstile widget. Preview sends still go to the real recipient. Do not allow wildcard preview origins. Vercel sets `X-Robots-Tag: noindex` on Preview deployments by default; retain this behavior.

## Domains and delivery

Add `ormac.nl` and `www.ormac.nl` under Vercel **Domains**. Use `ormac.nl` as the canonical production domain and configure `www.ormac.nl` to redirect to it. Apply the DNS values Vercel supplies for this project. Preserve existing email MX records and Resend verification records when changing website DNS. Confirm HTTPS works before testing the form.

Canonical links, language alternatives, robots and sitemap already use `https://ormac.nl`. Check all four public routes: `/`, `/en/`, `/privacy/` and `/en/privacy/`.

The form accepts up to five PDF/Excel documents with **4 MB total file content** (4,000,000 bytes). The server caps the complete multipart body at 4,250,000 bytes, leaving room below Vercel's 4.5 MB request limit. The pitch deck must be a PDF. Supporting larger files requires private direct-to-storage uploads; increasing this limit alone will not work on Vercel.

Turnstile is the primary automated-submission check. The supplemental five-attempts-per-email limit is per process and can reset or differ across Vercel instances. It is not a global production quota. If a global limit is needed, configure a Vercel Firewall rule for POST `/api/contact/` (accounting for shared IPs) or add a shared rate-limit store.

## Verification

Before importing:

```sh
npm ci
npm run check
npm run build
```

After the production domain and credentials are configured:

1. Open the Dutch and English home and privacy pages; check footer links, language switching, the cookie notice and the footer plan button.
2. Check `/api/contact/` returns `ready: true` and the expected public site key, with no API secrets or recipient address.
3. Submit a clearly labelled test application with small synthetic PDF/Excel documents. Complete the real human check and verify both the success message and receipt in `plan@ormac.nl`. Review Resend delivery/bounce status if mail is missing; API acceptance alone does not prove inbox delivery.
4. Confirm files totaling more than 4 MB show the size error and that submission remains unavailable without a completed human check.
5. Check `/robots.txt`, `/sitemap.xml`, the canonical domain redirect and the Preview `noindex` header.

Preparation and automated tests do not prove live delivery. That final check requires valid Resend/Turnstile credentials and the deployed domain.

## References

- [Vercel function limits](https://vercel.com/docs/functions/limitations)
- [Supported Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)
- [Vercel project configuration](https://vercel.com/docs/project-configuration/vercel-json)
- [Preview indexing](https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines)

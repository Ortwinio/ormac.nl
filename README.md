# Ormac.nl

Public website for **Ormac**, a boutique Dutch investor in digital and AI-driven startups and scale-ups. The site is a bilingual single-page app: Dutch at `/`, English at `/en/`.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui

## Local development

```bash
npm install
npm run dev
```

The dev server binds to **http://127.0.0.1:43127**.

- `/` — Dutch
- `/en/` — English
- `/privacy/` and `/en/privacy/` — privacy statement

The language toggle keeps the same section hash (`#founders`, `#contact`, …) and stores the choice in an `ormac-lang` cookie. There is no redirect from browser language or location. Crawlers always see Dutch at `/`.

The contact form includes a hidden `taal` field (`nl` or `en`) so each submission shows which language to reply in. Submits validate in the browser; nothing is emailed in this preview.

## Production build

```bash
npm run build
npm start -- --port 43127
```

## Brand assets

Marks, favicons, photography and illustrations live in `public/brand` and `public/images`, copied from Ortwin’s local brand folders (Documents/Ormac BV and Downloads).

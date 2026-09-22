# Ormac.nl

Public website for **Ormac**, a boutique early-stage investor in the Netherlands. The first slice is a homepage with a full-bleed hero and an approach section, plus a contact page with a working form UI (no backend).

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui

## Local development

```bash
npm install
npm run dev
```

The dev server binds to **http://localhost:43127**.

Open `/` for the homepage and `/contact` for the enquiry form. Submit on contact validates in the browser and shows a confirmation state; nothing is emailed or stored.

## Production build

```bash
npm run build
npm start -- --port 43127
```

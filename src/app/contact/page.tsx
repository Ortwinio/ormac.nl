import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Write to Ormac about a pre-seed or seed round, a partnership, or an introduction.",
};

export default function ContactPage() {
  return (
    <div className="bg-background pt-16 sm:pt-[4.25rem]">
      <section className="border-b border-border bg-[#0c1524] text-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <p className="text-[0.72rem] tracking-[0.22em] text-[var(--gold)] uppercase">
            Contact
          </p>
          <h1 className="font-heading mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">
            Start with a short, useful note.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
            Founders, co-investors, and operators are welcome. Tell us who you
            are, what you are building, and what you need. We read everything
            that arrives.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:gap-16 lg:py-20">
        <div>
          <h2 className="font-heading text-2xl tracking-tight">Send a message</h2>
          <p className="mt-2 mb-8 text-sm text-muted-foreground">
            Required fields are marked. The form validates on this page; no
            backend is connected in this preview.
          </p>
          <ContactForm />
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-[#f3eee4] p-6 sm:p-8">
          <h2 className="font-heading text-xl tracking-tight">Studio</h2>
          <address className="mt-4 text-sm not-italic leading-relaxed text-muted-foreground">
            {site.legalName}
            <br />
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
            <br />
            {site.address.country}
          </address>
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
                Email
              </dt>
              <dd className="mt-1">
                <a className="hover:underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
                Phone
              </dt>
              <dd className="mt-1">
                <a className="hover:underline" href="tel:+31735220388">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
                Registry
              </dt>
              <dd className="mt-1 text-muted-foreground">
                KvK {site.kvk}
                <br />
                VAT {site.vat}
              </dd>
            </div>
          </dl>
        </aside>
      </section>
    </div>
  );
}

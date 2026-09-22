import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[#0c1524] text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <p className="text-[0.8rem] font-medium tracking-[0.22em] uppercase">
            {site.name}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
            Early-stage capital and operator support for AI-native SaaS, from
            Rosmalen, Noord-Brabant.
          </p>
        </div>
        <div>
          <p className="text-[0.7rem] tracking-[0.18em] text-white/45 uppercase">
            Visit
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
            <br />
            {site.address.country}
          </p>
        </div>
        <div>
          <p className="text-[0.7rem] tracking-[0.18em] text-white/45 uppercase">
            Contact
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/80">
            <a className="hover:text-white" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <Link className="hover:text-white" href="/contact">
              Write to us
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-5 text-[0.7rem] tracking-wide text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>
            KvK {site.kvk} · VAT {site.vat}
          </p>
        </div>
      </div>
    </footer>
  );
}

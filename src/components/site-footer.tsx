import Link from "next/link";
import { copy } from "@/lib/copy";
import { localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const home = localePath(locale);
  const privacyHref = locale === "en" ? "/en/privacy/" : "/privacy/";

  return (
    <footer className="border-t border-white/10 bg-[#123C39] text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <Link href={`${home}#home`} className="flex items-center gap-2.5">
            <img
              src="/brand/beeldmerk-on-dark.svg"
              alt="Ormac"
              width={36}
              height={38}
              className="h-9 w-auto"
            />
            <span className="text-[0.8rem] font-medium tracking-[0.22em] uppercase">
              {site.name}
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
            {t.footer.tagline}
          </p>
        </div>
        <div>
          <p className="text-[0.7rem] tracking-[0.18em] text-white/45 uppercase">
            {t.nav[6].label}
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/80">
            <a className="hover:text-white" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <a className="hover:text-white" href={`mailto:${site.planEmail}`}>
              {site.planEmail}
            </a>
            <a
              className="hover:text-white"
              href={site.linkedin}
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <nav className="flex flex-col gap-2 text-sm text-white/80" aria-label="Footer">
          {t.nav.map((item) => (
            <Link key={item.id} className="hover:text-white" href={`${home}#${item.id}`}>
              {item.label}
            </Link>
          ))}
          <Link className="hover:text-white" href={privacyHref}>
            {t.footer.privacy}
          </Link>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-5 text-[0.7rem] tracking-wide text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {t.footer.legal}. {t.footer.rights}
          </p>
          <p>
            KvK {site.kvk} · VAT {site.vat}
          </p>
        </div>
      </div>
    </footer>
  );
}

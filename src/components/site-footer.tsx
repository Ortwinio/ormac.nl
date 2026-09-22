import { SectionLink as Link } from "@/components/section-link";
import { Brand } from "@/components/brand";
import { CookieNotice } from "@/components/cookie-notice";
import { copy } from "@/lib/copy";
import { localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import s from "./ormac.module.css";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const home = localePath(locale);
  const nl = locale === "nl";
  return (
    <footer className={s.footer}>
      <div className={s.wrap}>
        <div className={s.footerTop}>
          <div className={s.footerBrand}>
            <Link href={`${home}#home`} aria-label="Ormac – home"><Brand /></Link>
            <p>{t.hero.title}.</p>
            <Link href={`${home}#contact`} className={`${s.button} ${s.gold}`}>{t.ctaPlan}</Link>
          </div>
          <nav aria-label="Footer">
            {t.nav.filter(item => item.id !== "home" && item.id !== "contact").map(item => <Link key={item.id} href={`${home}#${item.id}`}>{item.label}</Link>)}
            <Link href={`${home}#faq`}>{nl ? "Veelgestelde vragen" : "FAQ"}</Link>
          </nav>
          <div className={s.footerMails}>
            <span>{nl ? "Vragen via LinkedIn" : "Questions via LinkedIn"}</span><a href={site.linkedin} target="_blank" rel="noreferrer">Ortwin Verreck</a>
            <span>{nl ? "Plannen indienen" : "Submitting plans"}</span><Link href={`${home}#contact`}>{nl ? "Via het formulier" : "Use the form"}</Link>
          </div>
        </div>
        <div className={s.footerBottom}>
          <p>{t.footer.legal} Smart capital {nl ? "sinds" : "since"} 2002. © {new Date().getFullYear()}</p>
          <Link href={nl ? "/privacy/#privacy-top" : "/en/privacy/#privacy-top"}>{t.footer.privacy}</Link>
          <CookieNotice locale={locale} />
          <Link href={nl ? "/en/" : "/"} lang={nl ? "en" : "nl"}>{nl ? "English" : "Nederlands"}</Link>
        </div>
      </div>
    </footer>
  );
}

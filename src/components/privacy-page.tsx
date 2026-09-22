import { ScrollBlock } from "@/components/scroll-block";
import { SiteShell } from "@/components/site-shell";
import { copy } from "@/lib/copy";
import { cookieNotice } from "@/lib/cookie-notice";
import { localeCookie, localePath, type Locale } from "@/lib/i18n";
import { SectionLink as Link } from "@/components/section-link";
import { site } from "@/lib/site";
import styles from "./privacy.module.css";

export function PrivacyPageContent({ locale }: { locale: Locale }) {
  const t = copy[locale].privacy;
  const contactLink = <Link href={`${localePath(locale)}#contact-details`}>{locale === "nl" ? "Neem contact op" : "Contact us"}</Link>;
  return (
    <SiteShell locale={locale}>
      <article className={styles.page}>
        <ScrollBlock id="privacy-top">
          <header>
          <p className={styles.eyebrow}>{t.updated}</p>
          <h1>{t.title}</h1>
          <p className={styles.lead}>{t.lead}</p>
          </header>
        </ScrollBlock>
        <ScrollBlock className={styles.privacyBlock}>
          <section aria-labelledby="controller-title">
            <h2 id="controller-title">{t.controllerTitle}</h2>
            <p>{t.controller}</p>
            <p>{site.legalName} · KvK {site.kvk}<br />{contactLink}</p>
          </section>
        </ScrollBlock>
        <ScrollBlock className={styles.privacyBlock}>
          <section className={styles.preview} aria-label={locale === "nl" ? "Huidig aanvraagformulier" : "Current application form"}>
            <p>{t.preview}</p>
          </section>
        </ScrollBlock>
        {t.sections.map(section => (
          <ScrollBlock id={section.id} key={section.id} className={styles.privacyBlock}>
            <section aria-labelledby={`${section.id}-title`}>
              <h2 id={`${section.id}-title`}>{section.title}</h2>
              {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              {(section.id === "menscontrole" || section.id === "human-check") && <p><a href="https://www.cloudflare.com/turnstile-privacy-policy/">Cloudflare Turnstile privacy</a> · <a href="https://resend.com/legal/privacy-policy">Resend privacy</a></p>}
              {(section.id === "rights" || section.id === "rechten") && <p>{contactLink} · <a href="https://www.autoriteitpersoonsgegevens.nl/">{t.authority}</a></p>}
            </section>
          </ScrollBlock>
        ))}
        <ScrollBlock id="cookies" className={styles.privacyBlock}>
          <section aria-labelledby="cookies-title">
            <h2 id="cookies-title">{t.cookiesTitle}</h2>
            <p>{t.cookiesIntro}</p>
            <div className={styles.cookieList}>
              {[{name: localeCookie, purpose: t.languagePurpose, duration: t.languageDuration}, {name: cookieNotice.name, purpose: t.noticePurpose, duration: t.noticeDuration}].map(cookie => (
                <div className={styles.cookie} key={cookie.name}>
                  <h3>{cookie.name}</h3>
                  <dl><dt>{t.cookiePurpose}</dt><dd>{cookie.purpose}</dd><dt>{t.cookieDuration}</dt><dd>{cookie.duration}</dd></dl>
                </div>
              ))}
            </div>
            <p className="mt-5">{t.cookieControls}</p>
          </section>
        </ScrollBlock>
        <ScrollBlock className={styles.privacyBlock}>
          <section>
            <h2>{t.contactTitle}</h2><p>{t.contact}</p>
            <p>{contactLink}</p>
          </section>
        </ScrollBlock>
      </article>
    </SiteShell>
  );
}

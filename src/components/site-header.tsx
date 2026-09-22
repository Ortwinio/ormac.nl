"use client";

import { SectionLink as Link } from "@/components/section-link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { LanguageToggle, rememberLocale } from "@/components/language-toggle";
import { Brand } from "@/components/brand";
import { copy } from "@/lib/copy";
import { localePath, type Locale } from "@/lib/i18n";
import s from "./ormac.module.css";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const home = localePath(locale);
  const nav = t.nav.filter(item => item.id !== "home" && item.id !== "contact");
  useEffect(() => { rememberLocale(locale); }, [locale]);
  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    const desktop = window.matchMedia('(min-width: 1101px)');
    const resize = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener('pointerdown', dismiss);
    desktop.addEventListener('change', resize);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      desktop.removeEventListener('change', resize);
    };
  }, [open]);

  return (
    <header ref={headerRef} className={s.header} onKeyDown={event => {
      if (event.key === 'Escape' && open) { setOpen(false); menuRef.current?.focus(); }
    }}>
      <div className={`${s.wrap} ${s.headerInner}`}>
        <Link href={`${home}#home`} className={s.brandLink} aria-label="Ormac – home" onClick={() => setOpen(false)}><Brand /></Link>
        <nav className={s.nav} aria-label={locale === "nl" ? "Hoofdnavigatie" : "Main navigation"}>
          {nav.map(item => <Link key={item.id} href={`${home}#${item.id}`}>{item.label}</Link>)}
        </nav>
        <div className={s.headerRight}>
          <LanguageToggle locale={locale} />
          <Link href={`${home}#contact`} className={`${s.button} ${s.headerCta}`}>{t.ctaPlan}</Link>
          <button ref={menuRef} type="button" className={s.menuButton} aria-expanded={open} aria-controls="mobile-nav" aria-label={locale === "nl" ? (open ? "Menu sluiten" : "Menu openen") : (open ? "Close menu" : "Open menu")} onClick={() => setOpen(value => !value)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <nav id="mobile-nav" className={s.mobileNav} hidden={!open} aria-label={locale === "nl" ? "Mobiele navigatie" : "Mobile navigation"}>
        {nav.map(item => <Link key={item.id} href={`${home}#${item.id}`} onClick={() => setOpen(false)}>{item.label}</Link>)}
        <Link href={`${home}#faq`} onClick={() => setOpen(false)}>{locale === "nl" ? "Veelgestelde vragen" : "FAQ"}</Link>
        <Link href={`${home}#contact`} className={s.button} onClick={() => setOpen(false)}>{t.ctaPlan}</Link>
      </nav>
    </header>
  );
}

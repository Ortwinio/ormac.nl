"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageToggle, rememberLocale } from "@/components/language-toggle";
import { copy } from "@/lib/copy";
import { localePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const home = localePath(locale);

  useEffect(() => {
    rememberLocale(locale);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [locale]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors",
        scrolled
          ? "border-border/80 bg-background/92 text-foreground backdrop-blur-md"
          : "border-white/10 bg-[#123C39]/45 text-white backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-5 sm:h-[4.25rem] sm:px-8">
        <Link href={`${home}#home`} className="flex items-center gap-2.5">
          {/* SVG mark from brand assets; img avoids Next.js SVG optimizer. */}
          <img
            src={
              scrolled
                ? "/brand/beeldmerk.svg"
                : "/brand/beeldmerk-on-dark.svg"
            }
            alt="Ormac"
            width={36}
            height={38}
            className="h-9 w-auto"
          />
          <span className="text-[0.8rem] font-medium tracking-[0.22em] uppercase">
            Ormac
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {t.nav.map((item) => (
            <Link
              key={item.id}
              href={`${home}#${item.id}`}
              className="text-[0.72rem] tracking-[0.14em] uppercase opacity-70 transition-opacity hover:opacity-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle locale={locale} />
          <Button
            nativeButton={false}
            render={<Link href={`${home}#contact`} />}
            variant={scrolled ? "default" : "outline"}
            size="sm"
            className={cn(
              "h-8 rounded-full px-4 tracking-[0.12em] uppercase",
              !scrolled &&
                "border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            )}
          >
            {t.ctaPlan}
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle locale={locale} />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "md:hidden",
                    !scrolled && "text-white hover:bg-white/10 hover:text-white"
                  )}
                  aria-label="Open menu"
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="bg-background text-foreground">
              <SheetHeader>
                <SheetTitle className="font-sans text-sm tracking-[0.22em] uppercase">
                  Ormac
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
                {t.nav.map((item) => (
                  <Link
                    key={item.id}
                    href={`${home}#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-sm tracking-[0.14em] uppercase transition-colors hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

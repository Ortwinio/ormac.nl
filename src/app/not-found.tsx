"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site-shell";
import { copy } from "@/lib/copy";
import { localePath, type Locale } from "@/lib/i18n";

export default function NotFound() {
  const pathname = usePathname();
  const locale: Locale = pathname.startsWith("/en") ? "en" : "nl";
  const t = copy[locale];

  return (
    <SiteShell locale={locale}>
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-5 pt-24 text-center">
        <p className="text-[0.72rem] tracking-[0.22em] text-muted-foreground uppercase">
          404
        </p>
        <h1 className="font-heading mt-4 text-4xl tracking-tight">{t.notFound.title}</h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">{t.notFound.body}</p>
        <Button
          nativeButton={false}
          render={<Link href={localePath(locale)} />}
          className="mt-8 h-10 rounded-full px-5 tracking-[0.12em] uppercase"
        >
          {t.notFound.back}
        </Button>
      </div>
    </SiteShell>
  );
}

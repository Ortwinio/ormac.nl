"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems, site } from "@/lib/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return pathname === "/";
  return pathname === href;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onHome = pathname === "/";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors",
        onHome
          ? "border-white/10 bg-[#0c1524]/55 text-white backdrop-blur-md"
          : "border-border bg-background/90 text-foreground backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:h-[4.25rem] sm:px-8">
        <Link href="/" className="group flex items-baseline gap-2 tracking-[0.22em]">
          <span
            aria-hidden
            className="mb-0.5 inline-block size-1.5 rounded-full bg-[var(--gold)]"
          />
          <span className="text-[0.8rem] font-medium uppercase">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[0.8rem] tracking-[0.16em] uppercase transition-opacity hover:opacity-100",
                isActive(pathname, item.href) ? "opacity-100" : "opacity-60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            nativeButton={false}
            render={<Link href="/contact" />}
            variant={onHome ? "outline" : "default"}
            size="sm"
            className={cn(
              "h-8 rounded-full px-4 tracking-[0.12em] uppercase",
              onHome &&
                "border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            )}
          >
            Start a conversation
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "md:hidden",
                  onHome && "text-white hover:bg-white/10 hover:text-white"
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
                {site.name}
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-3 text-sm tracking-[0.14em] uppercase transition-colors hover:bg-muted",
                    isActive(pathname, item.href) && "bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                nativeButton={false}
                render={<Link href="/contact" onClick={() => setOpen(false)} />}
                className="mt-4 h-10 rounded-full tracking-[0.12em] uppercase"
              >
                Start a conversation
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

/** Revisit the section even when Next considers its URL the current route. */
export function SectionLink({ onClick, ...props }: ComponentProps<typeof Link>) {
  return <Link {...props} onClick={event => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.currentTarget.target === "_blank" || event.currentTarget.hasAttribute("download")) return;
    const targetUrl = new URL(event.currentTarget.href);
    if (!targetUrl.hash || targetUrl.href !== window.location.href) return;
    let id: string;
    try { id = decodeURIComponent(targetUrl.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }} />;
}

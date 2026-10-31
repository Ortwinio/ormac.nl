"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./scroll-block.module.css";

/**
 * A page section that fades in once as it scrolls into view.
 * Content is visible without JavaScript, with reduced motion, in print and when focused;
 * sections never overlap, so anchors, keyboard and touch scrolling behave normally.
 */
export function ScrollBlock({ children, id, className = "", animate = true }: { children: ReactNode; id?: string; className?: string; animate?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!animate || !root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Only hide sections that start below the fold, so nothing visible ever blinks.
    if (root.getBoundingClientRect().top < window.innerHeight) return;
    root.setAttribute("data-reveal", "pending");
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      root.setAttribute("data-reveal", "shown");
      observer.disconnect();
    }, { rootMargin: "0px 0px -8% 0px" });
    observer.observe(root);
    return () => observer.disconnect();
  }, [animate]);

  return <div ref={rootRef} id={id} className={`${styles.scene} ${className}`} data-scroll-block>
    {children}
  </div>;
}

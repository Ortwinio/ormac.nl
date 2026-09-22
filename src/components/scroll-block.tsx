"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./scroll-block.module.css";

/** Native sticky positioning keeps wheel, touch, keyboard and anchor scrolling intact. */
export function ScrollBlock({ children, id, className = "" }: { children: ReactNode; id?: string; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    if (!root || !pin) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const header = document.querySelector("body > header");
    let frame = 0;
    let nearby = true;
    let top = 0;
    let distance = 1;

    function paint() {
      frame = 0;
      if (!root || reducedMotion.matches) return;
      const progress = Math.max(0, Math.min(1, (top - root.getBoundingClientRect().top) / distance));
      // Hold the section briefly before easing it out as the next section arrives.
      const fade = Math.max(0, (progress - 0.25) / 0.75);
      const eased = fade * fade * (3 - 2 * fade);
      root.style.setProperty("--scroll-opacity", String(1 - eased));
      root.style.setProperty("--scroll-scale", String(1 - eased * 0.025));
      root.toggleAttribute("data-departed", progress >= 1);
    }

    function schedule() {
      if (nearby && !frame && !reducedMotion.matches) frame = requestAnimationFrame(paint);
    }

    function measure() {
      if (!root || !pin) return;
      if (reducedMotion.matches) {
        root.removeAttribute("data-scroll-active");
        root.removeAttribute("data-departed");
        root.style.removeProperty("--scroll-distance");
        root.style.removeProperty("--scroll-top");
        root.style.removeProperty("--scroll-opacity");
        root.style.removeProperty("--scroll-scale");
        return;
      }
      const headerHeight = header?.getBoundingClientRect().height ?? 77;
      const available = Math.max(120, window.innerHeight - headerHeight);
      const height = pin.offsetHeight;
      // Tall sections must be readable to the bottom before they pause.
      top = Math.min(headerHeight, window.innerHeight - height);
      distance = Math.max(1, Math.min(height, available));
      root.style.setProperty("--scroll-top", `${top}px`);
      root.style.setProperty("--scroll-distance", `${distance}px`);
      root.setAttribute("data-scroll-active", "");
      paint();
    }

    const resize = new ResizeObserver(measure);
    resize.observe(pin);
    if (header) resize.observe(header);
    const intersection = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      paint();
    }, { rootMargin: "100% 0px" });
    intersection.observe(root);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    reducedMotion.addEventListener("change", measure);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      reducedMotion.removeEventListener("change", measure);
    };
  }, []);

  return <div ref={rootRef} id={id} className={`${styles.scene} ${className}`} data-scroll-block>
    <div ref={pinRef} className={styles.pin}>
      <div className={styles.content}>{children}</div>
    </div>
  </div>;
}

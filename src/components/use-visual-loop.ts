"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";

/** Repeats a visual only while it can be seen; all readers get a static initial state. */
export function useVisualLoop<T extends HTMLElement>(ref: RefObject<T | null>, intervalMs: number | ((cycle: number) => number) | null = 6500) {
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    const frame = requestAnimationFrame(update);
    media.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === "visible");
    const frame = requestAnimationFrame(update);
    document.addEventListener("visibilitychange", update);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  const running = inView && pageVisible && !reducedMotion && !paused;
  const nextInterval = typeof intervalMs === "function" ? intervalMs(cycle) : intervalMs;
  useEffect(() => {
    if (!running || nextInterval === null) return;
    const timer = window.setTimeout(() => setCycle((value) => value + 1), nextInterval);
    return () => window.clearTimeout(timer);
  }, [running, nextInterval, cycle]);

  const restart = useCallback(() => setCycle((value) => value + 1), []);

  return { inView, reducedMotion, running, paused, cycle, restart, togglePause: () => setPaused((value) => !value), pause: () => setPaused(true) };
}

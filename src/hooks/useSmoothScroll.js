import { useEffect } from "react";
import { useReducedMotion } from "../lib/motion";

/**
 * Inertial scrolling. Anchor links are routed through Lenis too, otherwise
 * they'd jump while the rest of the page glides.
 */
export function useSmoothScroll() {
  const reduced = useReducedMotion();

  // The page renders client-side, so a shared link like /#projects arrives
  // before its target exists. Once fonts settle the layout, go there.
  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return;
    document.fonts.ready.then(() => {
      document.querySelector(hash)?.scrollIntoView({ block: "start" });
    });
  }, []);

  useEffect(() => {
    if (reduced) return;

    let lenis = null;
    let raf = 0;
    let cancelled = false;

    // Lenis is ~20 kB of scroll machinery that nothing needs before the first
    // paint. Loading it on demand keeps it off the critical path; the page
    // scrolls natively for the fraction of a second before it lands, which is
    // indistinguishable from it having been there all along.
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.6,
      });
      const loop = (time) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    const onClick = (e) => {
      const link = e.target.closest?.('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      // Native smooth scroll stands in for the moment before Lenis arrives.
      if (lenis) lenis.scrollTo(target, { offset: -80 });
      else target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", id);
      // preventDefault also cancels the browser moving the focus start point,
      // so the skip link would glide to <main> but Tab would resume at the top.
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };

    document.addEventListener("click", onClick);
    return () => {
      cancelled = true;
      document.removeEventListener("click", onClick);
      if (raf) cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, [reduced]);
}

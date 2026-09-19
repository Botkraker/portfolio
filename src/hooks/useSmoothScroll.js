import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

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

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // ScrollTrigger reads native scroll position, which Lenis no longer
    // drives directly — without this, every scrubbed animation lags.
    lenis.on("scroll", ScrollTrigger.update);

    let raf = 0;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e) => {
      const link = e.target.closest?.('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
      history.pushState(null, "", id);
      // preventDefault also cancels the browser moving the focus start point,
      // so the skip link would glide to <main> but Tab would resume at the top.
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, [reduced]);
}

/**
 * Adapted from React Bits (MIT + Commons Clause) — reactbits.dev, ScrollReveal.
 *
 * Changes from upstream:
 *  - Upstream's cleanup called `ScrollTrigger.getAll().forEach(t => t.kill())`,
 *    which kills EVERY ScrollTrigger on the page, not just this component's.
 *    Under StrictMode's double-mount that silently broke other scroll effects.
 *    Now we keep handles to the tweens we created and revert only those.
 *  - Renders a configurable tag instead of a hardcoded <h2><p>, so it doesn't
 *    fight the page's heading order.
 *  - Honours prefers-reduced-motion: text renders fully visible, no triggers.
 *  - Typography is left to the caller rather than baked in.
 */
import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../../lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({
  children,
  as: Tag = "p",
  className = "",
  enableBlur = true,
  baseOpacity = 0.12,
  baseRotation = 0,
  blurStrength = 5,
  wordAnimationEnd = "bottom 55%",
}) {
  const containerRef = useRef(null);
  const reduced = useReducedMotion();

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) =>
      word.match(/^\s+$/) ? (
        word
      ) : (
        <span className="word inline-block" key={index}>
          {word}
        </span>
      )
    );
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reduced) return;

    const words = el.querySelectorAll(".word");
    if (!words.length) return;

    const ctx = gsap.context(() => {
      if (baseRotation) {
        gsap.fromTo(
          el,
          { transformOrigin: "0% 50%", rotate: baseRotation },
          {
            rotate: 0,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: true },
          }
        );
      }

      gsap.fromTo(
        words,
        { opacity: baseOpacity, willChange: "opacity" },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=15%",
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      );

      if (enableBlur) {
        gsap.fromTo(
          words,
          { filter: `blur(${blurStrength}px)` },
          {
            filter: "blur(0px)",
            ease: "none",
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              start: "top bottom-=15%",
              end: wordAnimationEnd,
              scrub: true,
            },
          }
        );
      }
    }, el);

    // Reverts only the tweens and triggers created inside this context.
    return () => ctx.revert();
  }, [reduced, enableBlur, baseRotation, baseOpacity, wordAnimationEnd, blurStrength]);

  if (reduced) return <Tag className={className}>{children}</Tag>;

  return (
    <Tag ref={containerRef} className={className}>
      {splitText}
    </Tag>
  );
}

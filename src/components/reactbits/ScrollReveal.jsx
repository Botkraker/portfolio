/**
 * Word-by-word reveal, scrubbed to scroll position.
 *
 * Originally adapted from React Bits (MIT + Commons Clause) — reactbits.dev.
 * Rewritten on `motion`, which the page already loads, so the site no longer
 * ships GSAP + ScrollTrigger (50 kB gzipped) for this one paragraph.
 *
 * The upstream version also scrubbed a `filter: blur()` on every word, which
 * re-rasterizes each span on every scroll frame. Opacity alone stays on the
 * compositor and reads nearly the same.
 */
import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "../../lib/motion";

function Word({ children, progress, start, end, baseOpacity }) {
  const opacity = useTransform(progress, [start, end], [baseOpacity, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}

export default function ScrollReveal({
  children,
  as: Tag = "p",
  className = "",
  baseOpacity = 0.3,
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  // The paragraph is fully lit by the time it reaches the middle of the
  // viewport, so it finishes revealing while it is still being read.
  //
  // Both edge names have to be motion's own — "start", "end" or "center".
  // This read "start bottom" for a long time, which is GSAP ScrollTrigger
  // syntax left over from the component's GSAP original. Motion cannot parse
  // "bottom", so the scroll range collapsed and progress never left 0: every
  // word sat at baseOpacity for good and the paragraph just looked greyed out.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Split on whitespace but keep the separators, so spacing survives.
  const words = useMemo(
    () => (typeof children === "string" ? children.split(/(\s+)/) : []),
    [children]
  );

  if (reduced || typeof children !== "string") {
    return <Tag className={className}>{children}</Tag>;
  }

  // Each word lights over its own slice of the scroll range, the slices
  // overlapping so the sweep reads as continuous rather than word-by-word.
  const count = words.filter((w) => !/^\s+$/.test(w)).length;
  let i = 0;

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, index) => {
        if (/^\s+$/.test(word)) return word;
        const start = i / count;
        const end = Math.min(1, (i + 2) / count);
        i += 1;
        return (
          <Word
            key={index}
            progress={scrollYProgress}
            start={start}
            end={end}
            baseOpacity={baseOpacity}
          >
            {word}
          </Word>
        );
      })}
    </Tag>
  );
}

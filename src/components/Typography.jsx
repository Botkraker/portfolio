import { motion } from "motion/react";
import { cn } from "../lib/cn";
import { useReducedMotion } from "../lib/motion";

/** Mono, wide-tracked, gold. The label style used across every section. */
export function Eyebrow({ children, className }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn("eyebrow", className)}
    >
      {children}
    </motion.p>
  );
}

/**
 * Display text that rises into place one word at a time.
 * Words are the unit, not characters — at Bodoni display sizes a
 * per-character stagger reads as jitter rather than composure.
 */
export function RevealText({
  children,
  as: Tag = "h2",
  id,
  className,
  delay = 0,
  stagger = 0.055,
}) {
  const reduced = useReducedMotion();
  const words = String(children).split(" ");

  if (reduced) return <Tag id={id} className={className}>{children}</Tag>;

  const MotionTag = motion[Tag] ?? motion.h2;

  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12%" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={String(children)}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "105%", opacity: 0 },
              visible: { y: "0%", opacity: 1 },
            }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** A hairline that draws itself left-to-right when scrolled into view. */
export function Rule({ className, delay = 0 }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={cn("rule", className)}
      initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay }}
    />
  );
}

/** Section wrapper: consistent rhythm, scroll-margin for anchor links. */
export function Section({ id, children, className, ...props }) {
  return (
    <section
      id={id}
      aria-labelledby={props["aria-labelledby"] ?? `${id}-heading`}
      {...props}
      className={cn(
        "relative scroll-mt-24 border-t border-white/[0.06]",
        "px-[var(--gutter)] py-[clamp(4.5rem,10vw,9rem)]",
        className
      )}
    >
      {children}
    </section>
  );
}

/** The paired kicker + display heading that opens each section. */
export function SectionHead({ kicker, heading, headingId, className }) {
  return (
    <div className={cn("mb-[clamp(2.5rem,5vw,4.5rem)]", className)}>
      <Eyebrow>{kicker}</Eyebrow>
      <Rule className="mt-5 mb-8 max-w-[220px]" />
      <RevealText
        as="h2"
        id={headingId}
        className="display display-xl text-[clamp(2.1rem,5.2vw,4rem)] text-ivory-50 max-w-[16ch]"
      >
        {heading}
      </RevealText>
    </div>
  );
}

/** Small gold-bordered pills used for tech stacks. */
export function TagList({ items, className }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-2 gap-y-2", className)}>
      {items.map((t) => (
        <li
          key={t}
          className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ivory-300/80
                     border border-gold-500/20 rounded-full px-3 py-1.5
                     transition-colors duration-500 hover:border-gold-500/50 hover:text-gold-300"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

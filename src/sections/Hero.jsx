import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { profile, marqueeItems } from "../content";
import { Marquee } from "../components/Interactive";
import ShinyText from "../components/reactbits/ShinyText";
import { useHasHover, useReducedMotion } from "../lib/motion";

const rise = {
  hidden: { y: "110%", opacity: 0 },
  visible: { y: "0%", opacity: 1 },
};

/**
 * Per-letter proximity effect: each glyph thickens and warms as the cursor
 * nears it. Weight is driven through font-weight (not font-variation-settings)
 * so Bodoni's optical-size axis keeps tracking the display size.
 *
 * Letters are plain inline spans, not inline-block: at rest they share one
 * style, so the browser shapes them as a single run and keeps kerning pairs
 * like "Ya" intact, and spaces keep their width.
 */
function ProximityWord({ text, className }) {
  const ref = useRef(null);
  const hasHover = useHasHover();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!hasHover || reduced) return;
    const root = ref.current;
    if (!root) return;
    const letters = Array.from(root.querySelectorAll("[data-letter]"));
    const RADIUS = 170;
    let raf = 0;
    let pointer = null;

    const onMove = (e) => {
      pointer = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const apply = () => {
      raf = 0;
      if (!pointer) return;
      letters.forEach((letter) => {
        const r = letter.getBoundingClientRect();
        const dx = pointer.x - (r.left + r.width / 2);
        const dy = pointer.y - (r.top + r.height / 2);
        const dist = Math.hypot(dx, dy);
        const t = Math.max(0, 1 - dist / RADIUS);
        letter.style.fontWeight = String(Math.round(400 + t * 500));
        letter.style.color = t > 0.05
          ? `color-mix(in oklab, var(--color-gold-300) ${t * 85}%, var(--color-ivory-50))`
          : "";
      });
    };

    const onLeave = () => {
      pointer = null;
      letters.forEach((l) => {
        l.style.fontWeight = "";
        l.style.color = "";
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [hasHover, reduced]);

  return (
    <span ref={ref} className={className}>
      {text.split("").map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          data-letter
          aria-hidden="true"
          className="transition-[font-weight,color] duration-200 ease-out"
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The hero sinks and fades slightly as the page moves past it.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const style = reduced ? undefined : { y, opacity };

  return (
    <header
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden"
    >
      <motion.div
        style={style}
        className="flex flex-1 flex-col justify-center px-[var(--gutter)] pt-28 pb-16"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="eyebrow mb-8"
        >
          {/* A slow gold glint across the label: the one moving accent at rest. */}
          <ShinyText
            text={profile.eyebrow}
            disabled={reduced}
            speed={4.5}
            delay={2.5}
            spread={90}
            color="var(--color-gold-600)"
            shineColor="var(--color-gold-300)"
          />
        </motion.p>

        {/* The name, set as large as the viewport will bear. */}
        <motion.h1
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.12, delayChildren: 0.35 }}
          className="display display-hero text-[clamp(3.2rem,15vw,12rem)] text-ivory-50"
          aria-label={`${profile.firstName} ${profile.lastName}`}
        >
          <span className="block overflow-hidden">
            <motion.span
              variants={rise}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              <ProximityWord text={profile.firstName} />
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              variants={rise}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="block pl-[0.06em] italic"
              style={{ fontStyle: "italic" }}
            >
              <ProximityWord text={profile.lastName} />
            </motion.span>
          </span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
          className="rule my-10 max-w-[min(38rem,100%)] origin-left"
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:pr-20"
        >
          <p className="max-w-[34ch] font-sans text-[clamp(1.05rem,1.9vw,1.4rem)] leading-snug text-ivory-100">
            {profile.role}
          </p>
          <div className="max-w-[38ch] font-sans text-sm leading-relaxed text-ivory-500">
            <p>{profile.location}</p>
            <p>{profile.seeking}</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.4 }}
      >
        <Marquee items={marqueeItems} />
      </motion.div>

      <ScrollCue />
    </header>
  );
}

/** A hairline that drips downward, standing in for a "scroll" label. */
function ScrollCue() {
  const reduced = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-24 right-[var(--gutter)] hidden lg:block"
    >
      <div className="flex flex-col items-center gap-3">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-ivory-700 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="relative block h-16 w-px overflow-hidden bg-white/10">
          <span
            className="absolute inset-x-0 top-0 h-1/2 bg-gold-500"
            style={{ animation: reduced ? "none" : "drip 2.4s ease-in-out infinite" }}
          />
        </span>
      </div>
      <style>{`
        @keyframes drip {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </div>
  );
}

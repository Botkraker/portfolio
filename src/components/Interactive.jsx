import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import { useHasHover, useReducedMotion } from "../lib/motion";

/**
 * Magnetic hover: the element leans toward the cursor while it's nearby.
 * Renders whatever tag you pass so it can be a link, a button, or a div.
 */
export function Magnetic({ children, className, style, strength = 0.32, as: Tag = "a", ...props }) {
  const ref = useRef(null);
  const hasHover = useHasHover();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!hasHover || reduced) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
    };
    const onLeave = () => {
      el.style.transform = "translate3d(0,0,0)";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [hasHover, reduced, strength]);

  return (
    <Tag
      ref={ref}
      className={cn("inline-block will-change-transform", className)}
      {...props}
      style={{
        // Listing color too, so this inline value doesn't cancel a caller's color fade.
        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), color 0.5s cubic-bezier(0.16,1,0.3,1)",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * An underline that wipes in from the left on hover, gold, hairline weight.
 * Used for every inline link so link affordance is consistent site-wide.
 */
export function GoldLink({ children, className, href, external, ...props }) {
  const rel = external ? "noopener noreferrer" : undefined;
  const target = external ? "_blank" : undefined;

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "group/link relative inline-flex items-center gap-2 text-ivory-100",
        "transition-colors duration-500 hover:text-gold-300",
        className
      )}
      {...props}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold-500
                     transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                     group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100"
        />
      </span>
    </a>
  );
}

/**
 * Card shell with a gold border that brightens and a light sheen that
 * follows the cursor across the surface.
 */
export function LuxeCard({ children, className, ...props }) {
  const ref = useRef(null);
  const hasHover = useHasHover();

  const onMove = (e) => {
    if (!hasHover) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn(
        "group relative overflow-hidden rounded-[2px]",
        "border border-white/[0.07] bg-ink-900/40 backdrop-blur-sm",
        "transition-[border-color,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:border-gold-500/30",
        className
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--color-gold-500) 7%, transparent), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/**
 * Video frame that behaves like a silent looping GIF: plays on hover where
 * there's a pointer, plays while in view on touch. Sizes itself to the
 * video's real aspect ratio so a phone recording and a desktop capture
 * each get a frame that fits, instead of one box cropping both.
 */
export function MediaFrame({ src, className, ratioFallback = 1.6 }) {
  const videoRef = useRef(null);
  const [ratio, setRatio] = useState(ratioFallback);
  const [letterboxed, setLetterboxed] = useState(false);
  const [failed, setFailed] = useState(false);
  const hasHover = useHasHover();
  const reduced = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const MIN = 0.62;
    const MAX = 2;

    const onMeta = () => {
      const { videoWidth: w, videoHeight: h } = video;
      if (!w || !h) return;
      const real = w / h;
      const clamped = Math.min(Math.max(real, MIN), MAX);
      setRatio(clamped);
      setLetterboxed(Math.abs(clamped - real) > 0.02);
    };
    const onError = () => setFailed(true);

    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("error", onError);
    // A cached video can report metadata before this effect attaches.
    if (video.readyState >= 1) onMeta();

    let observer;
    if (!hasHover && !reduced && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) video.play().catch(() => {});
            else {
              video.pause();
              video.currentTime = 0;
            }
          });
        },
        { threshold: 0.6 }
      );
      observer.observe(video);
    }

    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("error", onError);
      observer?.disconnect();
    };
  }, [hasHover, reduced]);

  const play = () => hasHover && !reduced && videoRef.current?.play().catch(() => {});
  const stop = () => {
    if (!hasHover) return;
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  if (!src || failed) return null;

  return (
    <div
      onPointerEnter={play}
      onPointerLeave={stop}
      className={cn(
        "relative mx-auto overflow-hidden rounded-[2px] border border-white/[0.07] bg-ink-850",
        className
      )}
      // A portrait phone capture at full column width would stand ~1100px
      // tall, so cap its height at 75vh and let the width follow the ratio.
      style={{ aspectRatio: ratio, maxWidth: ratio < 1 ? `calc(75vh * ${ratio})` : undefined }}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        src={src}
        aria-hidden="true"
        className={cn(
          "h-full w-full transition-[transform,filter] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          letterboxed ? "object-contain" : "object-cover",
          "saturate-[0.85] group-hover:saturate-100 group-hover:scale-[1.02]"
        )}
      >
      </video>
      {/* Keeps the video from competing with the type beside it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent
                   opacity-80 transition-opacity duration-700 group-hover:opacity-30"
      />
    </div>
  );
}

/** Edge-to-edge ticker for the skills strip. Pauses on hover. */
export function Marquee({ items, speed = 46 }) {
  const reduced = useReducedMotion();
  const run = [...items, ...items];

  return (
    <div
      className="group relative flex overflow-hidden border-y border-white/[0.06] py-5"
      aria-hidden="true"
    >
      <div
        className="flex shrink-0 items-center gap-10 pr-10 group-hover:[animation-play-state:paused]"
        // Longhands rather than the `animation` shorthand: the shorthand would
        // pin animation-play-state inline and defeat the hover pause.
        style={
          reduced
            ? undefined
            : {
                animationName: "marquee",
                animationDuration: `${speed}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
              }
        }
      >
        {run.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-10 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-ivory-500"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-gold-600/60" />
          </span>
        ))}
      </div>
      {/* Fade the strip into the page edges instead of cutting it off. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink-950 to-transparent" />
      <style>{`
        @keyframes marquee {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(-50%,0,0); }
        }
      `}</style>
    </div>
  );
}

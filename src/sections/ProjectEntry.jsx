import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll } from "motion/react";
import { Eyebrow, RevealText, TagList } from "../components/Typography";
import { GoldLink, MediaFrame } from "../components/Interactive";
import { cn } from "../lib/cn";
import { useReducedMotion } from "../lib/motion";

/**
 * One featured project, laid out as a magazine spread: media on one side,
 * type on the other, sides swapping every entry.
 *
 * Two entries in the data are incomplete by design — Fridguard has no repo
 * link and the MLOps pipeline has no capture — so both the link and the whole
 * media column are conditional. With no video the text column widens instead
 * of leaving half the spread empty.
 */
/** True while the element is within `margin` of the viewport. */
function useNearViewport(ref, margin = "500px") {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), {
      rootMargin: margin,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);

  return near;
}

/**
 * Subscribes one scroll tracker and feeds the entry's two drift values.
 * It renders nothing: its only job is to exist, because mounting it is what
 * creates the tracker and unmounting it is what disposes of it.
 *
 * Every featured spread used to hold a tracker for the life of the page, all
 * seven measuring their target on every scroll frame whether or not they were
 * anywhere near the screen. Measured on this section, that halved the frame
 * rate — 16.7ms median against 8.4ms everywhere else on the page, with a p95
 * of 41.7ms. Offscreen drift is drift nobody can see, so the tracker only
 * lives while its entry is within a screen or so of the viewport.
 */
function DriftDriver({ targetRef, mediaY, indexY }) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const apply = (p) => {
    mediaY.set(28 - p * 56);
    indexY.set(-14 + p * 28);
  };

  useMotionValueEvent(scrollYProgress, "change", apply);

  // "change" only fires on the next move, so without this the entry would
  // hold whatever offset it had when its tracker was last disposed of until
  // the reader scrolls again. Seed it from the current position on mount.
  useEffect(() => {
    apply(scrollYProgress.get());
  });

  return null;
}

export default function ProjectEntry({ project, index, numeral }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const hasMedia = Boolean(project.video);
  const flipped = index % 2 === 1;
  const near = useNearViewport(ref);

  // ~56px of drift on the media, a smaller counter-drift on the numeral.
  // Enough to read as depth between the two columns, not as movement.
  //
  // These are plain motion values rather than transforms off a scroll
  // progress, so the elements below keep the same style binding whether or
  // not a tracker is currently attached. The markup never changes shape when
  // the driver comes and goes — the video in particular is never remounted.
  const mediaY = useMotionValue(0);
  const indexY = useMotionValue(0);
  const drifting = !reduced && near;

  const mediaCols = flipped
    ? "lg:col-start-6 lg:col-span-7"
    : "lg:col-start-1 lg:col-span-7";

  const textCols = hasMedia
    ? flipped
      ? "lg:col-start-1 lg:col-span-5"
      : "lg:col-start-8 lg:col-span-5"
    : flipped
      ? "lg:col-start-4 lg:col-span-9"
      : "lg:col-start-1 lg:col-span-9";

  return (
    <article
      ref={ref}
      className="group grid grid-cols-1 items-center gap-x-[clamp(2rem,5vw,5rem)]
                 gap-y-[clamp(2rem,5vw,3rem)] py-[clamp(4rem,9vw,8rem)] lg:grid-cols-12"
    >
      {drifting && (
        <DriftDriver targetRef={ref} mediaY={mediaY} indexY={indexY} />
      )}

      {hasMedia && (
        <motion.div
          style={{ y: mediaY }}
          className={cn("will-change-transform lg:row-start-1", mediaCols)}
        >
          <MediaFrame src={project.video} className="w-full" />
        </motion.div>
      )}

      <div className={cn("lg:row-start-1", textCols)}>
        {/* The index is an ornament, not content — the title carries the name. */}
        <motion.span
          aria-hidden="true"
          style={{ y: indexY }}
          className="display display-xl block -ml-[0.04em] mb-4 text-[clamp(3rem,6vw,5.25rem)]
                     leading-[0.8] text-ivory-700/25 will-change-transform"
        >
          {numeral ?? project.index}
        </motion.span>

        <Eyebrow>{project.eyebrow}</Eyebrow>

        <RevealText
          as="h3"
          className="display mt-5 text-[clamp(2rem,4.5vw,3.4rem)] text-ivory-50"
        >
          {project.title}
        </RevealText>

        {project.subtitle && (
          <p className="display-italic mt-3 text-[clamp(1rem,1.8vw,1.35rem)] text-ivory-300">
            {project.subtitle}
          </p>
        )}

        <p className="mt-7 max-w-[58ch] leading-relaxed text-ivory-100">
          {project.blurb}
        </p>

        {project.detail && (
          <p className="mt-5 max-w-[58ch] text-[0.9rem] leading-relaxed text-ivory-500">
            {project.detail}
          </p>
        )}

        <TagList items={project.tags} className="mt-8" />

        {project.link && (
          <div className="mt-9">
            <GoldLink
              href={project.link}
              external
              className="font-mono text-[0.7rem] uppercase tracking-[0.2em]"
            >
              View code <span aria-hidden="true">↗</span>
            </GoldLink>
          </div>
        )}
      </div>
    </article>
  );
}

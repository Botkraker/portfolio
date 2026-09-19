import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
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
export default function ProjectEntry({ project, index }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const hasMedia = Boolean(project.video);
  const flipped = index % 2 === 1;

  // Progress across the entry's full pass through the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // ~56px of drift on the media, a smaller counter-drift on the numeral.
  // Enough to read as depth between the two columns, not as movement.
  const mediaY = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const indexY = useTransform(scrollYProgress, [0, 1], [-14, 14]);

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
      {hasMedia && (
        <motion.div
          style={reduced ? undefined : { y: mediaY }}
          className={cn("will-change-transform lg:row-start-1", mediaCols)}
        >
          <MediaFrame src={project.video} className="w-full" />
        </motion.div>
      )}

      <div className={cn("lg:row-start-1", textCols)}>
        {/* The index is an ornament, not content — the title carries the name. */}
        <motion.span
          aria-hidden="true"
          style={reduced ? undefined : { y: indexY }}
          className="display display-xl block -ml-[0.04em] mb-4 text-[clamp(3rem,6vw,5.25rem)]
                     leading-[0.8] text-ivory-700/25 will-change-transform"
        >
          {project.index}
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

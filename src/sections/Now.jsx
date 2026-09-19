import { Section, SectionHead, TagList } from "../components/Typography";
import { LuxeCard } from "../components/Interactive";
import { useReducedMotion } from "../lib/motion";
import { now } from "../content.js";

/**
 * The one section that earns a card shell: these are live, unfinished objects,
 * so they read as separate vessels rather than as part of the CV spread.
 */
export default function Now() {
  const reduced = useReducedMotion();

  return (
    <Section id="now">
      <SectionHead
        kicker="03 — Currently"
        heading="What I'm working on."
        headingId="now-heading"
      />

      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {now.map((item) => (
          /* `grid` lets LuxeCard's inner content wrapper stretch to the full
             row height, which `flex` alone would not do from outside. */
          <LuxeCard key={item.title} className="grid h-full">
            <div className="flex h-full flex-col p-8 md:p-10">
              <p className="flex items-center gap-2.5 self-start rounded-full border border-patina-600/30 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-patina-400">
                <PulseDot animate={!reduced} />
                {item.status}
              </p>

              <h3 className="display mt-7 text-[clamp(1.5rem,2.8vw,2.15rem)] text-ivory-50">
                {item.title}
              </h3>

              <p className="mt-5 max-w-[62ch] leading-relaxed text-ivory-300">
                {item.blurb}
              </p>

              <TagList items={item.tags} className="mt-auto pt-10" />
            </div>
          </LuxeCard>
        ))}
      </div>
    </Section>
  );
}

function PulseDot({ animate }) {
  return (
    <span aria-hidden="true" className="relative flex h-1.5 w-1.5 shrink-0">
      {animate && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-patina-400 opacity-60" />
      )}
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-patina-400" />
    </span>
  );
}

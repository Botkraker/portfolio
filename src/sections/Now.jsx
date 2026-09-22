import { Section, SectionHead, TagList } from "../components/Typography";
import { cn } from "../lib/cn";
import { GoldLink, LuxeCard } from "../components/Interactive";
import { Sparkline } from "../components/Decorative";
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

      {/* A lone card in a two-column grid reads as a gap where something
          was removed, so the split only appears once there are two. */}
      <div
        className={cn(
          "grid gap-6 md:gap-8",
          now.length > 1 ? "md:grid-cols-2" : "max-w-[46rem]"
        )}
      >
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

              {item.series && (
                <Sparkline
                  values={item.series}
                  className="mt-8 h-8 w-full"
                  color="var(--color-patina-400)"
                />
              )}

              <TagList items={item.tags} className="mt-auto pt-10" />

              {item.link && (
                <div className="pt-6">
                  <GoldLink
                    href={item.link}
                    external
                    className="font-mono text-[0.65rem] uppercase tracking-[0.2em]"
                  >
                    View code <span aria-hidden="true">↗</span>
                  </GoldLink>
                </div>
              )}
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

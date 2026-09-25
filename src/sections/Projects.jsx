import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Section, Rule, RevealText, TagList } from "../components/Typography";
import { GoldLink, LuxeCard } from "../components/Interactive";
import { DecorativeAccent } from "../components/Decorative";
import ContributionGraph from "../components/ContributionGraph";
import ProjectEntry from "./ProjectEntry";
import { projects, projectIndex, tracks } from "../content";
import { accentOf } from "../lib/tracks";
import { useReducedMotion } from "../lib/motion";
import { cn } from "../lib/cn";

const EASE = [0.16, 1, 0.3, 1];

/** The filter rail. The active pill is one shared element that slides. */
function TrackRail({ active, onChange, counts }) {
  return (
    // A group of toggles rather than a tablist: there is no tabpanel here,
    // the same one list is filtered in place, so aria-pressed is the honest role.
    <div role="group" aria-label="Filter projects by track" className="flex flex-wrap gap-2">
      {tracks.map((track) => {
        const on = track.id === active;
        const accent = accentOf(track.id);
        return (
          <button
            key={track.id}
            aria-pressed={on}
            onClick={() => onChange(track.id)}
            className={cn(
              "relative isolate overflow-hidden rounded-full border px-5 py-2.5",
              "font-mono text-[0.68rem] uppercase tracking-[0.16em]",
              "transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              on ? "border-transparent text-ink-950" : "border-white/10 text-ivory-400 hover:text-ivory-100"
            )}
            style={on ? { color: "var(--color-ink-950)" } : undefined}
          >
            {on && (
              <motion.span
                layoutId="track-pill"
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-full"
                style={{ background: accent, boxShadow: `0 0 28px color-mix(in oklab, ${accent} 45%, transparent)` }}
                transition={{ type: "spring", stiffness: 420, damping: 38 }}
              />
            )}
            {track.label}
            <span className={cn("ml-2 tabular-nums", on ? "opacity-60" : "opacity-40")}>
              {counts[track.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** One card in the long-tail index. */
function IndexCard({ item }) {
  const accent = accentOf(item.track);
  const external = item.role === "Contributor";

  return (
    <LuxeCard className="h-full">
      {/* The track reads as a colour bar before anything is read as words. */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[2px] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: accent }}
      />

      <div className="flex h-full flex-col p-[clamp(1.4rem,2.4vw,1.9rem)]">
        <div className="flex items-baseline justify-between gap-4">
          <span
            className="font-mono text-[0.6rem] uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            {item.kind}
          </span>
          <span className="font-mono text-[0.6rem] tabular-nums tracking-[0.12em] text-ivory-700">
            {item.year}
          </span>
        </div>

        <h4 className="display mt-4 text-[clamp(1.15rem,1.9vw,1.4rem)] leading-tight text-ivory-50">
          {item.title}
        </h4>

        <p className="mt-3.5 text-[0.85rem] leading-relaxed text-ivory-300">{item.blurb}</p>

        {item.metric && (
          <p className="mt-5 border-t border-gold-500/20 pt-4 font-mono text-[0.66rem] leading-relaxed tracking-[0.06em] text-gold-400">
            {item.metric}
          </p>
        )}

        <TagList items={item.tags} className="mt-auto pt-7" />

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
          <span className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ivory-600">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: external ? "var(--color-purple-400)" : accent }}
            />
            {item.role}
            {item.commits != null && (
              <span className="text-ivory-700">· {item.commits} commits</span>
            )}
          </span>

          {item.link && (
            <GoldLink
              href={item.link}
              external
              className="font-mono text-[0.6rem] uppercase tracking-[0.18em]"
            >
              Code <span aria-hidden="true">↗</span>
            </GoldLink>
          )}
        </div>
      </div>
    </LuxeCard>
  );
}

export default function Projects() {
  const [active, setActive] = useState("all");
  const reduced = useReducedMotion();

  const counts = useMemo(() => {
    const all = [...projects, ...projectIndex];
    return tracks.reduce((acc, t) => {
      acc[t.id] = t.id === "all" ? all.length : all.filter((p) => p.track === t.id).length;
      return acc;
    }, {});
  }, []);

  const featured = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.track === active)),
    [active]
  );
  const index = useMemo(
    () => (active === "all" ? projectIndex : projectIndex.filter((p) => p.track === active)),
    [active]
  );

  return (
    <Section id="projects">
      <div className="mb-6 flex items-center gap-4">
        <DecorativeAccent orientation="horizontal" color="emerald" />
        <p className="eyebrow text-emerald-400">04 — The Work</p>
      </div>

      <RevealText
        as="h2"
        id="projects-heading"
        className="display display-xl text-[clamp(2rem,5vw,4rem)] text-ivory-50"
      >
        Three tracks, one engineer.
      </RevealText>

      <p className="mt-7 max-w-[62ch] leading-relaxed text-ivory-300">
        Machine learning, data and BI, and the software engineering underneath both. Everything
        below has a repository or a running system behind it — including the work that lives in
        other people's repositories.
      </p>

      <div className="mt-[clamp(2.5rem,5vw,4rem)]">
        <ContributionGraph />
      </div>

      {/* ---- Filter ---- */}
      {/* top-16 parks the rail under the fixed nav bar (py-5 + a 24px line
          ≈ 64px) instead of sliding behind it; z-20 keeps it below the nav. */}
      <div className="sticky top-16 z-20 -mx-[var(--gutter)] mt-[clamp(2.5rem,5vw,4rem)] bg-ink-950/80 px-[var(--gutter)] py-5 backdrop-blur-md">
        <TrackRail active={active} onChange={setActive} counts={counts} />
      </div>

      {/* ---- Featured spreads ---- */}
      <AnimatePresence mode="popLayout" initial={false}>
        {featured.map((project, i) => (
          <motion.div
            key={project.id}
            layout={!reduced}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            {i > 0 && <Rule />}
            {/* Numerals follow the filtered order, so a filtered list still reads 01, 02, 03. */}
            <ProjectEntry
              project={project}
              index={i}
              numeral={String(i + 1).padStart(2, "0")}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {featured.length === 0 && (
        <p className="py-[clamp(3rem,6vw,5rem)] text-ivory-600">
          No featured spread in this track — the index below carries it.
        </p>
      )}

      <Rule />

      {/* ---- The index ---- */}
      <div className="pt-[clamp(3rem,6vw,5rem)]">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h3 className="eyebrow">The full index</h3>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ivory-700">
            {index.length} {index.length === 1 ? "entry" : "entries"}
          </p>
        </div>

        <motion.ul
          layout={!reduced}
          className="mt-[clamp(2rem,4vw,3rem)] grid auto-rows-fr grid-cols-1 gap-[clamp(1rem,2vw,1.5rem)] md:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {index.map((item) => (
              <motion.li
                key={item.title}
                layout={!reduced}
                className="h-full"
                initial={reduced ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.42, ease: EASE }}
              >
                <IndexCard item={item} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </Section>
  );
}

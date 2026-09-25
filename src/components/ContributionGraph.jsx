import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "../lib/cn";
import { useReducedMotion } from "../lib/motion";
import { accentOf } from "../lib/tracks";
import { commitLedger, contributionCalendar as cal } from "../content";

const DAY = 86400000;
const B36 = "0123456789abcdefghijklmnopqrstuvwxyz";

/** Cell (row, col) is `col` weeks and `row` days after the calendar's start. */
const cellDate = (start, row, col) =>
  new Date(Date.parse(start) + (col * 7 + row) * DAY);

const LONG_DATE = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/**
 * A figure that counts up once, the first time it is scrolled past.
 * Hand-rolled rather than driven by motion's `animate`: this runs on a
 * single rAF with no animation registry behind it, so a StrictMode
 * double-mount cannot leave the figure stranded at zero.
 */
function Counter({ value, className }) {
  const ref = useRef(null);
  // Vertical-only inset. A bare "-12%" also insets left and right, which on a
  // wide viewport swallows the first figure in the row — its span is narrow and
  // sits in the gutter, so it would never intersect and would stay at zero.
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setShown(value);
      return;
    }

    const DURATION = 1700;
    let frame = 0;
    let start = null;

    const tick = (now) => {
      if (start === null) start = now;
      const t = Math.min((now - start) / DURATION, 1);
      // Same ease-out curve the rest of the page uses, as a closed form.
      setShown(Math.round(value * (1 - Math.pow(1 - t, 4))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className={className}>
      {shown.toLocaleString("en-GB")}
    </span>
  );
}

/**
 * The 12-month GitHub calendar, drawn from the snapshot in content.js.
 * Cells wash in column by column so the year reads left to right rather
 * than appearing all at once.
 */
function Heatmap() {
  const ref = useRef(null);
  // Two observers on the same element, deliberately. `mounted` runs a screen
  // early and decides whether the 371 cells exist at all — they are the
  // single largest block of nodes on the page and they sit far below the
  // fold, so building them at load is 371 nodes of style and layout nobody
  // is looking at. `inView` is the tight one that starts the wave, and has
  // to stay tight or the animation would be over before it is on screen.
  // `mounted` is deliberately two-way: the cells are built when the year is
  // within a screen of the viewport and torn down again once it is well past,
  // so the 371 nodes exist only while someone could be looking at them.
  const mounted = useInView(ref, { margin: "800px 0px 800px 0px" });
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();

  // The wave is a first-impression flourish. Once it has run, the cells are
  // simply present — otherwise every scroll back through the section would
  // re-mount them and replay it, which is not what deloading should look like.
  const [played, setPlayed] = useState(false);
  useEffect(() => {
    if (!inView || played) return;
    const done = setTimeout(() => setPlayed(true), 1300);
    return () => clearTimeout(done);
  }, [inView, played]);
  const cols = cal.levels[0].length;
  const endMs = Date.parse(cal.end);

  return (
    <div ref={ref} className="mt-10">
      {/* 53 weeks do not fit a phone, so the grid scrolls. The mask fades the
          right edge to say so, and disappears once the whole year fits. */}
      <div
        // min-height is the mounted box's exact height and is held whether or
        // not the cells exist yet, so deferring them cannot shift the ledger
        // below by a pixel: 7 rows x 11px + 6 gaps x 3px = 95, plus the 8px
        // of pb-2, which counts inside the box under border-box sizing.
        className="min-h-[103px] overflow-x-auto pb-2 [scrollbar-width:thin]
                   [mask-image:linear-gradient(to_right,#000_85%,transparent)]
                   md:[mask-image:none]"
      >
        <div
          className="grid w-max gap-[3px]"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridAutoFlow: "row" }}
          role="img"
          aria-label={`GitHub contribution calendar: ${cal.total} contributions across ${cal.activeDays} active days between ${cal.start} and ${cal.end}.`}
        >
          {mounted && cal.levels.map((row, r) =>
            row.split("").map((lvl, c) => {
              const date = cellDate(cal.start, r, c);
              // The grid is a full 53 weeks; the tail runs past the snapshot.
              if (date.getTime() > endMs) {
                return <span key={`${r}-${c}`} className="h-[11px] w-[11px]" />;
              }
              const level = Number(lvl);
              const count = B36.indexOf(cal.counts[r][c]);
              return (
                <span
                  key={`${r}-${c}`}
                  title={`${count || "No"} contribution${count === 1 ? "" : "s"} on ${LONG_DATE.format(date)}`}
                  className={cn(
                    "h-[11px] w-[11px] rounded-[2px] border border-white/[0.04]",
                    // Hidden only while it still has an entrance to make.
                    !reduced && !played && "opacity-0",
                    !reduced && !played && inView &&
                      "animate-[cell-in_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                  )}
                  style={{
                    background:
                      level === 0
                        ? "color-mix(in oklab, var(--color-ivory-700) 12%, transparent)"
                        : `color-mix(in oklab, var(--color-gold-500) ${[0, 26, 48, 72, 100][level]}%, transparent)`,
                    boxShadow:
                      level >= 3
                        ? "0 0 10px color-mix(in oklab, var(--color-gold-500) 35%, transparent)"
                        : undefined,
                    animationDelay: `${c * 14}ms`,
                  }}
                />
              );
            })
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ivory-700">
        <span>
          {cal.total} contributions · {cal.activeDays} active days · snapshot {commitLedger.asOf}
        </span>
        <span className="flex items-center gap-1.5">
          Less
          {[0, 1, 2, 3, 4].map((l) => (
            <span
              key={l}
              className="h-[11px] w-[11px] rounded-[2px] border border-white/[0.04]"
              style={{
                background:
                  l === 0
                    ? "color-mix(in oklab, var(--color-ivory-700) 12%, transparent)"
                    : `color-mix(in oklab, var(--color-gold-500) ${[0, 26, 48, 72, 100][l]}%, transparent)`,
              }}
            />
          ))}
          More
        </span>
      </div>

      <style>{`
        @keyframes cell-in {
          from { opacity: 0; transform: scale(0.4); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

/** Commits per repository, as bars that grow out of the left rule. */
function Ledger() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const max = commitLedger.top[0].commits;

  return (
    <ul ref={ref} className="mt-10 grid gap-2">
      {commitLedger.top.map((row, i) => (
        <li key={row.repo} className="group grid grid-cols-[1fr_auto] items-center gap-4">
          <div className="relative h-[26px] overflow-hidden rounded-[2px]">
            <div
              className="absolute inset-y-0 left-0 origin-left rounded-[2px] transition-[filter] duration-500 group-hover:brightness-150"
              style={{
                width: `${(row.commits / max) * 100}%`,
                background: `linear-gradient(90deg,
                  color-mix(in oklab, ${accentOf(row.track)} 34%, transparent),
                  color-mix(in oklab, ${accentOf(row.track)} 9%, transparent))`,
                borderLeft: `2px solid ${accentOf(row.track)}`,
                transform: reduced || inView ? "scaleX(1)" : "scaleX(0)",
                transition: `transform 1.1s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms, filter 0.5s`,
              }}
            />
            <span className="relative z-10 flex h-full items-center gap-2 pl-3 font-mono text-[0.68rem] tracking-[0.06em] text-ivory-100">
              {row.repo}
              {row.external && (
                <span
                  className="rounded-full border border-white/15 px-1.5 py-px text-[0.5rem] uppercase tracking-[0.14em] text-ivory-500"
                  title="A repository owned by someone else"
                >
                  ext
                </span>
              )}
            </span>
          </div>
          <span className="font-mono text-[0.68rem] tabular-nums text-ivory-500">
            {row.commits}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * The evidence block above the project index: four counters, the calendar,
 * and the per-repository commit ledger. Every figure here comes from a
 * GitHub commit search for author:Botkraker, snapshotted — nothing is live,
 * and the snapshot date is printed so it never reads as one.
 */
export default function ContributionGraph() {
  return (
    <div className="border-y border-white/[0.06] py-[clamp(2.5rem,5vw,4rem)]">
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        {commitLedger.totals.map((t) => (
          <div key={t.label}>
            <p className="display text-[clamp(2.2rem,5vw,3.6rem)] leading-none text-gold-400">
              <Counter value={t.value} />
            </p>
            <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ivory-600">
              {t.label}
            </p>
          </div>
        ))}
      </div>

      <Heatmap />

      <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-8 lg:grid-cols-[minmax(0,22ch)_1fr] lg:gap-16">
        <div>
          <h4 className="eyebrow">Commit ledger</h4>
          <p className="mt-4 text-[0.85rem] leading-relaxed text-ivory-500">
            Repositories by commits I authored. The ones marked{" "}
            <span className="font-mono text-[0.7rem] uppercase text-ivory-300">ext</span> belong to
            other people — those commits went into a codebase I did not own.
          </p>
        </div>
        <Ledger />
      </div>
    </div>
  );
}

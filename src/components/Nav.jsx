import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { nav, profile } from "../content";
import { cn } from "../lib/cn";

/** Hairline progress bar pinned to the very top of the viewport. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-gold-500/70"
    />
  );
}

/**
 * Vertical section index on the right edge. Desktop only — on small screens
 * there isn't room for it and the page is short enough to simply scroll.
 */
function SectionIndex({ active }) {
  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-[max(1.25rem,calc(var(--gutter)*0.4))] top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col gap-4">
        {nav.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="group flex items-center justify-end gap-3"
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={cn(
                    "font-mono text-[0.6rem] uppercase tracking-[0.22em] transition-all duration-500",
                    isActive
                      ? "text-gold-400 opacity-100"
                      : "text-ivory-500 opacity-0 group-hover:opacity-100"
                  )}
                >
                  {item.label}
                </span>
                <span
                  className={cn(
                    "block h-px transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isActive
                      ? "w-8 bg-gold-500"
                      : "w-4 bg-ivory-700 group-hover:w-6 group-hover:bg-gold-600"
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function Nav() {
  const [active, setActive] = useState(null);
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.6;
      setLifted(pastHero);
      if (!pastHero) setActive(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest the middle of the viewport rather than the
        // first intersecting one, so tall sections don't hold the marker.
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        const best = visible.reduce((a, b) =>
          Math.abs(a.boundingClientRect.top) < Math.abs(b.boundingClientRect.top) ? a : b
        );
        setActive(best.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ScrollProgress />

      <div
        className={cn(
          "fixed inset-x-0 top-0 z-40 flex items-center justify-between",
          "px-[var(--gutter)] py-5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          lifted
            ? "border-b border-white/[0.06] bg-ink-950/70 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <a
          href="#top"
          className="font-display text-base tracking-tight text-ivory-50 transition-colors duration-500 hover:text-gold-300"
        >
          YBS
        </a>

        <div className="flex items-center gap-6">
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ivory-500 transition-colors duration-500 hover:text-gold-400"
          >
            Email
          </a>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ivory-500 transition-colors duration-500 hover:text-gold-400"
          >
            Résumé
          </a>
        </div>
      </div>

      <SectionIndex active={active} />
    </>
  );
}

import { Section, SectionHead, Rule, TagList } from "../components/Typography";
import { GoldLink, LuxeCard } from "../components/Interactive";
import { projects, moreProjects } from "../content";
import ProjectEntry from "./ProjectEntry";
import { DaringBadge, DecorativeAccent } from "../components/Decorative";

export default function Projects() {
  return (
    <Section id="projects">
      <div className="mb-6 flex items-center gap-4">
        <DecorativeAccent orientation="horizontal" color="emerald" />
        <p className="eyebrow text-emerald-400">04 — Featured Projects</p>
      </div>
      <h2 className="display display-xl text-[clamp(2rem,5vw,4rem)] text-ivory-50">
        What I've <span className="italic text-coral-400">built</span>.
      </h2>

      {/* Rules divide the spreads rather than boxing them. */}
      <div>
        {projects.map((project, i) => (
          <div key={project.id}>
            {i > 0 && <Rule />}
            <ProjectEntry project={project} index={i} />
          </div>
        ))}
      </div>

      <Rule />

      <div className="pt-[clamp(3.5rem,7vw,6rem)]">
        <h3 className="eyebrow">Additional Projects</h3>

        <ul className="mt-[clamp(2rem,4vw,3rem)] grid grid-cols-1 gap-[clamp(1rem,2vw,1.5rem)] md:grid-cols-2 lg:grid-cols-3">
          {moreProjects.map((item, i) => {
            const accentColors = ["coral", "emerald", "purple"];
            const color = accentColors[i % accentColors.length];

            return (
            <li key={item.title}>
              <LuxeCard className="group relative grid h-full overflow-hidden">
                {/* Subtle color accent background on hover */}
                <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-5 bg-${color}-500`} />

                <div className="relative flex h-full flex-col p-[clamp(1.5rem,2.5vw,2rem)]">
                  <div className="mb-3 flex items-center gap-2">
                    <DecorativeAccent orientation="vertical" color={color} />
                    <span className="text-[0.65rem] tracking-widest uppercase text-ivory-600">
                      Featured
                    </span>
                  </div>

                  <h4 className="display text-[clamp(1.2rem,2vw,1.5rem)] text-ivory-50">
                    {item.title}
                  </h4>

                  <p className="mt-5 text-[0.9rem] leading-relaxed text-ivory-300">
                    {item.blurb}
                  </p>

                  {item.metric && (
                    <p
                      className="mt-6 border-t border-gold-500/20 pt-4 font-mono text-[0.68rem]
                                 leading-relaxed tracking-[0.08em] text-gold-400"
                    >
                      {item.metric}
                    </p>
                  )}

                  <TagList items={item.tags} className="mt-auto pt-8" />

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
            </li>
          );
          })}
        </ul>
      </div>
    </Section>
  );
}

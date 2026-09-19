import { Section, SectionHead, Rule, TagList } from "../components/Typography";
import { LuxeCard } from "../components/Interactive";
import { projects, moreProjects } from "../content";
import ProjectEntry from "./ProjectEntry";

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHead kicker="04 — Featured Projects" heading="What I've built." headingId="projects-heading" />

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
          {moreProjects.map((item) => (
            <li key={item.title}>
              {/* LuxeCard wraps its children in its own div, so the card is a
                  grid container and that wrapper is what stretches to full
                  height — mt-auto on the tags then pins them to the bottom. */}
              <LuxeCard className="grid h-full">
                <div className="flex h-full flex-col p-[clamp(1.5rem,2.5vw,2rem)]">
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
                </div>
              </LuxeCard>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

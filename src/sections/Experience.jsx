import {
  Section,
  SectionHead,
  RevealText,
  Rule,
  TagList,
} from "../components/Typography";
import { GoldLink, MediaFrame } from "../components/Interactive";
import { experience } from "../content.js";

/**
 * An editorial CV spread: each role is a full-width entry separated by a
 * hairline, with a narrow metadata rail on the left and the prose on the right.
 * No boxes — the rules and the column offset carry the structure.
 */
export default function Experience() {
  return (
    <Section id="experience">
      <SectionHead
        kicker="02 — Experience"
        heading="Where I've worked."
        headingId="experience-heading"
      />

      <div>
        {experience.map((item, i) => (
          <div key={item.id}>
            {i > 0 && <Rule delay={0.05} />}
            <Entry item={item} index={String(i + 1).padStart(2, "0")} />
          </div>
        ))}
      </div>
    </Section>
  );
}

function Entry({ item, index }) {
  return (
    /* `group` drives MediaFrame's hover states and the index warming to gold. */
    <article className="group grid gap-y-8 py-[clamp(3rem,6vw,5.5rem)] lg:grid-cols-12 lg:gap-x-10">
      <div className="flex items-center gap-6 lg:col-span-3 lg:flex-col lg:items-start lg:gap-7">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-ivory-500">
          {item.date}
        </p>
        <span
          aria-hidden="true"
          className="display display-xl text-[clamp(2.25rem,6vw,4.25rem)] leading-none text-ivory-700/30
                     transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                     group-hover:text-gold-600/50"
        >
          {index}
        </span>
      </div>

      <div className="lg:col-span-8 lg:col-start-5">
        <RevealText
          as="h3"
          className="display max-w-[22ch] text-[clamp(1.6rem,3vw,2.5rem)] text-ivory-50"
        >
          {item.role}
        </RevealText>

        <p className="mt-4 font-sans text-[0.85rem] font-medium tracking-[0.08em] text-gold-500">
          {item.org}
        </p>

        <ul className="mt-9 flex flex-col gap-6">
          {item.points.map((point) => (
            <li key={point} className="flex max-w-[62ch] gap-5">
              <span
                aria-hidden="true"
                className="mt-[0.85em] h-px w-5 shrink-0 bg-gold-500/45"
              />
              <span className="leading-relaxed text-ivory-300">{point}</span>
            </li>
          ))}
        </ul>

        {item.video && (
          <figure className="mt-11 max-w-[34rem]">
            <MediaFrame src={item.video} />
            <figcaption className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ivory-500">
              Demo capture — {item.org}
            </figcaption>
          </figure>
        )}

        <TagList items={item.tags} className="mt-11" />

        {item.link && (
          <div className="mt-9">
            <GoldLink
              href={item.link}
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

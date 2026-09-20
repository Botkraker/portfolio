import { motion } from "motion/react";
import { Section, SectionHead, Eyebrow, Rule } from "../components/Typography";
import { skillGroups, certifications, languages } from "../content";
import { DaringBadge, DecorativeAccent } from "../components/Decorative";

const rise = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-12%" },
};

/**
 * Skills as an editorial index: group name in the left rail, its items set
 * as one running line in the right column. Pills would turn a directory
 * into confetti.
 */
export default function Skills() {
  return (
    <Section id="skills">
      <SectionHead kicker="05 — Skills" heading="Toolbox." headingId="skills-heading" />

      <ul>
        {skillGroups.map((group, i) => (
          <li key={group.title}>
            {i > 0 && <Rule className="my-8" delay={0.05} />}
            <motion.div
              {...rise}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
              className="grid gap-4 lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-3 lg:pt-1 space-y-2">
                <h3
                  className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-gold-500"
                >
                  {group.title}
                </h3>
                <DecorativeAccent orientation="horizontal" color="emerald" />
              </div>
              <ul className="flex flex-wrap items-baseline gap-x-3 gap-y-2 lg:col-span-9">
                {group.items.map((item, j) => (
                  <li
                    key={item}
                    className="font-sans text-ivory-300 text-[clamp(0.95rem,1.4vw,1.15rem)]"
                  >
                    {item}
                    {j < group.items.length - 1 && (
                      <span aria-hidden="true" className="ml-3 text-gold-600/70">
                        ·
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          </li>
        ))}
      </ul>

      <Rule className="mt-12 mb-[clamp(2.5rem,5vw,4rem)]" />

      <div className="grid gap-[clamp(2.5rem,5vw,4rem)] md:grid-cols-2 md:gap-12">
        <motion.div
          {...rise}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-6">
            <DecorativeAccent orientation="horizontal" color="coral" />
            <Eyebrow className="text-coral-400">Certifications</Eyebrow>
          </div>
          <ul className="space-y-4">
            {certifications.map((cert, i) => (
              <li key={cert} className="flex gap-4 font-sans text-ivory-300 leading-relaxed items-start">
                <DaringBadge
                  text={`${i + 1}`}
                  color={["coral", "emerald", "purple"][i % 3]}
                  icon="✓"
                />
                <span className="max-w-[42ch] pt-1">{cert}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          {...rise}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <DecorativeAccent orientation="horizontal" color="purple" />
            <Eyebrow className="text-purple-400">Languages</Eyebrow>
          </div>
          <dl>
            {languages.map((lang) => (
              <div
                key={lang.name}
                className="flex items-baseline justify-between gap-4
                           border-b border-white/[0.06] py-3.5 last:border-b-0"
              >
                <dt className="font-sans text-ivory-100">{lang.name}</dt>
                <dd className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ivory-500">
                  {lang.level}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </Section>
  );
}

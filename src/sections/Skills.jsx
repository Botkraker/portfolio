import { motion } from "motion/react";
import { Section, SectionHead, Eyebrow, Rule } from "../components/Typography";
import { skillGroups, certifications, languages } from "../content";

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
              <h3
                className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-gold-500
                           lg:col-span-3 lg:pt-1"
              >
                {group.title}
              </h3>
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
          <Eyebrow>Certifications</Eyebrow>
          <ul className="mt-6 space-y-4">
            {certifications.map((cert) => (
              <li key={cert} className="flex gap-4 font-sans text-ivory-300 leading-relaxed">
                <span
                  aria-hidden="true"
                  className="mt-[0.85em] h-px w-4 shrink-0 bg-gold-600"
                />
                <span className="max-w-[42ch]">{cert}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          {...rise}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        >
          <Eyebrow>Languages</Eyebrow>
          <dl className="mt-6">
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

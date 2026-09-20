import { motion } from "motion/react";
import { Section, SectionHead } from "../components/Typography";
import ScrollReveal from "../components/reactbits/ScrollReveal";
import { about } from "../content";
import { DecorativeAccent, CornerBracket } from "../components/Decorative";

/**
 * The lede is set as a pull-quote in the display serif; the supporting
 * paragraphs sit in an offset right-hand column so the section reads as a
 * spread rather than a stack.
 */
export default function About() {
  return (
    <Section id="about">
      <SectionHead kicker={about.kicker} heading={about.heading} headingId="about-heading" />

      <div className="grid gap-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-12">
        {/* Scrubbed to scroll position, so the quote sharpens as it's read. */}
        <ScrollReveal
          as="p"
          baseOpacity={0.14}
          blurStrength={6}
          className="display text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.25] text-ivory-50
                     max-w-[26ch] lg:col-span-6"
        >
          {about.lede}
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative lg:col-span-5 lg:col-start-8 lg:pl-10"
        >
          {/* Decorative corner bracket for visual richness */}
          <CornerBracket position="top-left" color="emerald" size="md" />

          {/* Animated gradient hairline with color shifts */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 hidden h-full w-px
                       bg-gradient-to-b from-emerald-500/30 via-purple-500/15 via-gold-500/10 to-transparent lg:block"
          />
          <div className="space-y-6">
            {about.paragraphs.map((p) => (
              <p
                key={p.slice(0, 32)}
                className="font-sans text-ivory-300 leading-relaxed max-w-[62ch]"
              >
                {p}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

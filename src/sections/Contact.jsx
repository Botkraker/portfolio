import { motion } from "motion/react";
import { Section, Eyebrow, Rule, RevealText } from "../components/Typography";
import { Magnetic, GoldLink } from "../components/Interactive";
import { contact, profile } from "../content";

const links = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Résumé", href: profile.resume },
];

/**
 * The closing spread. The email is the largest thing here after the heading,
 * so it carries the call to action instead of a button.
 */
export default function Contact() {
  return (
    <Section id="contact">
      <Eyebrow>{contact.kicker}</Eyebrow>
      <Rule className="mt-5 mb-10 max-w-[220px]" />

      <RevealText
        id="contact-heading"
        as="h2"
        className="display display-statement text-[clamp(3rem,9vw,7rem)] text-ivory-50"
      >
        {contact.heading}
      </RevealText>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="mt-10 max-w-[52ch] font-sans text-ivory-300 leading-relaxed"
      >
        {contact.text}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="mt-[clamp(2.5rem,5vw,4rem)] max-w-full"
      >
        {/* break-words is the guard: the address is one long unbreakable
            token and the gutters leave ~335px at a 375px viewport. */}
        <Magnetic
          as="a"
          href={`mailto:${profile.email}`}
          strength={0.16}
          className="group relative max-w-full break-words display
                     text-[clamp(1.3rem,3.4vw,2.4rem)] text-ivory-50
                     transition-colors duration-500 hover:text-gold-300"
        >
          {profile.email}
          <span
            aria-hidden="true"
            className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-gold-500
                       transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                       group-hover:scale-x-100"
          />
        </Magnetic>
      </motion.div>

      <motion.ul
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
        className="mt-[clamp(3rem,6vw,4.5rem)] flex flex-wrap gap-x-10 gap-y-5"
      >
        {links.map(({ label, href }) => (
          <li key={label}>
            <GoldLink
              href={href}
              external
              className="font-mono text-[0.7rem] uppercase tracking-[0.24em]"
            >
              {label}
            </GoldLink>
          </li>
        ))}
      </motion.ul>
    </Section>
  );
}

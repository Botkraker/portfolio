import { MotionConfig } from "motion/react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Aurora, Grain, Spotlight } from "./components/Atmosphere";
import RegressionField from "./components/RegressionField";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Now from "./sections/Now";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

export default function App() {
  useSmoothScroll();

  return (
    // "user" drops transform animations when the OS asks for reduced motion,
    // keeping only opacity fades, so nothing slides or rises.
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]
                   focus:rounded-[2px] focus:border focus:border-gold-500/40 focus:bg-ink-900
                   focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase
                   focus:tracking-[0.2em] focus:text-gold-300"
      >
        Skip to content
      </a>

      <Aurora />
      <Spotlight />
      <RegressionField />
      <Nav />

      <div className="relative z-10">
        <Hero />
        <main id="main">
          <About />
          <Experience />
          <Now />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>

      <Grain />
    </MotionConfig>
  );
}

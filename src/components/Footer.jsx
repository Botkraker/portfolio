import { Rule } from "./Typography";

/** Page footer. Rendered outside <main> so it is exposed as a contentinfo landmark. */
export default function Footer() {
  return (
    <footer className="px-[var(--gutter)] pb-[clamp(2.5rem,5vw,4rem)]">
      <Rule />
      <div
        className="flex flex-col gap-2 pt-8 font-mono text-[0.65rem] uppercase
                   tracking-[0.2em] text-ivory-500 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>Designed &amp; built by Yassine Ben Sassi</p>
        <p>Last updated 2026</p>
      </div>
    </footer>
  );
}

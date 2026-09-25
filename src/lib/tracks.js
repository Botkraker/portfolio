/**
 * Track accents, resolved to the theme tokens rather than to Tailwind class
 * names. Tailwind v4 scans source for literal class strings, so a template
 * like `bg-${color}-500` would never be generated — inline custom properties
 * sidestep that and keep one accent definition per track.
 */
export const trackAccent = {
  all: "var(--color-gold-500)",
  ml: "var(--color-emerald-500)",
  bi: "var(--color-cyan-500)",
  eng: "var(--color-coral-500)",
};

export const accentOf = (track) => trackAccent[track] ?? trackAccent.all;

/** Style object consumed by anything that tints itself by track. */
export const accentVars = (track) => ({ "--accent": accentOf(track) });

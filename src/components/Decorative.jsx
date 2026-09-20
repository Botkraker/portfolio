import { useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/cn";
import { rng } from "../lib/rng";

/**
 * A hairline with axis ticks under it. Drop-in replacement for a plain rule
 * where a section wants to read as the bottom of a chart.
 */
export function AxisRule({ ticks = 12, className = "" }) {
  return (
    <div aria-hidden="true" className={cn("relative w-full", className)}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-px w-full origin-left bg-[var(--hairline-faint)]"
      />
      <div className="flex justify-between">
        {Array.from({ length: ticks }, (_, i) => (
          <span
            key={i}
            // Every fourth tick is a major one, as on a real axis.
            className={cn(
              "block w-px bg-[var(--hairline-faint)]",
              i % 4 === 0 ? "h-1.5" : "h-1"
            )}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Inline sparkline. Takes a series of numbers and draws it at whatever size
 * the caller sets — used to give an in-progress entry a pulse of its own.
 */
export function Sparkline({ values, className = "", color = "var(--color-gold-500)" }) {
  const d = useMemo(() => {
    if (!values?.length) return "";
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;
    return values
      .map((v, i) => {
        const x = (i / (values.length - 1)) * 100;
        const y = 100 - ((v - min) / span) * 100;
        return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");
  }, [values]);

  return (
    <svg
      aria-hidden="true"
      className={cn("overflow-visible", className)}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.85 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

/**
 * A small heatmap grid, shaped like a confusion matrix: bright on the
 * diagonal, dim off it. Pure ornament — it carries no real numbers.
 */
export function MatrixGrid({ size = 4, className = "" }) {
  const cells = useMemo(() => {
    const random = rng(97);
    return Array.from({ length: size * size }, (_, i) => {
      const row = Math.floor(i / size);
      const col = i % size;
      const onDiagonal = row === col;
      return onDiagonal ? 0.55 + random() * 0.4 : random() * 0.16;
    });
  }, [size]);

  return (
    <div
      aria-hidden="true"
      className={cn("grid gap-[2px]", className)}
      style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
    >
      {cells.map((value, i) => (
        <motion.span
          key={i}
          className="block aspect-square rounded-[1px]"
          style={{
            background: `color-mix(in oklab, var(--color-gold-500) ${Math.round(
              value * 100
            )}%, transparent)`,
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: 0.5,
            delay: i * 0.018,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
    </div>
  );
}

/**
 * Decorative line accent used to punctuate sections.
 * Can be horizontal or vertical, in various colors.
 */
export function DecorativeAccent({ orientation = "horizontal", color = "gold", className = "" }) {
  const colorClass = {
    gold: "bg-gold-500",
    emerald: "bg-emerald-500",
    coral: "bg-coral-500",
    purple: "bg-purple-500",
  }[color] || "bg-gold-500";

  const orientationClass = orientation === "horizontal"
    ? `h-1 w-20 ${colorClass}`
    : `w-1 h-16 ${colorClass}`;

  return (
    <motion.div
      className={`${orientationClass} rounded-full ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  );
}

/**
 * Daring badge for highlights — shows featured work, awards, highlights.
 */
export function DaringBadge({ text, color = "coral", icon = null }) {
  const colorMap = {
    coral: "bg-coral-500/30 text-coral-300 border-coral-400/60 shadow-lg shadow-coral-500/30",
    emerald: "bg-emerald-500/30 text-emerald-300 border-emerald-400/60 shadow-lg shadow-emerald-500/30",
    purple: "bg-purple-500/30 text-purple-300 border-purple-400/60 shadow-lg shadow-purple-500/30",
    gold: "bg-gold-500/30 text-gold-200 border-gold-400/60 shadow-lg shadow-gold-500/30",
    pink: "bg-pink-500/30 text-pink-300 border-pink-400/60 shadow-lg shadow-pink-500/30",
    cyan: "bg-cyan-500/30 text-cyan-300 border-cyan-400/60 shadow-lg shadow-cyan-500/30",
  };

  return (
    <motion.span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider border ${colorMap[color] || colorMap.coral}`}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2 }}
    >
      {icon && <span className="text-sm">{icon}</span>}
      {text}
    </motion.span>
  );
}

/**
 * Decorative corner bracket — adds art-deco flair to sections.
 */
export function CornerBracket({ position = "top-left", color = "gold", size = "md" }) {
  const sizeMap = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const colorClass = {
    gold: "border-gold-500",
    emerald: "border-emerald-500",
    coral: "border-coral-500",
    purple: "border-purple-500",
  }[color] || "border-gold-500";

  const positionClass = {
    "top-left": "top-0 left-0 border-t-2 border-l-2 rounded-tl-lg",
    "top-right": "top-0 right-0 border-t-2 border-r-2 rounded-tr-lg",
    "bottom-left": "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg",
    "bottom-right": "bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg",
  }[position];

  return (
    <motion.div
      className={`absolute pointer-events-none ${sizeMap[size]} ${colorClass} ${positionClass}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.5 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      aria-hidden="true"
    />
  );
}

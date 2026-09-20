import { motion } from "motion/react";

/**
 * Floating geometric shapes that respond to scroll.
 * Maximalist version with more vibrant, energetic colors and animations.
 */
export function FloatingShapes() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Emerald accent circle — top-right */}
      <motion.div
        className="absolute h-96 w-96 rounded-full bg-gradient-to-br from-emerald-500/15 to-emerald-600/8 blur-3xl"
        style={{ top: "10%", right: "-10%" }}
        animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* Purple accent — bottom-left */}
      <motion.div
        className="absolute h-80 w-80 rounded-full bg-gradient-to-tl from-purple-600/12 to-purple-500/8 blur-3xl"
        style={{ bottom: "5%", left: "-8%" }}
        animate={{ y: [0, -20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        aria-hidden="true"
      />

      {/* Coral micro-accent — upper-left */}
      <motion.div
        className="absolute h-32 w-32 rounded-full bg-coral-500/8 blur-2xl"
        style={{ top: "30%", left: "5%" }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* Pink accent — right side, mid-page */}
      <motion.div
        className="absolute h-64 w-64 rounded-full bg-gradient-to-bl from-pink-500/10 to-pink-600/5 blur-3xl"
        style={{ top: "50%", right: "5%" }}
        animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        aria-hidden="true"
      />

      {/* Cyan accent — bottom right for electric vibe */}
      <motion.div
        className="absolute h-48 w-48 rounded-full bg-gradient-to-tl from-cyan-500/8 to-cyan-600/4 blur-3xl"
        style={{ bottom: "20%", right: "10%" }}
        animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        aria-hidden="true"
      />
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
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  );
}

/**
 * Daring badge for highlights — shows featured work, awards, highlights.
 * Maximalist version with more vibrant colors and dynamic effects.
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
      transition={{ duration: 0.8 }}
      aria-hidden="true"
    />
  );
}

/**
 * Sparkle effect that follows mouse movement.
 * Creates magical, playful cursor interaction.
 */
export function SparkleTrail() {
  const [sparkles, setSparkles] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();
      const colors = [
        "rgba(255, 200, 91, 0.8)",
        "rgba(127, 255, 212, 0.8)",
        "rgba(255, 68, 68, 0.8)",
        "rgba(194, 26, 255, 0.8)",
        "rgba(0, 255, 255, 0.8)",
      ];

      const newSparkle = {
        id: now,
        x: e.clientX,
        y: e.clientY,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setSparkles((prev) => [...prev.slice(-20), newSparkle]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== now));
      }, 1000);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0"
      aria-hidden="true"
    >
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{ left: sparkle.x, top: sparkle.y, backgroundColor: sparkle.color }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 0, opacity: 0, y: -30 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/**
 * Interactive ornament — responds to clicks with particles.
 */
export function InteractiveOrament({ children, className = "" }) {
  const [particles, setParticles] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticles = Array.from({ length: 6 }).map((_, i) => ({
      id: `${Date.now()}-${i}`,
      angle: (i / 6) * Math.PI * 2,
    }));

    setParticles((prev) => [...prev, ...newParticles]);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative cursor-pointer ${className}`}
      role="button"
      tabIndex={0}
    >
      {children}
      {particles.map((particle) => {
        const vx = Math.cos(particle.angle) * 100;
        const vy = Math.sin(particle.angle) * 100;

        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== particle.id));
        }, 600);

        return (
          <motion.div
            key={particle.id}
            className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-gold-400 to-coral-400 pointer-events-none"
            style={{ left: "50%", top: "50%" }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{ x: vx, y: vy, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

/**
 * Gradient text effect with color cycling.
 */
export function GradientText({ text, className = "" }) {
  return (
    <motion.span
      className={`bg-gradient-to-r from-gold-300 via-coral-400 to-purple-400 bg-clip-text text-transparent ${className}`}
      animate={{
        backgroundPosition: ["0%", "100%", "0%"],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{ backgroundSize: "200% 100%" }}
    >
      {text}
    </motion.span>
  );
}

import { useEffect, useRef } from "react";
import { useHasHover, useReducedMotion } from "../lib/motion";

/**
 * Film grain, drawn once to an offscreen canvas and tiled via CSS.
 * Generating it beats shipping a noise PNG and lets us keep it
 * genuinely subtle — at 3% opacity it reads as paper, not texture.
 */
export function Grain() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const size = 140;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const image = ctx.createImageData(size, size);
    for (let i = 0; i < image.data.length; i += 4) {
      const v = Math.random() * 255;
      image.data[i] = v;
      image.data[i + 1] = v;
      image.data[i + 2] = v;
      image.data[i + 3] = 255;
    }
    ctx.putImageData(image, 0, 0);
    document.documentElement.style.setProperty(
      "--grain-url",
      `url(${canvas.toDataURL("image/png")})`
    );
  }, []);

  return (
    <>
      <canvas ref={ref} className="hidden" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: "var(--grain-url)", backgroundRepeat: "repeat" }}
      />
    </>
  );
}

/**
 * Two very slow gold blooms drifting behind the page. Heavily blurred and
 * low opacity — the goal is that you notice the room is warm, not that
 * there is an animation playing.
 */
export function Aurora() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute -top-[20vh] -left-[10vw] h-[70vh] w-[70vw] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-gold-600) 16%, transparent) 0%, transparent 65%)",
          animation: reduced ? "none" : "drift-a 34s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute bottom-[-25vh] right-[-15vw] h-[65vh] w-[60vw] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-patina-600) 12%, transparent) 0%, transparent 65%)",
          animation: reduced ? "none" : "drift-b 42s ease-in-out infinite alternate",
        }}
      />
      <style>{`
        @keyframes drift-a {
          from { transform: translate3d(0,0,0) scale(1); }
          to   { transform: translate3d(6vw, 8vh, 0) scale(1.15); }
        }
        @keyframes drift-b {
          from { transform: translate3d(0,0,0) scale(1.1); }
          to   { transform: translate3d(-7vw, -6vh, 0) scale(1); }
        }
      `}</style>
    </div>
  );
}

/**
 * A soft gold spotlight that trails the cursor. It's a direct response to
 * the user's own input, so it stays on under reduced-motion; it's only
 * gated on having a real pointer.
 */
export function Spotlight() {
  const hasHover = useHasHover();
  const ref = useRef(null);

  useEffect(() => {
    if (!hasHover) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;

    const tick = () => {
      // Lag the light behind the cursor so it glides rather than snaps.
      x += (tx - x) * 0.07;
      y += (ty - y) * 0.07;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      // Sleep once the light has caught up; the next pointermove wakes it.
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [hasHover]);

  if (!hasHover) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[36rem] w-[36rem] rounded-full blur-[90px]"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--color-gold-500) 9%, transparent) 0%, transparent 60%)",
      }}
    />
  );
}

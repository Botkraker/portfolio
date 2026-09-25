import { useEffect, useRef, useState } from "react";
import { useHasHover, useReducedMotion } from "../lib/motion";

/**
 * A soft radial glow whose CSS `filter: blur()` has been baked into a bitmap.
 *
 * A live blur on a large layer that also animates is re-rendered on every
 * frame — the page's two blooms and the cursor light were the single biggest
 * cost while scrolling, several times everything else combined. The glow
 * never changes shape, so it is rendered once, blurred by the canvas, and the
 * element just moves the finished image. What reaches the screen is the same
 * picture: the element's background clipped to its rounded box, then blurred.
 *
 * Until the bitmap is ready — and in browsers whose canvas has no `filter` —
 * it renders the original CSS blur, so nothing ever looks different.
 */
function Bloom({ className, color, stop, blur, style, innerRef }) {
  const ref = useRef(null);
  const [baked, setBaked] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("filter" in (document.createElement("canvas").getContext("2d") ?? {}))) return;

    let url = null;
    let frame = 0;
    let cancelled = false;

    const bake = () => {
      frame = 0;
      // Layout size, not getBoundingClientRect: the drift animation scales
      // the box, and the bitmap has to match the untransformed element.
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (!w || !h) return;

      // The glow is nearly featureless, so a quarter-resolution bitmap scaled
      // back up is indistinguishable and a sixteenth of the pixels to blur.
      const s = 0.25;
      const pad = blur * 3; // a Gaussian is spent by three standard deviations
      const cw = Math.ceil((w + pad * 2) * s);
      const ch = Math.ceil((h + pad * 2) * s);

      const [r, g, b, a] = rgbaOf(el, color);

      // Shape first, unblurred: the gradient clipped to the rounded box,
      // exactly as CSS paints the background before the filter runs.
      const shape = document.createElement("canvas");
      shape.width = cw;
      shape.height = ch;
      const sc = shape.getContext("2d");
      const cx = cw / 2;
      const cy = ch / 2;
      // A CSS `circle` gradient defaults to farthest-corner.
      const radius = (Math.hypot(w, h) / 2) * s;
      const gradient = sc.createRadialGradient(cx, cy, 0, cx, cy, radius);
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a})`);
      // The same colour at zero alpha rather than `transparent`: canvas
      // gradients interpolate unpremultiplied, and fading to transparent
      // black would muddy the edge that CSS keeps clean.
      gradient.addColorStop(stop, `rgba(${r}, ${g}, ${b}, 0)`);
      sc.fillStyle = gradient;
      sc.beginPath();
      sc.ellipse(cx, cy, (w / 2) * s, (h / 2) * s, 0, 0, Math.PI * 2);
      sc.fill();

      // Then the blur, drawn into a second canvas so it isn't clipped.
      const out = document.createElement("canvas");
      out.width = cw;
      out.height = ch;
      const oc = out.getContext("2d");
      oc.filter = `blur(${blur * s}px)`;
      oc.drawImage(shape, 0, 0);

      out.toBlob((blob) => {
        if (cancelled || !blob) return;
        if (url) URL.revokeObjectURL(url);
        url = URL.createObjectURL(blob);
        setBaked({ url, pad });
      });
    };

    // Viewport-sized blooms change size with the window, so re-bake then.
    const observer = new ResizeObserver(() => {
      if (!frame) frame = requestAnimationFrame(bake);
    });
    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      if (url) URL.revokeObjectURL(url);
    };
  }, [color, stop, blur]);

  const setRef = (node) => {
    ref.current = node;
    if (innerRef) innerRef.current = node;
  };

  return (
    <div ref={setRef} className={className} style={style}>
      {baked ? (
        <div
          className="absolute"
          style={{
            inset: -baked.pad,
            backgroundImage: `url(${baked.url})`,
            backgroundSize: "100% 100%",
          }}
        />
      ) : (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${color} 0%, transparent ${stop * 100}%)`,
            filter: `blur(${blur}px)`,
          }}
        />
      )}
    </div>
  );
}

/**
 * Resolves a CSS colour — tokens, color-mix and all — to 8-bit RGBA by
 * letting the cascade compute it and painting one pixel, which sidesteps
 * however the browser chooses to serialise modern colour spaces.
 */
function rgbaOf(el, color) {
  el.style.color = color;
  const computed = getComputedStyle(el).color;
  el.style.color = "";
  const px = document.createElement("canvas").getContext("2d");
  px.canvas.width = px.canvas.height = 1;
  px.globalCompositeOperation = "copy";
  px.fillStyle = computed;
  px.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = px.getImageData(0, 0, 1, 1).data;
  return [r, g, b, +(a / 255).toFixed(3)];
}

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
        // No mix-blend-mode: a full-viewport blended layer forces the whole
        // page to re-composite on every frame. Plain low opacity reads the
        // same at this strength and costs nothing while scrolling.
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.028]"
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
      <Bloom
        className="absolute -top-[20vh] -left-[10vw] h-[70vh] w-[70vw]"
        color="color-mix(in oklab, var(--color-gold-600) 16%, transparent)"
        stop={0.65}
        blur={120}
        style={{ animation: reduced ? "none" : "drift-a 34s ease-in-out infinite alternate" }}
      />
      <Bloom
        className="absolute bottom-[-25vh] right-[-15vw] h-[65vh] w-[60vw]"
        color="color-mix(in oklab, var(--color-patina-600) 12%, transparent)"
        stop={0.65}
        blur={130}
        style={{ animation: reduced ? "none" : "drift-b 42s ease-in-out infinite alternate" }}
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
    <div aria-hidden="true">
      <Bloom
        innerRef={ref}
        className="pointer-events-none fixed left-0 top-0 z-0 h-[36rem] w-[36rem]"
        color="color-mix(in oklab, var(--color-gold-500) 9%, transparent)"
        stop={0.6}
        blur={90}
      />
    </div>
  );
}

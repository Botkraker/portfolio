import { useEffect, useRef } from "react";
import { rng } from "../lib/rng";
import { useReducedMotion } from "../lib/motion";

/**
 * The page backdrop: one least-squares fit, scrubbed by the scrollbar.
 *
 * At the top of the page the cloud is raw and the line is a bad guess. As you
 * read down, points settle in, the line converges on the real OLS fit, the
 * residuals flash and fade, and the loss falls. Reach the bottom and the model
 * has finished training.
 *
 * Driving it from scroll rather than a clock is also what keeps it cheap: the
 * canvas only redraws while the page is actually moving, and the loop shuts
 * itself off once the value settles. A still page costs zero frames.
 *
 * anime.js builds the choreography as a *paused* timeline; scroll position
 * seeks it. The library is used as an interpolator, never as a player.
 */

const POINT_COUNT = 60;

/** How strongly the plot reads against the page. */
const INTENSITY = 0.62;

/** Ordinary least squares over the sampled cloud. */
function fit(points) {
  const n = points.length;
  let sx = 0;
  let sy = 0;
  let sxy = 0;
  let sxx = 0;
  for (const p of points) {
    sx += p.x;
    sy += p.y;
    sxy += p.x * p.y;
    sxx += p.x * p.x;
  }
  const denom = n * sxx - sx * sx;
  const slope = denom === 0 ? 0 : (n * sxy - sx * sy) / denom;
  const intercept = (sy - slope * sx) / n;
  return { slope, intercept };
}

function meanSquaredError(points, slope, intercept) {
  let total = 0;
  for (const p of points) {
    const error = p.y - (slope * p.x + intercept);
    total += error * error;
  }
  return total / points.length;
}

/** A cloud with a real trend in it, plus the wrong line to start from. */
function sample(seed) {
  const random = rng(seed);
  const trueSlope = -0.45 - random() * 0.5;
  const trueIntercept = 0.72 + random() * 0.16;
  const spread = 0.07 + random() * 0.06;

  const points = Array.from({ length: POINT_COUNT }, () => {
    const x = random();
    const noise = (random() - 0.5) * 2 * spread;
    return {
      x,
      y: Math.min(0.99, Math.max(0.01, trueSlope * x + trueIntercept + noise)),
      r: 1.5 + random() * 2.1,
      warm: random() > 0.58,
      // Staggers the fade-in so the cloud assembles rather than blinking on.
      delay: random(),
    };
  });

  const target = fit(points);
  const guess = {
    slope: target.slope + 0.95,
    intercept: target.intercept - 0.3,
  };

  return {
    points,
    guess,
    target,
    startLoss: meanSquaredError(points, guess.slope, guess.intercept),
    endLoss: meanSquaredError(points, target.slope, target.intercept),
    // Cosmetic: the iteration count this run claims to have taken.
    iterations: 128,
  };
}

function readVar(name, fallback) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

export default function RegressionField() {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const palette = {
      gold: readVar("--color-gold-500", "#ffb600"),
      patina: readVar("--color-patina-400", "#7fb5a8"),
      ivory: readVar("--color-ivory-300", "#cdc5b6"),
    };

    let width = 0;
    let height = 0;
    const run = sample(20260920);

    // Everything a frame needs, so the draw is a pure function of this object.
    const state = {
      // Matches the timeline's starting value, so the frame drawn before the
      // animation library arrives already shows the cloud.
      reveal: 0.62,
      slope: run.guess.slope,
      intercept: run.guess.intercept,
      residual: 0,
      loss: run.startLoss,
      iteration: 0,
    };

    const resize = () => {
      // 1.5 rather than the full device ratio: this is a soft background, and
      // the fill cost scales with the square of it.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Data space is 0..1 with y pointing up; the canvas points down, and the
    // plot is inset so nothing collides with the page gutters.
    const padX = () => Math.min(width * 0.12, 160);
    const padY = () => Math.min(height * 0.14, 150);
    const toX = (x) => padX() + x * (width - padX() * 2);
    const toY = (y) => height - padY() - y * (height - padY() * 2);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Plot grid.
      ctx.strokeStyle = palette.ivory;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.04 * INTENSITY;
      ctx.beginPath();
      for (let i = 0; i <= 8; i += 1) {
        const gx = toX(i / 8);
        const gy = toY(i / 8);
        ctx.moveTo(gx, toY(0));
        ctx.lineTo(gx, toY(1));
        ctx.moveTo(toX(0), gy);
        ctx.lineTo(toX(1), gy);
      }
      ctx.stroke();

      const lineAt = (x) => state.slope * x + state.intercept;

      // Residuals: the vertical error each point contributes to the loss.
      if (state.residual > 0.001) {
        ctx.strokeStyle = palette.gold;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.18 * state.residual * INTENSITY;
        ctx.beginPath();
        for (const p of run.points) {
          if (state.reveal < p.delay) continue;
          ctx.moveTo(toX(p.x), toY(p.y));
          ctx.lineTo(toX(p.x), toY(lineAt(p.x)));
        }
        ctx.stroke();
      }

      // The fit itself.
      ctx.strokeStyle = palette.gold;
      ctx.lineWidth = 1.4;
      ctx.globalAlpha = 0.5 * INTENSITY;
      ctx.setLineDash([7, 5]);
      ctx.beginPath();
      ctx.moveTo(toX(0), toY(lineAt(0)));
      ctx.lineTo(toX(1), toY(lineAt(1)));
      ctx.stroke();
      ctx.setLineDash([]);

      // The cloud. Drawn last of the plot layers so the points sit on top of
      // the line rather than under it — they are the data, it is the model.
      for (const p of run.points) {
        const t = (state.reveal - p.delay) / 0.35;
        if (t <= 0) continue;
        const appear = Math.min(1, t);
        const px = toX(p.x);
        const py = toY(p.y);

        ctx.globalAlpha = (p.warm ? 0.62 : 0.44) * appear * INTENSITY;
        ctx.fillStyle = p.warm ? palette.gold : palette.patina;
        ctx.beginPath();
        ctx.arc(px, py, p.r * appear, 0, Math.PI * 2);
        ctx.fill();

        // A hairline ring gives each point an edge, so the cloud reads as
        // plotted observations instead of a soft spray.
        ctx.globalAlpha = (p.warm ? 0.3 : 0.2) * appear * INTENSITY;
        ctx.strokeStyle = p.warm ? palette.gold : palette.patina;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(px, py, (p.r + 1.6) * appear, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Readout, tucked into the bottom-left margin.
      ctx.globalAlpha = 0.34 * INTENSITY;
      ctx.fillStyle = palette.ivory;
      ctx.font = '500 10px "JetBrains Mono", ui-monospace, monospace';
      ctx.fillText(
        `iter ${Math.round(state.iteration).toString().padStart(3, "0")}` +
          `   mse ${state.loss.toFixed(4)}` +
          `   β₁ ${state.slope.toFixed(3)}`,
        padX(),
        height - padY() * 0.55
      );

      ctx.globalAlpha = 1;
    };

    // scrollHeight is a layout read, so asking for it inside the scroll
    // handler forced a synchronous reflow on every single scroll event —
    // the largest JS cost on the page in a CPU profile. Measure it once and
    // let a ResizeObserver refresh it when the document height actually
    // changes, which it does when the project filter swaps its list.
    let maxScroll = 0;
    const measureMax = () => {
      maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    };

    /** Fraction of the page scrolled, 0 at the top and 1 at the very bottom. */
    const scrollProgress = () => {
      if (maxScroll <= 0) return 1;
      return Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    const settle = (p) => {
      state.reveal = 1.35;
      state.slope = run.target.slope;
      state.intercept = run.target.intercept;
      state.residual = 0;
      state.loss = run.endLoss;
      state.iteration = run.iterations;
      if (p !== undefined) state.reveal = p;
    };

    resize();

    // Reduced motion gets the finished plot: the answer, none of the search.
    if (reduced) {
      settle();
      measureMax();
      draw();
      const onResizeStatic = () => {
        resize();
        draw();
      };
      window.addEventListener("resize", onResizeStatic);
      return () => window.removeEventListener("resize", onResizeStatic);
    }

    let cancelled = false;
    let timeline = null;
    let raf = 0;
    // Eased position trails the raw scroll fraction, so a flicked wheel
    // doesn't snap the fit across the screen.
    let current = 0;
    let target = 0;

    const render = () => {
      if (!timeline) {
        draw();
        return;
      }
      timeline.seek(current * timeline.duration);
      draw();
    };

    const tick = () => {
      const delta = target - current;
      if (Math.abs(delta) < 0.0004) {
        // Land exactly on the target, then stop: a still page costs nothing.
        current = target;
        render();
        raf = 0;
        return;
      }
      current += delta * 0.12;
      render();
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf && !cancelled) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = scrollProgress();
      wake();
    };

    const onResize = () => {
      resize();
      measureMax();
      target = scrollProgress();
      wake();
    };

    // Height changes that are not window resizes — filtering the project
    // list, media settling — still have to refresh the cached maximum.
    const heightObserver = new ResizeObserver(() => {
      measureMax();
      target = scrollProgress();
      wake();
    });
    heightObserver.observe(document.body);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // First frame before the library arrives, so the page is never blank.
    measureMax();
    target = scrollProgress();
    current = target;
    draw();

    import("animejs").then(({ createTimeline }) => {
      if (cancelled) return;

      // Positions are absolute, in arbitrary units across the page's scroll.
      // Explicit [from, to] pairs on every tween keep seeking stateless, so
      // scrubbing backwards is exact rather than cumulative.
      timeline = createTimeline({ autoplay: false, defaults: { ease: "linear" } })
        // Most of the cloud is already plotted when the page opens — the
        // scatter is the thing worth seeing first — and the stragglers drop
        // in over the opening screens.
        .add(state, { reveal: [0.62, 1.35], duration: 260, ease: "outQuad" }, 0)
        // The line tracks the scrollbar across the entire page, linearly and
        // edge to edge. Any easing here, or any gap at either end, leaves a
        // stretch of scroll where the fit visibly sits still.
        .add(
          state,
          {
            slope: [run.guess.slope, run.target.slope],
            intercept: [run.guess.intercept, run.target.intercept],
            duration: 1000,
          },
          0
        )
        // The loss falls faster than the scroll early on, as a real run does,
        // but on a gentle enough curve that the readout keeps moving to the
        // end instead of snapping to its final value in the first screen.
        .add(
          state,
          {
            loss: [run.startLoss, run.endLoss],
            duration: 1000,
            ease: "outQuad",
          },
          0
        )
        // Epochs count steadily: the one number that maps straight to scroll.
        .add(state, { iteration: [0, run.iterations], duration: 1000 }, 0)
        // Errors light up as soon as there is a cloud to measure, and ebb
        // away over the last third as the line closes on the fit.
        .add(state, { residual: [0, 1], duration: 260, ease: "outQuad" }, 120)
        .add(state, { residual: [1, 0], duration: 340, ease: "inQuad" }, 660);

      timeline.pause();
      render();
    });

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      heightObserver.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}

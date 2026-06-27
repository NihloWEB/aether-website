/* ============================================================
   utils.js — Tiny shared helpers (no dependencies)
   ============================================================ */

export const select = (sel, ctx = document) => ctx.querySelector(sel);
export const selectAll = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const lerp = (a, b, t) => a + (b - a) * t;

/** Re-map a value from one range to another. */
export const mapRange = (v, inMin, inMax, outMin, outMax) =>
  outMin + ((v - inMin) / (inMax - inMin)) * (outMax - outMin);

export const round = (n, p = 2) => { const f = 10 ** p; return Math.round(n * f) / f; };

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isTouch = () =>
  window.matchMedia('(hover: none), (pointer: coarse)').matches;

/** Run fn once the DOM is ready. */
export const ready = (fn) => {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn, { once: true });
};

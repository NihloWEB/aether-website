/* ============================================================
   scroll-engine.js — One shared, self-throttling scroll loop
   We keep NATIVE scroll (so position:sticky keeps working) and
   only smooth the *value* passed to scrubbed effects. The rAF
   loop auto-stops when the page is idle to save battery.
   Subscribe with onScroll(fn); fn receives the eased scrollY.
   ============================================================ */

import { lerp } from './utils.js';

const subscribers = new Set();
let target = window.scrollY;
let current = target;
let running = false;

function frame() {
  target = window.scrollY;
  current = lerp(current, target, 0.14);
  if (Math.abs(target - current) < 0.08) current = target;

  for (const fn of subscribers) fn(current, target);

  if (Math.abs(target - current) > 0.05) {
    requestAnimationFrame(frame);
  } else {
    running = false;
  }
}

function kick() {
  if (!running) { running = true; requestAnimationFrame(frame); }
}

/** Register a per-frame scroll handler. Returns an unsubscribe fn. */
export function onScroll(fn) {
  subscribers.add(fn);
  fn(current, target);   // prime immediately
  kick();
  return () => subscribers.delete(fn);
}

/** Force a recompute (e.g. after layout changes). */
export function refresh() {
  for (const fn of subscribers) fn(current, target);
  kick();
}

window.addEventListener('scroll', kick, { passive: true });
window.addEventListener('resize', refresh, { passive: true });
window.addEventListener('load', refresh);

/* ============================================================
   counters.js — Count-up numbers when scrolled into view
   <span data-count="120" data-suffix="+"></span>
   Optional: data-decimals, data-suffix, data-prefix.
   ============================================================ */

import { selectAll, clamp } from '../core/utils.js';

export function initCounters() {
  const els = selectAll('[data-count]');
  if (!els.length) return;

  const run = (el) => {
    const to = parseFloat(el.dataset.count) || 0;
    const dec = parseInt(el.dataset.decimals, 10) || 0;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const start = performance.now();

    const tick = (now) => {
      const p = clamp((now - start) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + (to * eased).toFixed(dec) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (!('IntersectionObserver' in window)) { els.forEach(run); return; }

  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
    }),
    { threshold: 0.5 }
  );
  els.forEach((el) => io.observe(el));
}

/* ============================================================
   parallax.js — Depth on scroll
   [data-parallax="0.18"] drifts relative to viewport center.
   Positive = moves slower/up, giving a layered feel.
   ============================================================ */

import { selectAll, prefersReducedMotion } from '../core/utils.js';
import { onScroll } from '../core/scroll-engine.js';

export function initParallax() {
  if (prefersReducedMotion()) return;

  const items = selectAll('[data-parallax]').map((el) => ({
    el,
    speed: parseFloat(el.dataset.parallax) || 0.15,
  }));
  if (!items.length) return;

  onScroll(() => {
    const vh = window.innerHeight;
    for (const { el, speed } of items) {
      const r = el.getBoundingClientRect();
      const fromCenter = r.top + r.height / 2 - vh / 2;
      el.style.transform = `translate3d(0, ${(-fromCenter * speed).toFixed(2)}px, 0)`;
    }
  });
}

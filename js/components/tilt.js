/* ============================================================
   tilt.js — 3D tilt + glass sheen follow
   [data-tilt="6"] = max degrees. Also feeds --mx/--my so the
   .glass pointer sheen tracks the cursor across the card.
   ============================================================ */

import { selectAll, isTouch, prefersReducedMotion } from '../core/utils.js';

export function initTilt() {
  if (isTouch() || prefersReducedMotion()) return;

  selectAll('[data-tilt]').forEach((card) => {
    const max = parseFloat(card.dataset.tilt) || 6;

    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = ((py - 0.5) * -2 * max).toFixed(2);
      const ry = ((px - 0.5) * 2 * max).toFixed(2);
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
      card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}

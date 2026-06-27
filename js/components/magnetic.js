/* ============================================================
   magnetic.js — Buttons that lean toward the cursor
   [data-magnetic="0.4"] sets pull strength. Drives --btn-translate
   (see buttons.css). Disabled on touch / reduced-motion.
   ============================================================ */

import { selectAll, isTouch, prefersReducedMotion } from '../core/utils.js';

export function initMagnetic() {
  if (isTouch() || prefersReducedMotion()) return;

  selectAll('[data-magnetic]').forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic) || 0.4;

    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.setProperty('--btn-translate', `${x.toFixed(1)}px, ${y.toFixed(1)}px`);
    });

    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--btn-translate', '0px, 0px');
    });
  });
}

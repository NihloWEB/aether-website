/* ============================================================
   horizontal.js — Pinned horizontal rail driven by vertical scroll
   The [data-horizontal] section is tall; while it's pinned, the
   inner .showcase__track translates left across its overflow.
   Touch / reduced-motion get a native swipe rail (see showcase.css).
   ============================================================ */

import { select, clamp, prefersReducedMotion, isTouch } from '../core/utils.js';
import { onScroll } from '../core/scroll-engine.js';

export function initHorizontal() {
  if (prefersReducedMotion() || isTouch()) return;

  const section = select('[data-horizontal]');
  if (!section) return;

  const track = select('.showcase__track', section);
  const bar = select('.showcase__progress i', section);
  if (!track) return;

  onScroll(() => {
    const r = section.getBoundingClientRect();
    const scrollDistance = section.offsetHeight - window.innerHeight;
    const p = clamp(-r.top / scrollDistance, 0, 1);
    const maxShift = Math.max(0, track.scrollWidth - window.innerWidth);

    track.style.transform = `translate3d(${(-p * maxShift).toFixed(1)}px, 0, 0)`;
    if (bar) bar.style.setProperty('--p', p.toFixed(3));
  });
}

/* ============================================================
   hero.js — Living hero
   • Pointer moves the glass light pool (--mx / --my)
   • Headline weight thins from Heavy→Light as you scroll past
     (uses the Lineal variable font) and lifts away gently.
   ============================================================ */

import { select, clamp, mapRange, prefersReducedMotion, isTouch } from '../core/utils.js';
import { onScroll } from '../core/scroll-engine.js';

export function initHero() {
  const hero = select('[data-hero]');
  if (!hero) return;

  const light = select('.hero__light', hero);
  const title = select('.hero__title', hero);

  // Pointer-reactive light
  if (light && !isTouch() && !prefersReducedMotion()) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      light.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 100).toFixed(1) + '%');
      light.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 100).toFixed(1) + '%');
    });
  }

  // Variable-weight + fade on scroll
  if (title && !prefersReducedMotion()) {
    onScroll(() => {
      const r = hero.getBoundingClientRect();
      const p = clamp(-r.top / (r.height * 0.85), 0, 1);
      const weight = Math.round(mapRange(p, 0, 1, 820, 300));
      title.style.fontVariationSettings = `"wght" ${weight}`;
      title.style.transform = `translate3d(0, ${(p * -36).toFixed(1)}px, 0)`;
      title.style.opacity = (1 - p * 0.55).toFixed(2);
    });
  }
}

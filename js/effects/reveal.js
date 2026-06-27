/* ============================================================
   reveal.js — Entrance animations via IntersectionObserver
   Any [data-reveal] fades/slides in once. Wrap items in
   [data-reveal-group="90"] to auto-stagger children by 90ms.
   ============================================================ */

import { selectAll } from '../core/utils.js';

export function initReveal() {
  const items = selectAll('[data-reveal]');
  if (!items.length) return;

  // No IntersectionObserver → just show everything.
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in-view'));
    return;
  }

  // Stagger groups
  selectAll('[data-reveal-group]').forEach((group) => {
    const step = parseInt(group.dataset.revealGroup, 10) || 90;
    selectAll('[data-reveal]', group).forEach((kid, i) =>
      kid.style.setProperty('--reveal-delay', i * step + 'ms')
    );
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  items.forEach((el) => io.observe(el));
}

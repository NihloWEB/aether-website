/* ============================================================
   selector.js — "Selections" segmented control
   Moves the glass thumb and crossfades panels. Repositions the
   thumb on resize and on language change (label widths shift).
   ============================================================ */

import { select, selectAll } from '../core/utils.js';

export function initSelector() {
  selectAll('[data-selector]').forEach((root) => {
    const buttons = selectAll('.segmented__btn', root);
    const thumb = select('.segmented__thumb', root);
    const panels = selectAll('.selector__panel', root);
    if (!buttons.length) return;

    const activate = (index) => {
      buttons.forEach((b, i) => b.classList.toggle('is-active', i === index));
      panels.forEach((p, i) => p.classList.toggle('is-active', i === index));
      const btn = buttons[index];
      if (thumb && btn) {
        thumb.style.width = btn.offsetWidth + 'px';
        thumb.style.transform = `translateX(${btn.offsetLeft - 5}px)`;
      }
    };

    buttons.forEach((b, i) => b.addEventListener('click', () => activate(i)));

    const currentIndex = () => {
      const i = buttons.findIndex((b) => b.classList.contains('is-active'));
      return i < 0 ? 0 : i;
    };

    activate(currentIndex());
    window.addEventListener('resize', () => activate(currentIndex()));
    // Label widths change with language → reposition the thumb.
    document.addEventListener('langchange', () => requestAnimationFrame(() => activate(currentIndex())));
  });
}

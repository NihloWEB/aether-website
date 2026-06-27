/* ============================================================
   cursor.js — Custom cursor replacing the system cursor
   (desktop / fine-pointer only). Tracks the pointer EXACTLY on
   every pointermove — no easing, no lag, no trailing element.
   Adds .has-cursor to <html> to hide the native cursor; over
   interactive targets the reticle opens (see cursor.css).
   ============================================================ */

import { isTouch, prefersReducedMotion } from '../core/utils.js';

const HOVER_TARGETS =
  'a, button, [data-cursor], [data-magnetic], .segmented__btn, .tile, .field input, .field textarea, label';

export function initCursor() {
  if (isTouch() || prefersReducedMotion()) return;

  document.documentElement.classList.add('has-cursor');

  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<div class="cursor__ring"></div><div class="cursor__dot"></div>';
  document.body.appendChild(cursor);

  // Exact tracking — position is set straight from the event, no smoothing.
  window.addEventListener('pointermove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursor.classList.add('is-active');
  }, { passive: true });

  // Aperture state over interactive elements (guard against child flicker)
  document.addEventListener('pointerover', (e) => {
    if (e.target.closest(HOVER_TARGETS)) cursor.classList.add('is-hovering');
  });
  document.addEventListener('pointerout', (e) => {
    const from = e.target.closest(HOVER_TARGETS);
    const to = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(HOVER_TARGETS);
    if (from && !to) cursor.classList.remove('is-hovering');
  });

  window.addEventListener('pointerdown', () => cursor.classList.add('is-down'));
  window.addEventListener('pointerup', () => cursor.classList.remove('is-down'));
  document.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
  document.addEventListener('mouseenter', () => cursor.classList.add('is-active'));
}

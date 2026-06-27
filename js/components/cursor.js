/* ============================================================
   cursor.js — Luminous custom cursor (desktop / fine-pointer)
   An instant dot + a lagging ring (lerped). The ring grows over
   interactive targets. Skipped on touch / reduced-motion.
   ============================================================ */

import { lerp, isTouch, prefersReducedMotion } from '../core/utils.js';

const HOVER_TARGETS = 'a, button, [data-cursor], .glass--hover, .segmented__btn, .tile, .field input, .field textarea';

export function initCursor() {
  if (isTouch() || prefersReducedMotion()) return;

  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<div class="cursor__ring"></div><div class="cursor__dot"></div>';
  document.body.appendChild(cursor);

  const dot = cursor.querySelector('.cursor__dot');
  const ring = cursor.querySelector('.cursor__ring');

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;

  window.addEventListener('pointermove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.classList.add('is-active');
    dot.style.transform = `translate(${mx}px, ${my}px)`;
  });

  (function loop() {
    rx = lerp(rx, mx, 0.2);
    ry = lerp(ry, my, 0.2);
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(loop);
  })();

  document.addEventListener('pointerover', (e) => {
    if (e.target.closest(HOVER_TARGETS)) cursor.classList.add('is-hovering');
  });
  document.addEventListener('pointerout', (e) => {
    if (e.target.closest(HOVER_TARGETS)) cursor.classList.remove('is-hovering');
  });
  window.addEventListener('pointerdown', () => cursor.classList.add('is-down'));
  window.addEventListener('pointerup', () => cursor.classList.remove('is-down'));
  document.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
}

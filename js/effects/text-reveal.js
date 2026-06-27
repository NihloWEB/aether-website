/* ============================================================
   text-reveal.js — Word-by-word brightening on scroll
   Builds word <span>s from data-words-en / data-words-de on a
   [data-words] element, so it stays in sync with the language
   toggle (rebuilds on 'langchange'). Words light up in sequence
   as the tall [data-text-reveal] block scrolls past.
   ============================================================ */

import { select, selectAll, clamp, prefersReducedMotion } from '../core/utils.js';
import { onScroll } from '../core/scroll-engine.js';

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function initTextReveal() {
  const blocks = selectAll('[data-text-reveal]');
  if (!blocks.length) return;

  blocks.forEach((block) => {
    const target = select('[data-words]', block);
    if (!target) return;

    let words = [];

    const build = (lang) => {
      const raw =
        target.getAttribute('data-words-' + lang) ||
        target.getAttribute('data-words-en') ||
        target.textContent || '';
      target.innerHTML = raw
        .trim()
        .split(/\s+/)
        .map((w) => `<span class="manifesto__word">${escapeHtml(w)}</span>`)
        .join(' ');
      words = selectAll('.manifesto__word', target);
      if (prefersReducedMotion()) words.forEach((w) => w.classList.add('is-lit'));
    };

    const startLang = ['en', 'de'].includes(document.documentElement.lang)
      ? document.documentElement.lang
      : 'en';
    build(startLang);
    document.addEventListener('langchange', (e) => build(e.detail.lang));

    if (prefersReducedMotion()) return;

    onScroll(() => {
      const r = block.getBoundingClientRect();
      const distance = block.offsetHeight - window.innerHeight;
      const p = clamp(-r.top / (distance * 0.72), 0, 1);
      const lit = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
    });
  });
}

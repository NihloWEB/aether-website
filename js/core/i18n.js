/* ============================================================
   i18n.js — Bilingual EN / DE
   Copy lives inline on each element as data-en / data-de (and
   data-*-ph for placeholders, data-*-aria for labels). This keeps
   translations next to the markup they belong to — easy to edit.
   The chosen language persists in localStorage.
   ============================================================ */

import { selectAll } from './utils.js';

const KEY = 'aether-lang';
const SUPPORTED = ['en', 'de'];

export function initI18n() {
  let lang = localStorage.getItem(KEY);
  if (!SUPPORTED.includes(lang)) {
    lang = (navigator.language || 'en').toLowerCase().startsWith('de') ? 'de' : 'en';
  }

  apply(lang);

  selectAll('[data-lang]').forEach((btn) =>
    btn.addEventListener('click', () => apply(btn.dataset.lang))
  );

  function apply(l) {
    if (!SUPPORTED.includes(l)) l = 'en';
    localStorage.setItem(KEY, l);
    document.documentElement.lang = l;

    // Text content (leaf elements only)
    selectAll('[data-en]').forEach((el) => {
      const v = el.getAttribute('data-' + l);
      if (v != null) el.textContent = v;
    });
    // Placeholders
    selectAll('[data-en-ph]').forEach((el) => {
      const v = el.getAttribute('data-' + l + '-ph');
      if (v != null) el.setAttribute('placeholder', v);
    });
    // Aria labels
    selectAll('[data-en-aria]').forEach((el) => {
      const v = el.getAttribute('data-' + l + '-aria');
      if (v != null) el.setAttribute('aria-label', v);
    });

    selectAll('[data-lang]').forEach((btn) =>
      btn.classList.toggle('is-active', btn.dataset.lang === l)
    );

    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: l } }));
  }
}

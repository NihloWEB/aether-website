/* ============================================================
   nav.js — Bar condense on scroll + full-screen menu + active link
   ============================================================ */

import { select, selectAll } from '../core/utils.js';

export function initNav() {
  const nav = select('[data-nav]');
  if (!nav) return;
  const menu = select('[data-menu]');
  const burger = select('[data-burger]', nav);

  // Condense on scroll
  const onScrollState = () => nav.classList.toggle('is-scrolled', window.scrollY > 10);
  onScrollState();
  window.addEventListener('scroll', onScrollState, { passive: true });

  // Stagger indices for the menu links
  if (menu) selectAll('.nav-menu__link', menu).forEach((l, i) => l.style.setProperty('--i', i));

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    menu?.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    burger?.setAttribute('aria-expanded', String(open));
  };

  burger?.addEventListener('click', () => setOpen(!menu?.classList.contains('is-open')));
  if (menu) selectAll('a', menu).forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });

  // Highlight the current page in both nav and menu.
  // Normalised so it works with ".html" (local) AND clean URLs (Vercel).
  const norm = (p) => {
    const file = (p || '').split('/').pop().split('?')[0].split('#')[0].replace(/\.html$/, '');
    return file === '' ? 'index' : file;
  };
  const here = norm(location.pathname);
  selectAll('.nav__link, .nav-menu__link').forEach((a) => {
    if (norm(a.getAttribute('href')) === here) a.classList.add('is-active');
  });
}

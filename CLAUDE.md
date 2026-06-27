# CLAUDE.md — AETHER Project Worksheet

Guidance for Claude Code (and humans) working in this repository.

---

## 1. What this project is

**AETHER** is a futuristic landing site + subpages for a fictional **creative
studio**. It's the "basic start" / foundation for a larger interactive site:
heavy on motion, scroll effects and **liquid-glass** surfaces, in an
**Apple-like monochrome** aesthetic (near-black + white, frosted glass only).

- **Stack:** plain **HTML + CSS + ES-module JavaScript**. No framework, no
  bundler, **no build step, no runtime dependencies**.
- **Brand / copy / projects are placeholders.** "Future features" are marked
  inline with a `.placeholder` chip (e.g. *Newsletter — coming soon*).
- **Language:** bilingual **EN / DE** via a persistent toggle.
- **Type:** **Lineal** (variable font) — SIL Open Font License.

### Locked-in decisions
| Choice | Value |
|--------|-------|
| Concept | Creative studio |
| Visual mood | Apple-like monochrome + liquid glass |
| Navigation | Overview · Tech · Showcase · About · Contact |
| Language | Bilingual EN / DE |
| Brand name | **AETHER** (placeholder — easy to rename, see §7) |

---

## 2. How to run

ES modules + local `@font-face` files mean the site **must be served over
HTTP** (not `file://`).

- **Double-click `start.command`** → serves on <http://localhost:4321> and opens
  the browser.
- Or: `python3 -m http.server 4321` from the project root.

---

## 3. Folder structure

```
aether/
├── index.html                  # Landing page
├── pages/                      # Subpages (share the same chrome + JS/CSS)
│   ├── overview.html
│   ├── tech.html
│   ├── showcase.html
│   ├── about.html
│   └── contact.html
├── css/
│   ├── main.css                # @imports the whole cascade — link only this
│   ├── base/                   # tokens · reset · typography · utilities · animations
│   ├── components/             # ambient · glass · cursor · nav · buttons · cards
│   │                           #   · selector · marquee · footer
│   └── sections/               # hero · manifesto · showcase · cta · page
├── js/
│   ├── main.js                 # Entry point — imports + inits every module
│   ├── core/                   # utils · scroll-engine · i18n
│   ├── effects/                # reveal · parallax · hero · text-reveal · horizontal
│   └── components/             # cursor · magnetic · tilt · nav · selector · counters
├── assets/
│   ├── fonts/lineal/           # Lineal woff2/woff (static + variable) + OFL.txt
│   ├── img/                    # (empty — placeholder visuals are pure CSS for now)
│   └── icons/                  # (empty — icons are inline SVG in the HTML)
├── start.command               # Local dev server (double-click)
├── README.md
└── CLAUDE.md                   # ← you are here
```

**Conventions**
- One concern per file. CSS uses BEM-ish names (`.block__element--modifier`).
- `css/main.css` is the only stylesheet linked in HTML; it `@import`s the rest
  in cascade order (tokens → reset → type → utils → animations → components → sections).
- `js/main.js` is the only script tag (`type="module"`); it imports everything.
- Each `init*()` is a **no-op when its markup is absent**, so the same bundle
  drives every page.

---

## 4. Design system (`css/base/tokens.css`)

All design decisions live as CSS custom properties on `:root`. **Re-skin the
whole site by editing tokens** — don't hard-code values in components.

- **Palette:** `--bg-0` (near-black base), `--ink` (near-white) + `--ink-2/3/4`
  opacity steps, `--line` hairlines. `--glow` is the *only* hint of color
  (a cool luminance used solely for sheen/shadow — keeps it monochrome but alive).
- **Liquid glass:** `--glass-bg`, `--glass-stroke`, `--glass-hi` (specular),
  `--glass-blur`, `--glass-shadow`.
- **Type scale:** fluid `clamp()` tokens `--t-hero … --t-small`.
- **Motion:** easing curves (`--ease-out`, `--ease-spring`) + durations.
- **Spacing / radii / z-index** ladders.

### Liquid glass — `.glass` (`css/components/glass.css`)
- `::before` draws a 1px specular gradient ring (the "edge of glass").
- `::after` is a pointer-follow sheen driven by `--mx` / `--my` (set by JS in
  `tilt.js` / `hero.js`).
- Modifiers: `--bar` (nav), `--card`, `--pill`, `--strong`, `--hover`.
- Includes a `@supports` fallback to a solid panel where `backdrop-filter`
  is unsupported.

---

## 5. Animation system

Native scroll is kept (so `position: sticky` works); a single shared, **self-
throttling** rAF loop (`js/core/scroll-engine.js`) eases the scroll value and
feeds subscribers. Effects subscribe via `onScroll(fn)`.

| Effect | Module | Hook in HTML |
|--------|--------|--------------|
| Entrance reveal (fade/slide/scale/blur) | `effects/reveal.js` | `data-reveal[="fade\|left\|right\|scale\|blur"]`, group stagger `data-reveal-group="90"` |
| Parallax depth | `effects/parallax.js` | `data-parallax="0.18"` |
| Variable-weight hero + light | `effects/hero.js` | `data-hero` on the hero section |
| Word-by-word manifesto | `effects/text-reveal.js` | `data-text-reveal` block + `data-words` / `data-words-en` / `data-words-de` |
| Pinned horizontal rail | `effects/horizontal.js` | `data-horizontal` section |
| Custom cursor | `components/cursor.js` | auto (desktop only) |
| Magnetic buttons | `components/magnetic.js` | `data-magnetic="0.4"` |
| Tilt + glass sheen | `components/tilt.js` | `data-tilt="6"` |
| Segmented selector ("selections") | `components/selector.js` | `data-selector` + `.segmented` + `.selector__panel` |
| Count-up numbers | `components/counters.js` | `data-count="120" data-suffix="+"` |
| Nav condense + full-screen menu | `components/nav.js` | `data-nav`, `data-menu`, `data-burger` |

**Accessibility:** every motion effect checks `prefers-reduced-motion` and
either disables or degrades (the manifesto shows all words lit; the showcase
becomes a native swipe rail). Reveal states only apply under `html.js`, so with
JS disabled the page is fully visible (no-JS failsafe). The inline
`<script>document.documentElement.classList.add('js')</script>` in each `<head>`
prevents a flash before the module loads.

---

## 6. Internationalisation (`js/core/i18n.js`)

Copy lives **inline next to its markup**, not in a central dictionary:

- Text: `data-en="…" data-de="…"` on a **leaf** element (no child elements, or
  the swap would wipe them). Put it on inner `<span>`s, not on parents that
  contain other tags (e.g. the hero `<h1>` puts it on each line's inner span).
- Placeholders: `data-en-ph` / `data-de-ph`. Aria labels: `data-en-aria` / `data-de-aria`.
- The manifesto is special: it uses `data-words-en` / `data-words-de` (read only
  by `text-reveal.js`, which rebuilds the word-spans on `langchange`) so i18n
  doesn't fight the per-word highlight.
- Choice persists in `localStorage` (`aether-lang`); default follows the browser.

---

## 7. Common edits

**Add a nav item / subpage**
1. Duplicate an existing file in `pages/` (keep the shared nav/menu/footer).
2. Add the link to the `.nav__links` list **and** the `.nav-menu__list` in
   *every* page (the chrome is duplicated — there's no templating).
3. `nav.js` auto-highlights the active link by matching the filename.

**Edit copy / translations** — edit the `data-en` / `data-de` attributes in the
HTML directly.

**Rename the brand** — replace `AETHER` in: each page's `.nav__brand`,
`.footer__brand-line`, `<title>`, and the manifesto sig. (Search-and-replace
`AETHER`.)

**Re-skin** — edit `css/base/tokens.css`. For a different accent, change `--glow`.
For a lighter theme, raise `--bg-0` / lower `--ink` (and flip `color-scheme`).

**Add a project tile** — copy a `.tile` (rail, `index.html`) or `.tile--grid`
(`showcase.html`) block; set `--tile-angle` for a different pattern.

---

## 8. Placeholders / future features (intentionally stubbed)

- Contact form is **not wired to a backend** (button is `type="button"`; marked
  *Demo form — not connected yet*).
- Showcase **filtering** is visual only (*Filtering — coming soon*).
- **Newsletter**, **The Lab** experiments, real project case-study pages, team
  names/photos, and social links (`href="#"`) are stubs.
- `assets/img` and `assets/icons` are empty — tile/visual art is currently pure
  CSS so the project has zero binary image deps. Drop real media in later.

---

## 9. Tech notes & browser support

- Targets modern evergreen browsers (Chrome/Edge/Safari/Firefox). `backdrop-filter`,
  CSS `@property`, variable fonts and `:has`-free selectors are used.
- Performance: transforms/opacity only, `will-change` used sparingly, passive
  scroll listeners, IntersectionObserver for reveals/counters, the scroll loop
  auto-stops when idle.
- No analytics, no cookies beyond the `localStorage` language key.

---

## 10. Credits

Typeface **Lineal** © Velvetyne Type Foundry (Frank Adebiaye, Anton Moglia,
Ariel Martín Pérez) — SIL Open Font License 1.1, bundled at
`assets/fonts/lineal/OFL.txt`. The site links attribution in the footer.

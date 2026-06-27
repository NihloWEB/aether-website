# AETHER — Creative Studio Landing Site

A futuristic, monochrome, **liquid-glass** marketing site with Apple-style
scroll motion. Built from scratch with **plain HTML, CSS and JavaScript** —
no framework, no build step, no runtime dependencies.

> Brand, copy and projects are **placeholders** — this is a design/engineering
> foundation to build on. See `CLAUDE.md` for the full worksheet.

## Run it

The site uses ES modules and local web-fonts, so it must be served over HTTP
(opening the file directly with `file://` will not work).

**Easiest:** double-click **`start.command`** → it serves the site and opens
your browser at <http://localhost:4321>.

**Or from a terminal:**

```bash
cd /Applications/aether
python3 -m http.server 4321
# then open http://localhost:4321
```

Any static server works (`npx serve`, VS Code Live Server, etc.).

## Pages

| Page | File |
|------|------|
| Landing | `index.html` |
| Overview | `pages/overview.html` |
| Tech | `pages/tech.html` |
| Showcase | `pages/showcase.html` |
| About | `pages/about.html` |
| Contact | `pages/contact.html` |

## Highlights

- **Liquid-glass UI** — reusable `.glass` system (blur, specular edge, pointer sheen)
- **Apple-style motion** — scroll reveals, pinned word-by-word manifesto, pinned
  horizontal showcase, variable-weight hero, parallax, magnetic buttons, tilt cards,
  a custom luminous cursor
- **Bilingual EN / DE** with a persistent toggle
- **Variable font** (Lineal) for "alive" typography
- **Accessible** — full `prefers-reduced-motion` support, keyboard focus, no-JS fallback

## Credits

Typeface: **Lineal** by Velvetyne Type Foundry — SIL Open Font License 1.1
(`assets/fonts/lineal/OFL.txt`).

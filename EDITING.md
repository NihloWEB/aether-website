# AETHER — Bearbeitungs- & Veröffentlichungs-Anleitung

Diese Seite ist **reines HTML/CSS/JS** — kein Build, keine Abhängigkeiten.
Du kannst alles in einem normalen Text-Editor (z. B. VS Code) ändern. Unten steht,
**wo** du was änderst, und wie du es **auf Vercel** veröffentlichst.

---

## 1. Lokal ansehen

- **`start.command`** doppelklicken → öffnet die Seite unter <http://localhost:4321>.
- Oder im Terminal: `python3 -m http.server 4321` (im Projektordner).

> Wichtig: nicht die HTML-Datei direkt per Doppelklick öffnen — wegen ES-Modulen
> und lokalen Schriften wird ein kleiner Server gebraucht (genau dafür ist
> `start.command` da).

---

## 2. Texte ändern (das Wichtigste)

Alle sichtbaren Texte stehen **direkt im HTML** und sind **zweisprachig**.
Jedes Element hat zwei Attribute: `data-en` (Englisch) und `data-de` (Deutsch).

```html
<h3 data-en="Brand systems" data-de="Markensysteme">Brand systems</h3>
```

So änderst du einen Text:
1. Öffne die passende Datei (siehe Tabelle unten).
2. Ändere **beide** Attribute `data-en="…"` und `data-de="…"`.
3. Den sichtbaren Text dazwischen (`Brand systems`) kannst du gleich mit anpassen
   — er wird beim Laden ohnehin durch die gewählte Sprache ersetzt.

| Seite | Datei |
|------|------|
| Startseite | `index.html` |
| Überblick | `pages/overview.html` |
| Technik | `pages/tech.html` |
| Showcase | `pages/showcase.html` |
| Über uns | `pages/about.html` |
| Kontakt | `pages/contact.html` |

**Platzhalter (Felder, Aria-Labels):** `data-en-ph` / `data-de-ph` (Platzhalter
in Eingabefeldern) und `data-en-aria` / `data-de-aria` (Vorlese-Beschriftung).

---

## 3. Sprache

- Der EN/DE-Umschalter oben rechts merkt sich die Wahl (im Browser gespeichert).
- Standard = Sprache des Browsers. Mehr Logik in `js/core/i18n.js` (musst du normal
  nicht anfassen).

---

## 4. Markenname „AETHER“ ändern

Suchen-und-Ersetzen über alle Dateien nach `AETHER`. Es kommt vor in:
- der Navigation (`.nav__brand`) auf jeder Seite,
- der Fußzeile (`.footer__brand-line`),
- dem `<title>` jeder Seite,
- dem Hero/Manifest-Text auf `index.html`.

---

## 5. Farben & Look ändern

Alle Design-Werte stehen zentral in **`css/base/tokens.css`**. Beispiele:

```css
--bg-0: #050507;   /* Hintergrund (fast schwarz) */
--ink:  #f5f6f8;   /* Textfarbe (fast weiß)      */
--glow: rgba(184, 206, 255, 0.55); /* dezenter Leucht-/Glanz-Ton */
```

Ändere nur diese Tokens — der Rest der Seite passt sich automatisch an.
Für ein helles Theme `--bg-0` heller und `--ink` dunkler setzen.

---

## 6. Projekte im Showcase ändern / hinzufügen

Ein Projekt-Kachel-Block sieht so aus (in `pages/showcase.html`, Raster-Variante):

```html
<article class="tile tile--grid" data-reveal>
  <div class="tile__media deco" style="--tile-angle:35deg"></div>
  <div class="tile__overlay deco"></div>
  <span class="tile__tag" data-en="Brand" data-de="Marke">Brand</span>
  <h3 class="tile__title">Helix</h3>
  <p class="tile__meta" data-en="Identity system · 2025" data-de="Identitätssystem · 2025">…</p>
</article>
```

- Kopiere den Block für ein neues Projekt.
- `--tile-angle` ändert das (aktuell rein per CSS erzeugte) Muster.
- Auf der Startseite gibt es die gleiche Kachel in der horizontalen Leiste
  (`index.html`, `.showcase__track`).

---

## 7. Eigene Bilder einsetzen

Aktuell ist die Bildfläche ein **CSS-Platzhalter** (deshalb 0 Bilddateien).
Echte Bilder so einbauen:
1. Lege die Datei in `assets/img/` (z. B. `assets/img/helix.jpg`).
2. Ersetze in der Kachel das `<div class="tile__media …">` durch ein Bild, z. B.:
   ```html
   <img class="tile__media" src="assets/img/helix.jpg" alt="Helix" />
   ```
   (auf Unterseiten: `../assets/img/helix.jpg`).

---

## 8. Neue Unterseite hinzufügen

1. Kopiere eine Datei aus `pages/` (z. B. `about.html`) und benenne sie um.
2. Inhalt im `<main>` anpassen (Kopf/Navigation/Fußzeile gleich lassen).
3. Den Link in **jeder** Seite ergänzen — in `.nav__links` **und** in `.nav-menu__list`
   (die Navigation ist auf jeder Seite eingebaut; es gibt keine Vorlagen-Technik).
   Der aktive Link wird automatisch erkannt.

---

## 9. Auf Vercel veröffentlichen

Die Datei `vercel.json` ist schon vorbereitet (saubere URLs ohne `.html`, Caching).
**Kein Build nötig** — Vercel hostet die Dateien direkt.

**Empfohlen (einmal einrichten, danach Änderungen automatisch live):**
1. Lade den Projektordner zu **GitHub** hoch (neues Repository).
2. Auf <https://vercel.com> → **Add New… → Project** → das GitHub-Repo importieren.
3. Framework Preset: **Other** (alles andere leer lassen) → **Deploy**.
4. Ab jetzt: Datei auf GitHub ändern → Vercel veröffentlicht automatisch neu.

**Alternative (per Terminal, ohne GitHub):**
```bash
npm i -g vercel     # einmalig
cd <projektordner>
vercel              # folgen — fertig
vercel --prod       # für die Live-Version
```

> Tipp: „Bearbeiten“ passiert immer in den Dateien (lokal oder direkt auf GitHub).
> Vercel ist das Hosting/Deployment — verbunden mit GitHub wird jede Textänderung
> nach dem Speichern automatisch online gestellt.

---

## 10. Schrift & Lizenz

Schrift **Lineal** (Velvetyne, SIL Open Font License) liegt unter
`assets/fonts/lineal/` inkl. Lizenz (`OFL.txt`) und ist in der Fußzeile genannt.
Die technische Doku zum gesamten Aufbau steht in `CLAUDE.md`.

# Skie Field Manual 1.0.0

A static, guide-first OGame learning site. The public site is served from the existing `/skie/` folder of `TheIlluminate92/ogame-project-orion`.

## Contents

- A foundation lesson and eight mechanics guides: economy, power, crawlers, fleetsaving, colonies, research, expeditions and lifeforms.
- Three separate play-style paths: miner, expedition and active fleet.
- A separately labelled historical Orion/PTS reference and exact IAS cost calculator.
- Glossary, alliance information and a clearly undetermined alliance-cooperation section.
- A chapter menu, page contents, full-text library search, practice checks, local reading progress, print styling and plain-text downloads.

All lesson prose is pre-rendered HTML. Reading and ordinary links work without JavaScript. Search, optional progress, copy and the historical calculator are progressive enhancements. No analytics, remote fonts, game integration, account login or automatic message sending is included. Reading progress uses only browser localStorage.

## Source and build

`data/content.json` is the canonical lesson source. `assets/style.css`, `assets/app.js` and `assets/costs.js` implement the presentation and enhancements. `scripts/build.mjs` generates the static pages and text downloads into `dist/`. Do not hand-edit generated lesson pages.

Run with a modern Node.js runtime:

    node scripts/build.mjs
    node scripts/test.mjs

No dependencies or package installation are needed. Serve `dist/` using a static server. Publication copies those generated files into `/skie/` without changing other Orion files. Retain the source JSON, assets, scripts and this README alongside them.

## Evidence

Mechanics are linked per lesson and reviewed 8 November 2026. Historical official references are labelled as such. Numerical examples state their assumptions; they are not personal account screenshots or current universal build prescriptions. The fusion comparison proves output and field efficiency, not equal-cost superiority. Crawler cap evidence includes explicitly labelled PTS patch history. See `PROVENANCE.md`.

## Recovery

The previous public `/skie/` version is preserved in commit `d3c049c6928498efcefc58bfc426e651587de52f`. Revert only the subsequent Skie redesign commit to restore it; do not revert unrelated Orion changes. No original Orion file is part of this redesign.

## License

Project Orion's MIT notice is preserved in `LICENSE-ORION`. Decorative artwork and site layout are original. OGame and its trademarks belong to their respective owners; this is an independent alliance guide.

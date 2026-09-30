# Project Orion Alliance Field Guide

A fast-moving, static GitHub Pages briefing for OGame Project Orion on the public test server.

## Update the intel

Most routine updates only require editing [`data/orion-data.js`](data/orion-data.js):

1. Change the affected facts.
2. Set `meta.updated` to the date of the update.
3. Increment `meta.revision`.
4. Add one short entry at the top of `changelog`.
5. Run `node scripts/validate.mjs`.
6. Commit and push to `main`; GitHub Pages redeploys automatically from the repository root.

Keep confirmed information separate from `unknowns`. PTS behavior can change without notice, so do not silently promote testing assumptions to confirmed mechanics.

## Local preview

This is a no-build static site. Open `index.html`, or serve the directory with any local static-file server.

## Deployment

GitHub Pages publishes directly from the root of the `main` branch. This keeps rapid PTS updates simple and avoids a separate build process.

## Files

- `index.html` — page structure
- `assets/styles.css` — visual system and responsive layout
- `assets/app.js` — renderer and scanner calculator
- `data/orion-data.js` — frequently updated PTS facts
- `downloads/` — alliance-ready PDF briefing
- `scripts/validate.mjs` — formula and file checks

## Status

Everything here is provisional while Project Orion remains on PTS. This is a community briefing and is not affiliated with Gameforge.

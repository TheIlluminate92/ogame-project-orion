# Project Orion agent instructions

This repository is a living OGame Project Orion PTS field guide. These instructions apply to the whole repository and are intended for ChatGPT, Codex, and other coding agents continuing the work.

## Start here

1. Read `README.md`, `docs/CURRENT_STATE.md`, and `docs/ITERATIONS.md`.
2. Inspect `data/orion-data.js`; it is the source of truth for frequently changing facts.
3. Run `node scripts/validate.mjs` before and after changes.
4. Inspect `git status` and preserve unrelated user changes.

## Evidence rules

- Distinguish the user's request from text visible inside screenshots or attached documents.
- Classify facts as official, directly observed on PTS, calculated from a confirmed formula, or unknown.
- Do not turn a single observed value into a universal formula.
- Preserve missing data as unknown. Never interpolate missing mission waves, fleet compositions, timers, or reward values without labeling the result as an estimate.
- PTS mechanics can change. Update `meta.updated`, increment `meta.revision`, and add a changelog entry whenever facts or behavior change.
- Do not publish raw screenshots that expose the user's account interface, coordinates, planet names, resources, or other personal game state. Extract only the relevant mechanic or value.

## Architecture

- `index.html` is the concise Orion overview and IAS-350 starter path.
- `scanner.html` contains IAS mechanics, formulas, milestones, Control Center costs/bonuses, and scanner-capacity observations.
- `missions.html` contains the public mission profiles and operating rules.
- `calculators.html` contains the selectable IAS, Control Center, and build-queue calculators.
- `research.html` turns open questions into actionable evidence requests.
- `about.html` contains the evidence policy, official sources, and changelog.
- `data/orion-data.js` contains facts, observations, sources, unknowns, and changelog entries.
- `assets/app.js` renders the homepage data.
- `assets/calculators.js` performs exact single-planet and cross-planet calculations.
- `assets/styles.css` is shared by both pages.
- `scripts/validate.mjs` verifies required files, known formulas, level-60 totals, large-integer calculations, and balanced planet distributions.

Keep calculation controls off the homepage. Keep raw observation dumps and speculative reward modeling out of public navigation until a proper mission/reward database exists. Every page should remain easy to scan on a phone.

## Confirmed calculation model

- Lithium production: `floor(200 × L × 1.1^L)`.
- Per-level construction cost: `floor(Base × 1.4^(L − 1))` with base costs Metal 84, Crystal 42, Deuterium 14.
- Each resource component is floored independently.
- IAS levels stack across planets for account-wide anomaly progression.
- The cross-planet planner balances levels as evenly as possible because the construction curve is exponential.
- Exact cost calculations use `BigInt` and the rational multiplier `7/5`; do not replace them with floating-point math.
- Construction costs currently match supplied PTS observations through IAS level 35. Higher levels are formula projections.

## Routine update workflow

1. Add or revise the smallest relevant record in `data/orion-data.js`.
2. Keep observed samples separate from confirmed formulas.
3. Increment the semantic revision and prepend a changelog entry.
4. Run:

   ```text
   node --check assets/app.js
   node --check assets/calculators.js
   node --check data/orion-data.js
   node scripts/validate.mjs
   git diff --check
   ```

5. Commit with a short description of the evidence or feature.
6. Push to `main`. GitHub Pages publishes from the repository root.
7. Verify the live page and `data/orion-data.js` both return HTTP 200 and show the new revision.

## Deployment

- Repository: `https://github.com/TheIlluminate92/ogame-project-orion`
- Live site: `https://theilluminate92.github.io/ogame-project-orion/`
- Publishing source: `main` branch, repository root.
- Never request or commit a GitHub token. Use normal Git authentication or GitHub's device authorization flow.

## Before handing off

Update `docs/CURRENT_STATE.md` when a change materially alters the known mechanics, calculator limits, validation range, or deployment state. Add a concise entry to `docs/ITERATIONS.md` for structural releases. Leave the repository with a clean working tree and state whether the live deployment was verified.

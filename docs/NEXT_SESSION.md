# Next-session handoff

Use this file when continuing the Project Orion guide from a blank chat.

## Start here

- Repository: https://github.com/TheIlluminate92/ogame-project-orion
- Live site: https://theilluminate92.github.io/ogame-project-orion/
- Current revision: **0.15.0**
- Branch: `main`
- Deployment: revision 0.14.1 published and verified; revision 0.15.0 is local and not yet published
- Working tree at handoff: clean

Read `AGENTS.md`, then `docs/CURRENT_STATE.md`, before making changes. `data/orion-data.js` is the factual source of truth.

## Current public structure

- `index.html` — Orion overview, Lithium basics, and the combined-IAS-350 starter path
- `scanner.html` — IAS mechanics, formulas, lore, milestone unlocks, Control Center artwork/lore/costs/bonuses, and observed capacity-upgrade costs
- `missions.html` — mission quick-start, ACS guidance, profiles, and operational rules
- `calculators.html` — current-to-target building calculators, streamlined network planning, and a start-aware build queue
- `research.html` — unresolved questions, suggested tests, and the future mission-database roadmap
- `about.html` — evidence policy, sources, and a compact changelog

Raw PTS observation records and the incomplete reward-scaling concept remain in `data/orion-data.js`, but are intentionally absent from public navigation until a proper mission/reward database is designed.

## Highest-priority evidence gaps

1. Capture Anomaly Analysis Center construction costs; its queue cost is intentionally unknown.
2. Run a controlled before/after test to determine exactly how Catalytic Converter percentages affect Lithium conversion.
3. Independently confirm or reject the candidate multiplicative IRC empire-stacking formula.
4. Capture full-precision Control Center base costs instead of abbreviated `K` values.
5. Expand the mission catalog toward a structured mission/reward database.
6. Collect comparable data for deciding which resource is best to convert into Lithium.

## Guardrails

- Do not invent missing exact costs or formulas.
- Keep official, observed, calculated, projected, and unknown values distinct.
- Catalytic Converter is `0.05%` per level and affects conversion cost; it is not a `0.2%` mission-reward building.
- Anomaly Analysis Center construction cost remains unknown.
- Do not publish raw screenshots containing account identity, coordinates, planets, or resource balances.
- Update the revision and changelog only when public facts or behavior change.
- Run `node scripts/validate.mjs` and `git diff --check` before committing.
- After pushing, verify the Pages build and the live revision.

## Blank-chat prompt

> Continue the Project Orion field guide at https://github.com/TheIlluminate92/ogame-project-orion. Start by reading AGENTS.md and docs/NEXT_SESSION.md, then inspect docs/CURRENT_STATE.md and data/orion-data.js. Preserve the evidence boundaries, do not invent unknown costs or formulas, validate all changes, and verify GitHub Pages after publishing.

# Next-session handoff

Use this file when continuing the Project Orion guide from a blank chat.

## Start here

- Repository: https://github.com/TheIlluminate92/ogame-project-orion
- Live site: https://theilluminate92.github.io/ogame-project-orion/
- Current revision: **0.18.0**
- Branch: `main`
- Deployment: revision 0.15.1 was the last verified GitHub Pages release; local 0.18.0 changes are not yet pushed or deployed
- Working tree at handoff: clean after the local 0.18.0 commit; push and live verification remain pending

Read `AGENTS.md`, then `docs/CURRENT_STATE.md`, before making changes. `data/orion-data.js` is the factual source of truth.

## Usage-conscious start

At the start of a blank chat, the agent should give this short, non-blocking prompt before substantial work:

> **Usage check:** Luna with low reasoning is recommended for routine page edits and evidence intake. Use Sol with medium reasoning only for formulas, major refactors, or difficult debugging. I will batch the work, validate once, commit locally, ask you for one final push, and perform one live verification.

Then follow these limits:

- Combine supplied page feedback and screenshots into one implementation pass.
- Prefer targeted repository reads instead of printing whole files.
- Browse only for current official facts or source verification.
- Run one proportional local validation pass after the batch.
- Use browser testing only for changed layout or runtime behavior, followed by one live check after publication.
- Never repeat GitHub device authentication inside Codex. The sandbox cannot access the Windows keyring; commit locally and have the user run `git push origin main` once.
- Start a fresh chat when moving to a distinct project phase so the full prior conversation is not carried forward.

## Current public structure

- `index.html` — Orion overview, Lithium basics, and the combined-IAS-350 starter path
- `scanner.html` — IAS mechanics, formulas, lore, milestone unlocks, Control Center artwork/lore/bonuses, and observed capacity-upgrade costs
- `missions.html` — mission quick-start, public-objective guidance, ACS help, profiles, and operational rules
- `calculators.html` — current-to-target building calculators, button navigation separating empire-wide planners/queue from local buildings, additive empire bonus targets and reference tables for all seven Control Center bonus buildings, and a start-aware build queue
- `research.html` — unresolved questions, suggested tests, and the future mission-database roadmap
- `about.html` — evidence policy, official v13.1.0 release context, sources, and a compact changelog

Raw PTS observation records and the incomplete reward-scaling concept remain in `data/orion-data.js`, but are intentionally absent from public navigation until a proper mission/reward database is designed.

## Highest-priority evidence gaps

1. Verify higher-level Anomaly Analysis Center costs against its user-provided base values and shared ×1.5 curve.
2. Run a controlled before/after test to determine exactly how Catalytic Converter percentages affect Lithium conversion.
3. Reconcile the prior IRC L3 + L8 displayed empire bonus of 2.19% with the user-reported additive sum of 2.20%.
4. Capture full-precision Control Center base costs instead of abbreviated `K` values.
5. Expand the mission catalog toward a structured mission/reward database.
6. Collect comparable data for deciding which resource is best to convert into Lithium.

## Guardrails

- Do not invent missing exact costs or formulas.
- Keep official, observed, calculated, projected, and unknown values distinct.
- Catalytic Converter is `0.05%` per level and affects conversion cost; it is not a `0.2%` mission-reward building.
- Control Center empire bonuses are modeled additively per the user's correction. The calculator covers all seven bonus buildings and leaves the earlier IRC 2.19% sample discrepancy unresolved.
- Anomaly Analysis Center base costs are user-provided (67,500 / 37,500 / 22,500); higher-level shared-model outputs have not been independently verified.
- Do not publish raw screenshots containing account identity, coordinates, planets, or resource balances.
- Update the revision and changelog only when public facts or behavior change.
- Run `node scripts/validate.mjs` and `git diff --check` before committing.
- Commit locally, then ask the user to run one `git push origin main` from normal PowerShell.
- After the user confirms the push, verify the Pages build and live revision once.

## Blank-chat prompt

> Continue the Project Orion field guide at https://github.com/TheIlluminate92/ogame-project-orion. Start by reading AGENTS.md and docs/NEXT_SESSION.md, then give me the usage-check recommendation before substantial work. Use the usage-conscious workflow: batch the edits, prefer targeted reads, browse only for current official facts, validate once, commit locally, ask me for one final `git push origin main`, and perform one live verification afterward. Preserve the evidence boundaries and do not invent unknown costs or formulas.

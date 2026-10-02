# Next-session handoff

Use this file when continuing the Project Orion guide from a blank chat.

## Start here

- Repository: https://github.com/TheIlluminate92/ogame-project-orion
- Live site: https://theilluminate92.github.io/ogame-project-orion/
- Current revision: **0.19.2**
- Branch: `main`
- Deployment: revision 0.19.0 was verified live on GitHub Pages; revisions 0.19.1–0.19.2 are locally prepared and await the user's push
- Working tree at handoff: local mission database, workbook, general guidance, and prior 0.19.1 edits are uncommitted; preserve the unrelated local `ERIS_STATE.md`

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
- `calculators.html` — IAS Lithium sustainment estimates using combined Catalytic Converter levels, current-to-target building calculators, empire-wide planners, and a start-aware build queue
- `research.html` — unresolved questions, suggested tests, and link to the working mission workbook
- `about.html` — evidence policy, official v13.1.0 release context, sources, and a compact changelog

Raw PTS observation records and the incomplete reward-scaling concept remain in `data/orion-data.js`. The working comparison database lives in `data/mission-roi-samples.json`; its Excel workbook is published at `downloads/orion-mission-research.xlsx`. General lessons appear on Missions with provisional wording.

## Highest-priority evidence gaps

1. Verify higher-level Anomaly Analysis Center costs against its user-provided base values and shared ×1.5 curve.
2. Reconcile the prior IRC L3 + L8 displayed empire bonus of 2.19% with the user-reported additive sum of 2.20%.
3. Capture full-precision Control Center base costs instead of abbreviated `K` values.
4. Expand the mission catalog toward a structured mission/reward database.
5. Collect comparable data for deciding which resource is best to convert into Lithium.
6. If needed, test how Catalytic Converter reductions scale at different bonus totals and workloads.
7. Add the next mission cards to `data/mission-roi-samples.json`, keeping scan range separate from mission-card Distance and marking rounded costs and possible rewards. Rebuild and replace `downloads/orion-mission-research.xlsx` in the same update.

## Guardrails

- Do not invent missing exact costs or formulas.
- Keep official, observed, calculated, projected, and unknown values distinct.
- Catalytic Converter is `0.05%` per level and affects conversion cost; it is not a `0.2%` mission-reward building.
- Direct PTS tests confirmed that increasing the Catalytic Converter empire bonus lowers input costs for Metal, Crystal, Deuterium, and Food while hourly Lithium output stays constant at the same workload; scaling at other workloads remains untested.
- Local IAS sustainment estimates apply the observed 100% workload ratios (Metal 3:1, Crystal 2:1, Deuterium 1:1, Food 100:1) and the entered combined Catalytic Converter level total; beyond-tested reductions are projections.
- One four-wave PvE Delivery: Metal dialog showed 59,634,076 total Metal and 14,073,696 Lithium total cost, each divided into four equal wave amounts. Do not generalize equal splitting to other templates without evidence.
- ACS tooltip: Alliance Depot levels across all planets add one to the group member cap per 20 levels, up to +5; screenshot showed level 13, with baseline/resulting cap not established.
- User-reported ACS constraint: a free fleet slot is needed to start or join; full fleet slots prevent ACS participation.
- Capacity upgrade checkpoints now include Discovery Limit 5→6 and Max Results 4→5; costs are discrete observations, not an inferred formula.
- Mission resource comparisons use 3:2:1 MSU (Metal + 1.5×Crystal + 3×Deuterium) and a comparison benchmark of 3 MSU per Lithium. Lithium rewards are valued at that same rate. After population growth, surplus Food may have little other use for this account, making Lithium converted from it much cheaper in marginal resource terms; initial investment and conversion throughput still matter. Completed PTS missions have paid the displayed possible resource rewards so far. PvP missions can be attacked by other players. The comparison excludes scan costs, fleet losses, non-resource rewards, time, and Catalytic Converter reductions. Scan range is distinct from each card's Distance. The published workbook is `downloads/orion-mission-research.xlsx`.
- Control Center empire bonuses are modeled additively per the user's correction. The calculator covers all seven bonus buildings and leaves the earlier IRC 2.19% sample discrepancy unresolved.
- Anomaly Analysis Center base costs are user-provided (67,500 / 37,500 / 22,500); higher-level shared-model outputs have not been independently verified.
- Do not publish raw screenshots containing account identity, coordinates, planets, or resource balances.
- Update the revision and changelog only when public facts or behavior change.
- Run `node scripts/validate.mjs` and `git diff --check` before committing.
- Commit locally, then ask the user to run one `git push origin main` from normal PowerShell.
- After the user confirms the push, verify the Pages build and live revision once.

## Blank-chat prompt

> Continue the Project Orion field guide at https://github.com/TheIlluminate92/ogame-project-orion. Start by reading AGENTS.md and docs/NEXT_SESSION.md, then give me the usage-check recommendation before substantial work. Use the usage-conscious workflow: batch the edits, prefer targeted reads, browse only for current official facts, validate once, commit locally, ask me for one final `git push origin main`, and perform one live verification afterward. Preserve the evidence boundaries and do not invent unknown costs or formulas.

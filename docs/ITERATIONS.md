# Iteration log

This file tracks structural releases and provides continuity when development moves to another device or AI session. The detailed fact-by-fact changelog remains in `data/orion-data.js`.

| Revision | Date | Major change |
|---|---|---|
| 0.19.3 | 2026-10-01 | Corrected the static About-page guide version and recorded the verified 0.19.2 deployment. |
| 0.19.2 | 2026-10-01 | Added general mission reward comparison notes, published the structured sample workbook, and marked reward/ROI patterns as provisional. |
| 0.19.0 | 2026-10-01 | Added local IAS sustainment estimates using combined Catalytic Converter levels, surfaced all four observed conversion ratios, recorded scanner-capacity checkpoints and ACS fleet/Alliance Depot limits, and documented the four-wave Delivery: Metal reward/cost split. |
| 0.18.0 | 2026-10-01 | Added user-provided AAC base costs and enabled the shared Control Center cost model in its calculator and queue; higher levels remain unverified. |
| 0.17.0 | 2026-10-01 | Replaced the calculator dropdown with concise two-row buttons for empire-wide planning/queue and local buildings. |
| 0.16.0 | 2026-10-01 | Removed base-cost details from Scanner; added additive empire bonus targets and comparison tables for all seven Control Center buildings while preserving the unresolved IRC sample discrepancy. |
| 0.15.1 | 2026-10-01 | Clarified game versus guide versions and added official v13.1.0 release context plus FAQ-backed mission operations. |
| 0.15.0 | 2026-10-01 | Cleaned up four pages; added current-to-target calculators, queue starting levels, streamlined network totals, mission guidance, a database roadmap, and a compact changelog. |
| 0.14.2 | 2026-10-01 | Maintenance cleanup: synchronized fallback metadata, improved active-page navigation semantics, and expanded validation for local links and revision drift. |
| 0.14.1 | 2026-09-30 | Added supplied in-game lore for the IAS and all seven Control Center buildings. |
| 0.14.0 | 2026-09-30 | Split the guide into focused Overview, Scanner, Missions, Calculators, Research, and About pages; added the IAS-350 starter path and expanded milestone details. |
| 0.13.1 | 2026-09-30 | Added the complete supplied seven-icon Control Center artwork set to progression cards and detail dialogs. |
| 0.13.0 | 2026-09-30 | Completed the L250/L300/L350 Control Center progression; added calculators and queue support with explicit unknown/estimated cost handling and Catalytic Converter's distinct 0.05% effect. |
| 0.12.1 | 2026-09-30 | Added IAS-349 scanner checkpoint, high-level mission samples, and L351 Small Alien wave composition. |
| 0.12.0 | 2026-09-30 | Added the L100/L150/L200 Control Center buildings to progression, calculators, and queue; added clickable building details; downgraded IRC stacking to candidate pending confirmation. |
| 0.11.2 | 2026-09-30 | Bug hunt: corrected IRC unlock to L50, tested multiplicative empire stacking as a candidate model, and hardened validation. |
| 0.11.1 | 2026-09-30 | Fixed broken calculator queue handlers and initialization. |
| 0.11.0 | 2026-09-30 | Added scanner tooltip mechanics, Discovery Limit/Max Results upgrade costs, high-level scan samples through L212, and capacity upgrades in the build queue. |
| 0.10.3 | 2026-09-30 | Capped local building calculators and queue targets at level 100. |
| 0.10.2 | 2026-09-30 | Reworked the build queue for building + target-level entry, per-building cumulative costs, and grand totals; Recovery Center costs validated through L9. |
| 0.10.1 | 2026-09-30 | Added a multi-building planet build queue with upfront resource totals. |
| 0.10.0 | 2026-09-30 | Unified calculators behind a selector and added the Intergalactic Recovery Center planner. |
| 0.9.0 | 2026-09-30 | Closed observed conversion ratios, added range-vs-scan-cost evidence, and expanded mission ROI samples. |
| 0.8.1 | 2026-09-30 | Added level-11 pirate NPC wave sizes and high-level mission evidence. |
| 0.8.0 | 2026-09-30 | Added combined-IAS-60 scans, delivery samples, and sequential wave claims. |
| 0.7.0 | 2026-09-30 | Split calculators into a dedicated page and simplified the homepage. |
| 0.6.3 | 2026-09-30 | Extended exact local scanner calculations through level 100. |
| 0.6.1 | 2026-09-30 | Expanded exact cross-planet planning through combined IAS 1,000. |
| 0.6.0 | 2026-09-30 | Added the cross-planet IAS distribution planner. |
| 0.5.x | 2026-09-30 | Added build-time checkpoints and PTS cost validation. |
| 0.4.0 | 2026-09-30 | First public GitHub Pages deployment and cross-planet stacking rule. |
| 0.1.0 | 2026-09-30 | Initial alliance briefing. |

## Starting the next iteration

Record these items before editing:

```text
Requested change:
Evidence source: official post / PTS screenshot / direct test / calculation
Exact observed values:
What remains unknown:
Files expected to change:
Target revision:
```

Then follow `AGENTS.md`, update `docs/CURRENT_STATE.md` if the mechanic or project structure materially changes, and verify the live revision after deployment.

## Current continuation point

- Working revision: 0.19.3
- The 0.19.2 mission guidance and workbook are live; 0.19.3 corrects the About page's static version label and awaits the user's push.
- Deployment: revision 0.19.2 is verified on GitHub and GitHub Pages; 0.19.3 is the local follow-up correction.
- Next action: add future mission-card samples to the database, keeping scan range, mission distance, stars, reward precision, and claim-cost precision separate; refresh the published workbook in the same batch.
- Highest cost-formula validation: IAS 35
- Highest calculator level: IAS 100
- Highest combined planner target: IAS 1,000

# Iteration log

This file tracks structural releases and provides continuity when development moves to another device or AI session. The detailed fact-by-fact changelog remains in `data/orion-data.js`.

| Revision | Date | Major change |
|---|---|---|
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

- Working revision: 0.11.0
- Local validation: passing
- Deployment: revision 0.11.0 pushed to main; live verification still required
- Next action: continue high-level scanner/mission sampling, validate Recovery Center checkpoints above level 9, and collect additional discrete scanner-capacity upgrade costs.
- Highest cost-formula validation: IAS 35
- Highest calculator level: IAS 100
- Highest combined planner target: IAS 1,000

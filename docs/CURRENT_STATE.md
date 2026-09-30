# Current project state

Last updated: 2026-09-30

Working revision: **0.10.2**

Target game version: **OGame PTS v13.1.0 / Project Orion**

## Deployment

- Repository: https://github.com/TheIlluminate92/ogame-project-orion
- Live site: https://theilluminate92.github.io/ogame-project-orion/
- Publishing source: `main` branch, repository root
- Revision 0.10.2 publication pending verification: 2026-09-30

Future revisions should be treated as published only after the Pages build and the live revision have been checked.

## Current site structure

- The homepage is a concise field guide.
- `calculators.html` is a unified selectable calculator deck for IAS and Control Center buildings.
- The local scanner calculator supports levels 1–100 with exact integer costs.
- The cross-planet planner supports combined IAS targets 1–1,000 and 1–50 available planets.
- The Intergalactic Recovery Center calculator models +0.2% ship rewards per level and empire-wide stacking; the ×1.5 cost curve matches supplied PTS values through level 9 and projects higher levels.
- The planner assumes all selected planets begin at IAS 0 and optimizes construction resources, not Lithium production.
- The new-planet build queue accepts building + target-level entries and reports cumulative cost for each queued building plus a grand total.

## Confirmed or repeatedly observed

- IAS levels stack across planets for account-wide anomaly progression.
- Scanner construction-cost formula matches supplied PTS values through level 35.
- Observed 100% workload conversion ratios: Metal 3:1, Crystal 2:1, Deuterium 1:1, Lifeform Food 100:1.
- Multiple planets can convert different resources to Lithium simultaneously with independent controls.
- Control Center buildings unlock at completed mission levels 50, 100, 150, 200, 250, 300, and 350.
- Intergalactic Recovery Center is the level-100 unlock; its +0.2% ship-reward bonus per level stacks empire-wide across planets.
- Combined IAS 60 produced an observed scan cost of 112,454 Lithium at both 10- and 150-system range settings.
- Observed range choices at IAS 60: 10, 50, and 150 systems.
- Mission rewards can be collected in order, wave by wave.
- Partial collection is possible before a multi-wave mission fully ends.
- Observed templates include Small Pirate Encounter, Delivery: Metal, and Valuable Delivery.

## Build-time checkpoints

All were reported with Robotics Factory 15 and Nanite Factory 10:

| IAS level or transition | Displayed time |
|---|---:|
| 20 | 1 second |
| 27 → 28 | 8 seconds |
| 30 | 19 seconds |
| 32 | 37 seconds |
| 35 | 1 minute 42 seconds |

Missing intermediate times are not estimated.

## Level-11 PvP pirate sample

- Four waves total.
- Visible NPC ship counts: wave 2 = 25, wave 3 = 25, wave 4 = 22.
- Wave 1 size and ship composition were not visible.
- Observed completed-wave reward: one Small Cargo and one Light Fighter per shown wave.
- Per-wave claim cost shown: 1,569 Lithium; selecting two completed waves cost 3,138 Lithium.

## Open questions

The canonical list is in `data/orion-data.js`. Important unresolved items include:

- Complete mission-template list.
- Exact scan, claim-cost, reward, enemy-scaling, and construction-time formulas.
- Which mechanics use combined account IAS versus local planet IAS.
- Exact Control Center building names and bonuses.
- General-class and Mecha bonus percentages.

## Privacy boundary

Supplied screenshots contain account and game-state details. They are evidence for extracting mechanics, not public website assets. Do not commit them unless the user explicitly provides a safely cropped, publication-ready image.

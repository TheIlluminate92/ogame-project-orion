# Current project state

Last updated: 2026-09-30

Working revision: **0.14.0**

Target game version: **OGame PTS v13.1.0 / Project Orion**

## Deployment

- Repository: https://github.com/TheIlluminate92/ogame-project-orion
- Live site: https://theilluminate92.github.io/ogame-project-orion/
- Publishing source: `main` branch, repository root
- Revision 0.13.1 publication verified: 2026-09-30
- Revision 0.14.0 publication verified: 2026-09-30

Future revisions should be treated as published only after the Pages build and the live revision have been checked.

## Current site structure

- The homepage is a concise Orion overview with Lithium basics and a practical first goal of combined IAS 350.
- `scanner.html` contains IAS mechanics, formulas, milestone progression, Control Center costs/bonuses, and observed scanner-capacity upgrade costs.
- `missions.html` contains the useful mission profiles and operating rules without publishing the raw observation dump as a standalone section.
- `calculators.html` is a unified selectable calculator deck for IAS and Control Center buildings.
- `research.html` turns each major unknown into a suggested test or screenshot request.
- `about.html` contains the evidence policy, official sources, and changelog.
- The incomplete reward-scaling concept and raw PTS observation section remain preserved in `data/orion-data.js` but are not in public navigation pending a proper mission/reward database.
- Exact IAS lore text is still missing from retained evidence and is explicitly marked as awaiting a clean Techinfo capture rather than being invented.
- The local scanner calculator supports levels 1–100 with exact integer costs.
- The cross-planet planner supports combined IAS targets 1–1,000 and 1–50 available planets.
- The Intergalactic Recovery Center calculator models +0.2% ship rewards per local level. Multiplicative empire stacking currently remains a candidate model because it reproduces the observed 2.19% total, but needs another independent confirmation. The ×1.5 cost curve matches supplied PTS values through level 9 and projects higher levels.
- All seven Control Center unlocks are now named in progression. Lithium Electrolysis Lab, Metal Recycling Unit, Crystal Finishing Station, High-Pressure Deuterium Tanks, and Catalytic Converter have local level calculators and build-queue entries using working ×1.5 cost estimates derived from abbreviated PTS screenshots.
- All seven Control Center buildings use the supplied image artwork in the progression cards and building-detail dialog; text badges remain implemented as a fallback for missing future assets.
- Anomaly Analysis Center has a bonus calculator and queue entry, but its construction cost remains unknown and is excluded from numeric queue totals.
- Catalytic Converter uses a distinct +0.05 percentage-points-per-level progression and reduces Lithium conversion cost; it is not modeled as an anomaly mission-reward multiplier. The exact conversion formula application remains unknown.
- The planner assumes all selected planets begin at IAS 0 and optimizes construction resources, not Lithium production.
- The new-planet build queue accepts building + target-level entries up to local level 100 and reports cumulative cost for each queued building plus a grand total.
- Scanner capacity upgrades (Discovery Limit and Max Results) are available in the queue using only observed discrete costs; the calculator does not extrapolate unknown capacity-upgrade prices.

## Confirmed or repeatedly observed

- IAS levels stack across planets for account-wide anomaly progression.
- Scanner construction-cost formula matches supplied PTS values through level 35.
- Observed 100% workload conversion ratios: Metal 3:1, Crystal 2:1, Deuterium 1:1, Lifeform Food 100:1.
- Multiple planets can convert different resources to Lithium simultaneously with independent controls.
- Control Center buildings unlock at completed mission levels 50, 100, 150, 200, 250, 300, and 350.
- Known mappings: L50 Intergalactic Recovery Center (Ships), L100 Lithium Electrolysis Lab (Lithium), L150 Metal Recycling Unit (Metal), L200 Crystal Finishing Station (Crystal), L250 Anomaly Analysis Center (Dark Matter), L300 High-Pressure Deuterium Tanks (Deuterium), and L350 Catalytic Converter (Lithium conversion cost).
- The mission-reward specialization buildings observed so far use +0.2 percentage points per level. This is not a universal Control Center rule: Catalytic Converter uses +0.05 points per level and affects conversion cost instead.
- Intergalactic Recovery Center is the level-50 unlock and grants +0.2% ships per local level. The observed 2.19% empire total is consistent with multiplicative stacking, but that formula is not yet confirmed.
- Combined IAS 60 produced an observed scan cost of 112,454 Lithium at both 10- and 150-system range settings.
- Observed range choices at IAS 60: 10, 50, and 150 systems.
- Scanner tooltip: discovered anomaly level may differ by up to 20% from the selected/indicated anomaly level.
- Max Results defaults to 3 and controls how many missions a single scan can discover.
- Anomaly Discovery Limit defaults to 2 and controls simultaneous anomaly investigations.
- Observed Discovery Limit upgrade costs: 2→3 = 3M/1.5M/750K; 3→4 = 45M/22.5M/11.25M; 4→5 = 160M/80M/40M.
- Observed Max Results upgrade cost: 3→4 = 300M/150M/75M.
- High-level 150-system scan checkpoints include L171 = 406,624 Lithium, L207 = 567,901, and L212 = 590,371.
- Combined IAS 349 at 10-system range showed a scan cost of 961,980 Lithium, Max Results 3, and Discovery Limit 1/4.
- A level-351 PvE two-star Small Alien Encounter showed four NPC waves of 1,881 / 1,971 / 374 / 988 ships; visible later-wave combat tech was Weapons 28 / Shielding 20 / Armor 28.
- Newly observed mission templates include Lifeform Rescue, Resource: Metal, and Resource: Deuterium.
- PvE missions cannot be attacked by other players; PvP missions can be targeted/sabotaged and award double rewards when completed successfully.
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
- Full-precision construction costs for the recently identified Control Center buildings, especially Anomaly Analysis Center.
- Exact Catalytic Converter calculation semantics.
- General-class and Mecha bonus percentages.

## Privacy boundary

Supplied screenshots contain account and game-state details. They are evidence for extracting mechanics, not public website assets. Do not commit them unless the user explicitly provides a safely cropped, publication-ready image.

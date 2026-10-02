# Current project state

Last updated: 2026-10-01

Working revision: **0.19.3**

Target game version: **OGame PTS v13.1.0 / Project Orion**

## Deployment

- Repository: https://github.com/TheIlluminate92/ogame-project-orion
- Live site: https://theilluminate92.github.io/ogame-project-orion/
- Publishing source: `main` branch, repository root
- Latest verified deployment: revision 0.19.2 on 2026-10-01

Revision 0.19.2 is published on GitHub and verified on GitHub Pages. Revision 0.19.3 corrects the static About-page guide-version label and is prepared locally pending the user's push. Revisioned data and script URLs prevent an older cached data file from overriding newly deployed HTML.

Future revisions should be treated as published only after the Pages build and the live revision have been checked.

## Current site structure

- The homepage is a concise Orion overview with Lithium basics and a practical first goal of combined IAS 350.
- `scanner.html` contains IAS mechanics, formulas, milestone progression, Control Center bonuses, and observed scanner-capacity upgrade costs; base construction costs are omitted from this page.
- `missions.html` contains a practical mission quick-start, public-objective guidance, PvE/PvP/ACS help, useful mission profiles, operating rules, and general reward-comparison lessons with provisional wording.
- `calculators.html` is a unified selectable calculator deck with local IAS Lithium sustainment estimates, combined Catalytic Converter levels, current-to-target building ranges, streamlined cross-planet totals, additive empire bonus targets, and starting levels in the build queue.
- Calculator navigation uses a top row for IAS Network, Empire Bonus, and Planet Queue, plus a lower row of concise local building buttons.
- `research.html` turns each major unknown into a suggested test or screenshot request and links to the working downloadable mission workbook.
- `about.html` contains the evidence policy, official v13.1.0 release context, sources, and a compact changelog that keeps the latest five releases visible.
- The incomplete reward-scaling concept and raw PTS observation section remain preserved in `data/orion-data.js` and are not reproduced as account-specific public page text.
- `data/mission-roi-samples.json` holds 24 scan cards at a 10-system range, 20 at a 50-system range, and 20 at a 150-system range, plus one collected reward sample with unknown scan range. `downloads/orion-mission-research.xlsx` is the published, filterable workbook generated from this source. The data tracks stars and each card's separate mission distance; `scripts/mission-roi.mjs` calculates resource-only 3:2:1 MSU values, valuing Lithium rewards at the observed 3:1 Metal-to-Lithium rate. User-observed completed missions have paid the displayed possible resource rewards so far; PvP missions can be attacked by other players. Public page lessons remain general and provisional.
- Supplied in-game lore is published for the Interstellar Anomaly Scanner and all seven Control Center buildings.
- The local scanner and Control Center calculators support current-to-target level ranges through level 100.
- The cross-planet planner supports combined IAS targets 1–1,000 and 1–50 available planets.
- Control Center empire bonus planning uses additive stacking per the user's correction. The planner covers all seven bonus buildings, targets above 99.9%, and balanced layouts across up to 50 planets; reference tables compare local levels 10/20/30 across 10/15/20 planets. The prior IRC L3 + L8 sample displayed 2.19% versus a 2.20% additive sum, and that discrepancy remains unresolved. IRC's ×1.5 cost curve matches supplied PTS values through level 9 and projects higher levels.
- All seven Control Center unlocks are now named in progression and have local calculators/build-queue entries. Most use working ×1.5 cost estimates from abbreviated PTS screenshots; Anomaly Analysis Center uses user-provided base costs with the same shared cost curve.
- All seven Control Center buildings use the supplied image artwork in the progression cards and building-detail dialog; text badges remain implemented as a fallback for missing future assets.
- Anomaly Analysis Center base costs are user-provided (67,500 Metal / 37,500 Crystal / 22,500 Deuterium); its calculator and queue use the shared Control Center ×1.5-per-level model. Higher-level cost outputs are calculated and not independently verified.
- Catalytic Converter uses a distinct +0.05 percentage-points-per-level progression and reduces Lithium conversion cost; it is not a mission-reward multiplier. Direct PTS tests confirmed that a higher empire bonus lowers hourly input costs for Metal, Crystal, Deuterium, and Food while hourly Lithium output stays unchanged at the same workload. The displayed total matched the sum of local planet percentages. Scaling at other workloads remains untested.
- The planner assumes all selected planets begin at IAS 0 and optimizes construction resources, not Lithium production.
- The build queue accepts a starting and target level for each building up to local level 100 and reports only the remaining upgrade cost plus a grand total.
- Scanner capacity upgrades (Discovery Limit and Max Results) are available in the queue using only observed discrete costs; the calculator does not extrapolate unknown capacity-upgrade prices.

## Confirmed or repeatedly observed

- IAS levels stack across planets for account-wide anomaly progression.
- Scanner construction-cost formula matches supplied PTS values through level 35.
- Observed 100% workload conversion ratios: Metal 3:1, Crystal 2:1, Deuterium 1:1, Lifeform Food 100:1.
- The local IAS calculator estimates hourly Metal, Crystal, Deuterium, and Food inputs for a selected Lithium output, using the combined Catalytic Converter level total; reductions beyond directly tested totals are projections.
- Four-wave PvE Delivery: Metal sample: 59,634,076 Metal mission total divided into four equal 14,908,519 wave claims; total cost 14,073,696 Lithium divided into 3,518,424 per-wave claims. Even splitting is confirmed only for this mission sample.
- The ACS tooltip states Alliance Depot levels across all planets increase the group member cap by one per 20 levels, up to five increases. One screenshot showed current level 13; the baseline cap and current resulting cap were not visible.
- User-reported ACS constraint: keep one fleet slot free; ACS cannot be started or joined with all fleet slots occupied.
- Increasing the displayed Catalytic Converter empire bonus lowered hourly input costs for Metal, Crystal, Deuterium, and Food while hourly Lithium output remained constant at the same workload. Other workload conditions remain untested.
- Multiple planets can convert different resources to Lithium simultaneously with independent controls.
- Control Center buildings unlock at completed mission levels 50, 100, 150, 200, 250, 300, and 350.
- Known mappings: L50 Intergalactic Recovery Center (Ships), L100 Lithium Electrolysis Lab (Lithium), L150 Metal Recycling Unit (Metal), L200 Crystal Finishing Station (Crystal), L250 Anomaly Analysis Center (Dark Matter), L300 High-Pressure Deuterium Tanks (Deuterium), and L350 Catalytic Converter (Lithium conversion cost).
- The mission-reward specialization buildings observed so far use +0.2 percentage points per level. This is not a universal Control Center rule: Catalytic Converter uses +0.05 points per level and affects conversion cost instead.
- Intergalactic Recovery Center is the level-50 unlock and grants +0.2% ships per local level. Empire bonuses are modeled additively per the user's correction; the prior 2.19% sample differs by 0.01 percentage points from the additive sum and needs reconciliation.
- Combined IAS 60 produced an observed scan cost of 112,454 Lithium at both 10- and 150-system range settings.
- Observed range choices at IAS 60: 10, 50, and 150 systems.
- Scanner tooltip: discovered anomaly level may differ by up to 20% from the selected/indicated anomaly level.
- Max Results defaults to 3 and controls how many missions a single scan can discover.
- Anomaly Discovery Limit defaults to 2 and controls simultaneous anomaly investigations.
- Observed Discovery Limit upgrade costs: 2→3 = 3M/1.5M/750K; 3→4 = 45M/22.5M/11.25M; 4→5 = 160M/80M/40M.
- Observed Max Results upgrade cost: 3→4 = 300M/150M/75M.
- Additional observed capacity upgrades: Discovery Limit 5→6 = 2.5B/1.25B/625M; Max Results 4→5 = 4.5B/2.25B/1.125B.
- High-level 150-system scan checkpoints include L171 = 406,624 Lithium, L207 = 567,901, and L212 = 590,371.
- Combined IAS 349 at 10-system range showed a scan cost of 961,980 Lithium, Max Results 3, and Discovery Limit 1/4.
- A level-351 PvE two-star Small Alien Encounter showed four NPC waves of 1,881 / 1,971 / 374 / 988 ships; visible later-wave combat tech was Weapons 28 / Shielding 20 / Armor 28.
- Newly observed mission templates include Lifeform Rescue, Resource: Metal, and Resource: Deuterium.
- PvE missions cannot be attacked by other players; PvP missions can be targeted/sabotaged and award double rewards when completed successfully.
- Spawned missions are publicly visible across the galaxy and are first come, first served.
- Higher anomaly levels improve potential rewards but increase combat difficulty plus scan and claim costs.
- Insufficient Lithium limits the player to a partial reward claim.
- Claimed rewards travel to the discovery planet on a friendly NPC transport visible on phalanx.
- General class mission rewards can be boosted further by the Mecha General Enhancement lifeform technology.
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
- Full-precision construction costs and higher-level cost checkpoints for Control Center buildings with inferred or user-provided bases.
- How Catalytic Converter cost reductions scale at different bonus totals and workloads.
- General-class and Mecha bonus percentages.

## Privacy boundary

Supplied screenshots contain account and game-state details. They are evidence for extracting mechanics, not public website assets. Do not commit them unless the user explicitly provides a safely cropped, publication-ready image.

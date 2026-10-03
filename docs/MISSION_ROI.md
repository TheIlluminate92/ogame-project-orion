# Mission resource comparison

The working sample database is [`data/mission-roi-samples.json`](../data/mission-roi-samples.json). Each record keeps the displayed mission details, resource rewards, and Lithium claim cost. Planet names, coordinates, and account details are excluded. Ship and other non-resource rewards are recorded only as excluded, not valued.

The dataset now has 39 scan cards at a **10-system range**, 38 at a **50-system range**, and 70 at a **150-system range**, plus one collected Delivery reward sample with unknown scan range. Each scan reach is stored separately from the **Distance** displayed on the mission card. The Excel workbook is [`downloads/orion-mission-research.xlsx`](../downloads/orion-mission-research.xlsx), generated from the JSON source by `node scripts/build-mission-workbook.mjs`. Partly obscured amounts stay unknown, with their visible text retained in the workbook's cost-note column.

## Shared method

- Use 3:2:1 Metal:Crystal:Deuterium values. One Metal = 1 MSU, one Crystal = 1.5 MSU, and one Deuterium = 3 MSU.
- Resource reward MSU = Metal + 1.5 × Crystal + 3 × Deuterium + 3 × Lithium reward. Lithium reward uses the observed 3:1 Metal-to-Lithium exchange rate.
- Baseline claim cost MSU = Lithium claim cost × 3. This uses the observed 3:1 Metal-to-Lithium rate and assumes no Catalytic Converter reduction.
- **Lithium source matters.** Once population has grown, surplus Food may have no other use for this account. Converting that surplus to Lithium can make its marginal resource opportunity cost much lower than 3 MSU per Lithium. The 3 MSU figure is a shared comparison benchmark, not a claim about actual resource spent. Initial Food production investment and Lithium conversion throughput still matter.
- Benchmark spread MSU = resource reward MSU − claim cost MSU; reward/cost ratio = resource reward MSU ÷ claim cost MSU. Because Lithium sourcing varies, the spread is not actual profit.
- These are resource-only claim comparisons. Scan costs, fleet losses, time, and non-resource rewards are excluded. In completed PTS missions observed so far, displayed possible resource rewards have matched the amounts collected. Treat this as an observation while we gather more claims. PvP missions can be attacked by other players before collection.
- If a card shows only non-resource rewards, the resource-only reward is zero and does not represent the mission's total value.
- Values prefixed with `≈` come from approximate rewards or rounded `M` claim costs shown on scan cards. A reward claim dialog can supply exact figures later; retain the original card observation if it differs.

Run `node scripts/mission-roi.mjs` from the repository root to print the complete comparison table, or add `--scan-range=150` (or 10/50) to show one scan-range set. Rebuild the Excel workbook with `node scripts/build-mission-workbook.mjs` after updating the JSON.

For future screenshot batches, give the selected scan reach once for the batch and include up to four complete mission cards per image. Keep the card's stars, mode, level, waves, duration, mission Distance, possible rewards, and Lithium cost visible; move the cursor away from the cost. If a value is still hidden, keep it unknown until a clearer image arrives. Record each card separately and do not combine repeated mission templates.

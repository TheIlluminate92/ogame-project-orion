window.ORION_DATA = {
  meta: {
    title: "Project Orion",
    subtitle: "Alliance field guide for OGame PTS v13.1.0",
    status: "PTS — subject to change",
    updated: "2026-09-30",
    revision: "0.12.1"
  },

  lithium: {
    description: "Lithium is the new anomaly resource. It fuels scans and reward claims and is produced by the Interstellar Anomaly Scanner.",
    confirmed: [
      "Convert Metal, Crystal, Deuterium, or Lifeform Food into Lithium.",
      "Lithium storage is unlimited.",
      "Lithium cannot be traded or stolen.",
      "Production stops when the selected source resource is depleted.",
      "Lithium is spent on anomaly scans and reward claims.",
      "Observed PTS 100% workload conversion ratios: Metal 3:1, Crystal 2:1, Deuterium 1:1, and Lifeform Food 100:1."
    ],
    converterUi: ["Selectable source resource", "Adjustable workload", "Cost and Lithium rates per hour", "Endless conversion mode", "Per-planet conversion overview"]
  },

  scanner: {
    name: "Interstellar Anomaly Scanner",
    fieldUse: "The scanner occupies one planet field; its Control Center sub-buildings use no additional fields.",
    stacking: "Interstellar Anomaly Scanner (IAS) levels stack across planets for account-wide anomaly progression.",
    costValidatedThrough: 35,
    productionFormula: "floor(200 × L × 1.1^L)",
    costFormula: "floor(Base × 1.4^(L − 1))",
    baseCost: { metal: 84, crystal: 42, deuterium: 14 },
    examples: [
      { level: 1, lithium: 220 },
      { level: 5, lithium: 1610 },
      { level: 10, lithium: 5187 },
      { level: 15, lithium: 12531 }
    ],
    level60: {
      final: { metal: 35142559683, crystal: 17571279841, deuterium: 5857093280 },
      cumulative: { metal: 122998958649, crystal: 61499479308, deuterium: 20499826416 }
    },
    mechanics: {
      anomalyLevel: "The maximum selectable anomaly level depends on IAS levels across all planets. A discovered anomaly's actual level may differ by up to 20% from the indicated level.",
      maxResults: "Maximum number of anomaly missions a single galaxy scan can discover. Default: 3.",
      discoveryLimit: "Maximum number of discovered anomalies that can be investigated simultaneously. Default: 2."
    },
    scannerUpgrades: {
      discoveryLimit: {
        name: "Anomaly Discovery Limit",
        defaultValue: 2,
        observedCosts: [
          { from: 2, to: 3, metal: 3000000, crystal: 1500000, deuterium: 750000 },
          { from: 3, to: 4, metal: 45000000, crystal: 22500000, deuterium: 11250000 },
          { from: 4, to: 5, metal: 160000000, crystal: 80000000, deuterium: 40000000 }
        ]
      },
      maxResults: {
        name: "Max Results",
        defaultValue: 3,
        observedCosts: [
          { from: 3, to: 4, metal: 300000000, crystal: 150000000, deuterium: 75000000 }
        ]
      }
    },
    scanCostCheckpoints: [
      { anomalyLevel: 60, rangeSystems: 150, lithium: 112454 },
      { anomalyLevel: 171, rangeSystems: 150, lithium: 406624 },
      { anomalyLevel: 207, rangeSystems: 150, lithium: 567901 },
      { anomalyLevel: 212, rangeSystems: 150, lithium: 590371 }
    ],
    controlCenter: {
      description: "The Control Center enables IAS upgrades and unlocks bonuses for anomaly missions.",
      unlockLevels: [50, 100, 150, 200, 250, 300, 350],
      unlockRule: "Complete a mission of the listed level to unlock the corresponding Control Center building.",
      buildings: {
        intergalacticRecoveryCenter: {
          calculatorKey: "recovery",
          iconLabel: "SHIP",
          name: "Intergalactic Recovery Center",
          unlockMissionLevel: 50,
          effect: "Increases the number of ships gained from anomaly missions.",
          bonusResource: "Ships",
          bonusPerLevelPercent: 0.2,
          stacksEmpireWide: true,
          empireStackingStatus: "Observed empire total 2.19% is consistent with multiplicative stacking, but the rule still needs an independent confirmation.",
          maxObservedTechinfoLevel: 15,
          costValidatedThrough: 9,
          maxCalculatorLevel: 100,
          baseCost: { metal: 75000, crystal: 52500, deuterium: 22500 },
          baseCostStatus: "Working exact model derived from observed PTS costs.",
          costMultiplier: 1.5,
          costModelStatus: "×1.5 model matches supplied PTS costs through level 9; higher levels remain projections.",
          observedDisplayedCosts: [
            { level: 1, metal: "75K", crystal: "52K", deuterium: "22K" },
            { level: 2, metal: "112K", crystal: "78K", deuterium: "33K" },
            { level: 4, metal: "253K", crystal: "177K", deuterium: "75K" }
          ]
        },
        lithiumElectrolysisLab: {
          calculatorKey: "lithiumLab",
          iconLabel: "Li",
          name: "Lithium Electrolysis Lab",
          unlockMissionLevel: 100,
          effect: "Increases the amount of Lithium gained from anomaly missions with each level.",
          bonusResource: "Lithium",
          bonusPerLevelPercent: 0.2,
          maxObservedTechinfoLevel: 15,
          maxCalculatorLevel: 100,
          baseCost: { metal: 52500, crystal: 37500, deuterium: 37500 },
          baseCostStatus: "Inferred from abbreviated PTS UI values.",
          costMultiplier: 1.5,
          costObservedLevels: [1, 2, 3, 4],
          costModelStatus: "Working ×1.5 model matches displayed level 1–4 checkpoints; full-precision base costs are inferred from abbreviated UI values.",
          observedDisplayedCosts: [
            { level: 1, metal: "52K", crystal: "37K", deuterium: "37K" },
            { level: 2, metal: "78K", crystal: "56K", deuterium: "56K" },
            { level: 3, metal: "118K", crystal: "84K", deuterium: "84K" },
            { level: 4, metal: "177K", crystal: "126K", deuterium: "126K" }
          ]
        },
        metalRecyclingUnit: {
          calculatorKey: "metalRecycling",
          iconLabel: "M",
          name: "Metal Recycling Unit",
          unlockMissionLevel: 150,
          effect: "Increases the amount of Metal gained from anomaly missions with each level.",
          bonusResource: "Metal",
          bonusPerLevelPercent: 0.2,
          maxObservedTechinfoLevel: 15,
          maxCalculatorLevel: 100,
          baseCost: { metal: 112500, crystal: 37500, deuterium: 18000 },
          baseCostStatus: "Inferred from abbreviated PTS UI values.",
          costMultiplier: 1.5,
          costObservedLevels: [1, 3, 4],
          costModelStatus: "Working ×1.5 model matches the displayed level 1, 3, and 4 checkpoints; full-precision base costs are inferred.",
          observedDisplayedCosts: [
            { level: 1, metal: "112K", crystal: "37K", deuterium: "18K" },
            { level: 3, metal: "253K", crystal: "84K", deuterium: "40K" },
            { level: 4, metal: "379K", crystal: "126K", deuterium: "60K" }
          ]
        },
        crystalFinishingStation: {
          calculatorKey: "crystalFinishing",
          iconLabel: "C",
          name: "Crystal Finishing Station",
          unlockMissionLevel: 200,
          effect: "Increases the amount of Crystal gained from anomaly missions with each level.",
          bonusResource: "Crystal",
          bonusPerLevelPercent: 0.2,
          maxObservedTechinfoLevel: 15,
          maxCalculatorLevel: 100,
          baseCost: { metal: 37500, crystal: 67500, deuterium: 27000 },
          baseCostStatus: "Inferred from abbreviated PTS UI values.",
          costMultiplier: 1.5,
          costObservedLevels: [1, 10],
          costModelStatus: "Working ×1.5 model matches the displayed level-1 and level-10 checkpoints; full-precision base costs are inferred.",
          observedDisplayedCosts: [
            { level: 1, metal: "37K", crystal: "67K", deuterium: "27K" },
            { level: 10, metal: "1.4M", crystal: "2.6M", deuterium: "1.0M" }
          ]
        }
      }
    }
  },

  missions: {
    officialCount: "25+ mission templates",
    categories: [
      { icon: "◈", name: "Wave defense", detail: "Defend against one or more NPC attack waves." },
      { icon: "☠", name: "Pirate fleets", detail: "Engage hostile pirate forces." },
      { icon: "⌁", name: "Fortified targets", detail: "Fight hostile defenses and heavy targets." },
      { icon: "◎", name: "Death Stars", detail: "Some combat missions explicitly feature Death Stars." },
      { icon: "⇄", name: "Delivery", detail: "Observed templates include Delivery: Metal and Valuable Delivery, with one to three waves." },
      { icon: "⚔", name: "PvE / PvP", detail: "Mission variants may invite direct player interference." },
      { icon: "⌬", name: "ACS co-op", detail: "Alliance members can contribute fleet value to supported missions." },
      { icon: "✚", name: "Lifeform Rescue", detail: "Observed PvP rescue mission can award Lifeform XP plus an additional unidentified reward type." },
      { icon: "▣", name: "Resource fields", detail: "Observed combat templates include Resource: Metal and Resource: Deuterium." }
    ],
    rules: [
      "PvE missions cannot be attacked by other players.",
      "PvP missions can be targeted and sabotaged by other players.",
      "PvP variants award 2× rewards when completed successfully.",
      "On ACS missions, rewards are divided by each participant’s contributed fleet resource value.",
      "ACS participation is unavailable for missions that do not support ACS."
    ]
  },

  observations: [
    {
      label: "HIGH-IAS SCAN",
      title: "Combined IAS 349",
      metrics: ["Selected anomaly level: 349", "Range: 10 systems", "Span: 3:298–3:318", "Scan cost: 961,980 Lithium", "Max Results: 3", "Discovery Limit: 1 / 4"],
      note: "High-level scanner checkpoint. The scan returned missions from level 284 through 351, consistent with the scanner tooltip allowing discovered anomaly levels to vary from the selected level."
    },
    {
      label: "LEVEL-351 COMBAT SAMPLE",
      title: "Small Alien Encounter",
      metrics: ["PvE · ★★", "Level 351", "4 waves", "Duration: 1h 25m", "Distance: 2,890", "Reward cost: 3.869M Lithium", "Possible rewards: ≈3,784,178 Metal + ≈5,105,756 Crystal + 172 of an unidentified reward icon"],
      note: "Wave sizes were 1,881 / 1,971 / 374 / 988 ships. Wave 1 was 1,881 Heavy Fighters. Wave 2: 384 Small Cargo, 88 Large Cargo, 625 Light Fighters, 627 Heavy Fighters, 247 Cruisers. Wave 3: 18 Small Cargo, 97 Light Fighters, 87 Heavy Fighters, 42 Cruisers, 25 Battleships, 23 Destroyers, 51 Battlecruisers, 31 Reapers. Wave 4: 685 Light Fighters, 181 Cruisers, 93 Battleships, 14 Destroyers, 1 Deathstar, 14 Battlecruisers. NPC combat tech shown on waves 2–4: Weapons 28, Shielding 20, Armor 28."
    },
    {
      label: "HIGH-LEVEL MISSION MIX",
      title: "IAS 349 scan results",
      metrics: ["L306 Resource: Metal · PvP ★ · 8 waves · 2h 44m · cost 3.373M · ≈30,709,440 Metal", "L284 Resource: Deuterium · PvP ★ · 2 waves · 42m · cost 782,814 · ≈2,116,728 Deuterium", "L196 Lifeform Rescue · PvP ★★★★ · 3 waves · 20m · distance 80,000 · 2,352–23,520 Lifeform XP + 126–595 of an unidentified reward icon", "L194 Medium Pirate Encounter · PvE ★ · 4 waves · 1h 31m · distance 80,000 · ≈1,232,629 Metal + 19–76 of an unidentified reward icon"],
      note: "These screenshots add Resource: Metal, Resource: Deuterium, and Lifeform Rescue to the observed mission-template set. The unidentified icon rewards are stored conservatively until their exact item/type is confirmed."
    },
    {
      label: "SCANNER CAPACITY UPGRADES",
      title: "Discovery Limit and Max Results",
      metrics: ["Discovery Limit default: 2", "2→3: 3M / 1.5M / 750K", "3→4: 45M / 22.5M / 11.25M", "4→5: 160M / 80M / 40M", "Max Results default: 3", "3→4: 300M / 150M / 75M"],
      note: "The two tracks are independent. Discovery Limit controls simultaneous anomaly investigations; Max Results controls how many missions a single scan can discover. Costs are stored as discrete observed upgrades; no extrapolated formula is assumed."
    },
    {
      label: "HIGH-LEVEL SCANNER",
      title: "Anomaly level 212",
      metrics: ["150-system scan", "Scan cost: 590,371 Lithium", "Max Results: 3", "Discovery Limit: 4", "Rolls: L197 / L232 / L249"],
      note: "The scanner tooltip states that discovered anomaly level may vary by up to 20% from the indicated level. The level-249 result is about 17.5% above the selected level 212 and is consistent with that rule."
    },
    {
      label: "LEVEL-212 MISSION SAMPLE",
      title: "Three-result scan",
      metrics: ["L197 Resource: Metal · PvP · 3★ · 2 waves · ≈17,625,148 Metal", "L232 Delivery: Crystal · PvP · 1★ · 2 waves · ≈4,612,558 Crystal", "L249 Delivery: Crystal · PvP · 5★ · 1 wave · ≈9,710,696 Crystal"],
      note: "Observed reward costs were approximately 1.645M, 646,066, and 1.386M Lithium respectively. This sample is useful for separating mission level, stars, waves, distance, and claim cost during later ROI analysis."
    },
    {
      label: "CONTROL CENTER SAMPLE",
      title: "Intergalactic Recovery Center",
      metrics: ["Unlock: complete a level-50 mission", "+0.2% ships per level", "L3 contribution: 0.6%", "Observed L3 + L8 empire total: 2.19%", "Techinfo shown through level 15"],
      note: "The ship-reward bonus applies empire-wide. The observed 0.6% and 1.6% planet contributions combine to 2.1904%, matching 1 − (1 − 0.006)(1 − 0.016), so empire stacking is multiplicative rather than simple addition. The ×1.5 cost model matches supplied PTS values through level 9; higher levels remain projections."
    },
    {
      label: "BUILD-TIME SAMPLE",
      title: "IAS construction timing",
      metrics: ["IAS 20: 1 second", "IAS 27 → 28: 8 seconds", "IAS 30: 19 seconds", "IAS 32: 37 seconds", "IAS 35: 1 minute 42 seconds", "Robotics Factory 15", "Nanite Factory 10"],
      note: "Observed checkpoints under the reported support-building setup. Missing intermediate timings are intentionally not estimated."
    },
    {
      label: "CONVERSION RATIOS",
      title: "Resource → Lithium",
      metrics: ["100% workload", "Metal 3:1", "Crystal 2:1", "Deuterium 1:1", "Lifeform Food 100:1", "Independent per-planet controls observed"],
      note: "Direct PTS samples include Metal 590,151 → 196,717/hour, Crystal 968 → 484/hour, Deuterium 220 → 220/hour, and Lifeform Food 79,800 → 798/hour. Ratios are observed behavior, not yet proven against every possible modifier."
    },
    {
      label: "SCAN SAMPLE",
      title: "Level 16 search",
      metrics: ["Range: 10 systems", "Scan cost: 3,943 Lithium", "Maximum results: 3", "Discovery limit: 2 / 2"],
      note: "Observed search span: galaxy 7, systems 295–315. This is one configuration, not a general scan-cost formula."
    },
    {
      label: "MISSION SAMPLE",
      title: "Small Pirate Encounter",
      metrics: ["PvE · Combat", "Mission level 10", "Duration: 30 minutes", "1 wave", "Reward cost: 1,426 Lithium", "Possible reward: ≈51,053 Metal"],
      note: "Target shown at [7:305:6], distance 1,045. Briefing: attack a small pirate fleet and secure its resources."
    },
    {
      label: "HIGH-LEVEL SCAN",
      title: "Combined IAS 60",
      metrics: ["Range options observed: 10 / 50 / 150 systems", "10-system cost: 112,454 Lithium", "150-system cost: 112,454 Lithium", "Maximum results: 3", "Discovery limit: 2 / 2"],
      note: "The same level-60 scan cost was observed at both 10- and 150-system ranges, suggesting selected range may not affect scan cost at this level. This remains an observation, not a universal scan-cost rule."
    },
    {
      label: "DELIVERY SAMPLES",
      title: "Delivery missions",
      metrics: ["L55 Metal: 1 wave · 28m", "Cost 51,541 · reward ≈743,008 Metal", "L60 Metal: 2 waves · 1h 14m", "Cost 112,454 · reward ≈1,652,908 Metal", "L58 Valuable: 3 waves · 1h 42m"],
      note: "The level-58 Valuable Delivery displayed a 163,059 Lithium reward cost and possible rewards of approximately 1,378,000 Metal, 303,160 Crystal, and 78,086 Deuterium."
    },
    {
      label: "MULTI-WAVE SAMPLE",
      title: "Small Pirate Encounter",
      metrics: ["PvP · Combat · level 11", "4 waves", "Wave 2: 25 NPC ships", "Wave 3: 25 NPC ships", "Wave 4: 22 NPC ships", "Wave rewards: Small Cargo 1 + Light Fighter 1", "Per-wave claim cost: 1,569 Lithium", "Two-wave claim cost: 3,138 Lithium"],
      note: "The reward dialog shows completed waves collected in order and demonstrates additive claim cost for the two selected waves. Wave 1 NPC size and ship composition were not visible."
    },
    {
      label: "HIGH-LEVEL MISSION SAMPLES",
      title: "Mission variation around IAS 60",
      metrics: ["L49 Delivery: 6 waves · cost 275,514 · ≈4,361,160 Metal", "L51 PvP Delivery: 1 wave · cost 47,793 · ≈1,377,955 Metal", "L59 Medium Pirate: 2 waves · cost 110,580", "L62 PvP Small Alien: 2 waves · cost 348,608 · ≈3,153,246 Metal", "L64 PvP Small Alien: 1 wave · cost 239,902 · ≈4,256,486 Crystal"],
      note: "These samples show that mission level alone does not determine claim cost, wave count, duration, or reward type. Exact reward and claim-cost formulas remain unknown."
    }
  ],

  rewards: {
    types: ["Resources", "Ships", "Dark Matter", "Lifeform XP", "Artifacts", "Exclusive premium items"],
    confirmed: [
      "Claim after an individual wave or wait until the mission ends.",
      "The Lithium claim cost is split across mission waves.",
      "Partial reward claims are possible.",
      "Completed-wave rewards are collected in order, wave by wave; the claim dialog lets the player choose how many completed waves to collect.",
      "Unclaimed rewards expire one hour after the final wave.",
      "Delivery uses a phalanx-visible system transport to the planet where the mission was accepted, even when accepted from a moon.",
      "Artifacts remain subject to the 3,600 storage cap."
    ],
    scaling: [
      { factor: "Base mission reward", known: true },
      { factor: "Anomaly / scanner level", known: true },
      { factor: "PvP variant ×2", known: true },
      { factor: "General class modifier", known: true },
      { factor: "Mecha General Improvement modifier", known: true },
      { factor: "Exact percentages, ranges, and caps", known: false }
    ]
  },

  unknowns: [
    "The complete mission-template list",
    "Whether the observed conversion ratios change with scanner level, class, universe settings, or other modifiers",
    "Exact scan and claim cost formulas",
    "Cost progression beyond the observed Discovery Limit and Max Results upgrades",
    "Exact reward formulas, ranges, and caps",
    "General and Mecha modifier percentages",
    "Whether economy speed, score, fleet value, or universe age affects rewards",
    "Enemy fleet and defense scaling rules",
    "Which mechanics use the combined account-wide scanner level versus the local planet level",
    "IAS construction-time formula and whether the displayed one-second time is the global minimum",
    "Control Center buildings at mission levels 250, 300, and 350, plus full-precision base costs and high-level curves for the newly observed buildings"
  ],

  changelog: [
    {
      date: "2026-09-30",
      version: "0.12.1",
      notes: "Added combined-IAS-349 scanner evidence, high-level Resource and Lifeform Rescue mission samples, and the full visible four-wave NPC composition for a level-351 Small Alien Encounter."
    },
    {
      date: "2026-09-30",
      version: "0.12.0",
      notes: "Added Lithium Electrolysis Lab, Metal Recycling Unit, and Crystal Finishing Station to the Control Center progression, calculator deck, and build queue. Added clickable Control Center detail cards, cost-model status, and downgraded Recovery Center empire stacking from confirmed to a candidate model pending another test."
    },
    {
      date: "2026-09-30",
      version: "0.11.2",
      notes: "Bug-hunt release: corrected Intergalactic Recovery Center to the level-50 Control Center unlock, fixed empire-wide Recovery Center stacking to the observed multiplicative formula, capped bonus targets below 100%, and hardened validation against broken queue wiring."
    },
    {
      date: "2026-09-30",
      version: "0.11.1",
      notes: "Fixed the calculator page queue controls: Add to queue, building selector limits, Enter-to-add, clear queue, and quick-level buttons now use the correct handlers."
    },
    {
      date: "2026-09-30",
      version: "0.11.0",
      notes: "Added confirmed scanner tooltips, discrete Discovery Limit and Max Results upgrade costs, high-level scan checkpoints through anomaly level 212, a level-212 three-result mission sample, and clarified PvE/PvP interaction rules. Capacity upgrades were added to the build queue without inventing an extrapolated cost formula."
    },
    {
      date: "2026-09-30",
      version: "0.10.3",
      notes: "Capped all local building calculators and build-queue target levels at 100. Account-wide combined IAS planning remains separate."
    },
    {
      date: "2026-09-30",
      version: "0.10.2",
      notes: "Reworked the new-planet build queue into add-by-target workflow: select IAS or Recovery Center, enter a target level, add it, then view cumulative per-building costs and a grand resource total. Recovery Center cost progression is now marked validated through level 9."
    },
    {
      date: "2026-09-30",
      version: "0.10.1",
      notes: "Added a planet build queue that totals incremental Metal, Crystal, and Deuterium costs across multiple modeled Orion buildings and target levels."
    },
    {
      date: "2026-09-30",
      version: "0.10.0",
      notes: "Unified the calculator deck behind one selector and added an Intergalactic Recovery Center calculator with empire-wide bonus planning, while keeping its early-level cost curve explicitly provisional."
    },
    {
      date: "2026-09-30",
      version: "0.9.0",
      notes: "Closed the observed resource-to-Lithium conversion table (Metal 3:1, Crystal 2:1, Deuterium 1:1, Food 100:1), added level-60 10-vs-150-system scan evidence, and expanded high-level mission and multi-wave reward samples."
    },
    {
      date: "2026-09-30",
      version: "0.8.1",
      notes: "Recorded visible NPC fleet sizes for the level-11 PvP Small Pirate Encounter: 25 ships in waves 2 and 3, and 22 ships in wave 4."
    },
    {
      date: "2026-09-30",
      version: "0.8.0",
      notes: "Added combined-IAS-60 scan data, three delivery-mission samples, multi-wave PvP reward behavior, and a second 3:1 Metal conversion observation."
    },
    {
      date: "2026-09-30",
      version: "0.7.0",
      notes: "Moved both interactive calculators to a dedicated page and simplified the main briefing for faster scanning on mobile."
    },
    {
      date: "2026-09-30",
      version: "0.6.3",
      notes: "Extended the single-planet scanner calculator through level 100 and switched its construction-cost display to exact large-integer arithmetic."
    },
    {
      date: "2026-09-30",
      version: "0.6.2",
      notes: "Added the IAS level-35 build-time checkpoint of 1 minute 42 seconds and extended PTS cost-formula validation through level 35."
    },
    {
      date: "2026-09-30",
      version: "0.6.1",
      notes: "Expanded the cross-planet planner to combined IAS 1,000, made 350 the default target, and added exact large-integer cost math for extreme single-planet comparisons."
    },
    {
      date: "2026-09-30",
      version: "0.6.0",
      notes: "Added a cross-planet IAS planner that finds the lowest-cost balanced distribution for a target combined level and compares every usable planet count."
    },
    {
      date: "2026-09-30",
      version: "0.5.5",
      notes: "Added the IAS level-32 construction-time checkpoint: 37 seconds with Robotics Factory 15 and Nanite Factory 10."
    },
    {
      date: "2026-09-30",
      version: "0.5.4",
      notes: "Extended PTS validation of the scanner construction-cost calculator through IAS level 31. Build-time observations remain tracked separately."
    },
    {
      date: "2026-09-30",
      version: "0.5.3",
      notes: "Added the IAS level-30 construction-time checkpoint: 19 seconds with Robotics Factory 15 and Nanite Factory 10."
    },
    {
      date: "2026-09-30",
      version: "0.5.2",
      notes: "Added the next IAS construction-time checkpoint: the level 27 to 28 upgrade displays eight seconds with Robotics Factory 15 and Nanite Factory 10."
    },
    {
      date: "2026-09-30",
      version: "0.5.1",
      notes: "Marked the scanner construction-cost calculator as matching observed PTS costs through IAS level 20; higher levels remain formula projections."
    },
    {
      date: "2026-09-30",
      version: "0.5.0",
      notes: "Added an observed IAS construction sample: level 20 still displays a one-second build time with Robotics Factory 15 and Nanite Factory 10."
    },
    {
      date: "2026-09-30",
      version: "0.4.0",
      notes: "Added the cross-planet stacking rule: IAS levels from multiple planets combine for account-wide anomaly progression."
    },
    {
      date: "2026-09-30",
      version: "0.3.0",
      notes: "Added live PTS observations: Metal converts at an observed 3:1 rate, a level-16 ten-system scan cost 3,943 Lithium, and a level-10 Small Pirate Encounter sample."
    },
    {
      date: "2026-09-30",
      version: "0.2.0",
      notes: "Added Control Center progression from PTS UI evidence: seven anomaly-bonus buildings unlock at mission levels 50 through 350 in steps of 50."
    },
    {
      date: "2026-09-30",
      version: "0.1.0",
      notes: "Initial PTS briefing: Lithium, scanner formulas and level-60 costs, mission categories, rewards, and open questions."
    }
  ],

  sources: [
    { label: "Orion FAQ — OGame US Board", url: "https://board.us.ogame.gameforge.com/index.php?thread/108128-orion-faq/" },
    { label: "PTS: Projeto Orion — OGame PT Board", url: "https://forum.pt.ogame.gameforge.com/forum/thread/24285-pts-projeto-orion/" },
    { label: "PTS v13.0.0 announcement — OGame EN Board", url: "https://board.en.ogame.gameforge.com/index.php?postID=7277905&thread%2F856579-pts-version-13-0-0-singularity%2F=" }
  ]
};

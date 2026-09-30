window.ORION_DATA = {
  meta: {
    title: "Project Orion",
    subtitle: "Alliance field guide for OGame PTS v13.1.0",
    status: "PTS — subject to change",
    updated: "2026-09-30",
    revision: "0.9.0"
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
    controlCenter: {
      description: "The Control Center enables IAS upgrades and unlocks bonuses for anomaly missions.",
      unlockLevels: [50, 100, 150, 200, 250, 300, 350],
      unlockRule: "Complete a mission of the listed level to unlock the corresponding Control Center building."
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
      { icon: "⌬", name: "ACS co-op", detail: "Alliance members can contribute fleet value to supported missions." }
    ],
    rules: [
      "Activated missions are public: other players may take part, interfere, attack, or recycle.",
      "PvP variants award 2× rewards.",
      "On ACS missions, rewards are divided by each participant’s contributed fleet resource value.",
      "ACS participation is unavailable for missions that do not support ACS."
    ]
  },

  observations: [
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
    "Exact reward formulas, ranges, and caps",
    "General and Mecha modifier percentages",
    "Whether economy speed, score, fleet value, or universe age affects rewards",
    "Enemy fleet and defense scaling rules",
    "Which mechanics use the combined account-wide scanner level versus the local planet level",
    "IAS construction-time formula and whether the displayed one-second time is the global minimum",
    "Control Center building names and exact bonus effects"
  ],

  changelog: [
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

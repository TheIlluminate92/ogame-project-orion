window.ORION_DATA = {
  meta: {
    title: "Project Orion",
    subtitle: "Alliance field guide for OGame PTS v13.1.0",
    status: "PTS — subject to change",
    updated: "2026-09-30",
    revision: "0.4.0"
  },

  lithium: {
    description: "Lithium is the new anomaly resource. It fuels scans and reward claims and is produced by the Interstellar Anomaly Scanner.",
    confirmed: [
      "Convert Metal, Crystal, Deuterium, or Lifeform Food into Lithium.",
      "Lithium storage is unlimited.",
      "Lithium cannot be traded or stolen.",
      "Production stops when the selected source resource is depleted.",
      "Lithium is spent on anomaly scans and reward claims.",
      "Observed PTS Metal conversion at 100% workload: 4,830 Metal/hour → 1,610 Lithium/hour, a 3:1 ratio."
    ],
    converterUi: ["Selectable source resource", "Adjustable workload", "Cost and Lithium rates per hour", "Endless conversion mode", "Per-planet conversion overview"]
  },

  scanner: {
    name: "Interstellar Anomaly Scanner",
    fieldUse: "The scanner occupies one planet field; its Control Center sub-buildings use no additional fields.",
    stacking: "Interstellar Anomaly Scanner (IAS) levels stack across planets for account-wide anomaly progression.",
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
      { icon: "⇄", name: "Delivery", detail: "Peaceful transport and resource-delivery objectives." },
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
      label: "CONVERSION SAMPLE",
      title: "Metal → Lithium",
      metrics: ["100% workload", "4,830 Metal/hour", "1,610 Lithium/hour", "Observed ratio 3:1"],
      note: "The screenshot confirms this Metal rate at the shown scanner state; other source-resource ratios remain unconfirmed."
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
    }
  ],

  rewards: {
    types: ["Resources", "Ships", "Dark Matter", "Lifeform XP", "Artifacts", "Exclusive premium items"],
    confirmed: [
      "Claim after an individual wave or wait until the mission ends.",
      "The Lithium claim cost is split across mission waves.",
      "Partial reward claims are possible.",
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
    "Crystal, Deuterium, and Lifeform Food conversion ratios",
    "Whether the observed 3:1 Metal ratio changes with scanner level or other modifiers",
    "Exact scan and claim cost formulas",
    "Exact reward formulas, ranges, and caps",
    "General and Mecha modifier percentages",
    "Whether economy speed, score, fleet value, or universe age affects rewards",
    "Enemy fleet and defense scaling rules",
    "Which mechanics use the combined account-wide scanner level versus the local planet level",
    "Control Center building names and exact bonus effects"
  ],

  changelog: [
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

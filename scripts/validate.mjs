import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const required = [
  "index.html",
  "calculators.html",
  "AGENTS.md",
  "docs/CURRENT_STATE.md",
  "docs/ITERATIONS.md",
  "docs/PHONE_UPDATES.md",
  ".github/ISSUE_TEMPLATE/intel-report.md",
  "assets/styles.css",
  "assets/app.js",
  "assets/calculators.js",
  "data/orion-data.js",
  "downloads/Project_Orion_Alliance_Briefing.pdf"
];

for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing required file: ${file}`);
}

const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, "data/orion-data.js"), "utf8"), context);
const data = context.window.ORION_DATA;
if (!data?.meta?.updated || !data?.scanner?.baseCost) throw new Error("Orion data is incomplete");
const currentState = fs.readFileSync(path.join(root, "docs/CURRENT_STATE.md"), "utf8");
if (!currentState.includes(`Working revision: **${data.meta.revision}**`)) {
  throw new Error("docs/CURRENT_STATE.md does not match the data revision");
}

const costAt = (level) => {
  const scale = 1.4 ** (level - 1);
  return {
    metal: Math.floor(data.scanner.baseCost.metal * scale),
    crystal: Math.floor(data.scanner.baseCost.crystal * scale),
    deuterium: Math.floor(data.scanner.baseCost.deuterium * scale)
  };
};
const lithiumAt = (level) => Math.floor(200 * level * 1.1 ** level);
const cumulativeAt = (level) => {
  const sum = { metal: 0, crystal: 0, deuterium: 0 };
  for (let current = 1; current <= level; current += 1) {
    const cost = costAt(current);
    for (const resource of Object.keys(sum)) sum[resource] += cost[resource];
  }
  return sum;
};
const balancedLevels = (target, planets) => {
  const active = Math.min(target, planets);
  const base = Math.floor(target / active);
  const extra = target % active;
  return Array.from({ length: active }, (_, index) => base + (index < extra ? 1 : 0));
};
const exactCumulativeAt = (level) => {
  const sum = { metal: 0n, crystal: 0n, deuterium: 0n };
  let powerSeven = 1n;
  let powerFive = 1n;
  for (let current = 1; current <= level; current += 1) {
    if (current > 1) {
      powerSeven *= 7n;
      powerFive *= 5n;
    }
    sum.metal += BigInt(data.scanner.baseCost.metal) * powerSeven / powerFive;
    sum.crystal += BigInt(data.scanner.baseCost.crystal) * powerSeven / powerFive;
    sum.deuterium += BigInt(data.scanner.baseCost.deuterium) * powerSeven / powerFive;
  }
  return sum;
};
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

for (const example of data.scanner.examples) {
  if (lithiumAt(example.level) !== example.lithium) {
    throw new Error(`Lithium mismatch at level ${example.level}`);
  }
}
if (!same(costAt(60), data.scanner.level60.final)) throw new Error("Level 60 final cost mismatch");
if (!same(cumulativeAt(60), data.scanner.level60.cumulative)) throw new Error("Level 60 cumulative cost mismatch");
const exactLevel60 = exactCumulativeAt(60);
for (const resource of Object.keys(data.scanner.level60.cumulative)) {
  if (exactLevel60[resource] !== BigInt(data.scanner.level60.cumulative[resource])) {
    throw new Error(`Exact level 60 ${resource} mismatch`);
  }
}
const exactLevel100 = exactCumulativeAt(100);
if (exactLevel100.metal <= exactLevel60.metal || exactLevel100.crystal <= exactLevel60.crystal || exactLevel100.deuterium <= exactLevel60.deuterium) {
  throw new Error("Exact level 100 cumulative costs did not increase as expected");
}

for (let target = 1; target <= 1000; target += 1) {
  for (let planets = 1; planets <= 50; planets += 1) {
    const levels = balancedLevels(target, planets);
    const sum = levels.reduce((total, level) => total + level, 0);
    const spread = Math.max(...levels) - Math.min(...levels);
    if (sum !== target || spread > 1 || levels.length !== Math.min(target, planets)) {
      throw new Error(`Invalid network distribution for target ${target} across ${planets} planets`);
    }
  }
}

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const asset of ["assets/styles.css", "data/orion-data.js", "assets/app.js", "calculators.html"]) {
  if (!html.includes(asset)) throw new Error(`index.html does not reference ${asset}`);
}
const calculatorHtml = fs.readFileSync(path.join(root, "calculators.html"), "utf8");
for (const asset of ["assets/styles.css", "data/orion-data.js", "assets/calculators.js"]) {
  if (!calculatorHtml.includes(asset)) throw new Error(`calculators.html does not reference ${asset}`);
}
for (const id of ["level-input", "level-cost", "cumulative-cost", "target-ias", "available-planets", "planner-comparison", "control-building-level-input", "control-building-level-cost", "control-building-cumulative-cost", "queue-building-select", "queue-target-level", "queue-add-item", "queue-items", "queue-grand-total"]) {
  if (!calculatorHtml.includes(`id="${id}"`)) throw new Error(`calculators.html is missing #${id}`);
}

const calculatorJs = fs.readFileSync(path.join(root, "assets/calculators.js"), "utf8");
for (const requiredSnippet of ["addSelectedQueueItem", "syncQueueTargetLimits", "renderQueue()", "queue-building-select", "updateControlBuildingCalculator", '$("[data-level]")']) {
  if (!calculatorJs.includes(requiredSnippet)) throw new Error(`calculators.js is missing queue wiring: ${requiredSnippet}`);
}
if (calculatorJs.includes('addQueueItem("ias"')) {
  throw new Error("calculators.js still contains the retired queue initializer");
}

const controlBuildings = data.scanner.controlCenter?.buildings || {};
const expectedUnlocks = {
  intergalacticRecoveryCenter: 50,
  lithiumElectrolysisLab: 100,
  metalRecyclingUnit: 150,
  crystalFinishingStation: 200
};
for (const [key, level] of Object.entries(expectedUnlocks)) {
  const building = controlBuildings[key];
  if (!building || building.unlockMissionLevel !== level) {
    throw new Error(`${key} unlock level must match observed level ${level}`);
  }
  if (!data.scanner.controlCenter.unlockLevels.includes(level)) {
    throw new Error(`${key} unlock level is missing from Control Center progression`);
  }
}

console.log(`Project Orion site validation passed — revision ${data.meta.revision}, updated ${data.meta.updated}.`);

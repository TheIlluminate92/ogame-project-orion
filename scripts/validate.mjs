import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const required = [
  "index.html",
  "assets/styles.css",
  "assets/app.js",
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
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

for (const example of data.scanner.examples) {
  if (lithiumAt(example.level) !== example.lithium) {
    throw new Error(`Lithium mismatch at level ${example.level}`);
  }
}
if (!same(costAt(60), data.scanner.level60.final)) throw new Error("Level 60 final cost mismatch");
if (!same(cumulativeAt(60), data.scanner.level60.cumulative)) throw new Error("Level 60 cumulative cost mismatch");

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const asset of ["assets/styles.css", "data/orion-data.js", "assets/app.js"]) {
  if (!html.includes(asset)) throw new Error(`index.html does not reference ${asset}`);
}

console.log(`Project Orion site validation passed — revision ${data.meta.revision}, updated ${data.meta.updated}.`);

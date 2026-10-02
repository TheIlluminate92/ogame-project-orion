import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const database = JSON.parse(fs.readFileSync(path.join(root, "data/mission-roi-samples.json"), "utf8"));
const { metalEquivalentPerUnit: value, metalEquivalentPerLithium } = database.method;
const rangeArg = process.argv.find((argument) => argument.startsWith("--scan-range="));
const requestedRange = rangeArg ? Number(rangeArg.split("=")[1]) : null;
const samples = requestedRange === null
  ? database.samples
  : database.samples.filter((sample) => sample.scanRangeSystems === requestedRange);
const seenIds = new Set();

for (const sample of database.samples) {
  if (!sample.id || seenIds.has(sample.id)) throw new Error(`Missing or duplicate mission ID: ${sample.id}`);
  seenIds.add(sample.id);
  if (!Number.isInteger(sample.stars) || sample.stars < 1 || sample.stars > 5) throw new Error(`Invalid star count: ${sample.id}`);
  if (sample.scanRangeSystems !== null && (!Number.isInteger(sample.scanRangeSystems) || sample.scanRangeSystems < 1)) throw new Error(`Invalid scan range: ${sample.id}`);
  if (!Number.isInteger(sample.distance) || sample.distance < 1) throw new Error(`Invalid mission distance: ${sample.id}`);
  if (!Number.isFinite(sample.lithiumClaimCost.amount) || sample.lithiumClaimCost.amount <= 0) throw new Error(`Invalid Lithium claim cost: ${sample.id}`);
  for (const resource of ["metal", "crystal", "deuterium"]) {
    const amount = sample.resourceReward[resource];
    if (!Number.isInteger(amount) || amount < 0) throw new Error(`Invalid ${resource} reward: ${sample.id}`);
  }
  const lithiumReward = sample.resourceReward.lithium ?? 0;
  if (!Number.isInteger(lithiumReward) || lithiumReward < 0) throw new Error(`Invalid Lithium reward: ${sample.id}`);
}

const millions = (amount) => `${(amount / 1_000_000).toFixed(3)}M`;
const signedMillions = (amount) => `${amount >= 0 ? "+" : "−"}${millions(Math.abs(amount))}`;

console.log("| Mission | Stars | Mode | Level | Scan range | Distance | Reward MSU | Claim cost MSU | Benchmark spread MSU | Reward / cost |");
console.log("|---|---:|---|---:|---:|---:|---:|---:|---:|---:|");
for (const sample of samples) {
  const { metal, crystal, deuterium } = sample.resourceReward;
  const lithiumReward = sample.resourceReward.lithium ?? 0;
  const reward = metal * value.metal + crystal * value.crystal + deuterium * value.deuterium + lithiumReward * metalEquivalentPerLithium;
  const cost = sample.lithiumClaimCost.amount * metalEquivalentPerLithium;
  const approximate = sample.resourceReward.approximate || sample.lithiumClaimCost.rounded ? "≈" : "";
  const resourceOnlyUnpriced = reward === 0 && sample.nonResourceRewardsExcluded;
  console.log(`| ${sample.mission} (${sample.rewardBasis}) | ${"★".repeat(sample.stars)} | ${sample.mode} | ${sample.level} | ${sample.scanRangeSystems ?? "?"} systems | ${sample.distance} | ${approximate}${millions(reward)}${resourceOnlyUnpriced ? "*" : ""} | ${approximate}${millions(cost)} | ${resourceOnlyUnpriced ? "—" : `${approximate}${signedMillions(reward - cost)}`} | ${resourceOnlyUnpriced ? "—" : `${approximate}${(reward / cost).toFixed(2)}×`} |`);
}
console.log(`\n${samples.length} samples${requestedRange === null ? ` · ${database.samples.filter((sample) => sample.scanRangeSystems === 10).length} from 10-system scans · ${database.samples.filter((sample) => sample.scanRangeSystems === 50).length} from 50-system scans · ${database.samples.filter((sample) => sample.scanRangeSystems === 150).length} from 150-system scans · ${database.samples.filter((sample) => sample.scanRangeSystems === null).length} with unknown scan range` : ` from ${requestedRange}-system scans`}`);
if (samples.some((sample) => sample.nonResourceRewardsExcluded && sample.resourceReward.metal + sample.resourceReward.crystal + sample.resourceReward.deuterium + (sample.resourceReward.lithium ?? 0) === 0)) {
  console.log("* No resource reward is shown; a non-resource reward was excluded, so net and ratio are not comparable.");
}

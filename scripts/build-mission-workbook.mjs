import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";

const folder = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(folder, "..");
const previewDir = path.join(root, "outputs/mission-roi-research");
const runtimeRequire = createRequire(path.join(previewDir, "build-workbook.mjs"));
const { SpreadsheetFile, Workbook } = await import(pathToFileURL(runtimeRequire.resolve("@oai/artifact-tool")).href);
const db = JSON.parse(await fs.readFile(path.join(root, "data/mission-roi-samples.json"), "utf8"));
const outPath = path.join(root, "downloads/orion-mission-research.xlsx");
const wb = Workbook.create();
const overview = wb.worksheets.add("Overview");
const data = wb.worksheets.add("Mission Data");
const readme = wb.worksheets.add("How to Use");
const navy = "#17365D";
const blue = "#D9EAF7";
const lightGreen = "#E2F0D9";
const lightRed = "#FCE4D6";
const white = "#FFFFFF";
const dark = "#1F2937";

overview.showGridLines = false;
data.showGridLines = false;
readme.showGridLines = false;
overview.getRange("A1").values = [["Orion Mission Resource Research"]];
overview.getRange("A1:I1").format.font = { name: "Arial", size: 15, bold: true, color: navy };
overview.getRange("A2").values = [["Possible resource rewards have matched collected amounts in completed PTS tests so far. Ratios use 3:2:1 MSU values."]];
overview.getRange("A2:I2").format.font = { name: "Arial", size: 10, italic: true, color: dark };
overview.getRange("A4:I4").values = [["Scan reach (systems)", "Cards", "Comparable resource cards", "Above benchmark", "Below benchmark", "Lowest return / cost", "Highest return / cost", "Lowest spread (MSU)", "Highest spread (MSU)"]];
overview.getRange("A4:I4").format = { fill: navy, font: { name: "Arial", size: 10, bold: true, color: white }, wrapText: true, verticalAlignment: "center" };
overview.getRange("A5:A7").values = [[10], [50], [150]];
overview.getRange("A5:A7").format.numberFormat = "0";

const headers = [
  "Record ID", "Observed date", "Scan reach (systems)", "Source", "Mission", "Mode", "Stars", "Level", "Mission type", "Waves", "Duration (minutes)", "Mission distance", "Reward basis", "Metal reward", "Crystal reward", "Deuterium reward", "Lithium reward", "Reward is approximate", "Claim cost (Lithium)", "Claim cost is rounded", "Other rewards excluded", "Reward (MSU)", "Claim cost (MSU)", "Benchmark spread (MSU)", "Reward / cost", "Comparable resource value", "Above benchmark?", "Claim cost display / note"
];
const rows = db.samples.map((s, i) => {
  const row = i + 2;
  const r = s.resourceReward;
  return [s.id, new Date(`${s.observedDate}T00:00:00`), s.scanRangeSystems ?? "Unknown", s.sourceKind, s.mission, s.mode, s.stars, s.level, s.type, s.waves, s.durationMinutes, s.distance, s.rewardBasis, r.metal ?? 0, r.crystal ?? 0, r.deuterium ?? 0, r.lithium ?? 0, Boolean(r.approximate), s.lithiumClaimCost.amount, Boolean(s.lithiumClaimCost.rounded), Boolean(s.nonResourceRewardsExcluded), `=N${row}+1.5*O${row}+3*P${row}+3*Q${row}`, `=IF(S${row}="","",S${row}*3)`, `=IF(OR(Z${row}="No",W${row}=""),"",V${row}-W${row})`, `=IF(OR(Z${row}="No",W${row}=""),"",IFERROR(V${row}/W${row},0))`, `=IF(AND(U${row}=TRUE,V${row}=0),"No","Yes")`, `=IF(Z${row}="No","Not comparable",IF(X${row}="","Unknown cost",IF(X${row}>0,"Yes","No")))`, s.lithiumClaimCost.display];
});
data.getRangeByIndexes(0, 0, 1, headers.length).values = [headers];
data.getRangeByIndexes(1, 0, rows.length, headers.length).values = rows;
const last = rows.length + 1;
const dbTable = data.tables.add(`A1:AB${last}`, true, "MissionSamples");
dbTable.style = "TableStyleMedium2";
dbTable.showFilterButton = true;
data.freezePanes.freezeRows(1);
data.freezePanes.freezeColumns(5);
data.getRange(`A1:AB${last}`).format.font = { name: "Arial", size: 10, color: dark };
data.getRange("A1:AB1").format = { fill: navy, font: { name: "Arial", size: 10, bold: true, color: white }, wrapText: true, verticalAlignment: "center" };
data.getRange(`B2:B${last}`).format.numberFormat = "yyyy-mm-dd";
data.getRange(`C2:C${last}`).format.numberFormat = "0";
data.getRange(`G2:L${last}`).format.numberFormat = "#,##0";
data.getRange(`N2:Q${last}`).format.numberFormat = "#,##0";
data.getRange(`S2:S${last}`).format.numberFormat = "#,##0";
data.getRange(`V2:X${last}`).format.numberFormat = "#,##0;[Red](#,##0);-";
data.getRange(`Y2:Y${last}`).format.numberFormat = '0.00"x";(0.00"x");-';
data.getRange(`V2:AA${last}`).format.fill = lightGreen;
data.getRange(`X2:X${last}`).conditionalFormats.add("cellIs", { operator: "lessThan", formula: 0, format: { fill: lightRed, font: { color: "#9C0006" } } });
const widths = { A: 34, B: 13, C: 19, D: 22, E: 30, F: 10, G: 8, H: 9, I: 15, J: 9, K: 19, L: 17, M: 14, N: 17, O: 18, P: 20, Q: 17, R: 20, S: 21, T: 20, U: 22, V: 16, W: 18, X: 25, Y: 17, Z: 24, AA: 19, AB: 41 };
for (const [col, width] of Object.entries(widths)) data.getRange(`${col}:${col}`).format.columnWidth = width;
data.getRange(`A1:AB${last}`).format.verticalAlignment = "center";
data.getRange(`A1:AB1`).format.rowHeight = 40;

for (let row = 5; row <= 7; row++) {
  const reach = [10, 50, 150][row - 5];
  const cohort = db.samples.filter((sample) => sample.scanRangeSystems === reach);
  const results = cohort.map((sample) => {
    const r = sample.resourceReward;
    const reward = (r.metal ?? 0) + 1.5*(r.crystal ?? 0) + 3*(r.deuterium ?? 0) + 3*(r.lithium ?? 0);
    const comparable = !(sample.nonResourceRewardsExcluded && reward === 0);
    const cost = sample.lithiumClaimCost.amount === null ? null : sample.lithiumClaimCost.amount * 3;
    return { reward, cost, spread: cost === null ? null : reward - cost, ratio: cost === null || cost === 0 ? null : reward / cost, comparable };
  });
  const comparable = results.filter((item) => item.comparable);
  const priced = comparable.filter((item) => item.cost !== null);
  overview.getRange(`B${row}:I${row}`).values = [[
    cohort.length,
    comparable.length,
    priced.filter((item) => item.spread > 0).length,
    priced.filter((item) => item.spread < 0).length,
    Math.min(...priced.map((item) => item.ratio)),
    Math.max(...priced.map((item) => item.ratio)),
    Math.min(...priced.map((item) => item.spread)),
    Math.max(...priced.map((item) => item.spread)),
  ]];
}
overview.getRange("A5:I7").format.font = { name: "Arial", size: 10, color: dark };
overview.getRange("B5:E7").format.numberFormat = "#,##0";
overview.getRange("F5:G7").format.numberFormat = "0.00x";
overview.getRange("H5:I7").format.numberFormat = "#,##0.0,,\"M\";[Red](#,##0.0,,\"M\")";
overview.getRange("A5:I7").format.borders = { preset: "insideHorizontal", style: "thin", color: "#D9E2F3" };
overview.getRange("A9:B13").values = [
  ["Current coverage", "Value"],
  ["Total records", null],
  ["Possible-reward cards", null],
  ["Collected-reward records", null],
  ["Unknown scan reach", null]
];
overview.getRange("B10:B13").formulas = [[`=COUNTA('Mission Data'!$A$2:$A$1000)`], [`=COUNTIF('Mission Data'!$M$2:$M$1000,"possible")`], [`=COUNTIF('Mission Data'!$M$2:$M$1000,"collected")`], [`=COUNTIF('Mission Data'!$C$2:$C$1000,"Unknown")`]];
overview.getRange("A9:B9").format = { fill: navy, font: { name: "Arial", size: 10, bold: true, color: white } };
overview.getRange("A10:B13").format.font = { name: "Arial", size: 10, color: dark };
overview.getRange("B10:B13").format.numberFormat = "#,##0";
overview.getRange("A15").values = [["Interpretation"]];
overview.getRange("A15").format.font = { name: "Arial", size: 10, bold: true, color: navy };
overview.getRange("A16").values = [["Spread = reward MSU − Lithium cost valued at 3 MSU each. This is a comparison benchmark, not actual profit. Scan costs, time, fleet losses, player attacks on PvP missions, and non-resource rewards are excluded."]];
overview.getRange("A16:I17").merge();
overview.getRange("A16:I17").format = { font: { name: "Arial", size: 10, color: dark }, wrapText: true, verticalAlignment: "top" };
overview.getRange("A16:I17").format.rowHeight = 30;
overview.getRange("A19").values = [["Lithium sourcing"]];
overview.getRange("A19").format.font = { name: "Arial", size: 10, bold: true, color: navy };
overview.getRange("A20").values = [["3 MSU per Lithium is a comparison benchmark. Lithium made from surplus Food after population growth may have little marginal resource cost; conversion throughput and initial investment still matter."]];
overview.getRange("A20:I21").merge();
overview.getRange("A20:I21").format = { font: { name: "Arial", size: 10, color: dark }, wrapText: true, verticalAlignment: "top" };
overview.getRange("A20:I21").format.rowHeight = 30;
overview.getRange("A:A").format.columnWidth = 25;
overview.getRange("B:B").format.columnWidth = 17;
overview.getRange("C:E").format.columnWidth = 22;
overview.getRange("F:G").format.columnWidth = 22;
overview.getRange("H:I").format.columnWidth = 19;
overview.getRange("A4:I4").format.rowHeight = 34;

readme.getRange("A1").values = [["How to use the Orion mission dataset"]];
readme.getRange("A1").format.font = { name: "Arial", size: 15, bold: true, color: navy };
readme.getRange("A3:B9").values = [
  ["Field", "Meaning"],
  ["Scan reach", "Selected scanner reach in systems. Kept separate from mission-card Distance."],
  ["Possible vs collected", "Displayed possible resource rewards have matched collected amounts in completed PTS missions so far. Collected records come from a claim dialog."],
  ["Reward MSU", "Metal + 1.5 × Crystal + 3 × Deuterium + 3 × Lithium reward."],
  ["Claim cost MSU", "Lithium claim cost × 3 is a common comparison benchmark, based on the observed 3 Metal : 1 Lithium conversion and no CC discount."],
  ["Comparable resource value", "No means only a non-resource reward was shown, so resource-only ratio and net are not meaningful."],
  ["Data source", "The workbook is generated from data/mission-roi-samples.json in the Orion project. Keep record IDs unique when adding rows." ]
];
readme.getRange("A3:B3").format = { fill: navy, font: { name: "Arial", size: 10, bold: true, color: white } };
readme.getRange("A4:B9").format = { font: { name: "Arial", size: 10, color: dark }, wrapText: true, verticalAlignment: "top" };
readme.getRange("A:A").format.columnWidth = 25;
readme.getRange("B:B").format.columnWidth = 105;
readme.getRange("A4:B9").format.rowHeight = 35;
readme.getRange("A11").values = [["Research cautions"]];
readme.getRange("A11").format.font = { name: "Arial", size: 10, bold: true, color: navy };
readme.getRange("A12:B17").values = [
  ["Reach cohorts are not matched", "Different missions appear in each reach group, so do not infer that higher reach causes higher or lower rewards."],
  ["Distance and reach differ", "Distance is taken from the mission card. Scan reach is the selected setting."],
  ["Reward-to-cost is not total profit", "Scan costs, time, fleet losses including player attacks on PvP missions, and ships or special rewards are not priced."],
  ["Rounded observations", "Approximate card rewards and rounded claim costs are flagged in their source columns."],
  ["Obscured values", "If a screenshot hides part of a cost, the numeric field stays blank and the visible text is preserved in the Claim cost display / note column."],
  ["Surplus Food route", "After population growth, surplus Food may have little other use. Lithium made from it can cost less than the 3 MSU benchmark; conversion throughput and initial investment still matter."]
];
readme.getRange("A12:B17").format = { font: { name: "Arial", size: 10, color: dark }, wrapText: true, verticalAlignment: "top" };
readme.getRange("A12:B17").format.rowHeight = 34;

wb.recalculate();
const inspect = await wb.inspect({ kind: "table", range: "Overview!A4:I7", include: "values,formulas", tableMaxRows: 8, tableMaxCols: 10, maxChars: 4000 });
console.log(inspect.ndjson);
const errors = await wb.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!", options: { useRegex: true, maxResults: 100 }, summary: "formula error scan" });
console.log(errors.ndjson);
for (const sheetName of ["Overview", "Mission Data", "How to Use"]) {
  const png = await wb.render({ sheetName, autoCrop: "all", scale: 1, format: "png" });
  await fs.mkdir(previewDir, { recursive: true });
  await fs.writeFile(path.join(previewDir, `${sheetName.toLowerCase().replaceAll(" ", "-")}.png`), new Uint8Array(await png.arrayBuffer()));
}
const file = await SpreadsheetFile.exportXlsx(wb);
await file.save(outPath);
console.log(`Saved ${outPath}`);

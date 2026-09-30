(() => {
  "use strict";

  const data = window.ORION_DATA;
  const $ = (selector) => document.querySelector(selector);
  const format = new Intl.NumberFormat("en-US");
  const exactCumulativeCosts = [{ metal: 0n, crystal: 0n, deuterium: 0n }];
  let sevenPower = 1n;
  let fivePower = 1n;

  function resourceTotal(cost) {
    return cost.metal + cost.crystal + cost.deuterium;
  }

  function cumulativeCostExact(level) {
    while (exactCumulativeCosts.length <= level) {
      const currentLevel = exactCumulativeCosts.length;
      if (currentLevel > 1) {
        sevenPower *= 7n;
        fivePower *= 5n;
      }
      const previous = exactCumulativeCosts[currentLevel - 1];
      exactCumulativeCosts.push({
        metal: previous.metal + BigInt(data.scanner.baseCost.metal) * sevenPower / fivePower,
        crystal: previous.crystal + BigInt(data.scanner.baseCost.crystal) * sevenPower / fivePower,
        deuterium: previous.deuterium + BigInt(data.scanner.baseCost.deuterium) * sevenPower / fivePower
      });
    }
    return exactCumulativeCosts[level];
  }

  function costAtExact(level) {
    const cumulative = cumulativeCostExact(level);
    const previous = cumulativeCostExact(level - 1);
    return {
      metal: cumulative.metal - previous.metal,
      crystal: cumulative.crystal - previous.crystal,
      deuterium: cumulative.deuterium - previous.deuterium
    };
  }

  function lithiumAt(level) {
    return Math.floor(200 * level * Math.pow(1.1, level));
  }

  function costRows(cost) {
    return [["Metal", cost.metal], ["Crystal", cost.crystal], ["Deuterium", cost.deuterium], ["Total", resourceTotal(cost)]]
      .map(([name, value]) => `<div class="cost-row"><dt>${name}</dt><dd>${format.format(value)}</dd></div>`).join("");
  }

  function updateLevelCalculator(level) {
    $("#level-output").textContent = level;
    $("#lithium-hour").textContent = format.format(lithiumAt(level));
    $("#level-cost").innerHTML = costRows(costAtExact(level));
    $("#cumulative-cost").innerHTML = costRows(cumulativeCostExact(level));
    const status = $("#calculator-status");
    const checked = level <= data.scanner.costValidatedThrough;
    status.textContent = checked ? `PTS-CHECKED ≤ L${data.scanner.costValidatedThrough}` : `FORMULA PROJECTION > L${data.scanner.costValidatedThrough}`;
    status.classList.toggle("projection", !checked);
    document.querySelectorAll("[data-level]").forEach((button) => button.classList.toggle("active", Number(button.dataset.level) === level));
  }

  function addCosts(costs) {
    return costs.reduce((total, cost) => ({
      metal: total.metal + cost.metal,
      crystal: total.crystal + cost.crystal,
      deuterium: total.deuterium + cost.deuterium
    }), { metal: 0n, crystal: 0n, deuterium: 0n });
  }

  function percent(part, whole) {
    if (whole === 0n) return "0.00";
    const hundredths = part * 10000n / whole;
    return `${hundredths / 100n}.${(hundredths % 100n).toString().padStart(2, "0")}`;
  }

  function planNetwork(targetLevel, availablePlanets) {
    const activePlanets = Math.min(targetLevel, availablePlanets);
    const baseLevel = Math.floor(targetLevel / activePlanets);
    const extraLevels = targetLevel % activePlanets;
    const levels = Array.from({ length: activePlanets }, (_, index) => baseLevel + (index < extraLevels ? 1 : 0));
    return { activePlanets, levels, cost: addCosts(levels.map(cumulativeCostExact)) };
  }

  function distributionLabel(levels) {
    const groups = levels.reduce((counts, level) => {
      counts[level] = (counts[level] || 0) + 1;
      return counts;
    }, {});
    return Object.entries(groups).sort((a, b) => Number(b[0]) - Number(a[0])).map(([level, count]) => `${count}× IAS ${level}`).join(" + ");
  }

  function updateNetworkPlanner() {
    const targetInput = $("#target-ias");
    const planetsInput = $("#available-planets");
    const target = Math.max(1, Math.min(1000, Number.parseInt(targetInput.value, 10) || 1));
    const available = Math.max(1, Math.min(50, Number.parseInt(planetsInput.value, 10) || 1));
    targetInput.value = target;
    planetsInput.value = available;

    const plan = planNetwork(target, available);
    const single = cumulativeCostExact(target);
    const savings = { metal: single.metal - plan.cost.metal, crystal: single.crystal - plan.cost.crystal, deuterium: single.deuterium - plan.cost.deuterium };
    const total = resourceTotal(plan.cost);
    const totalSavings = resourceTotal(savings);
    const singleTotal = resourceTotal(single);

    $("#planner-distribution").textContent = distributionLabel(plan.levels);
    $("#planner-fields").textContent = `${plan.activePlanets} planet field${plan.activePlanets === 1 ? "" : "s"} used${available > plan.activePlanets ? ` · ${available - plan.activePlanets} unused` : ""}`;
    $("#planner-total").textContent = format.format(total);
    $("#planner-breakdown").textContent = `M ${format.format(plan.cost.metal)} · C ${format.format(plan.cost.crystal)} · D ${format.format(plan.cost.deuterium)}`;
    $("#planner-savings").textContent = format.format(totalSavings);
    $("#planner-savings-percent").textContent = `${percent(totalSavings, singleTotal)}% fewer resources`;

    const rows = [];
    for (let planets = 1; planets <= Math.min(available, target); planets += 1) {
      const option = planNetwork(target, planets);
      const optionTotal = resourceTotal(option.cost);
      const optionSavings = singleTotal - optionTotal;
      rows.push(`<tr${planets === plan.activePlanets ? ' class="selected"' : ""}><td>${planets}</td><td>${distributionLabel(option.levels)}</td><td>${format.format(optionTotal)}</td><td>${planets === 1 ? "—" : `${format.format(optionSavings)} (${percent(optionSavings, singleTotal)}%)`}</td></tr>`);
    }
    $("#planner-comparison").innerHTML = rows.join("");
  }

  $("#production-formula").textContent = data.scanner.productionFormula;
  $("#cost-formula").textContent = data.scanner.costFormula;
  const levelInput = $("#level-input");
  updateLevelCalculator(Number(levelInput.value));
  updateNetworkPlanner();
  levelInput.addEventListener("input", () => updateLevelCalculator(Number(levelInput.value)));
  $("#target-ias").addEventListener("input", updateNetworkPlanner);
  $("#available-planets").addEventListener("input", updateNetworkPlanner);
  document.querySelectorAll("[data-level]").forEach((button) => button.addEventListener("click", () => {
    levelInput.value = button.dataset.level;
    updateLevelCalculator(Number(button.dataset.level));
  }));
})();

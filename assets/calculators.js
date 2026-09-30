(() => {
  "use strict";

  const data = window.ORION_DATA;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const format = new Intl.NumberFormat("en-US");
  const exactCumulativeCosts = [{ metal: 0n, crystal: 0n, deuterium: 0n }];
  let sevenPower = 1n;
  let fivePower = 1n;

  const recovery = data.scanner.controlCenter.buildings.intergalacticRecoveryCenter;
  const recoveryCumulative = [{ metal: 0n, crystal: 0n, deuterium: 0n }];

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

  function recoveryCostAt(level) {
    let numerator = 1n;
    let denominator = 1n;
    for (let i = 1; i < level; i += 1) {
      numerator *= 3n;
      denominator *= 2n;
    }
    return {
      metal: BigInt(recovery.baseCost.metal) * numerator / denominator,
      crystal: BigInt(recovery.baseCost.crystal) * numerator / denominator,
      deuterium: BigInt(recovery.baseCost.deuterium) * numerator / denominator
    };
  }

  function recoveryCumulativeCost(level) {
    while (recoveryCumulative.length <= level) {
      const currentLevel = recoveryCumulative.length;
      const previous = recoveryCumulative[currentLevel - 1];
      const current = recoveryCostAt(currentLevel);
      recoveryCumulative.push({
        metal: previous.metal + current.metal,
        crystal: previous.crystal + current.crystal,
        deuterium: previous.deuterium + current.deuterium
      });
    }
    return recoveryCumulative[level];
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
    $$("[data-level]").forEach((button) => button.classList.toggle("active", Number(button.dataset.level) === level));
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

  function balancedLevels(targetLevel, availablePlanets, maxLocalLevel = Number.MAX_SAFE_INTEGER) {
    let activePlanets = Math.min(targetLevel, availablePlanets);
    if (Math.ceil(targetLevel / activePlanets) > maxLocalLevel) {
      activePlanets = Math.min(availablePlanets, Math.ceil(targetLevel / maxLocalLevel));
    }
    const baseLevel = Math.floor(targetLevel / activePlanets);
    const extraLevels = targetLevel % activePlanets;
    return Array.from({ length: activePlanets }, (_, index) => baseLevel + (index < extraLevels ? 1 : 0));
  }

  function planNetwork(targetLevel, availablePlanets) {
    const levels = balancedLevels(targetLevel, availablePlanets);
    return { activePlanets: levels.length, levels, cost: addCosts(levels.map(cumulativeCostExact)) };
  }

  function distributionLabel(levels, label = "IAS") {
    const groups = levels.reduce((counts, level) => {
      counts[level] = (counts[level] || 0) + 1;
      return counts;
    }, {});
    return Object.entries(groups).sort((a, b) => Number(b[0]) - Number(a[0])).map(([level, count]) => `${count}× ${label} ${level}`).join(" + ");
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

  function updateRecoveryLevel(level) {
    $("#recovery-level-output").textContent = level;
    $("#recovery-bonus").textContent = `${(level * recovery.bonusPerLevelPercent).toFixed(1)}%`;
    $("#recovery-level-cost").innerHTML = costRows(recoveryCostAt(level));
    $("#recovery-cumulative-cost").innerHTML = costRows(recoveryCumulativeCost(level));
  }

  function updateRecoveryPlanner() {
    const targetInput = $("#recovery-target-bonus");
    const planetsInput = $("#recovery-planets");
    const requestedBonus = Math.max(0.2, Math.min(150, Number.parseFloat(targetInput.value) || 0.2));
    const available = Math.max(1, Math.min(50, Number.parseInt(planetsInput.value, 10) || 1));
    const targetLevels = Math.max(1, Math.ceil((requestedBonus - 1e-9) / recovery.bonusPerLevelPercent));
    const maxLevels = available * recovery.maxObservedTechinfoLevel;
    const clampedLevels = Math.min(targetLevels, maxLevels);
    const levels = balancedLevels(clampedLevels, available, recovery.maxObservedTechinfoLevel);
    const cost = addCosts(levels.map(recoveryCumulativeCost));
    const totalBonus = clampedLevels * recovery.bonusPerLevelPercent;

    targetInput.value = requestedBonus.toFixed(1);
    planetsInput.value = available;
    $("#recovery-distribution").textContent = distributionLabel(levels, "L");
    $("#recovery-fields").textContent = `${levels.length} planet${levels.length === 1 ? "" : "s"} contributing · max modeled local level ${recovery.maxObservedTechinfoLevel}`;
    $("#recovery-total").textContent = format.format(resourceTotal(cost));
    $("#recovery-breakdown").textContent = `M ${format.format(cost.metal)} · C ${format.format(cost.crystal)} · D ${format.format(cost.deuterium)}`;
    $("#recovery-result-bonus").textContent = `${totalBonus.toFixed(1)}%`;
  }

  const summaries = {
    "ias-local": "Single-planet IAS cost and Lithium production.",
    "ias-network": "Cheapest balanced account-wide IAS distribution.",
    "recovery": "Intergalactic Recovery Center local cost and empire-wide ship-reward bonus planning."
  };

  function selectCalculator(value) {
    $$("[data-calculator-view]").forEach((section) => {
      section.hidden = section.dataset.calculatorView !== value;
    });
    $("#calculator-summary").textContent = summaries[value] || "";
  }

  $("#production-formula").textContent = data.scanner.productionFormula;
  $("#cost-formula").textContent = data.scanner.costFormula;

  const levelInput = $("#level-input");
  const recoveryLevelInput = $("#recovery-level-input");
  updateLevelCalculator(Number(levelInput.value));
  updateNetworkPlanner();
  updateRecoveryLevel(Number(recoveryLevelInput.value));
  updateRecoveryPlanner();

  levelInput.addEventListener("input", () => updateLevelCalculator(Number(levelInput.value)));
  $("#target-ias").addEventListener("input", updateNetworkPlanner);
  $("#available-planets").addEventListener("input", updateNetworkPlanner);
  recoveryLevelInput.addEventListener("input", () => updateRecoveryLevel(Number(recoveryLevelInput.value)));
  $("#recovery-target-bonus").addEventListener("input", updateRecoveryPlanner);
  $("#recovery-planets").addEventListener("input", updateRecoveryPlanner);
  $("#calculator-select").addEventListener("change", (event) => selectCalculator(event.target.value));

  $$("[data-level]").forEach((button) => button.addEventListener("click", () => {
    levelInput.value = button.dataset.level;
    updateLevelCalculator(Number(levelInput.value));
  }));

  selectCalculator($("#calculator-select").value);
})();

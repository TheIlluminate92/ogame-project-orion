(() => {
  "use strict";

  const data = window.ORION_DATA;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const format = new Intl.NumberFormat("en-US");
  const exactCumulativeCosts = [{ metal: 0n, crystal: 0n, deuterium: 0n }];
  let sevenPower = 1n;
  let fivePower = 1n;

  const controlBuildings = data.scanner.controlCenter.buildings;
  const recovery = controlBuildings.intergalacticRecoveryCenter;
  const controlCostCaches = new Map();

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

  function controlBuildingCostAt(building, level) {
    if (!building.baseCost) return null;
    let numerator = 1n;
    let denominator = 1n;
    for (let i = 1; i < level; i += 1) {
      numerator *= 3n;
      denominator *= 2n;
    }
    return {
      metal: BigInt(building.baseCost.metal) * numerator / denominator,
      crystal: BigInt(building.baseCost.crystal) * numerator / denominator,
      deuterium: BigInt(building.baseCost.deuterium) * numerator / denominator
    };
  }

  function controlBuildingCumulativeCost(building, level) {
    if (!building.baseCost) return null;
    if (!controlCostCaches.has(building.calculatorKey)) {
      controlCostCaches.set(building.calculatorKey, [{ metal: 0n, crystal: 0n, deuterium: 0n }]);
    }
    const cache = controlCostCaches.get(building.calculatorKey);
    while (cache.length <= level) {
      const currentLevel = cache.length;
      const previous = cache[currentLevel - 1];
      const current = controlBuildingCostAt(building, currentLevel);
      cache.push({
        metal: previous.metal + current.metal,
        crystal: previous.crystal + current.crystal,
        deuterium: previous.deuterium + current.deuterium
      });
    }
    return cache[level];
  }

  const recoveryCostAt = (level) => controlBuildingCostAt(recovery, level);
  const recoveryCumulativeCost = (level) => controlBuildingCumulativeCost(recovery, level);

  function lithiumAt(level) {
    return Math.floor(200 * level * Math.pow(1.1, level));
  }

  function costRows(cost) {
    return [["Metal", cost.metal], ["Crystal", cost.crystal], ["Deuterium", cost.deuterium], ["Total", resourceTotal(cost)]]
      .map(([name, value]) => `<div class="cost-row"><dt>${name}</dt><dd>${format.format(value)}</dd></div>`).join("");
  }

  function subtractCosts(total, previous) {
    if (!total || !previous) return null;
    return {
      metal: total.metal - previous.metal,
      crystal: total.crystal - previous.crystal,
      deuterium: total.deuterium - previous.deuterium
    };
  }

  function rangeCost(cumulative, start, target) {
    return subtractCosts(cumulative(target), cumulative(start));
  }

  function normalizeLevelRange(startInput, targetInput, changed = "target", minimum = 0, maximum = 100) {
    let start = Math.max(minimum, Math.min(maximum - 1, Number.parseInt(startInput.value, 10) || minimum));
    let target = Math.max(minimum + 1, Math.min(maximum, Number.parseInt(targetInput.value, 10) || minimum + 1));
    if (start >= target) {
      if (changed === "start") target = Math.min(maximum, start + 1);
      else start = Math.max(minimum, target - 1);
    }
    startInput.min = minimum;
    startInput.max = maximum - 1;
    targetInput.min = minimum + 1;
    targetInput.max = maximum;
    startInput.value = start;
    targetInput.value = target;
    return { start, target };
  }

  function updateDualRange(selector, start, target, minimum = 0, maximum = 100) {
    const range = $(selector);
    if (!range) return;
    const span = maximum - minimum;
    range.style.setProperty("--range-start", `${((start - minimum) / span) * 100}%`);
    range.style.setProperty("--range-end", `${((target - minimum) / span) * 100}%`);
  }

  function resourceBreakdown(cost) {
    return [["Metal", cost.metal], ["Crystal", cost.crystal], ["Deuterium", cost.deuterium]]
      .map(([name, value]) => `<span><b>${name}</b><em>${format.format(value)}</em></span>`).join("");
  }

  function updateLevelCalculator(changed = "target") {
    const { start, target } = normalizeLevelRange($("#level-start-input"), $("#level-input"), changed);
    $("#level-start-output").textContent = start;
    $("#level-output").textContent = target;
    $("#level-range-output").textContent = `${start} → ${target}`;
    $("#lithium-hour").textContent = format.format(lithiumAt(target));
    $("#level-cost").innerHTML = costRows(costAtExact(target));
    $("#cumulative-cost").innerHTML = costRows(rangeCost(cumulativeCostExact, start, target));
    $("#calculator-status").textContent = `L${start} → L${target}`;
    updateDualRange("#level-range", start, target);
    $$("[data-level]").forEach((button) => button.classList.toggle("active", Number(button.dataset.level) === target));
  }

  function addCosts(costs) {
    return costs.reduce((total, cost) => ({
      metal: total.metal + cost.metal,
      crystal: total.crystal + cost.crystal,
      deuterium: total.deuterium + cost.deuterium
    }), { metal: 0n, crystal: 0n, deuterium: 0n });
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
    const total = resourceTotal(plan.cost);

    $("#planner-distribution").textContent = distributionLabel(plan.levels);
    $("#planner-fields").textContent = `${plan.activePlanets} planet field${plan.activePlanets === 1 ? "" : "s"} used${available > plan.activePlanets ? ` · ${available - plan.activePlanets} unused` : ""}`;
    $("#planner-total").textContent = format.format(total);
    $("#planner-breakdown").innerHTML = resourceBreakdown(plan.cost);
  }

  function updateRecoveryLevel(changed = "target") {
    const { start, target } = normalizeLevelRange($("#recovery-level-start-input"), $("#recovery-level-input"), changed, 0, recovery.maxCalculatorLevel || 100);
    $("#recovery-level-start-output").textContent = start;
    $("#recovery-level-output").textContent = target;
    $("#recovery-level-range-output").textContent = `${start} → ${target}`;
    $("#recovery-bonus").textContent = `${(target * recovery.bonusPerLevelPercent).toFixed(1)}%`;
    $("#recovery-level-cost").innerHTML = costRows(recoveryCostAt(target));
    $("#recovery-cumulative-cost").innerHTML = costRows(rangeCost(recoveryCumulativeCost, start, target));
    updateDualRange("#recovery-level-range", start, target, 0, recovery.maxCalculatorLevel || 100);
  }

  function recoveryEmpireBonusPercent(levels) {
    const remaining = levels.reduce((product, level) => {
      const localBonus = Math.min(99.999, level * recovery.bonusPerLevelPercent) / 100;
      return product * (1 - localBonus);
    }, 1);
    return (1 - remaining) * 100;
  }

  function balancedRecoveryPlan(targetBonus, planets) {
    const maxLevels = planets * recovery.maxCalculatorLevel;
    for (let totalLevels = 1; totalLevels <= maxLevels; totalLevels += 1) {
      const levels = balancedLevels(totalLevels, planets, recovery.maxCalculatorLevel);
      const bonus = recoveryEmpireBonusPercent(levels);
      if (bonus + 1e-9 >= targetBonus) {
        return {
          levels,
          bonus,
          cost: addCosts(levels.map(recoveryCumulativeCost))
        };
      }
    }
    const levels = Array.from({ length: planets }, () => recovery.maxCalculatorLevel);
    return {
      levels,
      bonus: recoveryEmpireBonusPercent(levels),
      cost: addCosts(levels.map(recoveryCumulativeCost)),
      capped: true
    };
  }

  function updateRecoveryPlanner() {
    const targetInput = $("#recovery-target-bonus");
    const planetsInput = $("#recovery-planets");
    const requestedBonus = Math.max(0.2, Math.min(99.9, Number.parseFloat(targetInput.value) || 0.2));
    const available = Math.max(1, Math.min(50, Number.parseInt(planetsInput.value, 10) || 1));

    let best = null;
    for (let planets = 1; planets <= available; planets += 1) {
      const candidate = balancedRecoveryPlan(requestedBonus, planets);
      if (candidate.capped && candidate.bonus + 1e-9 < requestedBonus) continue;
      const candidateTotal = resourceTotal(candidate.cost);
      if (!best || candidateTotal < resourceTotal(best.cost)) {
        best = { ...candidate, planets };
      }
    }

    if (!best) {
      best = balancedRecoveryPlan(requestedBonus, available);
      best.planets = available;
    }

    targetInput.value = requestedBonus.toFixed(1);
    planetsInput.value = available;
    $("#recovery-distribution").textContent = distributionLabel(best.levels, "IRC");
    $("#recovery-fields").textContent = best.bonus + 1e-9 < requestedBonus
      ? `Target exceeds modeled capacity · max with ${available} planets shown`
      : `${best.levels.length} planet${best.levels.length === 1 ? "" : "s"} contributing · compared across 1–${available} available planets`;
    $("#recovery-total").textContent = format.format(resourceTotal(best.cost));
    $("#recovery-breakdown").textContent = `M ${format.format(best.cost.metal)} · C ${format.format(best.cost.crystal)} · D ${format.format(best.cost.deuterium)}`;
    $("#recovery-result-bonus").textContent = `${best.bonus.toFixed(2)}%`;
  }

  const controlCalculatorByKey = Object.fromEntries(
    Object.values(controlBuildings)
      .filter((building) => building.calculatorKey !== recovery.calculatorKey)
      .map((building) => [building.calculatorKey, building])
  );
  let activeControlBuildingKey = "lithiumLab";

  function updateControlBuildingCalculator(buildingKey = activeControlBuildingKey, changed = "target") {
    const building = controlCalculatorByKey[buildingKey];
    if (!building) return;
    activeControlBuildingKey = buildingKey;
    const maximum = building.maxCalculatorLevel || 100;
    const { start, target } = normalizeLevelRange(
      $("#control-building-level-start-input"),
      $("#control-building-level-input"),
      changed,
      0,
      maximum
    );

    $("#control-building-kicker").textContent = `CONTROL CENTER // LEVEL-${building.unlockMissionLevel} UNLOCK`;
    $("#control-building-name").textContent = building.name;
    $("#control-building-effect").textContent = building.effect;
    $("#control-building-unlock").textContent = `UNLOCK: COMPLETE A LEVEL-${building.unlockMissionLevel} MISSION`;
    $("#control-building-level-start-output").textContent = start;
    $("#control-building-level-output").textContent = target;
    $("#control-building-level-range-output").textContent = `${start} → ${target}`;
    const precision = building.bonusPerLevelPercent < 0.1 ? 2 : 1;
    $("#control-building-bonus-label").textContent = building.bonusLabel || `${building.bonusResource} mission reward bonus`;
    $("#control-building-bonus").textContent = `${(target * building.bonusPerLevelPercent).toFixed(precision)}%`;
    $("#control-building-bonus-context").textContent = building.bonusContext || "local building contribution";
    const levelCost = controlBuildingCostAt(building, target);
    const cumulativeCost = rangeCost((level) => controlBuildingCumulativeCost(building, level), start, target);
    const unavailable = '<div class="cost-row"><dt>Resource cost</dt><dd>Unknown</dd></div>';
    $("#control-building-level-cost").innerHTML = levelCost ? costRows(levelCost) : unavailable;
    $("#control-building-cumulative-cost").innerHTML = cumulativeCost ? costRows(cumulativeCost) : unavailable;
    $("#control-building-status").textContent = levelCost ? `L${start} → L${target}` : "COST UNKNOWN";
    $("#control-building-bonus-formula").textContent = `+${building.bonusPerLevelPercent}% × level`;
    $("#control-building-cost-formula").textContent = levelCost ? "Base × 1.5^(L − 1)" : "Construction cost unavailable";
    updateDualRange("#control-building-level-range", start, target, 0, maximum);
  }

  function scannerUpgradeCumulative(upgradeKey, target) {
    const upgrade = data.scanner.scannerUpgrades[upgradeKey];
    const zero = { metal: 0n, crystal: 0n, deuterium: 0n };
    if (target <= upgrade.defaultValue) return zero;
    const steps = upgrade.observedCosts
      .filter((step) => step.to <= target)
      .map((step) => ({
        metal: BigInt(step.metal),
        crystal: BigInt(step.crystal),
        deuterium: BigInt(step.deuterium)
      }));
    return addCosts(steps);
  }

  const queueCatalog = {
    ias: {
      label: "Interstellar Anomaly Scanner",
      shortLabel: "IAS",
      minTarget: 1,
      maxLevel: 100,
      baseLevel: 0,
      cumulative: cumulativeCostExact,
      validatedThrough: data.scanner.costValidatedThrough,
      validationMode: "formula"
    },
    recovery: {
      label: "Intergalactic Recovery Center",
      shortLabel: "IRC",
      minTarget: 1,
      maxLevel: recovery.maxCalculatorLevel || 100,
      baseLevel: 0,
      cumulative: recoveryCumulativeCost,
      validatedThrough: recovery.costValidatedThrough || 0,
      validationMode: "formula"
    },
    lithiumLab: {
      label: controlBuildings.lithiumElectrolysisLab.name,
      shortLabel: "LITHIUM LAB",
      minTarget: 1,
      maxLevel: controlBuildings.lithiumElectrolysisLab.maxCalculatorLevel,
      baseLevel: 0,
      cumulative: (target) => controlBuildingCumulativeCost(controlBuildings.lithiumElectrolysisLab, target),
      validationMode: "modeled",
      modelStatus: controlBuildings.lithiumElectrolysisLab.costModelStatus
    },
    metalRecycling: {
      label: controlBuildings.metalRecyclingUnit.name,
      shortLabel: "METAL UNIT",
      minTarget: 1,
      maxLevel: controlBuildings.metalRecyclingUnit.maxCalculatorLevel,
      baseLevel: 0,
      cumulative: (target) => controlBuildingCumulativeCost(controlBuildings.metalRecyclingUnit, target),
      validationMode: "modeled",
      modelStatus: controlBuildings.metalRecyclingUnit.costModelStatus
    },
    crystalFinishing: {
      label: controlBuildings.crystalFinishingStation.name,
      shortLabel: "CRYSTAL STATION",
      minTarget: 1,
      maxLevel: controlBuildings.crystalFinishingStation.maxCalculatorLevel,
      baseLevel: 0,
      cumulative: (target) => controlBuildingCumulativeCost(controlBuildings.crystalFinishingStation, target),
      validationMode: "modeled",
      modelStatus: controlBuildings.crystalFinishingStation.costModelStatus
    },
    anomalyAnalysis: {
      label: controlBuildings.anomalyAnalysisCenter.name,
      shortLabel: "ANOMALY ANALYSIS",
      minTarget: 1,
      maxLevel: controlBuildings.anomalyAnalysisCenter.maxCalculatorLevel,
      baseLevel: 0,
      cumulative: () => null,
      validationMode: "unknown",
      modelStatus: controlBuildings.anomalyAnalysisCenter.costModelStatus
    },
    deuteriumTanks: {
      label: controlBuildings.highPressureDeuteriumTanks.name,
      shortLabel: "DEUTERIUM TANKS",
      minTarget: 1,
      maxLevel: controlBuildings.highPressureDeuteriumTanks.maxCalculatorLevel,
      baseLevel: 0,
      cumulative: (target) => controlBuildingCumulativeCost(controlBuildings.highPressureDeuteriumTanks, target),
      validationMode: "modeled",
      modelStatus: controlBuildings.highPressureDeuteriumTanks.costModelStatus
    },
    catalyticConverter: {
      label: controlBuildings.catalyticConverter.name,
      shortLabel: "CATALYTIC CONVERTER",
      minTarget: 1,
      maxLevel: controlBuildings.catalyticConverter.maxCalculatorLevel,
      baseLevel: 0,
      cumulative: (target) => controlBuildingCumulativeCost(controlBuildings.catalyticConverter, target),
      validationMode: "modeled",
      modelStatus: controlBuildings.catalyticConverter.costModelStatus
    },
    discoveryLimit: {
      label: "Anomaly Discovery Limit",
      shortLabel: "DISCOVERY LIMIT",
      minTarget: data.scanner.scannerUpgrades.discoveryLimit.defaultValue + 1,
      maxLevel: Math.max(...data.scanner.scannerUpgrades.discoveryLimit.observedCosts.map((step) => step.to)),
      baseLevel: data.scanner.scannerUpgrades.discoveryLimit.defaultValue,
      cumulative: (target) => scannerUpgradeCumulative("discoveryLimit", target),
      validationMode: "observed"
    },
    maxResults: {
      label: "Max Results",
      shortLabel: "MAX RESULTS",
      minTarget: data.scanner.scannerUpgrades.maxResults.defaultValue + 1,
      maxLevel: Math.max(...data.scanner.scannerUpgrades.maxResults.observedCosts.map((step) => step.to)),
      baseLevel: data.scanner.scannerUpgrades.maxResults.defaultValue,
      cumulative: (target) => scannerUpgradeCumulative("maxResults", target),
      validationMode: "observed"
    }
  };

  let queueId = 0;
  let queueItems = [];

  function queueItemCost(item) {
    const building = queueCatalog[item.building];
    return rangeCost(building.cumulative, item.start, item.target);
  }

  function queueValidationLabel(item) {
    const building = queueCatalog[item.building];
    if (building.validationMode === "unknown") return "cost unknown · excluded from resource totals";
    return "calculated resource cost";
  }

  function queueRangeLabel(item) {
    return `L${item.start} → L${item.target}`;
  }

  function renderQueue() {
    const host = $("#queue-items");

    if (!queueItems.length) {
      host.innerHTML = '<p class="queue-empty">Queue is empty. Example: add IAS 35, IRC 25, Discovery Limit 5, and Max Results 4.</p>';
    } else {
      host.innerHTML = queueItems.map((item) => {
        const building = queueCatalog[item.building];
        const cost = queueItemCost(item);
        const costSummary = cost
          ? `<strong>${format.format(resourceTotal(cost))}</strong><small>M ${format.format(cost.metal)} · C ${format.format(cost.crystal)} · D ${format.format(cost.deuterium)}</small>`
          : '<strong>Unknown</strong><small>No construction-cost sample available</small>';
        return `<div class="queue-row queue-row-simple" data-queue-id="${item.id}">
          <div class="queue-name">
            <span>${building.shortLabel} · ${item.start} → ${item.target}</span>
            <strong>${building.label}</strong>
            <small>${queueValidationLabel(item)}</small>
          </div>
          <div class="queue-row-cost">
            <span>Cumulative ${queueRangeLabel(item)}</span>
            ${costSummary}
          </div>
          <button type="button" class="queue-remove" aria-label="Remove ${building.label} target ${item.target} from queue">×</button>
        </div>`;
      }).join("");

      $$(".queue-remove").forEach((button) => button.addEventListener("click", () => {
        const id = Number(button.closest(".queue-row").dataset.queueId);
        queueItems = queueItems.filter((candidate) => candidate.id !== id);
        renderQueue();
      }));
    }

    const grouped = new Map();
    queueItems.forEach((item) => {
      const key = item.building;
      const existing = grouped.get(key) || { cost: { metal: 0n, crystal: 0n, deuterium: 0n }, items: [], incomplete: false };
      const itemCost = queueItemCost(item);
      if (itemCost) existing.cost = addCosts([existing.cost, itemCost]);
      else existing.incomplete = true;
      existing.items.push(item);
      grouped.set(key, existing);
    });

    const buildingTotals = $("#queue-building-totals");
    if (!grouped.size) {
      buildingTotals.innerHTML = '<p class="queue-empty">No building totals yet.</p>';
    } else {
      buildingTotals.innerHTML = Array.from(grouped.entries()).map(([key, group]) => {
        const building = queueCatalog[key];
        const targets = group.items.map((item) => `${item.start}→${item.target}`).join(" + ");
        const totalLabel = group.incomplete ? "Unknown" : format.format(resourceTotal(group.cost));
        const breakdown = group.incomplete ? "No construction-cost sample available" : `M ${format.format(group.cost.metal)} · C ${format.format(group.cost.crystal)} · D ${format.format(group.cost.deuterium)}`;
        return `<div class="planner-result">
          <span>${building.shortLabel} · levels ${targets}</span>
          <strong>${totalLabel}</strong>
          <small>${breakdown}</small>
        </div>`;
      }).join("");
    }

    const knownCosts = queueItems.map(queueItemCost).filter(Boolean);
    const unknownCostCount = queueItems.length - knownCosts.length;
    const total = addCosts(knownCosts);
    $("#queue-grand-total").textContent = format.format(resourceTotal(total));
    $("#queue-total-breakdown").textContent = `M ${format.format(total.metal)} · C ${format.format(total.crystal)} · D ${format.format(total.deuterium)}${unknownCostCount ? ` · excludes ${unknownCostCount} unknown-cost item${unknownCostCount === 1 ? "" : "s"}` : ""}`;
    $("#queue-metal").textContent = format.format(total.metal);
    $("#queue-crystal").textContent = format.format(total.crystal);
    $("#queue-deuterium").textContent = format.format(total.deuterium);
  }

  function syncQueueTargetLimits() {
    const building = queueCatalog[$("#queue-building-select").value];
    const startInput = $("#queue-start-level");
    const targetInput = $("#queue-target-level");
    startInput.min = building.baseLevel;
    startInput.max = building.maxLevel - 1;
    targetInput.min = building.minTarget;
    targetInput.max = building.maxLevel;
    const start = Math.max(building.baseLevel, Math.min(building.maxLevel - 1, Number.parseInt(startInput.value, 10) || building.baseLevel));
    const requestedTarget = Number.parseInt(targetInput.value, 10) || building.minTarget;
    const target = Math.max(start + 1, building.minTarget, Math.min(building.maxLevel, requestedTarget));
    startInput.value = Math.min(start, target - 1);
    targetInput.value = target;
  }

  function addSelectedQueueItem() {
    const buildingKey = $("#queue-building-select").value;
    const building = queueCatalog[buildingKey];
    const startInput = $("#queue-start-level");
    const targetInput = $("#queue-target-level");
    const start = Math.max(building.baseLevel, Math.min(building.maxLevel - 1, Number.parseInt(startInput.value, 10) || building.baseLevel));
    const target = Math.max(start + 1, building.minTarget, Math.min(building.maxLevel, Number.parseInt(targetInput.value, 10) || building.minTarget));

    const existing = queueItems.find((item) => item.building === buildingKey);
    if (existing) {
      existing.start = start;
      existing.target = target;
    } else {
      queueId += 1;
      queueItems.push({ id: queueId, building: buildingKey, start, target });
    }
    startInput.value = start;
    targetInput.value = target;
    renderQueue();
  }

  const summaries = {
    "ias-local": "Single-planet IAS cost and Lithium production.",
    "ias-network": "Cheapest balanced account-wide IAS distribution.",
    "recovery": "Intergalactic Recovery Center local cost and empire-wide ship-reward planning.",
    "lithiumLab": "Lithium Electrolysis Lab level cost and Lithium mission-reward bonus.",
    "metalRecycling": "Metal Recycling Unit level cost and Metal mission-reward bonus.",
    "crystalFinishing": "Crystal Finishing Station level cost and Crystal mission-reward bonus.",
    "anomalyAnalysis": "Anomaly Analysis Center Dark Matter bonus; construction costs remain unknown.",
    "deuteriumTanks": "High-Pressure Deuterium Tanks level cost and Deuterium mission-reward bonus.",
    "catalyticConverter": "Catalytic Converter level cost and displayed Lithium conversion-cost reduction.",
    "build-queue": "Queue current-to-target Orion building levels and total the resources still needed."
  };

  function selectCalculator(value) {
    const isControlBuilding = Boolean(controlCalculatorByKey[value]);
    const view = isControlBuilding ? "control-building" : value;
    $$("[data-calculator-view]").forEach((section) => {
      section.hidden = section.dataset.calculatorView !== view;
    });
    if (isControlBuilding) updateControlBuildingCalculator(value);
    $("#calculator-summary").textContent = summaries[value] || "";
  }

  $("#production-formula").textContent = data.scanner.productionFormula;
  $("#cost-formula").textContent = data.scanner.costFormula;

  const levelStartInput = $("#level-start-input");
  const levelInput = $("#level-input");
  const recoveryLevelStartInput = $("#recovery-level-start-input");
  const recoveryLevelInput = $("#recovery-level-input");
  updateLevelCalculator();
  updateNetworkPlanner();
  updateRecoveryLevel();
  updateRecoveryPlanner();

  levelStartInput.addEventListener("input", () => updateLevelCalculator("start"));
  levelInput.addEventListener("input", () => updateLevelCalculator("target"));
  $("#target-ias").addEventListener("input", updateNetworkPlanner);
  $("#available-planets").addEventListener("input", updateNetworkPlanner);
  recoveryLevelStartInput.addEventListener("input", () => updateRecoveryLevel("start"));
  recoveryLevelInput.addEventListener("input", () => updateRecoveryLevel("target"));
  $("#control-building-level-start-input").addEventListener("input", () => updateControlBuildingCalculator(activeControlBuildingKey, "start"));
  $("#control-building-level-input").addEventListener("input", () => updateControlBuildingCalculator(activeControlBuildingKey, "target"));
  $("#recovery-target-bonus").addEventListener("input", updateRecoveryPlanner);
  $("#recovery-planets").addEventListener("input", updateRecoveryPlanner);
  $("#calculator-select").addEventListener("change", (event) => selectCalculator(event.target.value));
  $("#queue-building-select").addEventListener("change", () => {
    $("#queue-start-level").value = queueCatalog[$("#queue-building-select").value].baseLevel;
    syncQueueTargetLimits();
  });
  $("#queue-add-item").addEventListener("click", addSelectedQueueItem);
  $("#queue-start-level").addEventListener("input", syncQueueTargetLimits);
  $("#queue-start-level").addEventListener("keydown", (event) => {
    if (event.key === "Enter") addSelectedQueueItem();
  });
  $("#queue-target-level").addEventListener("keydown", (event) => {
    if (event.key === "Enter") addSelectedQueueItem();
  });
  $("#queue-clear").addEventListener("click", () => {
    queueItems = [];
    renderQueue();
  });

  $$("[data-level]").forEach((button) => button.addEventListener("click", () => {
    levelInput.value = button.dataset.level;
    updateLevelCalculator("target");
  }));

  syncQueueTargetLimits();
  renderQueue();
  const requestedCalc = new URLSearchParams(window.location.search).get("calc");
  if (requestedCalc && Array.from($("#calculator-select").options).some((option) => option.value === requestedCalc)) {
    $("#calculator-select").value = requestedCalc;
  }
  selectCalculator($("#calculator-select").value);
})();

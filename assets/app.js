(() => {
  "use strict";

  const data = window.ORION_DATA;
  const $ = (selector) => document.querySelector(selector);
  const format = new Intl.NumberFormat("en-US");

  function resourceTotal(cost) {
    return cost.metal + cost.crystal + cost.deuterium;
  }

  function costAt(level) {
    const scale = Math.pow(1.4, level - 1);
    return {
      metal: Math.floor(data.scanner.baseCost.metal * scale),
      crystal: Math.floor(data.scanner.baseCost.crystal * scale),
      deuterium: Math.floor(data.scanner.baseCost.deuterium * scale)
    };
  }

  function cumulativeCost(level) {
    const total = { metal: 0, crystal: 0, deuterium: 0 };
    for (let current = 1; current <= level; current += 1) {
      const cost = costAt(current);
      total.metal += cost.metal;
      total.crystal += cost.crystal;
      total.deuterium += cost.deuterium;
    }
    return total;
  }

  function lithiumAt(level) {
    return Math.floor(200 * level * Math.pow(1.1, level));
  }

  function costRows(cost) {
    return [
      ["Metal", cost.metal],
      ["Crystal", cost.crystal],
      ["Deuterium", cost.deuterium],
      ["Total", resourceTotal(cost)]
    ].map(([name, value]) => `<div class="cost-row"><dt>${name}</dt><dd>${format.format(value)}</dd></div>`).join("");
  }

  function updateCalculator(level) {
    $("#level-output").textContent = level;
    $("#lithium-hour").textContent = format.format(lithiumAt(level));
    $("#level-cost").innerHTML = costRows(costAt(level));
    $("#cumulative-cost").innerHTML = costRows(cumulativeCost(level));
    document.querySelectorAll("[data-level]").forEach((button) => {
      button.classList.toggle("active", Number(button.dataset.level) === level);
    });
  }

  function render() {
    $("#status-badge").textContent = data.meta.status;
    $("#updated-date").textContent = data.meta.updated;
    $("#updated-date").dateTime = data.meta.updated;
    $("#revision").textContent = data.meta.revision;

    $("#lithium-description").textContent = data.lithium.description;
    $("#lithium-cards").innerHTML = data.lithium.confirmed.map((item, index) => `
      <article class="fact-card">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <p>${item}</p>
      </article>`).join("");
    $("#converter-ui").innerHTML = data.lithium.converterUi.map((item) => `<span>${item}</span>`).join("");

    $("#scanner-fields").textContent = data.scanner.fieldUse;
    $("#scanner-stacking").textContent = data.scanner.stacking;
    $("#production-formula").textContent = data.scanner.productionFormula;
    $("#cost-formula").textContent = data.scanner.costFormula;
    $("#control-center-description").textContent = data.scanner.controlCenter.description;
    $("#unlock-rule").textContent = data.scanner.controlCenter.unlockRule;
    $("#milestone-track").innerHTML = data.scanner.controlCenter.unlockLevels.map((level, index) => `
      <div class="milestone">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <strong>${level}</strong>
        <small>mission level</small>
      </div>`).join("");

    $("#observation-grid").innerHTML = data.observations.map((observation) => `
      <article class="observation-card">
        <p class="micro">${observation.label}</p>
        <h3>${observation.title}</h3>
        <div class="observation-metrics">${observation.metrics.map((metric) => `<span>${metric}</span>`).join("")}</div>
        <p>${observation.note}</p>
      </article>`).join("");

    $("#mission-count").textContent = data.missions.officialCount;
    $("#mission-grid").innerHTML = data.missions.categories.map((mission) => `
      <article class="mission-card">
        <span aria-hidden="true">${mission.icon}</span>
        <h3>${mission.name}</h3>
        <p>${mission.detail}</p>
      </article>`).join("");
    $("#mission-rules").innerHTML = data.missions.rules.map((rule) => `<li>${rule}</li>`).join("");

    $("#reward-types").innerHTML = data.rewards.types.map((type) => `<span>${type}</span>`).join("");
    $("#reward-rules").innerHTML = data.rewards.confirmed.map((rule) => `<li>${rule}</li>`).join("");
    $("#scaling-list").innerHTML = data.rewards.scaling.map((item) => `
      <div class="scale-row ${item.known ? "known" : "unknown"}">
        <span>${item.factor}</span>
        <strong>${item.known ? "CONFIRMED" : "UNKNOWN"}</strong>
      </div>`).join("");

    $("#unknown-grid").innerHTML = data.unknowns.map((item, index) => `
      <article><span>Q${String(index + 1).padStart(2, "0")}</span><p>${item}</p></article>`).join("");

    $("#changelog").innerHTML = data.changelog.map((entry) => `
      <article class="change-entry">
        <time datetime="${entry.date}">${entry.date}</time>
        <div><strong>Revision ${entry.version}</strong><p>${entry.notes}</p></div>
      </article>`).join("");

    $("#sources").innerHTML = data.sources.map((source, index) => `
      <a href="${source.url}" target="_blank" rel="noopener noreferrer">
        <span>${String(index + 1).padStart(2, "0")}</span>${source.label}<b>↗</b>
      </a>`).join("");
  }

  render();
  const levelInput = $("#level-input");
  updateCalculator(Number(levelInput.value));
  levelInput.addEventListener("input", () => updateCalculator(Number(levelInput.value)));
  document.querySelectorAll("[data-level]").forEach((button) => {
    button.addEventListener("click", () => {
      levelInput.value = button.dataset.level;
      updateCalculator(Number(button.dataset.level));
    });
  });
})();

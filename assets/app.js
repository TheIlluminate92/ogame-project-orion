(() => {
  "use strict";

  const data = window.ORION_DATA;
  const $ = (selector) => document.querySelector(selector);

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
    $("#control-center-description").textContent = data.scanner.controlCenter.description;
    $("#unlock-rule").textContent = data.scanner.controlCenter.unlockRule;
    const controlBuildings = Object.values(data.scanner.controlCenter.buildings);
    $("#milestone-track").innerHTML = data.scanner.controlCenter.unlockLevels.map((level, index) => {
      const building = controlBuildings.find((candidate) => candidate.unlockMissionLevel === level);
      if (!building) {
        return `<div class="milestone locked">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <strong>${level}</strong>
          <small>details pending</small>
        </div>`;
      }
      return `<button type="button" class="milestone known" data-control-building="${building.calculatorKey}">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <b class="milestone-icon">${building.iconLabel || "?"}</b>
        <strong>${level}</strong>
        <small>${building.name}</small>
      </button>`;
    }).join("");

    const dialog = $("#control-building-dialog");
    const buildingByKey = Object.fromEntries(controlBuildings.map((building) => [building.calculatorKey, building]));
    document.querySelectorAll("[data-control-building]").forEach((button) => button.addEventListener("click", () => {
      const building = buildingByKey[button.dataset.controlBuilding];
      if (!building) return;
      $("#control-building-dialog-icon").textContent = building.iconLabel || "?";
      $("#control-building-dialog-unlock").textContent = `LEVEL ${building.unlockMissionLevel} MISSION UNLOCK`;
      $("#control-building-dialog-name").textContent = building.name;
      $("#control-building-dialog-effect").textContent = building.effect;
      const precision = building.bonusPerLevelPercent < 0.1 ? 2 : 1;
      $("#control-building-dialog-bonus").textContent = `+${building.bonusPerLevelPercent.toFixed(precision)}% ${building.bonusResource || ""}`;
      $("#control-building-dialog-cost").textContent = building.baseCost
        ? `M ${building.baseCost.metal.toLocaleString()} · C ${building.baseCost.crystal.toLocaleString()} · D ${building.baseCost.deuterium.toLocaleString()}`
        : "Unknown";
      $("#control-building-dialog-status").textContent = [building.baseCostStatus, building.costModelStatus, building.empireStackingStatus].filter(Boolean).join(" ");
      $("#control-building-dialog-calc").href = `calculators.html?calc=${encodeURIComponent(building.calculatorKey)}`;
      if (typeof dialog.showModal === "function") dialog.showModal();
    }));
    $("#control-building-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });

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
})();

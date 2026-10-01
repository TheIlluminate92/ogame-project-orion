(() => {
  "use strict";

  const data = window.ORION_DATA;
  const $ = (selector) => document.querySelector(selector);
  const setText = (selector, value) => {
    const element = $(selector);
    if (element) element.textContent = value;
  };
  const setHtml = (selector, value) => {
    const element = $(selector);
    if (element) element.innerHTML = value;
  };
  const formatNumber = (value) => Number(value).toLocaleString();
  const formatCost = (cost) => cost
    ? `M ${formatNumber(cost.metal)} · C ${formatNumber(cost.crystal)} · D ${formatNumber(cost.deuterium)}`
    : "Unknown";
  const bonusText = (building) => {
    const precision = building.bonusPerLevelPercent < 0.1 ? 2 : 1;
    return `+${building.bonusPerLevelPercent.toFixed(precision)}% ${building.bonusResource || ""}`;
  };

  function renderMeta() {
    setText("#status-badge", data.meta.status);
    setText("#revision", data.meta.revision);
    const updated = $("#updated-date");
    if (updated) {
      updated.textContent = data.meta.updated;
      updated.dateTime = data.meta.updated;
    }
  }

  function renderOverview() {
    setText("#project-summary", data.project.summary);
    setText("#first-goal", data.project.firstGoal);
    setHtml("#project-loop", data.project.loop.map((item, index) => `
      <article class="journey-card"><span>${String(index + 1).padStart(2, "0")}</span><p>${item}</p></article>`).join(""));
    setText("#lithium-description", data.lithium.description);
    setHtml("#lithium-cards", data.lithium.confirmed.map((item, index) => `
      <article class="fact-card"><span>${String(index + 1).padStart(2, "0")}</span><p>${item}</p></article>`).join(""));
    setHtml("#converter-ui", data.lithium.converterUi.map((item) => `<span>${item}</span>`).join(""));
  }

  function renderScannerBasics() {
    setText("#scanner-role", data.scanner.role);
    setText("#scanner-fields", data.scanner.fieldUse);
    setText("#scanner-stacking", data.scanner.stacking);
    setText("#scanner-production-formula", data.scanner.productionFormula);
    setText("#scanner-cost-formula", data.scanner.costFormula);
    setText("#scanner-lore-status", data.scanner.lore || data.scanner.loreStatus);
    setHtml("#scanner-mechanics", Object.values(data.scanner.mechanics).map((mechanic) => `<p>${mechanic}</p>`).join(""));
  }

  function renderControlCenter() {
    const track = $("#milestone-track");
    if (!track) return;
    const buildings = Object.values(data.scanner.controlCenter.buildings);
    const buildingByKey = Object.fromEntries(buildings.map((building) => [building.calculatorKey, building]));

    setText("#control-center-description", data.scanner.controlCenter.description);
    setText("#unlock-rule", data.scanner.controlCenter.unlockRule);
    track.innerHTML = data.scanner.controlCenter.unlockLevels.map((level, index) => {
      const building = buildings.find((candidate) => candidate.unlockMissionLevel === level);
      const icon = building.iconImage
        ? `<img class="milestone-icon milestone-icon-image" src="${building.iconImage}" alt="">`
        : `<b class="milestone-icon">${building.iconLabel || "?"}</b>`;
      return `<button type="button" class="milestone known" data-control-building="${building.calculatorKey}">
        <span>${String(index + 1).padStart(2, "0")}</span>${icon}<strong>${level}</strong><small>${building.name}</small>
      </button>`;
    }).join("");

    setHtml("#milestone-table-body", buildings.map((building) => `
      <tr>
        <td><strong>L${building.unlockMissionLevel}</strong></td>
        <td><a href="calculators.html?calc=${encodeURIComponent(building.calculatorKey)}">${building.name}</a></td>
        <td>${building.effect}</td>
        <td>${bonusText(building)}</td>
        <td>${formatCost(building.baseCost)}</td>
        <td>${building.baseCostStatus}</td>
      </tr>`).join(""));

    const dialog = $("#control-building-dialog");
    if (!dialog) return;
    document.querySelectorAll("[data-control-building]").forEach((button) => button.addEventListener("click", () => {
      const building = buildingByKey[button.dataset.controlBuilding];
      if (!building) return;
      $("#control-building-dialog-icon").innerHTML = building.iconImage ? `<img src="${building.iconImage}" alt="">` : building.iconLabel || "?";
      setText("#control-building-dialog-unlock", `LEVEL ${building.unlockMissionLevel} MISSION UNLOCK`);
      setText("#control-building-dialog-name", building.name);
      setText("#control-building-dialog-lore", building.lore);
      setText("#control-building-dialog-effect", building.effect);
      setText("#control-building-dialog-bonus", bonusText(building));
      setText("#control-building-dialog-cost", formatCost(building.baseCost));
      setText("#control-building-dialog-status", [building.baseCostStatus, building.costModelStatus, building.empireStackingStatus].filter(Boolean).join(" "));
      $("#control-building-dialog-calc").href = `calculators.html?calc=${encodeURIComponent(building.calculatorKey)}`;
      if (typeof dialog.showModal === "function") dialog.showModal();
    }));
    $("#control-building-close")?.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  }

  function renderCapacity() {
    const host = $("#capacity-grid");
    if (!host) return;
    host.innerHTML = Object.values(data.scanner.scannerUpgrades).map((upgrade) => `
      <article class="panel capacity-card">
        <p class="micro">DEFAULT ${upgrade.defaultValue}</p><h3>${upgrade.name}</h3>
        <div>${upgrade.observedCosts.map((cost) => `<p><strong>${cost.from} → ${cost.to}</strong><span>M ${formatNumber(cost.metal)} · C ${formatNumber(cost.crystal)} · D ${formatNumber(cost.deuterium)}</span></p>`).join("")}</div>
      </article>`).join("");
  }

  function renderMissions() {
    setText("#mission-count", data.missions.officialCount);
    setHtml("#mission-grid", data.missions.categories.map((mission) => `
      <article class="mission-card"><span aria-hidden="true">${mission.icon}</span><h3>${mission.name}</h3><p>${mission.detail}</p></article>`).join(""));
    setHtml("#mission-rules", data.missions.rules.map((rule) => `<li>${rule}</li>`).join(""));
  }

  function renderResearch() {
    setHtml("#research-grid", data.researchTasks.map((task, index) => `
      <article class="research-card"><span>Q${String(index + 1).padStart(2, "0")}</span><div><h3>${task.question}</h3><p><strong>How to help:</strong> ${task.help}</p></div></article>`).join(""));
  }

  function renderAbout() {
    const renderEntries = (entries) => entries.map((entry) => `
      <article class="change-entry"><time datetime="${entry.date}">${entry.date}</time><div><strong>Revision ${entry.version}</strong><p>${entry.notes}</p></div></article>`).join("");
    const recent = data.changelog.slice(0, 5);
    const archive = data.changelog.slice(5);
    setHtml("#changelog", `${renderEntries(recent)}${archive.length ? `
      <details class="changelog-archive">
        <summary>Show ${archive.length} earlier revisions</summary>
        <div>${renderEntries(archive)}</div>
      </details>` : ""}`);
    setHtml("#sources", data.sources.map((source, index) => `
      <a href="${source.url}" target="_blank" rel="noopener noreferrer"><span>${String(index + 1).padStart(2, "0")}</span>${source.label}<b>↗</b></a>`).join(""));
  }

  renderMeta();
  renderOverview();
  renderScannerBasics();
  renderControlCenter();
  renderCapacity();
  renderMissions();
  renderResearch();
  renderAbout();
})();

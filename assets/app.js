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
})();

# Skie Field Manual: evidence and design

Version 1.0.0, prepared 8 November 2026.

## Editorial structure

The site is a series of learning guides, not a recruitment landing page. The design takes principles, not copied page designs, from:

- Diátaxis tutorials: practical activities with clear learning goals and checks. https://diataxis.fr/tutorials/
- MDN's introductory learning module: prerequisites, an ordered path and connected lessons. https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website
- USWDS in-page navigation: readable long pages with a stable contents menu. https://designsystem.digital.gov/components/in-page-navigation/
- W3C G64: contents links that match the sequence and targets of the document. https://www.w3.org/WAI/WCAG22/Techniques/general/G64

## Mechanics and calculations

Each lesson lists its sources. Official administrator guides from October 2026 support expedition and colonization details. Older official forum references support long-standing building, research, energy and fleet-safety mechanics; their age is disclosed. Community explanations are identified rather than silently treated as official announcements.

Energy calculations use the published unmodified Solar Plant, Fusion Reactor and Energy Technology formulas. The table is full-output and no-bonus; fuel is shown at economy ×1 and ×8. Energy is rounded down and fuel up for display; live rounding can differ by one unit. The comparison is not an equal-cost analysis. Technology investment, operating fuel, satellite vulnerability, temperature and fields are all part of the decision.

Crawler examples separate owned count, allowed working count and production ceiling. Worked rows exclude Lifeform modifiers. Collector Enhancement can change the working-capacity bonus. The 50% production-cap reference includes the official July 2026 PTS changelog and is not presented as a newly measured live-universe limit. A third-party calculator discussion with untested cap assumptions was not used as validation.

Colony tables identify base field ranges, maximum-temperature ranges and position bonuses. They exclude class, universe, item and Lifeform field adjustments. Position bonuses act on the production base before subsequent production modifiers. The fields example uses the official 2026 colonization guide rather than multiplying rounded field values.

General planning lessons were reconciled against earlier user discussions, but earlier assistant calculations were not treated as authoritative. Only generalizable concepts were retained. Private account numbers, coordinates, planet names, screenshots, schedules and conversation links are not published.

## Orion boundary

The archive is pinned to Project Orion guide 0.19.6, 11 October 2026, commit `56a951bbeca850d00ff1ccca106b05475daa7fb3`, representing PTS v13.1.0 beta13. The retained IAS model uses exact rational 3/2 scaling with each component floored at each level. Its level-60 total is tested against the repository's recorded projection, not claimed as a new observation.

The later beta15 storage limit, beta16 Lithium reward change and beta17 ship-reward rebalance are flagged before the calculator. The old unlimited-storage statement is explicitly superseded. No universal Lithium-income calculator is included. All existing Orion files outside `/skie/` are preserved unchanged.

## Publication scope

Only `/skie/` website files are changed. No credentials, repository visibility, Discord invite or user account state is modified. The alliance-cooperation section intentionally does not invent mechanics or operating procedures.

## Legacy URL migration · 10 November 2026

The 17 legacy HTML entry points now forward to the matching pages at https://skie.wazserver.org/. Query strings and section fragments are preserved with JavaScript; canonical and no-JavaScript fallbacks use the fixed matching page. The redirect-only build replaces the retired lesson build. Original source data, assets, text downloads, and the MIT notice remain unchanged. No Orion file outside `/skie/` is changed.

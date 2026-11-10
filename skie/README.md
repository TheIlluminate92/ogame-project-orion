# Legacy SKIE redirects

The SKIE Field Manual now lives at https://skie.wazserver.org/. This folder retains the 17 original HTML entry points solely to forward existing links to their matching pages. The legacy index forwards to the new site root.

JavaScript uses `location.replace` so Back does not loop through the old page, and preserves the query string and fragment exactly. Each page uses a fixed, allowlisted destination; URL parameters cannot choose another host. Canonical URLs and a no-JavaScript meta refresh point to the matching page, with a visible keyboard-accessible fallback link. Static no-JavaScript redirects cannot dynamically copy query strings or bookmarks.

## Build and validate

With modern Node.js, no dependencies are needed:

    node scripts/build.mjs

Copy the generated files from `dist/` into this `skie/` folder, preserving `scripts/` and the other retained files, then run:

    node scripts/test.mjs

The build only generates redirects and copies license/provenance notices. It no longer regenerates old lesson content from `data/content.json`. `build-manifest.json` lists the current generated output. Do not commit `dist/`, change Orion's root files, or copy this output into the repository root: GitHub Pages publishes `main` directly from the repository root, with SKIE under `/skie/`.

Legacy assets, source data, and text downloads remain unchanged and unlinked for compatibility. GitHub Pages cannot configure HTTP 301/308 redirects for these files; direct download links continue to serve their retained contents. These HTML redirects are client-side redirects, not HTTP redirects. This change does not modify Orion's root 404 page or other Orion content.

## License and provenance

`LICENSE-ORION` and the original history in `PROVENANCE.md` remain preserved. OGame and its trademarks belong to their respective owners. This is an independent alliance guide.

import {readFile, writeFile, mkdir, copyFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const origin = 'https://skie.wazserver.org';
// Explicit legacy page allowlist. Never derive a destination from user input.
export const pages = Object.freeze([
  'index.html', 'alliance.html', 'cooperation.html', 'glossary.html',
  'guide-building.html', 'guide-colonization.html', 'guide-crawlers.html',
  'guide-energy.html', 'guide-expeditions.html', 'guide-fleetsaving.html',
  'guide-lifeforms.html', 'guide-orion.html', 'guide-path-expedition.html',
  'guide-path-fleet.html', 'guide-path-miner.html', 'guide-research.html',
  'guide-starter.html'
]);
export function destination(page) {
  if (!pages.includes(page)) throw new Error('Unknown legacy SKIE page');
  return origin + '/' + (page === 'index.html' ? '' : page);
}
export function render(page) {
  const url = destination(page);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>SKIE Field Manual has moved</title>
  <meta name="description" content="The SKIE Field Manual has moved to skie.wazserver.org.">
  <link rel="canonical" href="${url}">
  <noscript><meta http-equiv="refresh" content="0; url=${url}"></noscript>
  <style>
    :root { color-scheme: dark; font-family: system-ui, sans-serif; }
    body { margin: 0; background: #0b141b; color: #ecf4f7; line-height: 1.6; }
    main { max-width: 38rem; margin: 12vh auto; padding: 1.5rem; }
    h1 { line-height: 1.2; font-size: clamp(1.8rem, 6vw, 2.5rem); }
    a { color: #9de4ee; text-underline-offset: .2em; overflow-wrap: anywhere; }
    a:focus-visible { outline: 3px solid #ffe09a; outline-offset: 4px; }
  </style>
</head>
<body>
  <main>
    <h1>SKIE Field Manual has moved</h1>
    <p>The guides now live at skie.wazserver.org. You are being taken to the matching page.</p>
    <p><a id="destination" href="${url}">Continue to the SKIE Field Manual</a></p>
    <noscript><p>If you are not redirected, follow the link above. Without JavaScript, query parameters and section bookmarks may need to be selected again.</p></noscript>
  </main>
  <script>
    (() => {
      const target = ${JSON.stringify(url)} + window.location.search + window.location.hash;
      document.getElementById('destination').href = target;
      window.location.replace(target);
    })();
  </script>
</body>
</html>
`;
}
export async function build() {
  const dist = path.join(root, 'dist');
  await mkdir(dist, {recursive: true});
  for (const page of pages) await writeFile(path.join(dist, page), render(page));
  for (const file of ['LICENSE-ORION', 'PROVENANCE.md']) {
    await copyFile(path.join(root, file), path.join(dist, file));
  }
  const manifest = {version: '1.0.1', kind: 'legacy-redirects', destination: origin + '/', files: [...pages, 'LICENSE-ORION', 'PROVENANCE.md']};
  await writeFile(path.join(dist, 'build-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Built ${pages.length} SKIE redirect pages in dist/. Copy these files into skie/ for publication; do not replace the Orion root.`);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();

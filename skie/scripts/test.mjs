import assert from 'node:assert/strict';
import {readFile, readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import {pages, destination, render, origin} from './build.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
assert.equal(new Set(pages).size, 17);
for (const invalid of ['../index.html', '//evil.example/', 'https://evil.example/', 'guide-unknown.html', 'index.html?next=https://evil.example', '%2e%2e/index.html', '']) {
  assert.throws(() => destination(invalid), /Unknown legacy/);
}
const cases = [
  ['', ''], ['?q=fleet&sort=asc', '#fleetsaving'],
  ['?next=https://evil.example/&x=%3Cscript%3E', '#//evil.example/'],
  ['?q=%E2%98%85+fleet&x=1&x=2', '#research%20costs'],
  ['', '#energy'], ['?q=test', '']
];
for (const folder of [root, path.join(root, 'dist')]) {
  const actualPages = (await readdir(folder)).filter(name => name.endsWith('.html')).sort();
  assert.deepEqual(actualPages, [...pages].sort(), 'No missing or unexpected HTML entry points');
  for (const page of pages) {
    const html = await readFile(path.join(folder, page), 'utf8');
    assert.equal(html, render(page), `Generated page drift: ${page}`);
    const base = destination(page);
    assert.ok(html.includes(`<link rel="canonical" href="${base}">`));
    assert.ok(html.includes(`<noscript><meta http-equiv="refresh" content="0; url=${base}"></noscript>`));
    assert.ok(html.includes(`<a id="destination" href="${base}">`));
    assert.ok(html.includes('<html lang="en">') && html.includes('<main>') && html.includes('<h1>'));
    assert.ok(!/\b(?:src|href)="(?:assets|data|downloads)\//.test(html), 'No stale dependencies');
    const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
    assert.equal(scripts.length, 1);
    for (const [search, hash] of cases) {
      let replacement;
      const link = {};
      vm.runInNewContext(scripts[0][1], {
        window: {location: {search, hash, replace(value) { replacement = value; }}},
        document: {getElementById(id) { assert.equal(id, 'destination'); return link; }}
      });
      assert.equal(replacement, base + search + hash, 'Exact page/query/hash preservation');
      assert.equal(link.href, replacement);
      assert.equal(new URL(replacement).origin, origin, 'Query/fragment cannot change destination origin');
    }
  }
}
const manifest = JSON.parse(await readFile(path.join(root, 'build-manifest.json'), 'utf8'));
assert.deepEqual(manifest, JSON.parse(await readFile(path.join(root, 'dist/build-manifest.json'), 'utf8')));
assert.deepEqual(manifest.files.filter(name => name.endsWith('.html')).sort(), [...pages].sort());
console.log(`PASS: ${pages.length} pages in published + dist output; 204 redirect scenarios; 7 unsafe paths rejected; canonical/no-JS/accessible links checked.`);

# Continuing from a phone or another computer

## Fast phone workflow

For a small factual update:

1. Open the repository on GitHub.
2. Open `data/orion-data.js` and choose **Edit**.
3. Change only the relevant observation or fact.
4. Update `meta.updated` and increment `meta.revision`.
5. Add a new entry at the top of `changelog`.
6. Commit directly to `main` with a concise message.
7. Wait for GitHub Pages to rebuild, then open the live site and confirm the new revision.

If editing JavaScript on a phone is awkward, create a [new intel report](../../issues/new?template=intel-report.md) instead. Another computer or AI session can turn the report into a validated update.

Do not attach an uncropped account screenshot to a public issue. Crop away account identity, coordinates, planet names, resource balances, and unrelated interface details—or describe the values in text.

## Another-computer workflow

```text
git clone https://github.com/TheIlluminate92/ogame-project-orion.git
cd ogame-project-orion
node scripts/validate.mjs
```

Read `AGENTS.md` and `docs/CURRENT_STATE.md`, make the update, rerun validation, commit, and push to `main`.

No build system or package installation is required. A current Node.js runtime is only needed for validation.

## Starting another ChatGPT or Codex session

Provide the repository URL and ask the agent to read, in order:

1. `AGENTS.md`
2. `docs/CURRENT_STATE.md`
3. `docs/ITERATIONS.md`
4. `data/orion-data.js`

Suggested opening prompt:

> Continue development of the Project Orion field guide from this repository. Follow AGENTS.md, preserve the confirmed/observed/unknown evidence boundaries, run the validation script, update the iteration documentation when needed, and verify GitHub Pages after publishing. Do not publish raw account screenshots.

// PGLite's Emscripten runtime loads pglite.data/.wasm and initdb.wasm via a
// plain string path resolved next to its OWN bundled JS file at runtime
// (`scriptDirectory + "pglite.data"`, etc) — not a static import, so Nitro's
// bundler has no way to trace it as a dependency and never ships these files
// with the deployed function. Every request then 500s on a cold ENOENT.
// Fix: after the real build, copy the three assets from node_modules next to
// wherever the bundler placed pglite's JS chunk in the Vercel output.
import { readdir, copyFile, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ASSET_NAMES = ["pglite.data", "pglite.wasm", "initdb.wasm"];

async function findPgliteChunkDirs(root) {
  const found = [];
  let entries;
  try {
    entries = await readdir(root, { withFileTypes: true });
  } catch {
    return found;
  }
  for (const entry of entries) {
    const full = join(root, entry.name);
    if (entry.isDirectory()) {
      found.push(...(await findPgliteChunkDirs(full)));
    } else if (/^electric-sql__pglite.*\.m?js$/.test(entry.name)) {
      found.push(dirname(full));
    }
  }
  return found;
}

async function main() {
  const outputRoot = ".vercel/output/functions";
  const dirs = await findPgliteChunkDirs(outputRoot);
  if (dirs.length === 0) {
    console.log("[copy-pglite-assets] no bundled pglite chunk found — skipping");
    return;
  }

  // The package's "exports" map only allows resolving its main entry, not
  // arbitrary ./dist/* subpaths — derive the dist dir from the entry instead.
  const distDir = dirname(require.resolve("@electric-sql/pglite"));

  for (const dir of dirs) {
    for (const name of ASSET_NAMES) {
      const dest = join(dir, name);
      try {
        await access(dest);
        continue; // already present
      } catch {
        // fall through to copy
      }
      await copyFile(join(distDir, name), dest);
      console.log(`[copy-pglite-assets] copied ${name} -> ${dest}`);
    }
  }
}

main().catch((err) => {
  console.error("[copy-pglite-assets] failed:", err);
  process.exit(1);
});

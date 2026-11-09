#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));

function run(step, args, cwd = root) {
  process.stdout.write('\n› ' + step + '\n');
  const result = spawnSync(process.execPath, args, { cwd, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function walk(dir, predicate) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, predicate));
    else if (predicate(full)) out.push(full);
  }
  return out;
}

run('repository contract', ['--test', 'tests/repo.test.mjs']);

for (const packageName of ['ppt-master', 'academic-research-skills']) {
  const cwd = path.join(root, 'packages', packageName);
  run(packageName + ' render smoke', ['test/render-smoke.mjs'], cwd);
  run(packageName + ' host smoke', ['test/host-smoke.mjs'], cwd);
}

const jsFiles = walk(root, (file) => /\.(js|mjs)$/.test(file)).sort();
for (const file of jsFiles) {
  run('syntax ' + path.relative(root, file), ['--check', file]);
}

console.log('\nverify-ok: repository contract, two host halves, two panels, syntax');

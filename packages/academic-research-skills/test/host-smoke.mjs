import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const root = await fs.mkdtemp(path.join(os.tmpdir(), 'ars-host-'));
const guideDir = path.join(root, 'academic-pipeline');
await fs.mkdir(guideDir, { recursive: true });
await fs.writeFile(path.join(guideDir, 'SKILL.md'), '# Pipeline marker\n\nstage body', 'utf8');

const mod = await import(new URL('../index.js', import.meta.url).href);

let tool;
let skill;
const ctx = {
  effect(fn) {
    return fn();
  },
  skills: {
    register(definition) {
      skill = definition;
      return () => {};
    },
  },
  tools: {
    register(definition) {
      tool = definition;
      return () => {};
    },
  },
};
mod.apply(ctx);

if (!skill || skill.name !== 'academic-research-skills') throw new Error('runtime skill missing or misnamed');
if (skill.source !== 'plugin:@dsh-research-studio/academic-research-skills') throw new Error('runtime skill source missing');
if (!skill.content.includes('Cheng-I Wu')) throw new Error('skill attribution missing');
if (!tool || tool.name !== 'ars_guide') throw new Error('guide tool missing or misnamed');
if (tool.output.schema.required[0] !== 'text') throw new Error('tool output schema must require text');
if (tool.output.render({}, { text: 'x' })[0].text !== 'x') throw new Error('tool renderer is wrong');

const found = await tool.execute({ repoPath: root });
if (!found.text.includes('# Pipeline marker') || !found.text.includes('stage body')) {
  throw new Error('guide body was not returned: ' + found.text.slice(0, 100));
}

await fs.writeFile(path.join(guideDir, 'SKILL.md'), 'x'.repeat(13000), 'utf8');
const clipped = await tool.execute({ repoPath: root });
if (!clipped.text.includes('[truncated]')) throw new Error('oversized guide was not marked truncated');
if (clipped.text.length > 12300) throw new Error('oversized guide was not clipped');

const empty = await tool.execute({});
if (!empty.text.startsWith('Provide repoPath')) throw new Error('empty repoPath handling is wrong');
const missing = await tool.execute({ repoPath: path.join(root, 'absent') });
if (!missing.text.startsWith('No SKILL.md found')) throw new Error('missing guide handling is wrong');

await fs.rm(root, { recursive: true, force: true });
console.log('host-smoke-ok: academic-research-skills');

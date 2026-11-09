import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));

const PACKAGES = [
  {
    dir: 'packages/ppt-master',
    name: '@dsh-research-studio/ppt-master',
    license: 'MIT',
    panelId: 'ppt-master',
    order: 40,
    storageKey: 'dsh.ppt-master.v1',
    skill: 'ppt-master',
    tool: 'ppt_master_guide',
    localeNs: 'ppt-master',
    upstream: 'https://github.com/hugohe3/ppt-master',
  },
  {
    dir: 'packages/academic-research-skills',
    name: '@dsh-research-studio/academic-research-skills',
    license: 'CC-BY-NC-4.0',
    panelId: 'ars',
    order: 50,
    storageKey: 'dsh.ars.v1',
    skill: 'academic-research-skills',
    tool: 'ars_guide',
    localeNs: 'ars',
    upstream: 'https://github.com/Imbad0202/academic-research-skills',
  },
];

const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const exists = (relative) => fs.existsSync(path.join(root, relative));
const pkgPath = (pkg, file) => path.join(root, pkg.dir, file);

function walk(dir, predicate = () => true) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, predicate));
    else if (predicate(full)) out.push(full);
  }
  return out;
}

function flattenKeys(value, prefix = '') {
  const keys = [];
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value)) {
      const next = prefix ? prefix + '.' + key : key;
      keys.push(next);
      keys.push(...flattenKeys(child, next));
    }
  }
  return keys.sort();
}

function placeholders(value) {
  return [...String(value).matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();
}

/**
 * Load a panel client in a VM and capture the dictionaries passed to
 * ctx.locale.register. The render smoke tests cover DOM output; this harness
 * exists so the repository contract can compare the two language tables.
 */
function loadClient(pkg) {
  const source = fs.readFileSync(pkgPath(pkg, 'client.js'), 'utf8');
  let definition;
  const documentStub = {
    head: { tags: [], appendChild(tag) { this.tags.push(tag); } },
    querySelector() { return null; },
    createElement() { return { dataset: {}, textContent: '' }; },
  };
  const context = {
    window: {
      __ModuleLoader__: { load(value) { definition = value; } },
      localStorage: { getItem() { return null; }, setItem() {} },
    },
    document: documentStub,
    navigator: { clipboard: { writeText: async () => {} } },
    console,
    setTimeout,
    clearTimeout,
    JSON,
  };
  vm.createContext(context);
  vm.runInContext(source, context, { filename: pkg.dir + '/client.js' });
  assert.ok(definition, pkg.name + ': module definition was not registered');
  assert.equal(definition.id, pkg.name);

  const React = {
    createElement(type, props, ...children) {
      return { type, props: props || {}, children: children.flat(Infinity) };
    },
    useState(initial) { return [initial, () => {}]; },
    useEffect() {},
    useMemo(factory) { return factory(); },
    useRef(value) { return { current: value }; },
    useId() { return 'contract-id'; },
  };
  const mod = definition.factory((id) => {
    if (id === 'react') return React;
    throw new Error('unexpected require: ' + id);
  });

  let dictionaries;
  const registrations = [];
  const ctx = {
    effect(fn) { return fn(); },
    locale: {
      register(_ns, table) { dictionaries = table; return () => {}; },
      bind() { return (key) => key; },
    },
    slots: {
      inject(_name, callback) { return callback(); },
      register(options, component) {
        registrations.push({ options, component });
        return () => {};
      },
    },
    uiWorkspace: {
      startSession() {},
      pickDirectory() {},
      listDirectory() { return Promise.resolve([]); },
    },
  };
  mod.apply(ctx);
  return { definition, dictionaries, registrations, documentStub };
}

test('package manifests declare the DSH bundle and client contract', () => {
  for (const pkg of PACKAGES) {
    const manifest = JSON.parse(read(pkg.dir + '/package.json'));
    assert.equal(manifest.name, pkg.name);
    assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
    assert.equal(manifest.private, true);
    assert.equal(manifest.type, 'module');
    assert.equal(manifest.license, pkg.license);
    assert.match(manifest.engines.node, />=\s*22/);
    assert.equal(manifest.dsh.bundle.patch, './cordis.patch.yml');
    assert.equal(manifest.dsh.client.platform, 'web');
    assert.equal(manifest.dsh.client.immediately, true);
    for (const service of ['layout', 'sidebar', 'workspace']) {
      assert.ok(
        manifest.dsh.client.inject.some((id) => id.endsWith('ui-' + service)),
        pkg.name + ': missing ui-' + service + ' injection',
      );
    }
    assert.ok(manifest.files.includes('LICENSE'));
    assert.ok(manifest.files.includes('README.md'));
    for (const target of ['index.js', 'client.js', 'cordis.patch.yml', 'icon.svg']) {
      assert.ok(manifest.files.includes(target), pkg.name + ': files misses ' + target);
    }
    for (const target of Object.values(manifest.exports)) {
      if (target.includes('*')) {
        const dir = path.dirname(path.join(root, pkg.dir, target));
        assert.ok(fs.existsSync(dir) && fs.readdirSync(dir).length > 0, pkg.name + ': export glob is empty');
      } else {
        assert.ok(exists(path.join(pkg.dir, target.replace('./', ''))), pkg.name + ': export target missing: ' + target);
      }
    }
  }
});

test('bundle patches insert one uniquely named row per package', () => {
  const rows = [];
  for (const pkg of PACKAGES) {
    const patch = read(pkg.dir + '/cordis.patch.yml');
    const id = patch.match(/^\s*-\s*id:\s*(\S+)\s*$/m)?.[1];
    const name = patch.match(/^\s*name:\s*'([^']+)'\s*$/m)?.[1];
    assert.equal(id, pkg.panelId);
    assert.equal(name, pkg.name);
    rows.push(id);
  }
  assert.equal(new Set(rows).size, rows.length);
});

test('both language tables have identical keys and placeholders', () => {
  for (const pkg of PACKAGES) {
    const { dictionaries } = loadClient(pkg);
    assert.ok(dictionaries, pkg.name + ': no dictionaries registered');
    const zhKeys = Object.keys(dictionaries.zh).sort();
    const enKeys = Object.keys(dictionaries.en).sort();
    assert.deepEqual(zhKeys, enKeys, pkg.name + ': zh/en key sets differ');
    assert.ok(zhKeys.length >= 80, pkg.name + ': dictionary is unexpectedly small');
    for (const key of zhKeys) {
      assert.equal(typeof dictionaries.zh[key], 'string', pkg.name + ': zh.' + key + ' is not a string');
      assert.equal(typeof dictionaries.en[key], 'string', pkg.name + ': en.' + key + ' is not a string');
      assert.ok(dictionaries.zh[key].trim().length > 0, pkg.name + ': zh.' + key + ' is empty');
      assert.ok(dictionaries.en[key].trim().length > 0, pkg.name + ': en.' + key + ' is empty');
      assert.deepEqual(
        placeholders(dictionaries.zh[key]),
        placeholders(dictionaries.en[key]),
        pkg.name + ': placeholder mismatch at ' + key,
      );
    }

    const metaZh = JSON.parse(read(pkg.dir + '/locale/zh.json'));
    const metaEn = JSON.parse(read(pkg.dir + '/locale/en.json'));
    assert.deepEqual(flattenKeys(metaZh), flattenKeys(metaEn));
  }
});

test('client registration respects the slot, order and injection contract', () => {
  const seenOrders = new Set();
  for (const pkg of PACKAGES) {
    const { registrations } = loadClient(pkg);
    const entry = registrations.find((item) => item.options.name === 'sidebar.panellist');
    const panel = registrations.find((item) => item.options.name === 'main');
    assert.ok(entry, pkg.name + ': sidebar entry missing');
    assert.ok(panel, pkg.name + ': main panel missing');
    assert.equal(entry.options.id, pkg.panelId);
    assert.equal(panel.options.key, pkg.panelId);
    assert.equal(entry.options.order, pkg.order);
    assert.equal(seenOrders.has(entry.options.order), false, 'duplicate sidebar order');
    seenOrders.add(entry.options.order);
    const injected = panel.options.inject();
    for (const method of ['startSession', 'pickDirectory', 'checkDirectory']) {
      assert.equal(typeof injected[method], 'function', pkg.name + ': ' + method + ' missing');
    }

    const source = read(pkg.dir + '/client.js');
    assert.ok(source.includes("inject: ['slots', 'locale', 'uiWorkspace']"));
    assert.ok(source.includes("const PANEL_ID = '" + pkg.panelId + "'"));
    assert.ok(source.includes("const STORAGE_KEY = '" + pkg.storageKey + "'"));
    assert.ok(source.includes("order: " + pkg.order));
  }
});

test('client UI is token-only, dependency-free and avoids unsafe DOM APIs', () => {
  for (const pkg of PACKAGES) {
    const source = read(pkg.dir + '/client.js');
    for (const forbidden of ['innerHTML', 'eval(', 'new Function', 'fetch(', 'document.body', 'localStorage.clear']) {
      assert.equal(source.includes(forbidden), false, pkg.name + ': forbidden API ' + forbidden);
    }
    const cssMatch = source.match(/const CSS = \[([\s\S]*?)\]\.join\('\\n'\);/);
    assert.ok(cssMatch, pkg.name + ': CSS block not found');
    const css = cssMatch[1];
    assert.equal(/#[0-9a-fA-F]{3,8}\b/.test(css), false, pkg.name + ': hardcoded hex color in CSS');
    assert.equal(/\brgba?\(/.test(css), false, pkg.name + ': hardcoded rgb color in CSS');
    assert.equal(/\bhsla?\(/.test(css), false, pkg.name + ': hardcoded hsl color in CSS');
    for (const token of css.matchAll(/var\((--[a-z0-9-]+)/g)) {
      assert.ok(token[1].startsWith('--dsw-alias-'), pkg.name + ': non-theme token ' + token[1]);
    }
    assert.ok(source.includes("document.createElement('style')"));
    assert.ok(source.includes('ctx.slots.inject'));
  }
});

test('host halves expose read-only guide tools and runtime skills', () => {
  for (const pkg of PACKAGES) {
    const source = read(pkg.dir + '/index.js');
    assert.ok(source.includes("export const inject = ['tools', 'skills']"), pkg.name + ': host injections');
    assert.ok(source.includes("required: ['text']"), pkg.name + ': output schema must be an array');
    assert.ok(source.includes("name: '" + pkg.skill + "'"), pkg.name + ': skill name');
    assert.ok(source.includes("name: '" + pkg.tool + "'"), pkg.name + ': tool name');
    assert.ok(source.includes('plugin:' + pkg.name), pkg.name + ': skill source');
    assert.ok(source.includes('MAX_GUIDE_CHARS = 12000'), pkg.name + ': guide cap');
    assert.ok(source.includes('readGuideHead'), pkg.name + ': bounded reader missing');
    assert.ok(source.includes(pkg.upstream), pkg.name + ': upstream attribution');
    for (const forbidden of ['child_process', 'execSync', 'spawn(', 'fetch(']) {
      assert.equal(source.includes(forbidden), false, pkg.name + ': host executes or fetches via ' + forbidden);
    }
  }
});

test('prompts keep the project red lines visible', () => {
  const ppt = read('packages/ppt-master/client.js');
  assert.ok(ppt.includes('never invent data'));
  assert.ok(ppt.includes('do not claim that scripts were run'));
  assert.ok(ppt.includes('keep shapes, text, and charts natively editable'));

  const ars = read('packages/academic-research-skills/client.js');
  assert.ok(ars.includes('Never fabricate citations'));
  assert.ok(ars.includes('does **not** prove'));
  assert.ok(ars.includes('Stop at every checkpoint'));
});

test('licenses and attribution cover both upstream projects', () => {
  assert.ok(exists('LICENSE'));
  assert.ok(exists('NOTICE'));
  assert.ok(exists('ATTRIBUTION.md'));
  assert.ok(exists('LICENSES/CC-BY-NC-4.0.txt'));

  const notice = read('NOTICE');
  assert.ok(notice.includes('PPT Master'));
  assert.ok(notice.includes('Hugo He'));
  assert.ok(notice.includes('MIT'));
  assert.ok(notice.includes('Academic Research Skills'));
  assert.ok(notice.includes('Cheng-I Wu'));
  assert.ok(notice.includes('CC BY-NC 4.0'));
  assert.ok(notice.includes('DeepSeek Harness'));

  const cc = read('LICENSES/CC-BY-NC-4.0.txt');
  assert.ok(cc.includes('Attribution-NonCommercial 4.0 International'));
  assert.ok(cc.includes('Cheng-I Wu'));
});

test('required layer documents exist and are linked from the README', () => {
  const required = [
    'docs/business-and-delivery.md',
    'docs/architecture.md',
    'docs/quality-and-testing.md',
    'docs/cross-cutting.md',
    'docs/red-lines.md',
    'docs/acceptance.md',
    'docs/design-system.md',
    'docs/contracts.md',
    'docs/release.md',
    'docs/adr/0001-monorepo-two-packages.md',
    'docs/adr/0002-no-runtime-shared-dependency.md',
    'docs/adr/0003-prompt-composer-boundary.md',
    'docs/adr/0004-local-first-persistence.md',
    'docs/adr/0005-mixed-licensing.md',
  ];
  for (const file of required) assert.ok(exists(file), 'missing ' + file);
  const readme = read('README.md');
  for (const file of required.filter((file) => !file.includes('/adr/'))) {
    assert.ok(readme.includes(file), 'README does not link ' + file);
  }
});

test('relative Markdown links resolve inside the repository', () => {
  const docs = walk(root, (file) => file.endsWith('.md')).filter((file) => !file.includes('LICENSES'));
  const missing = [];
  for (const file of docs) {
    const text = fs.readFileSync(file, 'utf8').replace(/```[\s\S]*?```/g, '');
    for (const match of text.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
      let target = match[1].trim();
      if (target.startsWith('<') && target.endsWith('>')) target = target.slice(1, -1);
      if (/^(https?:|mailto:|#)/.test(target)) continue;
      target = decodeURIComponent(target.split('#')[0].split('?')[0]);
      if (target === '') continue;
      const resolved = path.resolve(path.dirname(file), target);
      if (!fs.existsSync(resolved)) missing.push(path.relative(root, file) + ' -> ' + target);
    }
  }
  assert.deepEqual(missing, []);
});

test('repository contains no legacy package ids or secret material', () => {
  const files = walk(root, (file) => /\.(js|mjs|json|yml|md|svg|txt)$/.test(file));
  const offenders = [];
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    if (text.includes('@' + 'local/')) offenders.push(path.relative(root, file) + ': legacy id');
    if (/\bsk-[A-Za-z0-9]{20,}\b/.test(text)) offenders.push(path.relative(root, file) + ': sk- secret');
    if (/\bghp_[A-Za-z0-9]{20,}\b/.test(text)) offenders.push(path.relative(root, file) + ': GitHub token');
    if (/\bAKIA[0-9A-Z]{16}\b/.test(text)) offenders.push(path.relative(root, file) + ': AWS key');
    if (text.includes('-----' + 'BEGIN')) offenders.push(path.relative(root, file) + ': private key');
  }
  assert.deepEqual(offenders, []);
});

test('icons are self-contained SVGs with a viewBox', () => {
  for (const pkg of PACKAGES) {
    const svg = read(pkg.dir + '/icon.svg');
    assert.match(svg.trim(), /^<svg\b/);
    assert.match(svg, /viewBox="[^"]+"/);
    assert.match(svg.trim(), /<\/svg>$/);
  }
});

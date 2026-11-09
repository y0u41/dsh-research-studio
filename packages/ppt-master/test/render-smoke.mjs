import fs from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const source = fs.readFileSync(fileURLToPath(new URL('../client.js', import.meta.url)), 'utf8');

let definition;
const documentStub = {
  head: {
    tags: [],
    appendChild(tag) {
      this.tags.push(tag);
    },
  },
  querySelector() {
    return null;
  },
  createElement() {
    return { dataset: {}, textContent: '' };
  },
};

const context = {
  window: {
    __ModuleLoader__: {
      load(def) {
        definition = def;
      },
    },
    localStorage: {
      getItem(key) {
        return key === 'dsh.ppt-master.v1'
          ? JSON.stringify({ repo: 'D:/tools/ppt-master', source: 'projects/q3/report.pdf' })
          : null;
      },
      setItem() {},
    },
  },
  document: documentStub,
  navigator: { clipboard: { writeText: async () => {} } },
  console,
  setTimeout,
  clearTimeout,
  JSON,
};
vm.createContext(context);
vm.runInContext(source, context, { filename: 'client.js' });

if (!definition) throw new Error('module definition was not registered');
if (definition.id !== '@dsh-research-studio/ppt-master') throw new Error('unexpected module id: ' + definition.id);

// Minimal React surface: the panel only needs element creation and hook shapes.
const React = {
  createElement(type, props, ...children) {
    return { type, props: props || {}, children: children.flat(Infinity) };
  },
  useState(initial) {
    return [initial, () => {}];
  },
  useEffect() {},
  useMemo(factory) {
    return factory();
  },
  useRef(value) {
    return { current: value };
  },
  useId() {
    return 'pm-test-id';
  },
};

const mod = definition.factory((id) => {
  if (id === 'react') return React;
  throw new Error('unexpected require: ' + id);
});

const registrations = [];
let dicts;
const ctx = {
  effect(fn) {
    return fn();
  },
  locale: {
    register(_ns, table) {
      dicts = table;
      return () => {};
    },
    bind() {
      return (key, params) => {
        let value = dicts?.zh?.[key] ?? dicts?.en?.[key] ?? key;
        if (params) value = value.replace(/\{(\w+)\}/g, (m, name) => (name in params ? String(params[name]) : m));
        return value;
      };
    },
  },
  slots: {
    inject(_name, callback) {
      return callback();
    },
    register(options, component) {
      registrations.push({ options, component });
      return () => {};
    },
  },
  uiWorkspace: { startSession() {} },
};

mod.apply(ctx);

const entry = registrations.find((r) => r.options.name === 'sidebar.panellist');
const panel = registrations.find((r) => r.options.name === 'main');
if (!entry) throw new Error('sidebar.panellist registration missing');
if (!panel) throw new Error('main panel registration missing');
if (entry.options.id !== 'ppt-master') throw new Error('unexpected panel id');
if (panel.options.key !== 'ppt-master') throw new Error('main panel key missing');
if (entry.options.label() !== 'PPT Master') throw new Error('panel label did not resolve');

const icon = entry.component({ size: 18, active: false });
if (!icon || icon.type !== 'svg') throw new Error('sidebar icon did not render an svg');

const injected = panel.options.inject();
if (typeof injected.startSession !== 'function') throw new Error('startSession was not injected');
if (typeof injected.pickDirectory !== 'function') throw new Error('pickDirectory was not injected');
if (typeof injected.checkDirectory !== 'function') throw new Error('checkDirectory was not injected');

const tree = panel.component({
  t: ctx.locale.bind('ppt-master'),
  startSession: injected.startSession,
  pickDirectory: injected.pickDirectory,
  checkDirectory: injected.checkDirectory,
});
const texts = [];
(function walk(node) {
  if (node === null || node === undefined) return;
  if (typeof node === 'string' || typeof node === 'number') {
    texts.push(String(node));
    return;
  }
  if (Array.isArray(node)) {
    node.forEach(walk);
    return;
  }
  if (node.children) node.children.forEach(walk);
})(tree);
const flat = texts.join('\n');
for (const expected of [
  '把文档做成可编辑的 PowerPoint',
  '组装工作流',
  '它能做什么',
  '填入新会话',
  '请用 PPT Master 工作流制作一份演示文稿。',
  '若技能目录里有 ppt-master',
  'D:/tools/ppt-master',
  'projects/q3/report.pdf',
]) {
  if (!flat.includes(expected)) throw new Error('rendered output missing ' + expected);
}

console.log(
  'registrations:',
  registrations
    .map((r) => r.options.name + (r.options.key ? ':' + r.options.key : '') + (r.options.id ? ':' + r.options.id : ''))
    .join(', '),
);
console.log('style tags injected:', documentStub.head.tags.length);
console.log('render nodes:', texts.length);
console.log('smoke-ok');

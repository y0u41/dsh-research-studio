# 契约

> 这些是**跨包、跨版本必须保持**的不变量。改动任一条，都是破坏性变更。
> 每条都尽量对应一个自动断言；没有自动断言的，必须在评审中人工确认。

## 1. 包契约

每个包必须满足：

```json
{
  "name": "@dsh-research-studio/<name>",
  "version": "x.y.z",
  "private": true,
  "type": "module",
  "license": "MIT | CC-BY-NC-4.0",
  "engines": { "node": ">=22" },
  "dsh": {
    "bundle": { "patch": "./cordis.patch.yml" },
    "client": {
      "platform": "web",
      "immediately": true,
      "inject": ["layout", "sidebar", "workspace"]
    }
  }
}
```

| 不变量 | 值 | 检查 |
| --- | --- | --- |
| 包名 | `@dsh-research-studio/ppt-master` / `.../academic-research-skills` | `tests/repo.test.mjs` |
| 版本 | 语义化 `x.y.z` | 同上 |
| `private` | `true`，防止误发 npm | 同上 |
| `license` | PPT `MIT`；ARS `CC-BY-NC-4.0` | 同上 |
| Node | `>=22` | 同上 |
| `files` | 含 `index.js`、`client.js`、`cordis.patch.yml`、`icon.svg`、`LICENSE`、`README.md` | 同上 |
| `exports` | 目标存在，glob 非空 | 同上 |

## 2. Bundle 契约

```yaml
- insert:
    - id: <panelId>
      name: '@dsh-research-studio/<package>'
```

- 一个包只插入一行。
- `id` 全局唯一，且等于 `panelId`。
- `name` 必须等于包名。
- 不得覆盖其他插件的行。

## 3. Slot 契约

| 项 | 规则 |
| --- | --- |
| 侧栏 slot | `sidebar.panellist` |
| 主面板 slot | `main`（keyed） |
| 侧栏 id | `ppt-master` / `ars` |
| 主面板 key | 必须等于侧栏 id |
| 顺序 | PPT 40；ARS 50；不得重复 |
| 注册方式 | `ctx.slots.inject(name, () => ctx.slots.register(...))` |
| 注入 | 面板 `inject()` 返回 `startSession`、`pickDirectory`、`checkDirectory` 三个函数 |

**最容易犯的错**：侧栏用 `id`，主面板用 `key`，两处写成不同值。结果入口可见但点不开。

## 4. Client 契约

| 项 | 规则 |
| --- | --- |
| 模块 id | 等于包名 |
| 模块格式 | `window.__ModuleLoader__.load({ id, factory })` |
| React | 通过 `require('react')` 获取，不打包自带 React |
| 样式 | 只注入一个 `<style data-plugin-css="...">` |
| 颜色 | 只用 `--dsw-alias-*` token；禁止硬编码 UI 颜色 |
| 危险 API | 禁止 `innerHTML`、`eval`、`new Function`、`fetch(`、`document.body`、`localStorage.clear` |
| 依赖 | 运行时不声明第三方 `dependencies` |
| 发送 | `startSession` 只把 prompt 放进输入框，不自动发送 |

## 5. 状态契约

| 键 | 包 | 版本 |
| --- | --- | --- |
| `dsh.ppt-master.v1` | PPT | v1 |
| `dsh.ars.v1` | ARS | v1 |

- 读取必须容错：损坏/旧版本数据回退默认值。
- 写入必须 `try/catch`：隐私模式/配额失败不得阻塞 UI。
- 不得在未告知用户的情况下清空其他键。
- 破坏性字段变更必须升版本后缀并提供迁移说明。

## 6. Host 契约

| 项 | PPT | ARS |
| --- | --- | --- |
| `inject` | `['tools','skills']` | 同 |
| 技能名 | `ppt-master` | `academic-research-skills` |
| 技能 source | `plugin:@dsh-research-studio/ppt-master` | `plugin:@dsh-research-studio/academic-research-skills` |
| 工具名 | `ppt_master_guide` | `ars_guide` |
| 输入 | `{ repoPath?: string }` | 同 |
| 输出 | `{ text: string }`，对象层 `required: ['text']` | 同 |
| 读取上限 | 12,000 字符，超出追加 `[truncated]` | 同 |
| 读取方式 | 有界前缀，不整文件读入 | 同 |
| 副作用 | 只读；不 `exec`/`spawn`/`fetch` | 同 |
| 缺失路径 | 返回可操作说明，不抛未捕获异常 | 同 |

### Guide 候选路径

PPT：

```text
skills/ppt-master/SKILL.md
SKILL.md
ppt-master/SKILL.md
```

ARS：

```text
academic-pipeline/SKILL.md
SKILL.md
skills/academic-research-skills/SKILL.md
```

顺序即优先级；第一个存在的文件被读取。新增候选路径属于兼容性变更，必须更新文档与测试。

## 7. Prompt 契约

### 7.1 PPT 必须包含

- 先说明 3–5 句叙述主线。
- 内容优先；不编造数据；缺失事实标注假设。
- 导出 `.pptx`；形状、文本、图表原生可编辑。
- 套用模板时保留母版/版式。
- 输出文件路径 + 每页一句话要点。
- 无本机仓库时，说明要先准备什么，不声称脚本已运行。

### 7.2 ARS 必须包含

- 若技能目录存在 `academic-research-skills`，先加载。
- 每个检查点停下，等待人工确认。
- 阶段 2.5 / 4.5 完整性闸门不可跳过。
- 引用可核验；不编造作者/标题/DOI。
- 引用与论断对齐；方法报告足以支持结论。
- 完整性报告逐项列出。
- 明确边界：检查**不证明**实验做过、数据真实、结果可复现。
- 研究问题、方法、解释、结论由人负责。

## 8. 文案契约

- `locale/zh.json` 与 `locale/en.json` key 集合一致。
- 面板 `zh`/`en` 字典 key 集合一致，且每个值非空。
- 同一 key 的 `{placeholder}` 集合一致。
- 新增用户可见字符串必须同时提供中英文。
- 不把中文写进英文值（专有名词除外）。

## 9. 许可与来源契约

| 项 | 要求 |
| --- | --- |
| 根 `LICENSE` | MIT |
| PPT 包 `LICENSE` | MIT + `Copyright (c) 2025-2026 Hugo He` |
| ARS 包 `LICENSE` | CC BY-NC 4.0 + `Copyright (c) 2026 Cheng-I Wu` |
| `NOTICE` | 两个上游、作者、许可证、非官方声明 |
| `ATTRIBUTION.md` | 上游链接、使用范围、修改说明、非商业边界 |
| README | 许可表与非商业提示 |
| 包元数据 | `license` 字段与包级 LICENSE 一致 |

## 10. 文档契约

以下文件必须存在，且被 README 链接：

```text
docs/business-and-delivery.md
docs/architecture.md
docs/quality-and-testing.md
docs/cross-cutting.md
docs/red-lines.md
docs/design-system.md
docs/contracts.md
docs/release.md
docs/acceptance.md
```

ADR 必须存在：

```text
docs/adr/0001-monorepo-two-packages.md
docs/adr/0002-no-runtime-shared-dependency.md
docs/adr/0003-prompt-composer-boundary.md
docs/adr/0004-local-first-persistence.md
docs/adr/0005-mixed-licensing.md
```

所有相对 Markdown 链接必须能解析；代码块内的示例链接不参与检查。

## 11. 变更分类

| 变更 | 分类 | 要求 |
| --- | --- | --- |
| 新增字段/文案 | 次版本 | 双语、测试、文档 |
| 新增面板/工具 | 次版本 | 唯一 id、契约测试、README |
| 改 slot id/key | **主版本** | 迁移说明；用户需重装/刷新 |
| 改包名 | **主版本** | 新包；旧包保留一个版本或明确弃用 |
| 改存储键 | **主版本** | 迁移脚本或明确丢数据 |
| 改许可证 | **主版本** | 法务/上游确认；NOTICE 更新 |
| 修 bug/文案 | 补丁版本 | 测试回归 |

## 12. 契约测试映射

| 契约 | 测试 |
| --- | --- |
| 包清单/exports/files | `tests/repo.test.mjs` → `package manifests...` |
| bundle patch | `... bundle patches...` |
| 双语 key/placeholder | `... language tables...` |
| slot/order/inject | `... registration respects...` |
| token/危险 API | `... token-only...` |
| Host 工具/技能/schema/上限 | `... host halves...` |
| Prompt 红线 | `... prompts keep...` |
| 许可/来源 | `... licenses and attribution...` |
| 文档存在 | `... required layer documents...` |
| 相对链接 | `... relative Markdown links...` |
| 旧包名/密钥 | `... no legacy package ids...` |
| 图标 | `... icons are self-contained...` |
| 运行时行为 | 包级 `render-smoke.mjs` / `host-smoke.mjs` |

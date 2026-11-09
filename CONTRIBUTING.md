# 贡献指南

感谢你愿意改进 DSH Research Studio。这个项目很小，但边界很清楚：**先读红线，再写代码。**

## 1. 先读什么

1. [业务与交付层](docs/business-and-delivery.md)：项目交付什么、不交付什么。
2. [架构与代码层](docs/architecture.md)：Host/Client 分工、slot、prompt 组装。
3. [红线](docs/red-lines.md)：不伪造执行、不伪造引用、不越许可证、不窃取数据。
4. [契约](docs/contracts.md)：改任何 id/schema/文案前必须遵守。
5. [设计系统](docs/design-system.md)：token、布局、组件。

## 2. 开发环境

- Node.js **22+**。
- 不需要 `npm install`：项目运行时零第三方依赖。
- 一个可用的 DSH 环境（仅真实页面验收需要）。
- 可选：PPT Master / ARS 的本机 checkout（仅端到端手工验证需要）。

```bash
git clone https://github.com/y0u41/dsh-research-studio.git
cd dsh-research-studio
npm test
```

## 3. 仓库结构

```text
packages/ppt-master/                  # 独立可安装 bundle
packages/academic-research-skills/    # 独立可安装 bundle
tests/repo.test.mjs                   # 跨包契约
scripts/verify.mjs                    # 一键验证
docs/                                 # 五层文档 + ADR
```

两个包**不得互相 import**。共享的是文档、测试、设计规则，不是运行时模块。

## 4. 修改流程

1. 开 Issue 描述问题/提案；破坏性变更先讨论。
2. 从 `main` 拉分支：`feat/...`、`fix/...`、`docs/...`。
3. 写测试：先让测试在旧代码上失败，再修。
4. 跑 `npm test` 与 `npm run verify`。
5. 更新文档/CHANGELOG（如影响用户）。
6. 提 PR，填写检查表。

## 5. 代码风格

- 纯 JavaScript（ESM Host；Client 为模块加载器格式），无构建步骤。
- 2 空格缩进；单引号；语句结尾保留分号；尾随逗号按现有文件。
- 不引入第三方运行时依赖；测试只用 Node 内置模块。
- 不在 `client.js` 中使用 `innerHTML`、`eval`、`new Function`、`fetch(`、`document.body`。
- 不在 CSS 中写 `#hex` / `rgb()` / `hsl()`；只用 `--dsw-alias-*`。
- 用户可见字符串必须同时有 `zh` 与 `en`。

## 6. 新增字段/面板

### 新增表单字段

- [ ] 加默认值与校验（旧 `localStorage` 数据不能污染渲染）。
- [ ] 加 `values`、`buildPrompt`、双语 key、渲染断言。
- [ ] 若字段影响红线（例如是否跳过闸门），先改 [红线](docs/red-lines.md)。

### 新增面板

- [ ] 复制现有包结构，换包名、`panelId`、`order`、`STORAGE_KEY`、模块 id。
- [ ] `cordis.patch.yml` 的 id 与 `main` key 一致。
- [ ] 在 `tests/repo.test.mjs` 的 `PACKAGES` 注册。
- [ ] 加 render + host 冒烟。
- [ ] 加包级 LICENSE 与来源说明。
- [ ] 更新 README、架构、契约、验收。

## 7. 测试要求

- 每个 bug 修复带回归测试。
- 契约变更必须同时跑两个包；不能只跑一个。
- 不 mock 被测对象；Host 测试用真实 `index.js` 与真实临时文件。
- 测试必须离线、可重复、清理临时目录。
- 不把“测试通过”写成“全面验证”；覆盖缺口见 [质量与测试层](docs/quality-and-testing.md)。

## 8. 提交信息

使用 Conventional Commits 风格：

```text
feat(ppt): add A4 portrait option
fix(ars): keep integrity gate visible in quick mode
docs: clarify non-commercial license boundary
test: cover truncated SKILL.md
chore: bump version to 1.0.1
```

一个提交只做一件事；格式化/重命名单独提交。

## 9. PR 检查表

```text
[ ] 我读过并遵守 docs/red-lines.md
[ ] npm test 通过
[ ] npm run verify 通过
[ ] 新增/修改行为有测试
[ ] 双语 key 对齐
[ ] 没有新增网络请求/危险 API/硬编码 UI 颜色
[ ] 许可证与来源未被削弱
[ ] 文档与 CHANGELOG 已更新
[ ] 没有把未验证的能力写成已验证
```

## 10. 许可证

- 根仓库与 `packages/ppt-master` 的贡献按 **MIT** 授权。
- `packages/academic-research-skills` 的贡献按 **CC BY-NC 4.0** 授权。
- 提交即表示你有权按对应许可证授权该贡献。
- 不要粘贴上游代码/模板/技能文件，除非你确认许可证兼容并在 PR 中说明。
- 不要移除上游版权、许可证、署名。

## 11. 安全问题

不要开公开 Issue。见 [SECURITY.md](SECURITY.md)。

## 12. 行为

参与即表示同意 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)。

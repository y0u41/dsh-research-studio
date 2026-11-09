# 发布流程

> 发布不是 `git push`。它是一次可复现、可回滚、带证据的交付。
> 本项目走 **GitHub 源码分发**，不发布 npm。

## 1. 版本策略

语义化版本 `MAJOR.MINOR.PATCH`：

| 变更 | 版本 |
| --- | --- |
| 修 bug、文案、测试 | PATCH |
| 新增字段/面板/工具，向后兼容 | MINOR |
| 改 slot id/key、包名、存储键、许可证 | MAJOR |

两个包独立版本，但同一 Release 可以包含两个包。根 `package.json` 的版本是**仓库版本**，不要求与包版本相同。

## 2. 发布前检查

### 2.1 自动

```bash
npm test
npm run verify
```

必须全绿。`verify` 会：

1. 跑仓库契约测试。
2. 跑两个包的 render + host 冒烟。
3. 对根脚本、测试、两个包 JS 做 `node --check`。

### 2.2 人工

- [ ] 在真实 DSH 页面安装/启用两个包。
- [ ] 两个侧栏入口出现，图标/标签正确。
- [ ] 表单可填、预览实时变化、复制可用。
- [ ] 「填入新会话」打开新会话，prompt 在输入框，未自动发送。
- [ ] 刷新后表单保留；损坏 `localStorage` 能回退。
- [ ] 路径选择器可用；错误路径显示 `missing`。
- [ ] 中英文切换无缺失 key/溢出。
- [ ] 浅色/深色主题可读。
- [ ] 禁用/重新启用不产生重复注册。
- [ ] 上游缺失时，agent 说明缺什么，不声称已执行。
- [ ] 许可证、NOTICE、ATTRIBUTION 与包元数据一致。

### 2.3 证据

- 记录 DSH 版本、操作系统、Node 版本。
- 保存 `npm test` 输出摘要（不附完整日志）。
- 截图只放真实界面；不用示意图冒充。
- 把结果写入 [验收记录](acceptance.md)。

### 2.4 源码包与 GitHub 网页上传

如果要给不能直连 GitHub 的人一个源码包，用 `git archive`，不要用
PowerShell 的 `Compress-Archive`：后者默认跳过 `.github`、`.gitignore`
等点文件，也不保证根目录布局。

```bash
# 在仓库根目录、已提交的状态下执行
git archive --format=zip HEAD -o ../dsh-research-studio.zip
```

`git archive` 生成的 zip 解压后，`README.md`、`package.json`、`.github/`
直接位于解压目录根部，**没有**外层 `dsh-research-studio/` 包装目录。

用 GitHub 网页上传时：

1. 解压 zip。
2. 进入解压后的目录，全选**目录里的内容**（不是目录本身）。
3. 拖到 GitHub 空仓库的根目录上传。
4. 确认仓库首页直接显示 `README.md`，且 `.github/workflows/ci.yml` 在
   Actions 中可见；如果看到 `dsh-research-studio-1.0.0/` 这样的外层目录，
   说明上传层级错了，需要删除该目录后重传。

不要用 `Compress-Archive -Path .\*` 生成发布包；它不会包含点文件。

## 3. 发布步骤

```bash
# 1. 确认工作区干净
git status --short

# 2. 更新版本与 CHANGELOG
#    packages/*/package.json
#    package.json（可选，仓库版本）
#    CHANGELOG.md

# 3. 重新验证
npm test
npm run verify

# 4. 提交
git add -A
git commit -m "release: v1.0.0"

# 5. 打 tag（与版本一致）
git tag -a v1.0.0 -m "v1.0.0"

# 6. 推送
git push origin main
git push origin v1.0.0
```

然后在 GitHub 创建 Release：

- 标题：`v1.0.0`
- 说明：从 `CHANGELOG.md` 提取；写清新增、修复、破坏性变更、已知限制。
- 附件：不需要构建产物；源码即交付物。
- 勾选「Set as the latest release」。

### 3.1 GitHub 仓库设置

发布后在仓库 **Settings** 里补齐这些，避免“代码有了但仓库不像项目”：

| 设置 | 建议值 |
| --- | --- |
| Description | `Two DSH sidebar panels: editable PPTX workflows and checkpointed academic research.` |
| Website | 留空，或指向 README 的在线说明；不要填不存在的域名 |
| Topics | `deepseek-harness`, `dsh`, `dsh-plugin`, `ppt`, `pptx`, `academic-research`, `literature-review` |
| Social preview | 上传 1280×640 的 PNG/JPG；`assets/banner.svg` 可作设计源，但 GitHub 不接受 SVG |
| Wiki | 关闭（文档在 `docs/`，避免两套内容漂移） |
| Discussions | 可选；没有维护人手时先关闭 |
| Private vulnerability reporting | 打开；与 `SECURITY.md` 一致 |
| Branch protection | `main` 要求 CI 通过、禁止 force push、禁止直接删除 |

许可证识别如果只显示根 MIT，不要改包级许可证去迎合识别；在 About 或 README 顶部保留 `MIT + CC BY-NC 4.0` 的说明。

## 4. Release Notes 模板

```markdown
## vX.Y.Z

### Added
- ...

### Changed
- ...

### Fixed
- ...

### Breaking
- ...

### Known limitations
- 未覆盖浏览器 E2E；未执行上游真实生成/研究流水线。
- DSH 客户端插件 API 仍可能变化。
- ARS 包为 CC BY-NC 4.0，禁止商业使用。

### Verification
- `npm test` / `npm run verify` 通过（Node 22.x / 24.x，<OS>）。CI 见 `.github/workflows/ci.yml`。
- 真实 DSH <version> 页面手工验收通过。
```

## 5. 发布后

- 检查 Release 页面链接、许可证、来源是否可点。
- 用干净 profile 再安装一次，确认不是「本机缓存碰巧可用」。
- 监控 Issue 中的安装/加载失败；必要时发 PATCH。
- 不删除旧 tag；若必须撤回，发布新的 PATCH 并在 Release 说明中标注 `yanked`。

## 6. 回滚

### 用户侧

1. 禁用 `include:ppt-master` / `include:ars`。
2. 移除对应 bundle。
3. 切换到上一个 tag 重新安装。
4. 清除 `dsh.ppt-master.v1` / `dsh.ars.v1`（仅在确认要重置表单时）。

### 维护者侧

```bash
git revert <commit>
# 或
git checkout vPREVIOUS
```

不要强推 `main`；用 revert 保留历史。

## 7. 兼容性声明

Release Notes 必须写：

- 验证过的 DSH 版本/渠道。
- 验证过的 Node 版本。
- 是否改变 slot/存储/工具 schema。
- 是否仍兼容旧版表单数据。
- 上游仓库的验证 commit/tag（如已知）。

## 8. 不发布 npm 的理由

- 两个包依赖 DSH 的运行时模块加载器与 profile 安装机制，不是普通 npm 库。
- `private: true` 防止误发。
- GitHub 源码 + `plugin_manager` 指向目录是当前支持的安装方式。
- 若未来支持 npm，需要单独的包结构、构建产物与安装文档；不要现在假装支持。

## 9. 发布检查表（复制到 Issue/PR）

```text
[ ] npm test 全绿
[ ] npm run verify 全绿
[ ] 真实 DSH 安装/启用/刷新通过
[ ] 两个入口、预览、填入新会话、刷新保留通过
[ ] 双语/主题/键盘检查通过
[ ] 许可证/NOTICE/ATTRIBUTION 一致
[ ] CHANGELOG 与版本号一致
[ ] tag 已推送，Release 已创建
[ ] 已知限制已写入 Release Notes
```

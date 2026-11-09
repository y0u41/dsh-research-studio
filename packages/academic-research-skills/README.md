# Academic Research Skills 面板（DSH 插件）

左侧栏的 **学术研究** 面板：把技能、模式、研究对象和写作规格，组装成一条可直接交给 agent 的 ARS 工作流指令，并新建一个已填好指令的会话。

参考上游：[Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills)。

## 界面

- 左侧栏面板列表新增一个文稿图标（`学术研究`），点开后占据中央面板。
- 顶部是流水线一览：研究 → 写作 → **2.5 完整性闸门** → 审稿 → 修订 → 定稿。
- 中间「组装任务」：技能（5 套）、模式（随技能切换）、研究对象、语言、引用格式、论文结构、ARS 仓库路径，右侧实时预览指令。
- 「填入新会话」会新建会话并把指令放进输入框（不自动发送）；没有安装 ARS 时，指令会让 agent 先说明安装方式。
- 表单会记住上次的技能、模式与输入（浏览器本地存储）；仓库路径会用本机目录服务校验，显示「路径可读 / 找不到这个目录」，也可以用「选择文件夹」直接选。
- 下方是五套技能的模式清单，以及完整性检查的「会检查 / 不会证明」边界。

## 它不做什么

插件只负责**编排指令和提供入口**，不包含 ARS 的技能文件、脚本或 Claude Code 运行时。真正执行需要本机已安装 [ARS](https://github.com/Imbad0202/academic-research-skills)（Claude Code 插件）并在「仓库路径」里填上克隆位置，指令会要求 agent 先读 `academic-pipeline/SKILL.md` 与 `docs/ARCHITECTURE.md`。

它另外注册了一个只读工具 **`ars_guide`**：传入本机仓库路径，就能读取真实的 `academic-pipeline/SKILL.md`，不需要 agent 猜路径。它只读文件，不执行脚本。

同时，ARS 流水线被注册为 DSH 运行时技能 **`academic-research-skills`**：出现在技能目录里，agent 可用 `skill` 工具直接加载。技能正文是桥接摘要，权威内容仍以仓库里的 `academic-pipeline/SKILL.md` 为准。

## 安装

在 DSH 会话里让 agent 调用 `plugin_manager`，`target` 指向本目录的**绝对路径**：

```
plugin_manager: install_bundle, target: <仓库绝对路径>/packages/academic-research-skills
```

安装后刷新页面。客户端改动后重新加载页面即可；若改了 `package.json` 的 `dsh.client` 或依赖，需要重启 DSH。

> 本包尚未在发布流程中做真实页面验收；仓库级测试通过不等于浏览器 E2E 通过。验收矩阵见 [`docs/acceptance.md`](../../docs/acceptance.md)。

## 结构

```
package.json        bundle manifest + dsh.client
cordis.patch.yml    插入 ars 行
index.js            Host 半边：注册 academic-research-skills 运行时技能 + ars_guide 工具
client.js           侧栏入口 + 主面板 + 样式与中英文案
locale/{zh,en}.json 插件列表里的标题与说明
icon.svg            插件图标（自绘）
test/render-smoke.mjs  无浏览器的注册与渲染冒烟测试
test/host-smoke.mjs    Host 侧技能注册与 guide 工具测试
```

## 测试

```
npm test
```

## 许可

本包代码为本仓库原创，但包含对上游工作流结构的改编，按 **CC BY-NC 4.0** 发布，**禁止商业使用**。上游：<https://github.com/Imbad0202/academic-research-skills>（作者 Cheng-I Wu）。完整来源、署名与非商业边界见根目录 [`ATTRIBUTION.md`](../../ATTRIBUTION.md)、[`NOTICE`](../../NOTICE) 与 [`LICENSES/CC-BY-NC-4.0.txt`](../../LICENSES/CC-BY-NC-4.0.txt)。

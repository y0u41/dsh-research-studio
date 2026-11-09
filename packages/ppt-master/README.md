# PPT Master 面板（DSH 插件）

左侧栏的 **PPT Master** 面板：把一份素材和制作规格，组装成可直接交给 agent 的 PPT Master 工作流指令，并新建一个已填好指令的会话。

## 界面

- 左侧栏面板列表新增一个演示文稿图标，点开后占据中央面板。
- 面板内可以选素材/主题、画布、页数、节奏、路线（自由设计 / 套用模板 / 填充已有 PPTX）、是否使用原生图表与表格，并填写本机 PPT Master 仓库路径。
- 右侧实时预览即将发送的指令；「填入新会话」会新建会话，并把指令放进输入框（不会自动发送，可先修改）。
- 表单会记住上次的选择（浏览器本地存储），包括素材、规格和仓库路径；仓库路径会调用本机目录服务校验，显示「路径可读 / 找不到这个目录」。
- 「选择文件夹」调用系统目录选择器，不用手打路径。
- 指令里的输出要求固定为：先讲叙事主线、逐页设计、不编造数据、导出可编辑 `.pptx` 并给出文件路径。

## 它不做什么

这个插件只负责**编排指令并提供入口**，不包含 PPT Master 的脚本与 Python 依赖，也不会代替你执行生成。真正生成需要本机已准备好 [ppt-master](https://github.com/hugohe3/ppt-master) 仓库和 Python 3.10–3.14；在「仓库路径」里填上位置，指令会让 agent 先读 `skills/ppt-master/SKILL.md`。

不过它注册了一个只读工具 **`ppt_master_guide`**：传入本机仓库路径，就能把真实的 `SKILL.md` 交给 agent，不用再猜文件在哪。它只读文件，不执行脚本。

同时，它把 PPT Master 工作流注册成 DSH 运行时技能 **`ppt-master`**：会出现在会话的技能目录里，agent 可以用 `skill` 工具直接加载，不必先打开面板。技能正文是桥接摘要，权威内容仍以仓库里的 `SKILL.md` 为准。

## 安装

在 DSH 会话里让 agent 调用 `plugin_manager`，`target` 指向本目录的**绝对路径**：

```
plugin_manager: install_bundle, target: <仓库绝对路径>/packages/ppt-master
```

安装后刷新页面。客户端改动后重新加载页面即可；若改了 `package.json` 的 `dsh.client` 或依赖，需要重启 DSH。

> 本包尚未在发布流程中做真实页面验收；仓库级测试通过不等于浏览器 E2E 通过。验收矩阵见 [`docs/acceptance.md`](../../docs/acceptance.md)。

## 结构

```
package.json        bundle manifest + dsh.client
cordis.patch.yml    插入 ppt-master 行
index.js            Host 半边：注册 ppt-master 运行时技能 + ppt_master_guide 工具
client.js           侧栏入口 + 主面板 + 全部样式与文案
locale/{zh,en}.json 插件列表里的标题与说明
icon.svg            插件图标
test/render-smoke.mjs  无浏览器的注册与渲染冒烟测试
test/host-smoke.mjs    Host 侧技能注册与 guide 工具测试
```

## 测试

```
npm test
```

## 许可

本包代码为本仓库原创，按 **MIT** 发布；包含上游 PPT Master 的 MIT 版权声明。上游：<https://github.com/hugohe3/ppt-master>（作者 Hugo He）。完整来源与许可见根目录 [`ATTRIBUTION.md`](../../ATTRIBUTION.md) 与 [`NOTICE`](../../NOTICE)。

# 来源、改编与使用范围

> 本项目是独立的社区集成，**不是** PPT Master 或 Academic Research Skills 的官方项目，也未获得其背书。
> 本文记录：用了什么、改了什么、许可证是什么、哪些东西没有打包。

## 1. 上游一览

| 上游 | 作者/版权 | 许可证 | 链接 |
| --- | --- | --- | --- |
| PPT Master | Copyright (c) 2025-2026 Hugo He | MIT | <https://github.com/hugohe3/ppt-master> |
| Academic Research Skills | Copyright (c) 2026 Cheng-I Wu | CC BY-NC 4.0 | <https://github.com/Imbad0202/academic-research-skills> |
| DeepSeek Harness（运行宿主） | DeepSeek | 以 DSH 自身许可为准 | <https://github.com/deepseek-ai> |

许可证信息于 **2026-11-09** 通过上游仓库的 GitHub API 核对：

- PPT Master：`LICENSE` 为 MIT，版权行 `Copyright (c) 2025-2026 Hugo He`。
- Academic Research Skills：`LICENSE` 为 Creative Commons Attribution-NonCommercial 4.0 International，版权行 `Copyright (c) 2026 Cheng-I Wu`；GitHub 识别为 `NOASSERTION` / `other`，以仓库内许可证全文为准。

## 2. PPT Master 集成

### 使用了什么

- 产品名、工作流概念、路线名称（自由设计 / 套用模板 / 填充已有 PPTX / 蒸馏模板 / 加动效解说）。
- 公开 README 中的能力描述与前置条件（Python 3.10–3.14、原生可编辑 PPTX 等）。
- 作为运行时技能的**方法摘要**，以及 `ppt_master_guide` 读取用户本机 `SKILL.md` 的入口。

### 没有打包什么

- 没有复制 PPT Master 的 Python 源码、模板、示例、字体或二进制。
- 没有在本仓库内分发上游 `SKILL.md`；运行时读取用户本机 checkout。
- 没有修改上游仓库。

### 本项目的原创部分

- 面板 UI、表单、预览、路径校验、持久化、双语、测试、文档。
- `packages/ppt-master/index.js` 与 `client.js` 的集成代码。
- 运行时技能文本是对公开工作流的**原创摘要**，不是上游文件的逐字复制。

### 许可证

`packages/ppt-master` 采用 MIT，并保留上游 MIT 版权声明。见 `packages/ppt-master/LICENSE`。

## 3. Academic Research Skills 集成

### 使用了什么

- 产品名、五套技能与模式分类、阶段编号（1→2→2.5→3→3′→4→4.5→5→6）、完整性闸门 2.5/4.5 的概念。
- 公开 README / ARCHITECTURE 中的流水线结构、检查点与完整性边界描述。
- 作为运行时技能的**方法摘要**，以及 `ars_guide` 读取用户本机 `SKILL.md` 的入口。

### 没有打包什么

- 没有复制 ARS 的 Claude Code agent 定义、技能文件、脚本或提示词全文。
- 没有在本仓库内分发上游仓库；运行时读取用户本机 checkout。
- 没有修改上游仓库。

### 本项目的原创部分

- 面板 UI、6 阶段可视化、表单、预览、路径校验、持久化、双语、测试、文档。
- `packages/academic-research-skills/index.js` 与 `client.js` 的集成代码。
- 运行时技能文本是对公开工作流的**原创摘要**，并明确标注上游与许可证。

### 许可证与非商业边界

`packages/academic-research-skills` 采用 **CC BY-NC 4.0**，因为该包改编了上游工作流结构并包含对其方法的摘要。

- **禁止商业使用**，除非获得上游权利人 Cheng-I Wu 的单独许可。
- 必须保留署名、许可证名称与链接。
- 不得暗示上游背书。
- 根仓库的 MIT 许可证**不覆盖**该包。

许可证全文见 `packages/academic-research-skills/LICENSE` 与 `LICENSES/CC-BY-NC-4.0.txt`。

## 4. 名称与商标

- “PPT Master”“Academic Research Skills” 是其各自权利人的名称/项目名。
- 本项目仅作描述性使用，不主张商标权，不表示官方关系。
- “DeepSeek Harness”“DSH” 是 DeepSeek 的产品/项目名称；本项目是其插件生态中的独立社区项目。

## 5. 第三方素材

- 界面图标与装饰 SVG 为本项目原创，使用 `currentColor` 或自有调色板。
- 不使用第三方字体；字体由 DSH/操作系统提供。
- 不使用第三方图片、图标库或遥测 SDK。
- 运行时零第三方依赖。

## 6. 修改与再分发

- 你可以按各自许可证修改与再分发本项目。
- 再分发时必须保留：
  - 根 `LICENSE`；
  - `NOTICE`；
  - `ATTRIBUTION.md`；
  - 包级 `LICENSE`；
  - 上游版权与许可证链接。
- 若修改 ARS 包，必须注明修改，并继续遵守 CC BY-NC 4.0。
- 若将 ARS 包用于商业目的，请先联系上游权利人；本项目维护者无权代为授权。

## 7. 免责声明

本项目按“现状”提供，不提供任何明示或暗示担保。上游工具的输出、模型生成内容、引用准确性、实验可复现性由使用者与上游负责。详见根 `LICENSE` 与各包许可证。

# 设计系统

> 目标不是「好看」，而是**让两个面板看起来像同一个产品，并且像 DSH 的一部分**。
> 规范以现有 `client.js` 的 CSS 为准；新增组件先对齐 token 与间距，再谈装饰。

## 1. 原则

1. **宿主优先**：颜色、字体、圆角、状态色跟随 DSH；不自建品牌皮肤。
2. **内容优先**：先让用户看清规格与指令，再放装饰。
3. **一个主行动**：每屏只有一个主按钮（PPT：填入新会话；ARS：同）。
4. **可停止**：预览是最终文本；发送前可改；不自动执行。
5. **克制**：不使用大幅渐变、玻璃拟态、伪 3D、无意义动画。
6. **双语等权**：中文与英文都不应被当作翻译补丁；布局要为长英文留空间。

## 2. Token

只使用 DSH 的语义 token，不直接使用基础色值。

| Token | 用途 |
| --- | --- |
| `--dsw-alias-bg-base` | 页面/输入框/预览正文背景 |
| `--dsw-alias-bg-layer-1` | 卡片背景 |
| `--dsw-alias-bg-layer-2` | 次级卡片、选中 chip、预览容器 |
| `--dsw-alias-label-primary` | 主文字、按钮文字 |
| `--dsw-alias-label-secondary` | 说明、标签、页脚 |
| `--dsw-alias-border-l1` | 常规边框、分隔线 |
| `--dsw-alias-border-l2` | hover 边框 |
| `--dsw-alias-brand-primary` | 主按钮、选中态、焦点环、eyebrow 点 |
| `--dsw-alias-state-success-primary` | 路径 ok、复制成功 |
| `--dsw-alias-state-warn-primary` | 路径 missing、复制失败 |
| `--dsw-alias-state-idle-primary` | 路径 idle/checking 点 |

规则：

- 禁止在 UI CSS 里写 `#hex`、`rgb()`、`hsl()`；只允许 `transparent`、`currentColor` 与 token。
- 装饰 SVG 可以用自有调色板，但必须 `aria-hidden="true"`，且不承载唯一信息。
- 不覆盖全局 token；不设置 `color-scheme`；让 DSH 决定明暗。

## 3. 布局

### 3.1 页面骨架

```text
Page（100% 高，纵向滚动）
└── Inner（max-width: 1000px；padding: 40px 40px 72px）
    ├── Hero（左文案 + 右装饰，2 列）
    ├── StepRail（3 步 / 6 阶段）
    ├── BuilderCard（表单 + 预览，2 列）
    ├── FeatureGrid / SkillGrid
    ├── IntegrityBand（仅 ARS）
    └── Footer
```

### 3.2 断点

| 宽度 | 变化 |
| --- | --- |
| > 880px | Hero 两列；Builder 两列；预览 sticky |
| ≤ 880px | Hero 单列，隐藏装饰；Builder 单列 |
| ≤ 640px | 页面 padding 28/22/56；步骤/双列字段改单列 |
| `prefers-reduced-motion` | 去掉按钮过渡 |

### 3.3 间距

- 基础单位：**4px**。
- 卡片内边距：22px（小屏 16–18px）。
- 字段间距：14px；标签与控件 6px。
- 区块间距：30–36px。
- 圆角：卡片 16px；输入/按钮 9–10px；chip 8px；状态点 50%。

## 4. 字体与层级

不引入字体；使用 DSH 继承字体。

| 层级 | 大小 | 用途 |
| --- | --- | --- |
| Hero 标题 | `clamp(26px, 3vw, 33px)` / 600 | 面板名 |
| 区块标题 | 15px / 600 | 卡片标题 |
| 正文 | 13–14px / 400–500 | 字段、说明 |
| 辅助 | 11.5–12.5px | 标签、状态、页脚 |
| Eyebrow | 11px / 600 / 大写 / 字距 .14–.16em | 产品线标识 |

行高：标题 1.22；正文 1.6–1.75；预览 1.7（等宽）。

## 5. 组件

### 5.1 按钮

| 类型 | 用途 | 规则 |
| --- | --- | --- |
| Primary | 填入新会话 | 品牌底 + `bg-base` 文字；hover 轻微提亮 |
| Ghost | 复制、选择文件夹、次行动 | 透明底 + `border-l2`；hover `bg-layer-2` |
| Chip | 画布/页数/节奏/路线 | `aria-pressed` 选中；选中用品牌边框 + `bg-layer-2` |
| Text action | 字段旁的「选择文件夹」 | 下划线、11.5px；不抢主按钮 |

所有按钮：高度 34–36px；`focus-visible` 2px 品牌环、offset 2px；disabled 透明度 .5 且 `cursor:not-allowed`。

### 5.2 输入

- 输入框/文本域/下拉：`bg-base` 背景、`border-l1` 边框、9px 圆角、13px 字号。
- focus：品牌边框 + 1px 外发光；不使用浏览器默认 outline。
- placeholder：`label-secondary`，透明度 .75。
- 文本域最小高度 88px，可纵向拉伸。

### 5.3 路径状态

```text
● 路径可读          （success 点 + 文字）
● 检查中…           （idle 点 + 文字）
● 路径不可读        （warn 点 + 文字）
```

- `role="status"`，文案随状态变化。
- 不显示「环境就绪」「可以生成」；`ok` 只表示可读。
- 检查 500ms debounce；不要在每个按键上闪烁。

### 5.4 预览

- 容器：`bg-layer-2`、1px 边框、12px 圆角、14px 内边距。
- 正文：等宽字体、11.5px、行高 1.7、`white-space: pre-wrap`、`word-break: break-word`。
- 最小高度 168px；最大高度 320px，内部滚动。
- 顶部：标题 + 复制；底部：主按钮 + 说明。
- 复制成功/失败用文字 + 状态色，不只变色。

### 5.5 卡片与步骤

- 卡片：`bg-layer-1`、`border-l1`、16px 圆角、22px 内边距。
- 步骤：顶部 1px 分隔线；序号用品牌色；标题 13px/600；说明 12.5px。
- 功能卡：图标底 30px `bg-layer-2`，图标品牌色；标题 13px；说明 12.5px。

## 6. 状态与反馈

| 状态 | 表现 |
| --- | --- |
| 默认 | 无多余阴影；边框清晰 |
| hover | 仅按钮/链接/卡片有轻微背景或边框变化 |
| focus | 2px 品牌环，始终可见 |
| disabled | 透明度 .5 + 禁用光标；不隐藏原因 |
| loading | 路径检查用文案「检查中…」，不用旋转骨架 |
| empty | 预览显示「待填写」占位，不显示假数据 |
| error | 文字说明 + warn 色；不弹 toast 阻塞 |

## 7. 动效

- 只用于按钮 hover/状态切换，`150ms ease`。
- 不做入场动画、视差、自动轮播。
- `prefers-reduced-motion: reduce` 时移除 transition。
- 不用动画表达「正在执行上游」——面板不执行。

## 8. 文案语气

- 短句、动词开头；避免「赋能」「一站式」「颠覆」。
- 能力与边界并列：能做什么、不做什么。
- 错误文案给下一步：缺什么、去哪填、怎么验证。
- 中文用全角标点；英文用 sentence case；不在按钮里用句号。
- 不把「可读」写成「可用」，不把「已放入输入框」写成「已发送」。

## 9. 图标与插画

- 侧栏图标：24×24 viewBox，`currentColor`，无填充背景。
- 装饰插画：内联 SVG，`aria-hidden`，不引用远程资源。
- 插画不模拟产品截图；不展示不存在的 UI 状态。
- 图标与文字同时出现时，图标不重复语义。

## 10. 评审清单

- [ ] 只使用 token，无硬编码 UI 颜色。
- [ ] 主行动唯一，次行动不抢视觉。
- [ ] 880/640 断点无溢出；长英文不截断关键信息。
- [ ] 键盘可达，焦点环可见。
- [ ] 状态有文字，不只靠颜色。
- [ ] 浅色/深色都可读。
- [ ] 没有装饰性动画/远程资源。
- [ ] 文案与 [红线](red-lines.md) 一致。

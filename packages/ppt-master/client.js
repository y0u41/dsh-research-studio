window.__ModuleLoader__.load({
  id: '@dsh-research-studio/ppt-master',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'ppt-master';
    const PANEL_ID = 'ppt-master';
    const REPO_URL = 'https://github.com/hugohe3/ppt-master';
    const DOCS_URL = 'https://github.com/hugohe3/ppt-master/blob/main/docs/getting-started.md';
    const EXAMPLES_URL = 'https://hugohe3.github.io/ppt-master-examples/';
    const STORAGE_KEY = 'dsh.ppt-master.v1';

    function loadStoredState() {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw === null) return {};
        const value = JSON.parse(raw);
        return value !== null && typeof value === 'object' ? value : {};
      } catch (error) {
        return {};
      }
    }

    function saveStoredState(state) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        // storage may be unavailable or full; the panel still works this session
      }
    }

    const SAVED = loadStoredState();

    const zh = {
      panel: 'PPT Master',
      eyebrow: 'PPT Master · 工作流',
      'hero.title': '把文档做成可编辑的 PowerPoint',
      'hero.intro': 'PPT Master 在你的机器上运行：读取 PDF、Word、网页或一句主题，先理清叙事，再逐页设计，最后导出带原生形状和图表的 .pptx；套用模板时保留母版与版式。',
      'hero.primary': '开始一份演示',
      'hero.secondary': 'GitHub 仓库',
      'steps.1.title': '放素材',
      'steps.1.desc': '把 PDF、DOCX、图片放进项目目录，或直接在下面粘贴要点。',
      'steps.2.title': '定规格',
      'steps.2.desc': '画布、页数、模板与图表方式，一次说清。',
      'steps.3.title': '出原生稿',
      'steps.3.desc': '导出 .pptx，每个元素都能在 PowerPoint 里继续改。',
      'builder.title': '组装工作流',
      'builder.badge': '指令实时预览',
      'form.source': '素材或主题',
      'form.sourcePlaceholder': 'projects/q3-report/sources/report.pdf，或一句话主题加要点',
      'form.canvas': '画布',
      'form.pages': '页数',
      'form.pace': '节奏',
      'form.route': '路线',
      'form.native': '图表和表格用 PowerPoint 原生对象（可在 PowerPoint 里“编辑数据”）',
      'form.repo': 'PPT Master 仓库路径（可选）',
      'form.repoPlaceholder': 'D:\\tools\\ppt-master',
      'form.pick': '选择文件夹',
      'form.pickShort': '选择',
      'status.idle': '未填写',
      'status.checking': '正在检查路径…',
      'status.ok': '路径可读',
      'status.missing': '找不到这个目录',
      'pages.auto': '按内容',
      'pages.auto.prompt': '由内容决定，先给我建议页数',
      'pace.full': '先确认规格',
      'pace.quick': '快速生成',
      'pace.full.prompt': '先给出设计规格（模板、画布、页数、视觉基调），我确认后再开始',
      'pace.quick.prompt': '跳过确认，一次完成并导出，不要中途提问',
      'route.free': '自由设计',
      'route.template': '套用我的 PPTX 模板',
      'route.edit': '填充已有的 PPTX',
      'route.distill': '提炼参考稿模板',
      'route.animate': '补动画与旁白',
      'route.free.prompt': '自由设计视觉，不套用外部模板',
      'route.template.prompt': '沿用我提供的 .pptx 模板，保留它的母版、版式与品牌元素',
      'route.edit.prompt': '在素材里提到的既有 .pptx 上做 Edit Native PPTX：保留原设计，只替换需要更新的页面',
      'route.distill.prompt': '先从参考稿里提炼品牌、版式与叙事节奏，做成可复用模板，再用它制作新内容',
      'route.animate.prompt': '在素材里提到的既有 .pptx 上补原生转场、动画与讲稿旁白，不重做内容',
      'charts.native.prompt': '导出 PowerPoint 原生图表与表格，保留“编辑数据”',
      'charts.shapes.prompt': '默认用可编辑形状绘制图表和表格',
      'format.wide': 'PPT 16:9',
      'format.xhs': '小红书 3:4',
      'format.wechat': '公众号封面',
      'format.a4': 'A4 竖版',
      'prompt.head': '请用 PPT Master 工作流制作一份演示文稿。',
      'prompt.loadSkill': '- 若技能目录里有 ppt-master，先加载它再开始。',
      'prompt.sourceLabel': '素材与主题：',
      'prompt.sourceEmpty': '（待补充：把源文件路径、主题或要点粘贴在这里）',
      'prompt.specLabel': '制作规格：',
      'prompt.canvas': '- 画布：{value}',
      'prompt.pages': '- 页数：{value}',
      'prompt.pagesValue': '约 {count} 页',
      'prompt.pace': '- 节奏：{value}',
      'prompt.route': '- 路线：{value}',
      'prompt.charts': '- 图表与表格：{value}',
      'prompt.repo': '仓库位置：{value}\n先调用 ppt_master_guide（参数 repoPath）读取该仓库的 SKILL.md，再按里面的流程执行。',
      'prompt.noRepo': '如果本机没有安装 PPT Master，先告诉我需要准备什么，不要声称已经运行了脚本。',
      'prompt.requireLabel': '输出要求：',
      'prompt.req1': '1. 先用 3–5 句话讲清叙事主线，再进入设计。',
      'prompt.req2': '2. 逐页设计，内容优先；数据不足时标注假设，不要编造。',
      'prompt.req3': '3. 导出 .pptx，保留可编辑的原生形状、文本与图表。',
      'prompt.req4': '4. 最后给出文件路径，以及每页一句话的要点。',
      'preview.title': '将填入新会话的指令',
      'preview.copy': '复制',
      'preview.copied': '已复制',
      'preview.copyFailed': '请手动全选复制',
      'preview.start': '填入新会话',
      'preview.hint': '会新建一个会话并把指令放进输入框；确认或修改后再发送。',
      'features.title': '它能做什么',
      'feat.shapes.title': '原生形状',
      'feat.shapes.desc': '每个元素都是 PowerPoint 对象，不是图片：点开就能改。',
      'feat.charts.title': '数据驱动图表',
      'feat.charts.desc': '柱状、折线、饼图等以原生 Chart / Table 导出，可“编辑数据”。',
      'feat.master.title': '母版与版式',
      'feat.master.desc': '套用模板时保留 sldMaster / sldLayout 的继承关系。',
      'feat.template.title': '模板蒸馏',
      'feat.template.desc': '从参考稿里提炼品牌、版式与节奏，复用到下一份。',
      'feat.edit.title': '改已有 PPTX',
      'feat.edit.desc': '保留原设计，只替换页面内容，未改页面保持不变。',
      'feat.motion.title': '转场与旁白',
      'feat.motion.desc': '补上原生转场、动画，以及由讲稿生成的旁白。',
      'foot.note': 'MIT · 在本机运行 · 需要 Python 3.10–3.14',
      'foot.docs': '使用文档',
      'foot.examples': '示例',
    };

    const en = {
      panel: 'PPT Master',
      eyebrow: 'PPT Master · workflow',
      'hero.title': 'Turn documents into editable PowerPoint',
      'hero.intro': 'PPT Master runs on your machine: it reads a PDF, Word file, web page, or a one-line topic, shapes the argument first, designs page by page, and exports a native .pptx with real shapes and charts; template routes keep their masters and layouts.',
      'hero.primary': 'Start a deck',
      'hero.secondary': 'GitHub repository',
      'steps.1.title': 'Drop in material',
      'steps.1.desc': 'Put PDFs, DOCX, or images in the project folder, or paste the key points below.',
      'steps.2.title': 'Set the spec',
      'steps.2.desc': 'Canvas, length, template, and chart handling in one pass.',
      'steps.3.title': 'Get a native deck',
      'steps.3.desc': 'Export a .pptx whose every element stays editable in PowerPoint.',
      'builder.title': 'Assemble the workflow',
      'builder.badge': 'Live prompt preview',
      'form.source': 'Source or topic',
      'form.sourcePlaceholder': 'projects/q3-report/sources/report.pdf, or a topic plus key points',
      'form.canvas': 'Canvas',
      'form.pages': 'Length',
      'form.pace': 'Pacing',
      'form.route': 'Route',
      'form.native': 'Use native PowerPoint charts and tables (editable data)',
      'form.repo': 'PPT Master repository path (optional)',
      'form.repoPlaceholder': 'D:\\tools\\ppt-master',
      'form.pick': 'Choose folder',
      'form.pickShort': 'Choose',
      'status.idle': 'Not set',
      'status.checking': 'Checking path…',
      'status.ok': 'Path is readable',
      'status.missing': 'Folder not found',
      'pages.auto': 'From content',
      'pages.auto.prompt': 'decide from the content and suggest a length first',
      'pace.full': 'Confirm spec first',
      'pace.quick': 'Quick generate',
      'pace.full.prompt': 'give me the design spec (template, canvas, length, visual tone) first and start after I confirm',
      'pace.quick.prompt': 'skip confirmation, finish and export in one pass without asking mid-way',
      'route.free': 'Free design',
      'route.template': 'Use my PPTX template',
      'route.edit': 'Fill an existing PPTX',
      'route.distill': 'Distill a template',
      'route.animate': 'Add motion and narration',
      'route.free.prompt': 'design the visuals freely without an external template',
      'route.template.prompt': 'reuse the .pptx template I provide and keep its masters, layouts, and brand elements',
      'route.edit.prompt': 'run Edit Native PPTX on the existing .pptx named in the material: keep its design and replace only the pages that need new content',
      'route.distill.prompt': 'first distill brand, layout, and narrative pacing from the reference deck into a reusable template, then build the new content with it',
      'route.animate.prompt': 'add native transitions, animations, and narration from speaker notes to the existing .pptx named in the material without redoing the content',
      'charts.native.prompt': 'export native PowerPoint charts and tables with editable data',
      'charts.shapes.prompt': 'draw charts and tables with editable shapes by default',
      'format.wide': 'PPT 16:9',
      'format.xhs': 'Xiaohongshu 3:4',
      'format.wechat': 'WeChat cover',
      'format.a4': 'A4 portrait',
      'prompt.head': 'Build a presentation with the PPT Master workflow.',
      'prompt.loadSkill': '- If the skill catalog lists ppt-master, load it before starting.',
      'prompt.sourceLabel': 'Source material and topic:',
      'prompt.sourceEmpty': '(to be filled in: paste the source file path, topic, or key points here)',
      'prompt.specLabel': 'Production spec:',
      'prompt.canvas': '- Canvas: {value}',
      'prompt.pages': '- Length: {value}',
      'prompt.pagesValue': 'about {count} slides',
      'prompt.pace': '- Pacing: {value}',
      'prompt.route': '- Route: {value}',
      'prompt.charts': '- Charts and tables: {value}',
      'prompt.repo': 'Repository: {value}\nCall ppt_master_guide with that repoPath first to read SKILL.md, then follow its workflow.',
      'prompt.noRepo': 'If PPT Master is not installed locally, tell me what to prepare first; do not claim that scripts were run.',
      'prompt.requireLabel': 'Output requirements:',
      'prompt.req1': '1. State the narrative spine in 3-5 sentences before designing.',
      'prompt.req2': '2. Design page by page, content first; never invent data and mark assumptions where facts are missing.',
      'prompt.req3': '3. Export the .pptx and keep shapes, text, and charts natively editable.',
      'prompt.req4': '4. Give me the file path plus a one-line takeaway for each slide.',
      'preview.title': 'Prompt to place in the new session',
      'preview.copy': 'Copy',
      'preview.copied': 'Copied',
      'preview.copyFailed': 'Select and copy manually',
      'preview.start': 'Place in a new session',
      'preview.hint': 'Opens a new session with the prompt in the composer; review or edit it, then send.',
      'features.title': 'What it delivers',
      'feat.shapes.title': 'Native shapes',
      'feat.shapes.desc': 'Every element is a PowerPoint object, not a picture: click and keep editing.',
      'feat.charts.title': 'Data-backed charts',
      'feat.charts.desc': 'Bars, lines, and pies export as native Chart / Table objects with editable data.',
      'feat.master.title': 'Masters and layouts',
      'feat.master.desc': 'Templates keep their sldMaster / sldLayout inheritance.',
      'feat.template.title': 'Template distillation',
      'feat.template.desc': 'Distill brand, layout, and pacing from a reference deck for the next one.',
      'feat.edit.title': 'Edit an existing PPTX',
      'feat.edit.desc': 'Keep the original design and replace only the pages that need new content.',
      'feat.motion.title': 'Transitions and narration',
      'feat.motion.desc': 'Add native transitions, animations, and narration from speaker notes.',
      'foot.note': 'MIT · runs locally · needs Python 3.10–3.14',
      'foot.docs': 'Getting started',
      'foot.examples': 'Examples',
    };

    const CSS = [
      '.pm-page{height:100%;overflow-y:auto;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary)}',
      '.pm-inner{box-sizing:border-box;width:100%;max-width:1000px;margin:0 auto;padding:40px 40px 72px}',
      '.pm-hero{display:grid;grid-template-columns:minmax(0,1fr) 236px;gap:36px;align-items:center;padding-bottom:30px}',
      '.pm-eyebrow{display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--dsw-alias-label-secondary)}',
      '.pm-eyebrow-dot{width:6px;height:6px;border-radius:50%;background:var(--dsw-alias-brand-primary)}',
      '.pm-title{margin:12px 0 14px;font-size:clamp(26px,3vw,33px);line-height:1.22;letter-spacing:-.022em;font-weight:600}',
      '.pm-intro{margin:0;max-width:58ch;font-size:14px;line-height:1.75;color:var(--dsw-alias-label-secondary)}',
      '.pm-hero-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}',
      '.pm-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;box-sizing:border-box;height:36px;padding:0 15px;border-radius:10px;border:1px solid transparent;font:inherit;font-size:13px;font-weight:600;line-height:1;text-decoration:none;cursor:pointer;transition:background .15s ease,border-color .15s ease,filter .15s ease}',
      '.pm-btn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}',
      '.pm-btn--primary{background:var(--dsw-alias-brand-primary);color:var(--dsw-alias-bg-base)}',
      '.pm-btn--primary:hover{filter:brightness(1.07)}',
      '.pm-btn--ghost{background:transparent;border-color:var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary)}',
      '.pm-btn--ghost:hover{background:var(--dsw-alias-bg-layer-2)}',
      '.pm-btn[disabled]{opacity:.5;cursor:not-allowed}',
      '.pm-btn--sm{height:34px;padding:0 10px;font-size:12px;font-weight:500}',
      '.pm-field-action{border:0;background:transparent;padding:0;font:inherit;font-size:11.5px;color:var(--dsw-alias-label-secondary);cursor:pointer;text-decoration:underline;text-underline-offset:2px}',
      '.pm-field-action:hover{color:var(--dsw-alias-label-primary)}',
      '.pm-field-action:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}',
      '.pm-row-inline{display:flex;align-items:stretch;gap:8px}',
      '.pm-row-inline .pm-input{flex:1;min-width:0}',
      '.pm-status{display:flex;align-items:center;gap:6px;margin-top:6px;font-size:11.5px;line-height:1.5;color:var(--dsw-alias-label-secondary)}',
      '.pm-status-dot{flex:none;width:6px;height:6px;border-radius:50%;background:var(--dsw-alias-state-idle-primary)}',
      '.pm-status[data-state="ok"] .pm-status-dot{background:var(--dsw-alias-state-success-primary)}',
      '.pm-status[data-state="missing"] .pm-status-dot{background:var(--dsw-alias-state-warn-primary)}',
      '.pm-art{display:block;width:100%;height:auto}',
      '.pm-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin:0 0 30px;padding:0;list-style:none}',
      '.pm-step{border-top:1px solid var(--dsw-alias-border-l1);padding-top:13px}',
      '.pm-step-n{display:block;font-size:11px;font-weight:600;letter-spacing:.08em;color:var(--dsw-alias-brand-primary)}',
      '.pm-step-title{margin:7px 0 4px;font-size:13px;font-weight:600;line-height:1.4}',
      '.pm-step-desc{margin:0;font-size:12.5px;line-height:1.6;color:var(--dsw-alias-label-secondary)}',
      '.pm-card{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l1);border-radius:16px;background:var(--dsw-alias-bg-layer-1);padding:22px}',
      '.pm-card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:18px}',
      '.pm-h2{margin:0;font-size:15px;font-weight:600;letter-spacing:-.01em}',
      '.pm-badge{flex:none;font-size:11px;line-height:1;color:var(--dsw-alias-label-secondary);border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-base);border-radius:999px;padding:5px 9px}',
      '.pm-builder-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:24px}',
      '.pm-field{display:block;margin-bottom:14px}',
      '.pm-field:last-child{margin-bottom:0}',
      '.pm-label-row{display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin-bottom:6px}',
      '.pm-label{font-size:12px;font-weight:600;color:var(--dsw-alias-label-secondary)}',
      '.pm-input,.pm-textarea,.pm-select{box-sizing:border-box;width:100%;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l1);border-radius:9px;padding:8px 10px;font:inherit;font-size:13px;line-height:1.5}',
      '.pm-textarea{min-height:88px;resize:vertical}',
      '.pm-input:focus,.pm-textarea:focus,.pm-select:focus{outline:none;border-color:var(--dsw-alias-brand-primary);box-shadow:0 0 0 1px var(--dsw-alias-brand-primary)}',
      '.pm-input::placeholder,.pm-textarea::placeholder{color:var(--dsw-alias-label-secondary);opacity:.75}',
      '.pm-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:12px}',
      '.pm-chips{display:flex;flex-wrap:wrap;gap:6px}',
      '.pm-chip{height:29px;padding:0 10px;border-radius:8px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;line-height:1;cursor:pointer}',
      '.pm-chip:hover{color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-border-l2)}',
      '.pm-chip[aria-pressed="true"]{color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-2);font-weight:600}',
      '.pm-chip:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}',
      '.pm-check{display:flex;align-items:flex-start;gap:9px;margin:2px 0 14px;font-size:12.5px;line-height:1.55;color:var(--dsw-alias-label-secondary);cursor:pointer}',
      '.pm-check input{flex:none;margin:2px 0 0;accent-color:var(--dsw-alias-brand-primary)}',
      '.pm-preview{display:flex;flex-direction:column;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l1);border-radius:12px;background:var(--dsw-alias-bg-layer-2);padding:14px}',
      '.pm-preview-head{display:flex;align-items:center;justify-content:space-between;gap:10px}',
      '.pm-preview-title{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--dsw-alias-label-secondary)}',
      '.pm-copy{border:0;background:transparent;padding:2px 4px;border-radius:6px;font:inherit;font-size:11.5px;font-weight:600;color:var(--dsw-alias-label-secondary);cursor:pointer}',
      '.pm-copy:hover{color:var(--dsw-alias-label-primary)}',
      '.pm-copy[data-state="ok"]{color:var(--dsw-alias-state-success-primary)}',
      '.pm-copy[data-state="fail"]{color:var(--dsw-alias-state-warn-primary)}',
      '.pm-pre{flex:1;box-sizing:border-box;min-height:168px;max-height:320px;overflow:auto;margin:10px 0 12px;padding:12px;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-base);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,"Liberation Mono",monospace;font-size:11.5px;line-height:1.7;white-space:pre-wrap;word-break:break-word;color:var(--dsw-alias-label-primary)}',
      '.pm-preview-actions{display:flex;flex-direction:column;gap:8px}',
      '.pm-hint{margin:0;font-size:11.5px;line-height:1.6;color:var(--dsw-alias-label-secondary)}',
      '.pm-section{margin-top:34px}',
      '.pm-features{display:grid;grid-template-columns:repeat(auto-fill,minmax(238px,1fr));gap:12px;margin-top:14px}',
      '.pm-feat{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l1);border-radius:12px;background:var(--dsw-alias-bg-layer-1);padding:16px}',
      '.pm-feat-icon{display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-brand-primary)}',
      '.pm-feat-title{margin:11px 0 5px;font-size:13px;font-weight:600;line-height:1.4}',
      '.pm-feat-desc{margin:0;font-size:12.5px;line-height:1.65;color:var(--dsw-alias-label-secondary)}',
      '.pm-foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px 18px;margin-top:36px;padding-top:18px;border-top:1px solid var(--dsw-alias-border-l1);font-size:11.5px;line-height:1.6;color:var(--dsw-alias-label-secondary)}',
      '.pm-foot-links{display:flex;flex-wrap:wrap;gap:16px}',
      '.pm-link{color:var(--dsw-alias-label-secondary);text-decoration:none;border-bottom:1px solid transparent}',
      '.pm-link:hover{color:var(--dsw-alias-label-primary);border-bottom-color:var(--dsw-alias-border-l2)}',
      '.pm-link:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}',
      '@media (max-width:880px){.pm-hero{grid-template-columns:minmax(0,1fr);gap:24px}.pm-art{display:none}.pm-builder-grid{grid-template-columns:minmax(0,1fr)}}',
      '@media (max-width:640px){.pm-inner{padding:28px 22px 56px}.pm-steps{grid-template-columns:minmax(0,1fr);gap:12px}.pm-grid-2{grid-template-columns:minmax(0,1fr)}}',
      '@media (prefers-reduced-motion:reduce){.pm-btn{transition:none}}',
    ].join('\n');

    const FORMATS = [
      { id: 'wide', key: 'format.wide' },
      { id: 'xhs', key: 'format.xhs' },
      { id: 'wechat', key: 'format.wechat' },
      { id: 'a4', key: 'format.a4' },
    ];

    const PAGE_COUNTS = [
      { id: '5' },
      { id: '8' },
      { id: '12' },
      { id: 'auto', key: 'pages.auto' },
    ];

    const FEATURES = [
      { id: 'shapes' },
      { id: 'charts' },
      { id: 'master' },
      { id: 'template' },
      { id: 'edit' },
      { id: 'motion' },
    ];

    function deckArt() {
      return h(
        'svg',
        { className: 'pm-art', viewBox: '0 0 260 220', 'aria-hidden': 'true', focusable: 'false' },
        h(
          'g',
          { transform: 'rotate(-8 122 108)' },
          h('rect', { x: 34, y: 44, width: 176, height: 118, rx: 10, fill: '#efe6d4', stroke: '#d8cab0', strokeWidth: 1.2 }),
        ),
        h(
          'g',
          { transform: 'rotate(4 134 112)' },
          h('rect', { x: 46, y: 40, width: 180, height: 124, rx: 10, fill: '#fbf6ea', stroke: '#e4d9c3', strokeWidth: 1.2 }),
          h('rect', { x: 46, y: 40, width: 180, height: 9, rx: 4.5, fill: '#e8633c', opacity: '0.85' }),
        ),
        h('rect', { x: 40, y: 62, width: 184, height: 130, rx: 11, fill: '#fffdf7', stroke: '#e2d7c0', strokeWidth: 1.2 }),
        h('rect', { x: 55, y: 78, width: 64, height: 8, rx: 4, fill: '#2a2622' }),
        h('rect', { x: 55, y: 93, width: 104, height: 4, rx: 2, fill: '#c9bfae' }),
        h('rect', { x: 55, y: 101, width: 86, height: 4, rx: 2, fill: '#c9bfae' }),
        h('rect', { x: 55, y: 118, width: 9, height: 24, rx: 2, fill: '#e8633c' }),
        h('rect', { x: 69, y: 110, width: 9, height: 32, rx: 2, fill: '#f2b544' }),
        h('rect', { x: 83, y: 124, width: 9, height: 18, rx: 2, fill: '#8aa384' }),
        h('rect', { x: 97, y: 104, width: 9, height: 38, rx: 2, fill: '#2a2622' }),
        h('rect', { x: 55, y: 150, width: 46, height: 3, rx: 1.5, fill: '#ded4c2' }),
        h('rect', { x: 151, y: 82, width: 56, height: 42, rx: 7, fill: '#f4ecdc' }),
        h('rect', { x: 160, y: 92, width: 38, height: 4, rx: 2, fill: '#b9ad98' }),
        h('rect', { x: 160, y: 101, width: 28, height: 4, rx: 2, fill: '#b9ad98' }),
        h('rect', { x: 160, y: 110, width: 33, height: 4, rx: 2, fill: '#b9ad98' }),
        h('circle', { cx: 206, cy: 170, r: 15, fill: '#e8633c' }),
        h('path', { d: 'M201 162.5l10 7.5-10 7.5z', fill: '#fff8ea' }),
      );
    }

    function featureGlyph(kind) {
      const base = {
        width: 17,
        height: 17,
        viewBox: '0 0 20 20',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.5,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': 'true',
      };
      if (kind === 'shapes') {
        return h('svg', base, h('rect', { x: 2.8, y: 3.4, width: 8.4, height: 8.4, rx: 1.6 }), h('rect', { x: 9.6, y: 9.4, width: 7.6, height: 7.2, rx: 1.6 }));
      }
      if (kind === 'charts') {
        return h('svg', base, h('path', { d: 'M3.4 16.2V9.6M8.3 16.2V4.6M13.2 16.2V7.4M18 16.2v-6' }));
      }
      if (kind === 'master') {
        return h('svg', base, h('rect', { x: 5.6, y: 3.2, width: 11.2, height: 8.2, rx: 1.5 }), h('path', { d: 'M3.2 6.6v8.4a1.6 1.6 0 0 0 1.6 1.6h8' }), h('path', { d: 'M8.4 6.6h5.6' }));
      }
      if (kind === 'template') {
        return h('svg', base, h('rect', { x: 3.2, y: 3.2, width: 13.6, height: 13.6, rx: 2 }), h('path', { d: 'M3.2 8.4h13.6M8.4 8.4v8.4' }));
      }
      if (kind === 'edit') {
        return h('svg', base, h('path', { d: 'M13.4 3.6l3 3-8.8 8.8-3.9.9.9-3.9z' }), h('path', { d: 'M11.6 5.4l3 3' }));
      }
      return h('svg', base, h('circle', { cx: 10, cy: 10, r: 7.2 }), h('path', { d: 'M8.4 6.9l4.6 3.1-4.6 3.1z' }));
    }

    function panelIcon(props) {
      const size = typeof props.size === 'number' ? props.size : 18;
      return h(
        'svg',
        {
          viewBox: '0 0 20 20',
          width: size,
          height: size,
          fill: 'none',
          'aria-hidden': 'true',
          focusable: 'false',
          style: { display: 'block' },
        },
        h('rect', { x: 2.6, y: 4.1, width: 14.8, height: 11.8, rx: 2.2, stroke: 'currentColor', strokeWidth: 1.4 }),
        h('path', { d: 'M2.6 7.5h14.8', stroke: 'currentColor', strokeWidth: 1.4 }),
        h('rect', { x: 5.2, y: 9.6, width: 6, height: 1.7, rx: 0.85, fill: 'currentColor' }),
        h('rect', { x: 5.2, y: 12.6, width: 9, height: 1.2, rx: 0.6, fill: 'currentColor', opacity: 0.55 }),
      );
    }

    function buildPrompt(t, values) {
      const lines = [];
      lines.push(t('prompt.head'));
      lines.push(t('prompt.loadSkill'));
      lines.push('');
      lines.push(t('prompt.sourceLabel'));
      lines.push(values.source.trim() === '' ? t('prompt.sourceEmpty') : values.source.trim());
      lines.push('');
      lines.push(t('prompt.specLabel'));
      lines.push(t('prompt.canvas', { value: t('format.' + values.format) }));
      lines.push(
        t('prompt.pages', {
          value: values.pages === 'auto' ? t('pages.auto.prompt') : t('prompt.pagesValue', { count: values.pages }),
        }),
      );
      lines.push(t('prompt.pace', { value: t('pace.' + values.pace + '.prompt') }));
      lines.push(t('prompt.route', { value: t('route.' + values.route + '.prompt') }));
      lines.push(t('prompt.charts', { value: t(values.native ? 'charts.native.prompt' : 'charts.shapes.prompt') }));
      lines.push('');
      if (values.repo.trim() !== '') lines.push(t('prompt.repo', { value: values.repo.trim() }));
      else lines.push(t('prompt.noRepo'));
      lines.push('');
      lines.push(t('prompt.requireLabel'));
      lines.push(t('prompt.req1'));
      lines.push(t('prompt.req2'));
      lines.push(t('prompt.req3'));
      lines.push(t('prompt.req4'));
      return lines.join('\n');
    }

    function PptMasterPanel(props) {
      const t = typeof props.t === 'function' ? props.t : (key) => key;
      const startSession = props.startSession;
      const pickDirectory = props.pickDirectory;

      const format = FORMATS.some((item) => item.id === SAVED.format) ? SAVED.format : 'wide';
      const pages = PAGE_COUNTS.some((item) => item.id === SAVED.pages) ? SAVED.pages : '8';
      const pace = SAVED.pace === 'quick' ? 'quick' : 'full';
      const route = ['free', 'template', 'edit', 'distill', 'animate'].includes(SAVED.route) ? SAVED.route : 'free';

      const [source, setSource] = React.useState(typeof SAVED.source === 'string' ? SAVED.source : '');
      const [formatId, setFormatId] = React.useState(format);
      const [pageCount, setPageCount] = React.useState(pages);
      const [paceId, setPaceId] = React.useState(pace);
      const [routeId, setRouteId] = React.useState(route);
      const [native, setNative] = React.useState(SAVED.native === true);
      const [repo, setRepo] = React.useState(typeof SAVED.repo === 'string' ? SAVED.repo : '');
      const [copyState, setCopyState] = React.useState('idle');
      const [repoStatus, setRepoStatus] = React.useState('idle');

      const sourceRef = React.useRef(null);
      const builderRef = React.useRef(null);
      const sourceId = React.useId();
      const checkRef = React.useRef(props.checkDirectory);
      checkRef.current = props.checkDirectory;

      const prompt = React.useMemo(
        () => buildPrompt(t, { source, format: formatId, pages: pageCount, pace: paceId, route: routeId, native, repo }),
        [t, source, formatId, pageCount, paceId, routeId, native, repo],
      );

      React.useEffect(() => {
        saveStoredState({
          source,
          format: formatId,
          pages: pageCount,
          pace: paceId,
          route: routeId,
          native,
          repo,
        });
      }, [source, formatId, pageCount, paceId, routeId, native, repo]);

      React.useEffect(() => {
        const value = repo.trim();
        if (value === '' || typeof checkRef.current !== 'function') {
          setRepoStatus('idle');
          return undefined;
        }
        setRepoStatus('checking');
        let cancelled = false;
        const timer = window.setTimeout(() => {
          Promise.resolve(checkRef.current(value)).then(
            (ok) => {
              if (!cancelled) setRepoStatus(ok ? 'ok' : 'missing');
            },
            () => {
              if (!cancelled) setRepoStatus('missing');
            },
          );
        }, 500);
        return () => {
          cancelled = true;
          window.clearTimeout(timer);
        };
      }, [repo]);

      const chooseDirectory = async (apply) => {
        if (typeof pickDirectory !== 'function') return;
        try {
          const picked = await pickDirectory();
          if (typeof picked === 'string' && picked !== '') apply(picked);
        } catch (error) {
          // the native picker was cancelled or is unavailable
        }
      };

      React.useEffect(() => {
        if (copyState === 'idle') return undefined;
        const timer = window.setTimeout(() => setCopyState('idle'), 2000);
        return () => window.clearTimeout(timer);
      }, [copyState]);

      const focusBuilder = () => {
        const node = builderRef.current;
        if (node && typeof node.scrollIntoView === 'function') node.scrollIntoView({ block: 'start', behavior: 'smooth' });
        if (sourceRef.current) sourceRef.current.focus({ preventScroll: true });
      };

      const copyPrompt = async () => {
        try {
          if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            await navigator.clipboard.writeText(prompt);
            setCopyState('ok');
            return;
          }
        } catch (error) {
          // fall through to the manual-copy state
        }
        setCopyState('fail');
      };

      const launch = () => {
        if (typeof startSession !== 'function') return;
        focusBuilder();
        startSession(prompt);
      };

      const onSourceKeyDown = (event) => {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          launch();
        }
      };

      return h(
        'section',
        { className: 'pm-page', 'aria-label': t('panel') },
        h(
          'div',
          { className: 'pm-inner' },
          h(
            'header',
            { className: 'pm-hero' },
            h(
              'div',
              null,
              h(
                'div',
                { className: 'pm-eyebrow' },
                h('span', { className: 'pm-eyebrow-dot', 'aria-hidden': 'true' }),
                t('eyebrow'),
              ),
              h('h1', { className: 'pm-title' }, t('hero.title')),
              h('p', { className: 'pm-intro' }, t('hero.intro')),
              h(
                'div',
                { className: 'pm-hero-actions' },
                h('button', { type: 'button', className: 'pm-btn pm-btn--primary', onClick: focusBuilder }, t('hero.primary')),
                h(
                  'a',
                  { className: 'pm-btn pm-btn--ghost', href: REPO_URL, target: '_blank', rel: 'noreferrer' },
                  t('hero.secondary'),
                ),
              ),
            ),
            deckArt(),
          ),

          h(
            'ol',
            { className: 'pm-steps' },
            [1, 2, 3].map((n) =>
              h(
                'li',
                { className: 'pm-step', key: n },
                h('span', { className: 'pm-step-n' }, '0' + n),
                h('h2', { className: 'pm-step-title' }, t('steps.' + n + '.title')),
                h('p', { className: 'pm-step-desc' }, t('steps.' + n + '.desc')),
              ),
            ),
          ),

          h(
            'section',
            { className: 'pm-card', ref: builderRef, 'aria-labelledby': 'pm-builder-title' },
            h(
              'div',
              { className: 'pm-card-head' },
              h('h2', { className: 'pm-h2', id: 'pm-builder-title' }, t('builder.title')),
              h('span', { className: 'pm-badge' }, t('builder.badge')),
            ),
            h(
              'div',
              { className: 'pm-builder-grid' },
              h(
                'div',
                { className: 'pm-form' },
                h(
                  'div',
                  { className: 'pm-field' },
                  h(
                    'div',
                    { className: 'pm-label-row' },
                    h('label', { className: 'pm-label', htmlFor: sourceId }, t('form.source')),
                    h(
                      'button',
                      { type: 'button', className: 'pm-field-action', onClick: () => chooseDirectory(setSource) },
                      t('form.pick'),
                    ),
                  ),
                  h('textarea', {
                    id: sourceId,
                    ref: sourceRef,
                    className: 'pm-textarea',
                    value: source,
                    placeholder: t('form.sourcePlaceholder'),
                    onChange: (event) => setSource(event.target.value),
                    onKeyDown: onSourceKeyDown,
                    spellCheck: false,
                  }),
                ),
                h(
                  'div',
                  { className: 'pm-field' },
                  h('div', { className: 'pm-label-row' }, h('span', { className: 'pm-label' }, t('form.canvas'))),
                  h(
                    'div',
                    { className: 'pm-chips', role: 'group', 'aria-label': t('form.canvas') },
                    FORMATS.map((item) =>
                      h(
                        'button',
                        {
                          key: item.id,
                          type: 'button',
                          className: 'pm-chip',
                          'aria-pressed': formatId === item.id,
                          onClick: () => setFormatId(item.id),
                        },
                        t(item.key),
                      ),
                    ),
                  ),
                ),
                h(
                  'div',
                  { className: 'pm-field' },
                  h('div', { className: 'pm-label-row' }, h('span', { className: 'pm-label' }, t('form.pages'))),
                  h(
                    'div',
                    { className: 'pm-chips', role: 'group', 'aria-label': t('form.pages') },
                    PAGE_COUNTS.map((item) =>
                      h(
                        'button',
                        {
                          key: item.id,
                          type: 'button',
                          className: 'pm-chip',
                          'aria-pressed': pageCount === item.id,
                          onClick: () => setPageCount(item.id),
                        },
                        item.key ? t(item.key) : item.id,
                      ),
                    ),
                  ),
                ),
                h(
                  'div',
                  { className: 'pm-grid-2' },
                  h(
                    'div',
                    { className: 'pm-field' },
                    h('div', { className: 'pm-label-row' }, h('label', { className: 'pm-label', htmlFor: 'pm-pace' }, t('form.pace'))),
                    h(
                      'select',
                      {
                        id: 'pm-pace',
                        className: 'pm-select',
                        value: paceId,
                        onChange: (event) => setPaceId(event.target.value),
                      },
                      h('option', { value: 'full' }, t('pace.full')),
                      h('option', { value: 'quick' }, t('pace.quick')),
                    ),
                  ),
                  h(
                    'div',
                    { className: 'pm-field' },
                    h('div', { className: 'pm-label-row' }, h('label', { className: 'pm-label', htmlFor: 'pm-route' }, t('form.route'))),
                    h(
                      'select',
                      {
                        id: 'pm-route',
                        className: 'pm-select',
                        value: routeId,
                        onChange: (event) => setRouteId(event.target.value),
                      },
                      h('option', { value: 'free' }, t('route.free')),
                      h('option', { value: 'template' }, t('route.template')),
                      h('option', { value: 'edit' }, t('route.edit')),
                      h('option', { value: 'distill' }, t('route.distill')),
                      h('option', { value: 'animate' }, t('route.animate')),
                    ),
                  ),
                ),
                h(
                  'label',
                  { className: 'pm-check' },
                  h('input', {
                    type: 'checkbox',
                    checked: native,
                    onChange: (event) => setNative(event.target.checked),
                  }),
                  h('span', null, t('form.native')),
                ),
                h(
                  'div',
                  { className: 'pm-field' },
                  h(
                    'div',
                    { className: 'pm-label-row' },
                    h('label', { className: 'pm-label', htmlFor: 'pm-repo' }, t('form.repo')),
                    h(
                      'button',
                      { type: 'button', className: 'pm-field-action', onClick: () => chooseDirectory(setRepo) },
                      t('form.pick'),
                    ),
                  ),
                  h(
                    'div',
                    { className: 'pm-row-inline' },
                    h('input', {
                      id: 'pm-repo',
                      className: 'pm-input',
                      type: 'text',
                      value: repo,
                      placeholder: t('form.repoPlaceholder'),
                      onChange: (event) => setRepo(event.target.value),
                      spellCheck: false,
                    }),
                    h(
                      'button',
                      { type: 'button', className: 'pm-btn pm-btn--ghost pm-btn--sm', onClick: () => chooseDirectory(setRepo) },
                      t('form.pickShort'),
                    ),
                  ),
                  h(
                    'div',
                    { className: 'pm-status', 'data-state': repoStatus, role: 'status' },
                    h('span', { className: 'pm-status-dot', 'aria-hidden': 'true' }),
                    h('span', null, t('status.' + repoStatus)),
                  ),
                ),
              ),
              h(
                'div',
                { className: 'pm-preview' },
                h(
                  'div',
                  { className: 'pm-preview-head' },
                  h('span', { className: 'pm-preview-title' }, t('preview.title')),
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'pm-copy',
                      'data-state': copyState === 'ok' ? 'ok' : copyState === 'fail' ? 'fail' : undefined,
                      onClick: copyPrompt,
                    },
                    t(copyState === 'ok' ? 'preview.copied' : copyState === 'fail' ? 'preview.copyFailed' : 'preview.copy'),
                  ),
                ),
                h('pre', { className: 'pm-pre', tabIndex: 0 }, prompt),
                h(
                  'div',
                  { className: 'pm-preview-actions' },
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'pm-btn pm-btn--primary',
                      onClick: launch,
                      disabled: typeof startSession !== 'function',
                    },
                    t('preview.start'),
                  ),
                  h('p', { className: 'pm-hint' }, t('preview.hint')),
                ),
              ),
            ),
          ),

          h(
            'section',
            { className: 'pm-section', 'aria-labelledby': 'pm-features-title' },
            h('h2', { className: 'pm-h2', id: 'pm-features-title' }, t('features.title')),
            h(
              'div',
              { className: 'pm-features' },
              FEATURES.map((item) =>
                h(
                  'article',
                  { className: 'pm-feat', key: item.id },
                  h('div', { className: 'pm-feat-icon' }, featureGlyph(item.id)),
                  h('h3', { className: 'pm-feat-title' }, t('feat.' + item.id + '.title')),
                  h('p', { className: 'pm-feat-desc' }, t('feat.' + item.id + '.desc')),
                ),
              ),
            ),
          ),

          h(
            'footer',
            { className: 'pm-foot' },
            h('span', null, t('foot.note')),
            h(
              'span',
              { className: 'pm-foot-links' },
              h('a', { className: 'pm-link', href: DOCS_URL, target: '_blank', rel: 'noreferrer' }, t('foot.docs')),
              h('a', { className: 'pm-link', href: EXAMPLES_URL, target: '_blank', rel: 'noreferrer' }, t('foot.examples')),
              h('a', { className: 'pm-link', href: REPO_URL, target: '_blank', rel: 'noreferrer' }, 'GitHub'),
            ),
          ),
        ),
      );
    }

    function apply(ctx) {
      ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'ppt-master: dictionaries');
      const t = ctx.locale.bind(NS);

      ctx.effect(() => {
        const tagId = 'ppt-master/panel.css';
        const existing = document.querySelector('style[data-plugin-css=' + JSON.stringify(tagId) + ']');
        if (existing !== null) return () => {};
        const tag = document.createElement('style');
        tag.dataset.plugin = 'ppt-master';
        tag.dataset.pluginCss = tagId;
        tag.textContent = CSS;
        document.head.appendChild(tag);
        return () => {
          tag.remove();
        };
      }, 'ppt-master: panel styles');

      ctx.effect(
        () =>
          ctx.slots.inject('sidebar.panellist', () =>
            ctx.slots.register(
              {
                name: 'sidebar.panellist',
                id: PANEL_ID,
                order: 40,
                label: () => t('panel'),
                locale: NS,
              },
              panelIcon,
            ),
          ),
        'ppt-master: sidebar entry',
      );

      ctx.effect(
        () =>
          ctx.slots.inject('main', () =>
            ctx.slots.register(
              {
                name: 'main',
                key: PANEL_ID,
                locale: NS,
                inject: () => ({
                  startSession: (prompt) =>
                    ctx.uiWorkspace.startSession(undefined, { prompt: prompt, clearPreviousDraft: true }),
                  pickDirectory: () => ctx.uiWorkspace.pickDirectory(),
                  checkDirectory: (path) => ctx.uiWorkspace.listDirectory(path).then(() => true, () => false),
                }),
              },
              PptMasterPanel,
            ),
          ),
        'ppt-master: main panel',
      );
    }

    return {
      inject: ['slots', 'locale', 'uiWorkspace'],
      apply,
    };
  },
});

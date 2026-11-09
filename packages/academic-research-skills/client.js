window.__ModuleLoader__.load({
  id: '@dsh-research-studio/academic-research-skills',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'ars';
    const PANEL_ID = 'ars';
    const REPO_URL = 'https://github.com/Imbad0202/academic-research-skills';
    const ARCH_URL = 'https://github.com/Imbad0202/academic-research-skills/blob/main/docs/ARCHITECTURE.md';
    const SETUP_URL = 'https://github.com/Imbad0202/academic-research-skills/blob/main/docs/SETUP.md';
    const STORAGE_KEY = 'dsh.ars.v1';

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
      panel: '学术研究',
      eyebrow: 'Academic Research Skills · 研究 → 投稿',
      'hero.title': '把研究做完，而不是把字写完',
      'hero.intro': 'ARS 把研究、写作、审稿、修订、定稿串成一条带检查点的流水线。它接手找文献、对引用、查一致性这些活；研究问题、方法和结论仍由你拍板。',
      'hero.primary': '组装一项任务',
      'hero.secondary': 'GitHub 仓库',
      'phases.1.title': '研究',
      'phases.1.desc': 'RQ Brief、方法蓝图、过 Semantic Scholar 核验的文献',
      'phases.2.title': '写作',
      'phases.2.desc': '大纲确认后成稿，材料缺口标 [MATERIAL GAP]',
      'phases.3.title': '完整性',
      'phases.3.desc': '7 类 AI 失败模式，逐条查完再放行',
      'phases.4.title': '审稿',
      'phases.4.desc': '期刊匹配加 3 位审稿人与 Devil\'s Advocate',
      'phases.5.title': '修订',
      'phases.5.desc': '回应逐条落表，最多两轮修订',
      'phases.6.title': '定稿',
      'phases.6.desc': '格式与 AI 披露，附过程记录与协作评估',
      'gate': '闸门',
      'builder.title': '组装任务',
      'builder.badge': '指令实时预览',
      'form.skill': '技能',
      'form.mode': '模式',
      'form.target': '研究对象',
      'form.targetPlaceholder': '一个研究问题、论文路径，或要回复的审稿意见',
      'form.language': '语言',
      'form.citation': '引用格式',
      'form.structure': '论文结构',
      'form.repo': 'ARS 仓库路径（可选）',
      'form.repoPlaceholder': 'D:\\tools\\academic-research-skills',
      'form.pick': '选择文件夹',
      'form.pickShort': '选择',
      'status.idle': '未填写',
      'status.checking': '正在检查路径…',
      'status.ok': '路径可读',
      'status.missing': '找不到这个目录',
      'preview.title': '将填入新会话的指令',
      'preview.copy': '复制',
      'preview.copied': '已复制',
      'preview.copyFailed': '请手动全选复制',
      'preview.start': '填入新会话',
      'preview.hint': '新建会话并把指令放进输入框，确认或修改后再发送。本机没装 ARS 时，agent 会先说明安装方式。',
      'skills.title': '五套技能',
      'skills.note': '4 套单技能共 33 种模式，加 1 个编排器。',
      'skill.dr.name': 'Deep Research',
      'skill.dr.desc': '13 个 agent 做选题、综述与核查；文献过 Semantic Scholar，主张与来源逐条对齐。',
      'skill.ap.name': 'Academic Paper',
      'skill.ap.desc': '12 个 agent 从大纲写到成稿，带风格校准、写作质量检查与抗泄漏协议。',
      'skill.pr.name': 'Paper Reviewer',
      'skill.pr.desc': '期刊匹配加 3 位动态审稿人与 Devil\'s Advocate；让步要过阈值，攻击强度保留。',
      'skill.pl.name': 'Academic Pipeline',
      'skill.pl.desc': '10 阶段编排器，2.5 / 4.5 两道强制完整性闸门，每个阶段都要你确认。',
      'skill.sr.name': 'SR-Screener',
      'skill.sr.desc': '双盲筛选加第三方裁决与 PRISMA 2020 计数，产出可交给写作阶段的文献语料。',
      'skill.agents': '{count} agents',
      'skill.modes': '{count} 种模式',
      'integrity.title': '完整性检查：查到什么，查不到什么',
      'integrity.checkTitle': '会检查',
      'integrity.check1': '引用是否存在，主张与来源是否对齐',
      'integrity.check2': '方法是否如实报告，实验与结果是否对齐',
      'integrity.check3': '图表保真度与报告、流程、打包规范',
      'integrity.noTitle': '不会证明',
      'integrity.no1': '实验是否真的做过',
      'integrity.no2': '原始数据是否真实',
      'integrity.no3': '结果是否可复现',
      'integrity.note': '一份前后一致编造出来的稿子可以通过这些检查。所以 ARS 是副驾驶：问题、方法、解释与结论仍由你负责。',
      'foot.note': 'CC BY-NC 4.0 · Cheng-I Wu · 需要 Claude Code 与 ARS',
      'foot.arch': '架构文档',
      'foot.setup': '安装指南',
      'lang.zh': '中文',
      'lang.en': 'English',
      'cite.apa': 'APA 7.0',
      'cite.chicago': 'Chicago',
      'cite.mla': 'MLA',
      'cite.ieee': 'IEEE',
      'cite.vancouver': 'Vancouver',
      'struct.imrad': 'IMRaD（实证研究）',
      'struct.lit': '主题式文献综述',
      'struct.theory': '理论分析',
      'struct.case': '案例研究',
      'struct.policy': '政策简报',
      'struct.conf': '会议论文',
      'prompt.head': '请用 Academic Research Skills（ARS）完成一项学术任务。',
      'prompt.loadSkill': '- 若技能目录里有 academic-research-skills，先加载它再开始。',
      'prompt.skillLine': '- 技能：{value}',
      'prompt.mode': '- 模式：{value}',
      'prompt.targetLabel': '研究对象：',
      'prompt.targetEmpty': '（待补充：研究问题、论文路径或审稿意见）',
      'prompt.lang': '- 交流与写作语言：{value}',
      'prompt.citation': '- 引用格式：{value}（涉及写作时）',
      'prompt.structure': '- 论文结构：{value}（涉及写作时）',
      'prompt.repo': '仓库位置：{value}\n先调用 ars_guide（参数 repoPath）读取该仓库的 academic-pipeline/SKILL.md，再按其中的阶段和检查点执行。',
      'prompt.noRepo': '如果本机没有安装 ARS，先告诉我安装方式（/plugin marketplace add Imbad0202/academic-research-skills），不要假装已经运行。',
      'prompt.requireLabel': '执行要求：',
      'prompt.req1': '1. 按 ARS 的阶段推进，每个检查点停下来等我确认，不要一次跑完。',
      'prompt.req2': '2. 每个阶段先给产物清单与判断依据，再写内容；不要用篇幅代替论证。',
      'prompt.req3': '3. 不要编造引用、作者、年份或 DOI；每条引用必须可核验，不确定的文献明确标注。',
      'prompt.req4': '4. 到 Stage 2.5 / 4.5 时逐条报告完整性检查结果，不要笼统地说“已检查”。完整性检查**不能证明**实验真的做过、数据真实或结果可复现。',
      'prompt.req5': '5. 把关键判断留给我：研究问题、方法选择、数据解释与最终结论必须由我确认。',
      'prompt.req6': '6. 结束时给出：产物路径、仍未解决的问题、下一步建议。',
      'mode.dr.full': '全流程',
      'mode.dr.quick': '快速简报',
      'mode.dr.socratic': '苏格拉底引导',
      'mode.dr.lit-review': '文献综述',
      'mode.dr.systematic-review': 'PRISMA 系统综述',
      'mode.dr.fact-check': '事实核查',
      'mode.dr.review': '研究质量评估',
      'mode.dr.three-way-scan': 'WHY / HOW / WHAT 三向扫描',
      'mode.ap.full': '全流程写作',
      'mode.ap.plan': '引导式规划',
      'mode.ap.outline-only': '只要大纲',
      'mode.ap.revision': '按审稿意见修订',
      'mode.ap.revision-coach': '审稿意见拆解',
      'mode.ap.abstract-only': '只写摘要',
      'mode.ap.lit-review': '综述论文',
      'mode.ap.format-convert': '格式与引用转换',
      'mode.ap.citation-check': '引用检查',
      'mode.ap.disclosure': 'AI 披露声明',
      'mode.ap.rebuttal-audit': '回复信审计',
      'mode.pr.full': '完整评审',
      'mode.pr.re-review': '复审',
      'mode.pr.quick': '快速评估',
      'mode.pr.methodology-focus': '方法审查',
      'mode.pr.guided': '引导改进',
      'mode.pr.calibration': '按金标集校准',
      'mode.pl.orchestrator': '全流程编排（Stage 1 起）',
      'mode.pl.entry25': '已有论文，从 Stage 2.5 进入',
      'mode.pl.entry4': '收到审稿意见，从 Stage 4 进入',
      'mode.pl.resume': '从 Material Passport 续跑',
      'mode.sr.protocol': '生成筛选方案',
      'mode.sr.quick': '单条快速判断',
      'mode.sr.pilot': '种子研究试筛',
      'mode.sr.ta-screen': '标题摘要筛选',
      'mode.sr.ft-screen': '全文筛选',
      'mode.sr.adjudicate': '冲突裁决',
      'mode.sr.audit': '排除复核',
      'mode.sr.report': 'PRISMA 计数报告',
    };

    const en = {
      panel: 'Research',
      eyebrow: 'Academic Research Skills · research → submission',
      'hero.title': 'Finish the research, not just the prose',
      'hero.intro': 'ARS strings research, writing, review, revision, and finalization into one checkpointed pipeline. It takes over the literature hunting, citation matching, and consistency checks; the question, the method, and the conclusions stay yours.',
      'hero.primary': 'Assemble a task',
      'hero.secondary': 'GitHub repository',
      'phases.1.title': 'Research',
      'phases.1.desc': 'RQ brief, methodology blueprint, Semantic Scholar-verified literature',
      'phases.2.title': 'Write',
      'phases.2.desc': 'Draft after outline approval; gaps tagged [MATERIAL GAP]',
      'phases.3.title': 'Integrity',
      'phases.3.desc': 'Seven AI failure modes, checked before anything advances',
      'phases.4.title': 'Review',
      'phases.4.desc': 'Journal fit plus three reviewers and a Devil\'s Advocate',
      'phases.5.title': 'Revise',
      'phases.5.desc': 'Every response traced; at most two revision loops',
      'phases.6.title': 'Finalize',
      'phases.6.desc': 'Format and AI disclosure, with a process and collaboration record',
      'gate': 'gate',
      'builder.title': 'Assemble the task',
      'builder.badge': 'Live prompt preview',
      'form.skill': 'Skill',
      'form.mode': 'Mode',
      'form.target': 'Subject',
      'form.targetPlaceholder': 'A research question, a manuscript path, or reviewer comments to answer',
      'form.language': 'Language',
      'form.citation': 'Citation style',
      'form.structure': 'Paper structure',
      'form.repo': 'ARS repository path (optional)',
      'form.repoPlaceholder': 'D:\\tools\\academic-research-skills',
      'form.pick': 'Choose folder',
      'form.pickShort': 'Choose',
      'status.idle': 'Not set',
      'status.checking': 'Checking path…',
      'status.ok': 'Path is readable',
      'status.missing': 'Folder not found',
      'preview.title': 'Prompt to place in the new session',
      'preview.copy': 'Copy',
      'preview.copied': 'Copied',
      'preview.copyFailed': 'Select and copy manually',
      'preview.start': 'Place in a new session',
      'preview.hint': 'Opens a new session with the prompt in the composer; review it, then send. Without ARS installed, the agent explains how to install it first.',
      'skills.title': 'Five skills',
      'skills.note': 'Four single-purpose skills with 33 modes, plus the orchestrator.',
      'skill.dr.name': 'Deep Research',
      'skill.dr.desc': 'Thirteen agents for framing, synthesis, and verification; literature checked through Semantic Scholar, claims aligned to sources.',
      'skill.ap.name': 'Academic Paper',
      'skill.ap.desc': 'Twelve agents from outline to manuscript, with style calibration, a writing quality check, and an anti-leakage protocol.',
      'skill.pr.name': 'Paper Reviewer',
      'skill.pr.desc': 'Journal fit plus three adaptive reviewers and a Devil\'s Advocate; concessions must clear a threshold, attack intensity is preserved.',
      'skill.pl.name': 'Academic Pipeline',
      'skill.pl.desc': 'A ten-stage orchestrator with mandatory integrity gates at 2.5 and 4.5, and a confirmation checkpoint at every stage.',
      'skill.sr.name': 'SR-Screener',
      'skill.sr.desc': 'Two blinded reviewers, an adjudicator, and PRISMA 2020 counts, producing a corpus for the writing stage.',
      'skill.agents': '{count} agents',
      'skill.modes': '{count} modes',
      'integrity.title': 'Integrity checks: what they find, what they cannot prove',
      'integrity.checkTitle': 'Checks',
      'integrity.check1': 'Whether citations exist and claims align with their sources',
      'integrity.check2': 'Whether the method is reported honestly and experiments match results',
      'integrity.check3': 'Figure fidelity, reporting, process, and packaging conformance',
      'integrity.noTitle': 'Does not prove',
      'integrity.no1': 'That the experiments were actually performed',
      'integrity.no2': 'That the raw data are authentic',
      'integrity.no3': 'That the results reproduce',
      'integrity.note': 'A consistently fabricated manuscript can pass these checks. ARS is a copilot: the question, method, interpretation, and conclusions remain your responsibility.',
      'foot.note': 'CC BY-NC 4.0 · Cheng-I Wu · needs Claude Code and ARS',
      'foot.arch': 'Architecture',
      'foot.setup': 'Setup guide',
      'lang.zh': 'Chinese',
      'lang.en': 'English',
      'cite.apa': 'APA 7.0',
      'cite.chicago': 'Chicago',
      'cite.mla': 'MLA',
      'cite.ieee': 'IEEE',
      'cite.vancouver': 'Vancouver',
      'struct.imrad': 'IMRaD (empirical)',
      'struct.lit': 'Thematic literature review',
      'struct.theory': 'Theoretical analysis',
      'struct.case': 'Case study',
      'struct.policy': 'Policy brief',
      'struct.conf': 'Conference paper',
      'prompt.head': 'Complete an academic task with Academic Research Skills (ARS).',
      'prompt.loadSkill': '- If the skill catalog lists academic-research-skills, load it before starting.',
      'prompt.skillLine': '- Skill: {value}',
      'prompt.mode': '- Mode: {value}',
      'prompt.targetLabel': 'Subject:',
      'prompt.targetEmpty': '(to be filled in: the research question, manuscript path, or reviewer comments)',
      'prompt.lang': '- Working language: {value}',
      'prompt.citation': '- Citation style: {value} (when writing)',
      'prompt.structure': '- Paper structure: {value} (when writing)',
      'prompt.repo': 'Repository: {value}\nCall ars_guide with that repoPath first to read academic-pipeline/SKILL.md, then follow its stages and checkpoints.',
      'prompt.noRepo': 'If ARS is not installed locally, tell me how to install it (/plugin marketplace add Imbad0202/academic-research-skills) instead of pretending it ran.',
      'prompt.requireLabel': 'Requirements:',
      'prompt.req1': '1. Follow the ARS stages and Stop at every checkpoint for my confirmation; do not run the whole pipeline in one pass.',
      'prompt.req2': '2. At each stage, give the artifact list and the reasoning first, then the content; do not substitute length for argument.',
      'prompt.req3': '3. Never fabricate citations, authors, years, or DOIs; every citation must be verifiable and uncertain references must be marked explicitly.',
      'prompt.req4': '4. At Stage 2.5 and 4.5, report integrity results item by item instead of saying "checked". This integrity check does **not** prove that experiments ran, data is authentic, or results reproduce.',
      'prompt.req5': '5. Leave the key judgements to me: the research question, method choice, data interpretation, and final conclusions need my confirmation.',
      'prompt.req6': '6. Finish with the artifact paths, the open questions, and the next step.',
      'mode.dr.full': 'Full pipeline',
      'mode.dr.quick': 'Quick brief',
      'mode.dr.socratic': 'Socratic guidance',
      'mode.dr.lit-review': 'Literature review',
      'mode.dr.systematic-review': 'PRISMA systematic review',
      'mode.dr.fact-check': 'Fact check',
      'mode.dr.review': 'Research quality review',
      'mode.dr.three-way-scan': 'WHY / HOW / WHAT scan',
      'mode.ap.full': 'Full paper',
      'mode.ap.plan': 'Guided planning',
      'mode.ap.outline-only': 'Outline only',
      'mode.ap.revision': 'Revise from reviews',
      'mode.ap.revision-coach': 'Parse reviewer comments',
      'mode.ap.abstract-only': 'Abstract only',
      'mode.ap.lit-review': 'Literature review paper',
      'mode.ap.format-convert': 'Format and citation conversion',
      'mode.ap.citation-check': 'Citation check',
      'mode.ap.disclosure': 'AI disclosure statement',
      'mode.ap.rebuttal-audit': 'Rebuttal audit',
      'mode.pr.full': 'Full review',
      'mode.pr.re-review': 'Re-review',
      'mode.pr.quick': 'Quick assessment',
      'mode.pr.methodology-focus': 'Methodology focus',
      'mode.pr.guided': 'Guided improvement',
      'mode.pr.calibration': 'Calibrate against a gold set',
      'mode.pl.orchestrator': 'Full orchestration (from Stage 1)',
      'mode.pl.entry25': 'Existing paper, enter at Stage 2.5',
      'mode.pl.entry4': 'Reviewer comments, enter at Stage 4',
      'mode.pl.resume': 'Resume from a Material Passport',
      'mode.sr.protocol': 'Build a screening protocol',
      'mode.sr.quick': 'Single-record triage',
      'mode.sr.pilot': 'Pilot with seed studies',
      'mode.sr.ta-screen': 'Title and abstract screening',
      'mode.sr.ft-screen': 'Full-text screening',
      'mode.sr.adjudicate': 'Adjudicate conflicts',
      'mode.sr.audit': 'Audit exclusions',
      'mode.sr.report': 'PRISMA counts report',
    };

    const CSS = [
      '.ars-page{height:100%;overflow-y:auto;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary)}',
      '.ars-inner{box-sizing:border-box;width:100%;max-width:1000px;margin:0 auto;padding:40px 40px 72px}',
      '.ars-hero{display:grid;grid-template-columns:minmax(0,1fr) 244px;gap:36px;align-items:center;padding-bottom:26px}',
      '.ars-eyebrow{display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--dsw-alias-label-secondary)}',
      '.ars-eyebrow-dot{flex:none;width:6px;height:6px;border-radius:1px;background:var(--dsw-alias-brand-primary);transform:rotate(45deg)}',
      '.ars-title{margin:12px 0 14px;font-size:clamp(26px,3vw,33px);line-height:1.24;letter-spacing:-.022em;font-weight:600}',
      '.ars-lead{margin:0;max-width:58ch;font-size:14px;line-height:1.75;color:var(--dsw-alias-label-secondary)}',
      '.ars-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}',
      '.ars-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;box-sizing:border-box;height:36px;padding:0 15px;border-radius:8px;border:1px solid transparent;font:inherit;font-size:13px;font-weight:600;line-height:1;text-decoration:none;cursor:pointer;transition:background .15s ease,border-color .15s ease,filter .15s ease}',
      '.ars-btn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}',
      '.ars-btn--primary{background:var(--dsw-alias-brand-primary);color:var(--dsw-alias-bg-base)}',
      '.ars-btn--primary:hover{filter:brightness(1.07)}',
      '.ars-btn--ghost{background:transparent;border-color:var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary)}',
      '.ars-btn--ghost:hover{background:var(--dsw-alias-bg-layer-2)}',
      '.ars-btn[disabled]{opacity:.5;cursor:not-allowed}',
      '.ars-btn--sm{height:34px;padding:0 10px;font-size:12px;font-weight:500}',
      '.ars-field-action{border:0;background:transparent;padding:0;font:inherit;font-size:11.5px;color:var(--dsw-alias-label-secondary);cursor:pointer;text-decoration:underline;text-underline-offset:2px}',
      '.ars-field-action:hover{color:var(--dsw-alias-label-primary)}',
      '.ars-field-action:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}',
      '.ars-row-inline{display:flex;align-items:stretch;gap:8px}',
      '.ars-row-inline .ars-input{flex:1;min-width:0}',
      '.ars-status{display:flex;align-items:center;gap:6px;margin-top:6px;font-size:11.5px;line-height:1.5;color:var(--dsw-alias-label-secondary)}',
      '.ars-status-dot{flex:none;width:6px;height:6px;border-radius:50%;background:var(--dsw-alias-state-idle-primary)}',
      '.ars-status[data-state="ok"] .ars-status-dot{background:var(--dsw-alias-state-success-primary)}',
      '.ars-status[data-state="missing"] .ars-status-dot{background:var(--dsw-alias-state-warn-primary)}',
      '.ars-art{display:block;width:100%;height:auto}',
      '.ars-phases{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));overflow:hidden;margin:0 0 30px;padding:0;list-style:none;border:1px solid var(--dsw-alias-border-l1);border-radius:12px;background:var(--dsw-alias-bg-layer-1)}',
      '.ars-phase{box-sizing:border-box;min-width:0;padding:13px 13px 14px;border-left:1px solid var(--dsw-alias-border-l1)}',
      '.ars-phase:first-child{border-left:0}',
      '.ars-phase[data-gate="true"]{box-shadow:inset 0 3px 0 var(--dsw-alias-state-warn-primary)}',
      '.ars-phase-n{display:flex;align-items:center;gap:6px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:10px;letter-spacing:.1em;color:var(--dsw-alias-label-secondary)}',
      '.ars-gate{font-family:inherit;font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--dsw-alias-state-warn-primary);border:1px solid currentColor;border-radius:3px;padding:1px 3px}',
      '.ars-phase-title{margin:7px 0 4px;font-size:13px;font-weight:600;line-height:1.35}',
      '.ars-phase-desc{margin:0;font-size:11.5px;line-height:1.55;color:var(--dsw-alias-label-secondary)}',
      '.ars-card{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l1);border-radius:12px;background:var(--dsw-alias-bg-layer-1);padding:22px}',
      '.ars-card-head{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px 12px;margin-bottom:18px}',
      '.ars-h2{margin:0;font-size:15px;font-weight:600;letter-spacing:-.01em}',
      '.ars-badge{flex:none;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:10.5px;line-height:1;color:var(--dsw-alias-label-secondary);border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-base);border-radius:4px;padding:5px 7px}',
      '.ars-builder-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:24px}',
      '.ars-field{display:block;margin-bottom:14px}',
      '.ars-field:last-child{margin-bottom:0}',
      '.ars-label-row{display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin-bottom:6px}',
      '.ars-label{font-size:12px;font-weight:600;color:var(--dsw-alias-label-secondary)}',
      '.ars-input,.ars-textarea,.ars-select{box-sizing:border-box;width:100%;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l1);border-radius:7px;padding:8px 10px;font:inherit;font-size:13px;line-height:1.5}',
      '.ars-textarea{min-height:84px;resize:vertical}',
      '.ars-input:focus,.ars-textarea:focus,.ars-select:focus{outline:none;border-color:var(--dsw-alias-brand-primary);box-shadow:0 0 0 1px var(--dsw-alias-brand-primary)}',
      '.ars-input::placeholder,.ars-textarea::placeholder{color:var(--dsw-alias-label-secondary);opacity:.75}',
      '.ars-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:12px}',
      '.ars-preview{display:flex;flex-direction:column;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-2);padding:14px}',
      '.ars-preview-head{display:flex;align-items:center;justify-content:space-between;gap:10px}',
      '.ars-preview-title{font-size:10.5px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--dsw-alias-label-secondary)}',
      '.ars-copy{border:0;background:transparent;padding:2px 4px;border-radius:5px;font:inherit;font-size:11.5px;font-weight:600;color:var(--dsw-alias-label-secondary);cursor:pointer}',
      '.ars-copy:hover{color:var(--dsw-alias-label-primary)}',
      '.ars-copy[data-state="ok"]{color:var(--dsw-alias-state-success-primary)}',
      '.ars-copy[data-state="fail"]{color:var(--dsw-alias-state-warn-primary)}',
      '.ars-pre{flex:1;box-sizing:border-box;min-height:186px;max-height:330px;overflow:auto;margin:10px 0 12px;padding:12px;border:1px solid var(--dsw-alias-border-l1);border-radius:6px;background:var(--dsw-alias-bg-base);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,"Liberation Mono",monospace;font-size:11.5px;line-height:1.7;white-space:pre-wrap;word-break:break-word;color:var(--dsw-alias-label-primary)}',
      '.ars-preview-actions{display:flex;flex-direction:column;gap:8px}',
      '.ars-hint{margin:0;font-size:11.5px;line-height:1.6;color:var(--dsw-alias-label-secondary)}',
      '.ars-section{margin-top:34px}',
      '.ars-skills{display:block;margin:12px 0 0;padding:0;list-style:none;border-top:1px solid var(--dsw-alias-border-l1)}',
      '.ars-skill{display:grid;grid-template-columns:42px minmax(0,1fr);gap:10px;padding:16px 0 17px;border-bottom:1px solid var(--dsw-alias-border-l1)}',
      '.ars-index{padding-top:2px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;color:var(--dsw-alias-label-secondary)}',
      '.ars-skill-head{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px}',
      '.ars-skill-name{margin:0;font-size:14px;font-weight:600;line-height:1.4}',
      '.ars-meta{font-size:11.5px;color:var(--dsw-alias-label-secondary)}',
      '.ars-skill-desc{margin:4px 0 9px;max-width:70ch;font-size:12.5px;line-height:1.65;color:var(--dsw-alias-label-secondary)}',
      '.ars-tags{display:flex;flex-wrap:wrap;gap:5px}',
      '.ars-tag{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:10.5px;line-height:1;color:var(--dsw-alias-label-secondary);border:1px solid var(--dsw-alias-border-l1);border-radius:4px;background:var(--dsw-alias-bg-base);padding:3px 5px}',
      '.ars-check{box-sizing:border-box;margin-top:34px;border:1px solid var(--dsw-alias-border-l1);border-radius:12px;background:var(--dsw-alias-bg-layer-1);padding:20px}',
      '.ars-check-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:14px}',
      '.ars-check-title{margin:0;font-size:12px;font-weight:600;letter-spacing:.04em}',
      '.ars-check-title[data-tone="warn"]{color:var(--dsw-alias-state-warn-primary)}',
      '.ars-check-list{margin:7px 0 0;padding-left:16px;color:var(--dsw-alias-label-secondary)}',
      '.ars-check-list li{margin:0 0 4px;font-size:12.5px;line-height:1.65}',
      '.ars-check-list li:last-child{margin-bottom:0}',
      '.ars-check-note{margin:16px 0 0;padding-top:14px;border-top:1px dashed var(--dsw-alias-border-l2);font-size:12.5px;line-height:1.7;color:var(--dsw-alias-label-secondary)}',
      '.ars-foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px 18px;margin-top:34px;padding-top:18px;border-top:1px solid var(--dsw-alias-border-l1);font-size:11.5px;line-height:1.6;color:var(--dsw-alias-label-secondary)}',
      '.ars-foot-links{display:flex;flex-wrap:wrap;gap:16px}',
      '.ars-link{color:var(--dsw-alias-label-secondary);text-decoration:none;border-bottom:1px solid transparent}',
      '.ars-link:hover{color:var(--dsw-alias-label-primary);border-bottom-color:var(--dsw-alias-border-l2)}',
      '.ars-link:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}',
      '@media (max-width:900px){.ars-hero{grid-template-columns:minmax(0,1fr);gap:24px}.ars-art{display:none}.ars-builder-grid{grid-template-columns:minmax(0,1fr)}.ars-phases{grid-template-columns:repeat(3,minmax(0,1fr))}.ars-phase:nth-child(4){border-left:0}}',
      '@media (max-width:640px){.ars-inner{padding:28px 22px 56px}.ars-phases{grid-template-columns:repeat(2,minmax(0,1fr))}.ars-phase:nth-child(odd){border-left:0}.ars-grid-2{grid-template-columns:minmax(0,1fr)}.ars-check-grid{grid-template-columns:minmax(0,1fr);gap:16px}.ars-skill{grid-template-columns:32px minmax(0,1fr)}}',
      '@media (prefers-reduced-motion:reduce){.ars-btn{transition:none}}',
    ].join('\n');

    const SKILLS = [
      {
        id: 'dr',
        pkg: 'deep-research',
        name: 'skill.dr.name',
        desc: 'skill.dr.desc',
        agents: 13,
        modes: [
          ['full', 'mode.dr.full'],
          ['quick', 'mode.dr.quick'],
          ['socratic', 'mode.dr.socratic'],
          ['lit-review', 'mode.dr.lit-review'],
          ['systematic-review', 'mode.dr.systematic-review'],
          ['fact-check', 'mode.dr.fact-check'],
          ['review', 'mode.dr.review'],
          ['three-way-scan', 'mode.dr.three-way-scan'],
        ],
      },
      {
        id: 'ap',
        pkg: 'academic-paper',
        name: 'skill.ap.name',
        desc: 'skill.ap.desc',
        agents: 12,
        modes: [
          ['full', 'mode.ap.full'],
          ['plan', 'mode.ap.plan'],
          ['outline-only', 'mode.ap.outline-only'],
          ['revision', 'mode.ap.revision'],
          ['revision-coach', 'mode.ap.revision-coach'],
          ['abstract-only', 'mode.ap.abstract-only'],
          ['lit-review', 'mode.ap.lit-review'],
          ['format-convert', 'mode.ap.format-convert'],
          ['citation-check', 'mode.ap.citation-check'],
          ['disclosure', 'mode.ap.disclosure'],
          ['rebuttal-audit', 'mode.ap.rebuttal-audit'],
        ],
      },
      {
        id: 'pr',
        pkg: 'academic-paper-reviewer',
        name: 'skill.pr.name',
        desc: 'skill.pr.desc',
        agents: 7,
        modes: [
          ['full', 'mode.pr.full'],
          ['re-review', 'mode.pr.re-review'],
          ['quick', 'mode.pr.quick'],
          ['methodology-focus', 'mode.pr.methodology-focus'],
          ['guided', 'mode.pr.guided'],
          ['calibration', 'mode.pr.calibration'],
        ],
      },
      {
        id: 'pl',
        pkg: 'academic-pipeline',
        name: 'skill.pl.name',
        desc: 'skill.pl.desc',
        agents: null,
        modes: [
          ['orchestrator', 'mode.pl.orchestrator'],
          ['entry25', 'mode.pl.entry25'],
          ['entry4', 'mode.pl.entry4'],
          ['resume', 'mode.pl.resume'],
        ],
      },
      {
        id: 'sr',
        pkg: 'sr-screener',
        name: 'skill.sr.name',
        desc: 'skill.sr.desc',
        agents: 4,
        modes: [
          ['protocol', 'mode.sr.protocol'],
          ['quick', 'mode.sr.quick'],
          ['pilot', 'mode.sr.pilot'],
          ['ta-screen', 'mode.sr.ta-screen'],
          ['ft-screen', 'mode.sr.ft-screen'],
          ['adjudicate', 'mode.sr.adjudicate'],
          ['audit', 'mode.sr.audit'],
          ['report', 'mode.sr.report'],
        ],
      },
    ];

    const LANGUAGES = [
      ['zh', 'lang.zh'],
      ['en', 'lang.en'],
    ];
    const CITATIONS = ['cite.apa', 'cite.chicago', 'cite.mla', 'cite.ieee', 'cite.vancouver'];
    const STRUCTURES = ['struct.imrad', 'struct.lit', 'struct.theory', 'struct.case', 'struct.policy', 'struct.conf'];

    const PHASES = [
      { n: '01', title: 'phases.1.title', desc: 'phases.1.desc' },
      { n: '02', title: 'phases.2.title', desc: 'phases.2.desc' },
      { n: '2.5', title: 'phases.3.title', desc: 'phases.3.desc', gate: true },
      { n: '03', title: 'phases.4.title', desc: 'phases.4.desc' },
      { n: '04', title: 'phases.5.title', desc: 'phases.5.desc' },
      { n: '05–06', title: 'phases.6.title', desc: 'phases.6.desc' },
    ];

    function manuscriptArt() {
      return h(
        'svg',
        { className: 'ars-art', viewBox: '0 0 260 220', 'aria-hidden': 'true', focusable: 'false' },
        h(
          'g',
          { transform: 'rotate(-6 126 120)' },
          h('rect', { x: 58, y: 30, width: 148, height: 180, rx: 7, fill: '#efe5d1', stroke: '#d8c8ab', strokeWidth: 1.2 }),
        ),
        h('rect', { x: 46, y: 22, width: 158, height: 186, rx: 7, fill: '#fffdf6', stroke: '#e3d7c0', strokeWidth: 1.2 }),
        h('rect', { x: 62, y: 40, width: 72, height: 8, rx: 4, fill: '#22302f' }),
        h('rect', { x: 62, y: 56, width: 112, height: 4, rx: 2, fill: '#c8bda9' }),
        h('rect', { x: 62, y: 65, width: 96, height: 4, rx: 2, fill: '#c8bda9' }),
        h('rect', { x: 54, y: 80, width: 138, height: 42, rx: 4, fill: '#f4e9d5' }),
        h('rect', { x: 54, y: 80, width: 3, height: 42, fill: '#c08a3e' }),
        h('rect', { x: 66, y: 89, width: 110, height: 3.6, rx: 1.8, fill: '#b3a68f' }),
        h('rect', { x: 66, y: 98, width: 96, height: 3.6, rx: 1.8, fill: '#b3a68f' }),
        h('rect', { x: 66, y: 107, width: 104, height: 3.6, rx: 1.8, fill: '#b3a68f' }),
        h('rect', { x: 62, y: 136, width: 98, height: 3.6, rx: 1.8, fill: '#c8bda9' }),
        h('rect', { x: 62, y: 145, width: 88, height: 3.6, rx: 1.8, fill: '#c8bda9' }),
        h('rect', { x: 62, y: 154, width: 104, height: 3.6, rx: 1.8, fill: '#c8bda9' }),
        h('rect', { x: 62, y: 163, width: 74, height: 3.6, rx: 1.8, fill: '#c8bda9' }),
        h('path', { d: 'M194 88v58', stroke: '#2c6e63', strokeWidth: 1.4, strokeDasharray: '3 4' }),
        h('circle', { cx: 194, cy: 88, r: 2.6, fill: '#2c6e63' }),
        h(
          'g',
          { transform: 'rotate(-14 184 176)' },
          h('circle', { cx: 184, cy: 176, r: 23, fill: 'none', stroke: '#a8443a', strokeWidth: 2 }),
          h('circle', { cx: 184, cy: 176, r: 18, fill: 'none', stroke: '#a8443a', strokeWidth: 0.8, opacity: '0.55' }),
          h('path', {
            d: 'M175 176l6 7 13-16',
            fill: 'none',
            stroke: '#a8443a',
            strokeWidth: 2.6,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }),
        ),
        h(
          'g',
          { transform: 'rotate(45 234 58)' },
          h('rect', { x: 224, y: 48, width: 20, height: 20, rx: 3, fill: '#fff4e6', stroke: '#c08a3e', strokeWidth: 1.5 }),
        ),
        h('text', { x: 234, y: 61, textAnchor: 'middle', fontSize: 7, fill: '#8a5f22', fontFamily: 'inherit' }, '2.5'),
        h(
          'g',
          { transform: 'rotate(45 234 104)' },
          h('rect', { x: 224, y: 94, width: 20, height: 20, rx: 3, fill: '#fff4e6', stroke: '#c08a3e', strokeWidth: 1.5 }),
        ),
        h('text', { x: 234, y: 107, textAnchor: 'middle', fontSize: 7, fill: '#8a5f22', fontFamily: 'inherit' }, '4.5'),
      );
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
        h('path', {
          d: 'M4.6 2.8h6.6l4 4v10.4H4.6z',
          stroke: 'currentColor',
          strokeWidth: 1.4,
          strokeLinejoin: 'round',
        }),
        h('path', { d: 'M11.2 2.8v4h4', stroke: 'currentColor', strokeWidth: 1.4, strokeLinejoin: 'round' }),
        h('path', {
          d: 'M7 11.4l1.7 1.7 3.4-3.9',
          stroke: 'currentColor',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
      );
    }

    function buildPrompt(t, values) {
      const skill = SKILLS.find((item) => item.id === values.skill) ?? SKILLS[0];
      const mode = skill.modes.find((item) => item[0] === values.mode) ?? skill.modes[0];
      const lines = [];
      lines.push(t('prompt.head'));
      lines.push('');
      lines.push(t('prompt.skillLine', { value: t(skill.name) + '（' + skill.pkg + '）' }));
      lines.push(t('prompt.mode', { value: t(mode[1]) + '（' + mode[0] + '）' }));
      lines.push(t('prompt.loadSkill'));
      lines.push('');
      lines.push(t('prompt.targetLabel'));
      lines.push(values.target.trim() === '' ? t('prompt.targetEmpty') : values.target.trim());
      lines.push('');
      lines.push(t('prompt.lang', { value: t('lang.' + values.lang) }));
      lines.push(t('prompt.citation', { value: t(values.citation) }));
      lines.push(t('prompt.structure', { value: t(values.structure) }));
      lines.push('');
      if (values.repo.trim() !== '') lines.push(t('prompt.repo', { value: values.repo.trim() }));
      else lines.push(t('prompt.noRepo'));
      lines.push('');
      lines.push(t('prompt.requireLabel'));
      lines.push(t('prompt.req1'));
      lines.push(t('prompt.req2'));
      lines.push(t('prompt.req3'));
      lines.push(t('prompt.req4'));
      lines.push(t('prompt.req5'));
      lines.push(t('prompt.req6'));
      return lines.join('\n');
    }

    function ArsPanel(props) {
      const t = typeof props.t === 'function' ? props.t : (key) => key;
      const startSession = props.startSession;
      const pickDirectory = props.pickDirectory;

      const savedSkill = SKILLS.find((item) => item.id === SAVED.skill) ?? SKILLS[0];
      const savedMode = savedSkill.modes.some((item) => item[0] === SAVED.mode) ? SAVED.mode : savedSkill.modes[0][0];
      const savedLang = LANGUAGES.some((item) => item[0] === SAVED.lang) ? SAVED.lang : 'zh';
      const savedCitation = CITATIONS.includes(SAVED.citation) ? SAVED.citation : 'cite.apa';
      const savedStructure = STRUCTURES.includes(SAVED.structure) ? SAVED.structure : 'struct.imrad';

      const [skillId, setSkillId] = React.useState(savedSkill.id);
      const [modeId, setModeId] = React.useState(savedMode);
      const [target, setTarget] = React.useState(typeof SAVED.target === 'string' ? SAVED.target : '');
      const [lang, setLang] = React.useState(savedLang);
      const [citation, setCitation] = React.useState(savedCitation);
      const [structure, setStructure] = React.useState(savedStructure);
      const [repo, setRepo] = React.useState(typeof SAVED.repo === 'string' ? SAVED.repo : '');
      const [copyState, setCopyState] = React.useState('idle');
      const [repoStatus, setRepoStatus] = React.useState('idle');

      const targetRef = React.useRef(null);
      const builderRef = React.useRef(null);
      const targetId = React.useId();
      const checkRef = React.useRef(props.checkDirectory);
      checkRef.current = props.checkDirectory;

      const skill = SKILLS.find((item) => item.id === skillId) ?? SKILLS[0];

      const prompt = React.useMemo(
        () => buildPrompt(t, { skill: skillId, mode: modeId, target, lang, citation, structure, repo }),
        [t, skillId, modeId, target, lang, citation, structure, repo],
      );

      React.useEffect(() => {
        saveStoredState({ skill: skillId, mode: modeId, target, lang, citation, structure, repo });
      }, [skillId, modeId, target, lang, citation, structure, repo]);

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

      const chooseSkill = (nextId) => {
        const next = SKILLS.find((item) => item.id === nextId);
        if (next === undefined) return;
        setSkillId(next.id);
        setModeId(next.modes[0][0]);
      };

      const focusBuilder = () => {
        const node = builderRef.current;
        if (node && typeof node.scrollIntoView === 'function') node.scrollIntoView({ block: 'start', behavior: 'smooth' });
        if (targetRef.current) targetRef.current.focus({ preventScroll: true });
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

      const onTargetKeyDown = (event) => {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          launch();
        }
      };

      return h(
        'section',
        { className: 'ars-page', 'aria-label': t('panel') },
        h(
          'div',
          { className: 'ars-inner' },
          h(
            'header',
            { className: 'ars-hero' },
            h(
              'div',
              null,
              h(
                'div',
                { className: 'ars-eyebrow' },
                h('span', { className: 'ars-eyebrow-dot', 'aria-hidden': 'true' }),
                t('eyebrow'),
              ),
              h('h1', { className: 'ars-title' }, t('hero.title')),
              h('p', { className: 'ars-lead' }, t('hero.intro')),
              h(
                'div',
                { className: 'ars-actions' },
                h('button', { type: 'button', className: 'ars-btn ars-btn--primary', onClick: focusBuilder }, t('hero.primary')),
                h('a', { className: 'ars-btn ars-btn--ghost', href: REPO_URL, target: '_blank', rel: 'noreferrer' }, t('hero.secondary')),
              ),
            ),
            manuscriptArt(),
          ),

          h(
            'ol',
            { className: 'ars-phases' },
            PHASES.map((phase) =>
              h(
                'li',
                { className: 'ars-phase', key: phase.n, 'data-gate': phase.gate ? 'true' : undefined },
                h(
                  'span',
                  { className: 'ars-phase-n' },
                  phase.n,
                  phase.gate ? h('span', { className: 'ars-gate' }, t('gate')) : null,
                ),
                h('h2', { className: 'ars-phase-title' }, t(phase.title)),
                h('p', { className: 'ars-phase-desc' }, t(phase.desc)),
              ),
            ),
          ),

          h(
            'section',
            { className: 'ars-card', ref: builderRef, 'aria-labelledby': 'ars-builder-title' },
            h(
              'div',
              { className: 'ars-card-head' },
              h('h2', { className: 'ars-h2', id: 'ars-builder-title' }, t('builder.title')),
              h('span', { className: 'ars-badge' }, t('builder.badge')),
            ),
            h(
              'div',
              { className: 'ars-builder-grid' },
              h(
                'div',
                null,
                h(
                  'div',
                  { className: 'ars-grid-2' },
                  h(
                    'div',
                    { className: 'ars-field' },
                    h('div', { className: 'ars-label-row' }, h('label', { className: 'ars-label', htmlFor: 'ars-skill' }, t('form.skill'))),
                    h(
                      'select',
                      {
                        id: 'ars-skill',
                        className: 'ars-select',
                        value: skillId,
                        onChange: (event) => chooseSkill(event.target.value),
                      },
                      SKILLS.map((item) => h('option', { key: item.id, value: item.id }, t(item.name))),
                    ),
                  ),
                  h(
                    'div',
                    { className: 'ars-field' },
                    h('div', { className: 'ars-label-row' }, h('label', { className: 'ars-label', htmlFor: 'ars-mode' }, t('form.mode'))),
                    h(
                      'select',
                      {
                        id: 'ars-mode',
                        className: 'ars-select',
                        value: modeId,
                        onChange: (event) => setModeId(event.target.value),
                      },
                      skill.modes.map((item) => h('option', { key: item[0], value: item[0] }, t(item[1]))),
                    ),
                  ),
                ),
                h(
                  'div',
                  { className: 'ars-field' },
                  h(
                    'div',
                    { className: 'ars-label-row' },
                    h('label', { className: 'ars-label', htmlFor: targetId }, t('form.target')),
                    h(
                      'button',
                      { type: 'button', className: 'ars-field-action', onClick: () => chooseDirectory(setTarget) },
                      t('form.pick'),
                    ),
                  ),
                  h('textarea', {
                    id: targetId,
                    ref: targetRef,
                    className: 'ars-textarea',
                    value: target,
                    placeholder: t('form.targetPlaceholder'),
                    onChange: (event) => setTarget(event.target.value),
                    onKeyDown: onTargetKeyDown,
                    spellCheck: false,
                  }),
                ),
                h(
                  'div',
                  { className: 'ars-grid-2' },
                  h(
                    'div',
                    { className: 'ars-field' },
                    h('div', { className: 'ars-label-row' }, h('label', { className: 'ars-label', htmlFor: 'ars-lang' }, t('form.language'))),
                    h(
                      'select',
                      { id: 'ars-lang', className: 'ars-select', value: lang, onChange: (event) => setLang(event.target.value) },
                      LANGUAGES.map((item) => h('option', { key: item[0], value: item[0] }, t(item[1]))),
                    ),
                  ),
                  h(
                    'div',
                    { className: 'ars-field' },
                    h('div', { className: 'ars-label-row' }, h('label', { className: 'ars-label', htmlFor: 'ars-citation' }, t('form.citation'))),
                    h(
                      'select',
                      {
                        id: 'ars-citation',
                        className: 'ars-select',
                        value: citation,
                        onChange: (event) => setCitation(event.target.value),
                      },
                      CITATIONS.map((key) => h('option', { key: key, value: key }, t(key))),
                    ),
                  ),
                ),
                h(
                  'div',
                  { className: 'ars-field' },
                  h('div', { className: 'ars-label-row' }, h('label', { className: 'ars-label', htmlFor: 'ars-structure' }, t('form.structure'))),
                  h(
                    'select',
                    {
                      id: 'ars-structure',
                      className: 'ars-select',
                      value: structure,
                      onChange: (event) => setStructure(event.target.value),
                    },
                    STRUCTURES.map((key) => h('option', { key: key, value: key }, t(key))),
                  ),
                ),
                h(
                  'div',
                  { className: 'ars-field' },
                  h(
                    'div',
                    { className: 'ars-label-row' },
                    h('label', { className: 'ars-label', htmlFor: 'ars-repo' }, t('form.repo')),
                    h(
                      'button',
                      { type: 'button', className: 'ars-field-action', onClick: () => chooseDirectory(setRepo) },
                      t('form.pick'),
                    ),
                  ),
                  h(
                    'div',
                    { className: 'ars-row-inline' },
                    h('input', {
                      id: 'ars-repo',
                      className: 'ars-input',
                      type: 'text',
                      value: repo,
                      placeholder: t('form.repoPlaceholder'),
                      onChange: (event) => setRepo(event.target.value),
                      spellCheck: false,
                    }),
                    h(
                      'button',
                      { type: 'button', className: 'ars-btn ars-btn--ghost ars-btn--sm', onClick: () => chooseDirectory(setRepo) },
                      t('form.pickShort'),
                    ),
                  ),
                  h(
                    'div',
                    { className: 'ars-status', 'data-state': repoStatus, role: 'status' },
                    h('span', { className: 'ars-status-dot', 'aria-hidden': 'true' }),
                    h('span', null, t('status.' + repoStatus)),
                  ),
                ),
              ),
              h(
                'div',
                { className: 'ars-preview' },
                h(
                  'div',
                  { className: 'ars-preview-head' },
                  h('span', { className: 'ars-preview-title' }, t('preview.title')),
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'ars-copy',
                      'data-state': copyState === 'ok' ? 'ok' : copyState === 'fail' ? 'fail' : undefined,
                      onClick: copyPrompt,
                    },
                    t(copyState === 'ok' ? 'preview.copied' : copyState === 'fail' ? 'preview.copyFailed' : 'preview.copy'),
                  ),
                ),
                h('pre', { className: 'ars-pre', tabIndex: 0 }, prompt),
                h(
                  'div',
                  { className: 'ars-preview-actions' },
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'ars-btn ars-btn--primary',
                      onClick: launch,
                      disabled: typeof startSession !== 'function',
                    },
                    t('preview.start'),
                  ),
                  h('p', { className: 'ars-hint' }, t('preview.hint')),
                ),
              ),
            ),
          ),

          h(
            'section',
            { className: 'ars-section', 'aria-labelledby': 'ars-skills-title' },
            h(
              'div',
              { className: 'ars-card-head' },
              h('h2', { className: 'ars-h2', id: 'ars-skills-title' }, t('skills.title')),
              h('span', { className: 'ars-badge' }, t('skills.note')),
            ),
            h(
              'ol',
              { className: 'ars-skills' },
              SKILLS.map((item, index) =>
                h(
                  'li',
                  { className: 'ars-skill', key: item.id },
                  h('span', { className: 'ars-index' }, String(index + 1).padStart(2, '0')),
                  h(
                    'div',
                    null,
                    h(
                      'div',
                      { className: 'ars-skill-head' },
                      h('h3', { className: 'ars-skill-name' }, t(item.name)),
                      h('span', { className: 'ars-meta' }, item.pkg),
                      item.agents === null ? null : h('span', { className: 'ars-meta' }, t('skill.agents', { count: item.agents })),
                      h('span', { className: 'ars-meta' }, t('skill.modes', { count: item.modes.length })),
                    ),
                    h('p', { className: 'ars-skill-desc' }, t(item.desc)),
                    h(
                      'div',
                      { className: 'ars-tags' },
                      item.modes.map((mode) => h('span', { className: 'ars-tag', key: mode[0] }, mode[0])),
                    ),
                  ),
                ),
              ),
            ),
          ),

          h(
            'section',
            { className: 'ars-check', 'aria-labelledby': 'ars-check-title' },
            h('h2', { className: 'ars-h2', id: 'ars-check-title' }, t('integrity.title')),
            h(
              'div',
              { className: 'ars-check-grid' },
              h(
                'div',
                { className: 'ars-check-col' },
                h('h3', { className: 'ars-check-title' }, t('integrity.checkTitle')),
                h(
                  'ul',
                  { className: 'ars-check-list' },
                  h('li', null, t('integrity.check1')),
                  h('li', null, t('integrity.check2')),
                  h('li', null, t('integrity.check3')),
                ),
              ),
              h(
                'div',
                { className: 'ars-check-col' },
                h('h3', { className: 'ars-check-title', 'data-tone': 'warn' }, t('integrity.noTitle')),
                h(
                  'ul',
                  { className: 'ars-check-list' },
                  h('li', null, t('integrity.no1')),
                  h('li', null, t('integrity.no2')),
                  h('li', null, t('integrity.no3')),
                ),
              ),
            ),
            h('p', { className: 'ars-check-note' }, t('integrity.note')),
          ),

          h(
            'footer',
            { className: 'ars-foot' },
            h('span', null, t('foot.note')),
            h(
              'span',
              { className: 'ars-foot-links' },
              h('a', { className: 'ars-link', href: ARCH_URL, target: '_blank', rel: 'noreferrer' }, t('foot.arch')),
              h('a', { className: 'ars-link', href: SETUP_URL, target: '_blank', rel: 'noreferrer' }, t('foot.setup')),
              h('a', { className: 'ars-link', href: REPO_URL, target: '_blank', rel: 'noreferrer' }, 'GitHub'),
            ),
          ),
        ),
      );
    }

    function apply(ctx) {
      ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'ars: dictionaries');
      const t = ctx.locale.bind(NS);

      ctx.effect(() => {
        const tagId = 'ars/panel.css';
        const existing = document.querySelector('style[data-plugin-css=' + JSON.stringify(tagId) + ']');
        if (existing !== null) return () => {};
        const tag = document.createElement('style');
        tag.dataset.plugin = 'ars';
        tag.dataset.pluginCss = tagId;
        tag.textContent = CSS;
        document.head.appendChild(tag);
        return () => {
          tag.remove();
        };
      }, 'ars: panel styles');

      ctx.effect(
        () =>
          ctx.slots.inject('sidebar.panellist', () =>
            ctx.slots.register(
              {
                name: 'sidebar.panellist',
                id: PANEL_ID,
                order: 50,
                label: () => t('panel'),
                locale: NS,
              },
              panelIcon,
            ),
          ),
        'ars: sidebar entry',
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
              ArsPanel,
            ),
          ),
        'ars: main panel',
      );
    }

    return {
      inject: ['slots', 'locale', 'uiWorkspace'],
      apply,
    };
  },
});

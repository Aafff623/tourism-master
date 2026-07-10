# 2026-07-10 Commit History

## 1. project-init-assets

### 做了什么
- 创建 GitHub 仓库 `Aafff623/tourism-master` 并准备本地关联
- 按 my-blogs docs 规范搭建 `docs/`（agents / adr / knowledge / output / history / contexts）
- 写入根入口：`AGENTS.md`、`CLAUDE.md`、`CONTEXT.md`、`CONTEXT-MAP.md`、更新 `README.md`
- Matt Pocock skills 配置：GitHub issue-tracker、默认 triage 标签、多上下文 domain
- 新增 `.claude/README.md` 指向根 `CLAUDE.md`

### 改了哪些文件
- `AGENTS.md`、`CLAUDE.md`、`CONTEXT.md`、`CONTEXT-MAP.md`、`README.md`、`.gitignore`
- `.claude/README.md`
- `docs/**`（agents、adr、contexts、knowledge、output、history、README）

### commit 信息
docs(init): scaffold agent assets and GitHub-linked project docs

---

## 2. mvp-and-research-qa

### 做了什么
- 仓库可见性改为 public；确认 git 作者为 Aafff623 / 1012512411@qq.com
- 撰写 MVP 功能清单与山西景区 Mock 调研 Q&A

### 改了哪些文件
- `README.md`（标注 public）
- `docs/README.md`
- `docs/output/reports/shanxi-bilingual-mvp/mvp-feature-list.md`
- `docs/output/reports/shanxi-bilingual-mvp/scenic-mock-research-qa.md`
- `docs/history/2026-07-10/commit-history.md`

### commit 信息
docs(mvp): add bilingual MVP feature list and scenic mock research Q&A

---

## 3. scenic-mock-phase0-audit

### 做了什么
- 拷贝融合指南与 `shanxi-scenic-mock-research-v1` 调研包至 docs
- 只读审计三端数据链路；输出 integration-audit / field-mapping / prd（draft）
- 推荐第一阶段采用前端 Mock 适配层（模式 A）；未改业务代码

### 改了哪些文件
- `docs/output/reports/shanxi-scenic-mock-data/**`（含 research 包、指南、审计文档）
- `docs/README.md`
- `docs/history/2026-07-10/commit-history.md`

### commit 信息
docs(mock): ingest scenic research pack and phase-0 integration audit

---

## 4. decisions-skills-deliver

### 做了什么
- 落盘用户拍板：模式 A、首页景区热点、游客浏览、详情保留订票评论、slug 导航
- 新增 ADR-0001；PRD → approved；创建 handoff `weapp-mock-integration`
- 自 my-blogs 迁入 Cursor `/deliver`、`/archive` skills，并同步 AGENTS/CLAUDE/CONTEXT/language
- 实践 `/deliver`：维护 commit-history 与交付摘要（本条）；**未** commit

### 改了哪些文件
- `.cursor/skills/deliver/SKILL.md`、`.cursor/skills/archive/SKILL.md`
- `.claude/README.md`、`AGENTS.md`、`CLAUDE.md`、`CONTEXT.md`
- `docs/adr/0000-record-architecture-decisions.md`、`docs/adr/0001-bilingual-field-model.md`
- `docs/agents/context.md`、`docs/agents/language.md`、`docs/contexts/weapp/CONTEXT.md`、`docs/README.md`
- `docs/output/reports/shanxi-scenic-mock-data/**`（含 research 包、audit、mapping、prd、指南）
- `docs/output/handoff/shanxi-scenic-mock-data/weapp-mock-integration.md`
- `docs/history/2026-07-10/commit-history.md`

### commit 信息
docs(mock): lock mode-A decisions, add deliver skills, and approve scenic mock PRD

---

## 5. bilingual-mvp-prd-plan

### 做了什么
- 产出产品 PRD（approved）、二次开发功能清单、实施路线图
- 拆分 Wave 1 handoff（locale / spot / home / service / regression）+ epic-scratch
- 早期 mvp-feature-list 标为 superseded

### 改了哪些文件
- `docs/output/reports/shanxi-bilingual-mvp/prd.md`
- `docs/output/reports/shanxi-bilingual-mvp/secondary-dev-feature-list.md`
- `docs/output/reports/shanxi-bilingual-mvp/implementation-roadmap.md`
- `docs/output/reports/shanxi-bilingual-mvp/epic-scratch.md`
- `docs/output/reports/shanxi-bilingual-mvp/mvp-feature-list.md`
- `docs/output/handoff/shanxi-bilingual-mvp/*.md`
- `docs/output/handoff/shanxi-scenic-mock-data/weapp-mock-integration.md`
- `docs/README.md`
- `docs/history/2026-07-10/commit-history.md`

### commit 信息
docs(mvp): add product PRD, secondary-dev list, and Wave-1 roadmap

---

## 6. weapp-mock-integration

### 做了什么
- Wave 1 Phase 1：接入 Mode A Mock JSON + scenicAdapter/scenicRepository/locale
- 引用完整性校验通过（6 P0，0 dangling refs）
- handoff → awaiting-review；**未改页面**

### 改了哪些文件
- `tourism_weapp/mock/scenic/*`
- `tourism_weapp/services/locale.js`
- `tourism_weapp/services/scenicAdapter.js`
- `tourism_weapp/services/scenicRepository.js`
- `tourism_weapp/services/scenicMockSmoke.js`
- `docs/output/handoff/shanxi-scenic-mock-data/weapp-mock-integration.md`
- `docs/output/reports/shanxi-scenic-mock-data/field-mapping.md`
- `docs/output/reports/shanxi-bilingual-mvp/epic-scratch.md`
- `docs/contexts/weapp/CONTEXT.md`
- `docs/history/2026-07-10/commit-history.md`

### commit 信息
feat(weapp): add scenic mock adapter layer for Mode A bilingual data

---

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

## 7. weapp-locale-shell

### 做了什么
- Wave 1 Phase 2：壳文案字典、Tab 中英、首页语言切换条
- locale 持久化 + `scenic-locale-changed` 事件；App 启动应用 Tab
- handoff → awaiting-review

### 改了哪些文件
- `tourism_weapp/services/shellCopy.js`
- `tourism_weapp/services/locale.js`
- `tourism_weapp/App.vue`
- `tourism_weapp/pages/home/home.vue`
- `docs/output/handoff/shanxi-bilingual-mvp/weapp-locale-shell.md`
- `docs/output/reports/shanxi-bilingual-mvp/epic-scratch.md`
- `docs/history/2026-07-10/commit-history.md`

### commit 信息
feat(weapp): add bilingual shell locale switch and tabBar copy

---

## 8. weapp-home-hotspots

### 做了什么
- Wave 1 Phase 3：首页景区热点接 Mock `getHomeHotspots`；中英切换刷新；slug 跳转
- 移除对 `getredspot` 的依赖（该区块）

### 改了哪些文件
- `tourism_weapp/pages/home/home.vue`
- `docs/output/handoff/shanxi-bilingual-mvp/weapp-home-hotspots.md`
- `docs/output/handoff/shanxi-bilingual-mvp/weapp-locale-shell.md`
- `docs/output/reports/shanxi-bilingual-mvp/epic-scratch.md`
- `docs/history/2026-07-10/commit-history.md`

### commit 信息
feat(weapp): show Shanxi home hotspots from scenic mock recommendations

---

## 9. weapp-spot-list-detail

### 做了什么
- Wave 1 Phase 4：景点列表/详情接 Mock；文化解读、话术、免责声明；slug 导航
- 保留订票/评论/历史 API（失败静默）

### 改了哪些文件
- `tourism_weapp/pages/spot/spot.vue`
- `tourism_weapp/pages/spot/detail.vue`
- `docs/output/handoff/shanxi-bilingual-mvp/weapp-spot-list-detail.md`
- `docs/output/handoff/shanxi-bilingual-mvp/weapp-home-hotspots.md`
- `docs/output/reports/shanxi-bilingual-mvp/epic-scratch.md`
- `docs/history/2026-07-10/commit-history.md`

### commit 信息
feat(weapp): wire spot list and detail to bilingual scenic mock

---

## 10. weapp-service-phrases

### 做了什么
- Wave 1 Phase 5：服务页按分类展示 18 条通用双语话术；其他服务降权保留

### 改了哪些文件
- `tourism_weapp/pages/service/service.vue`
- `tourism_weapp/services/shellCopy.js`
- `docs/output/handoff/shanxi-bilingual-mvp/weapp-service-phrases.md`
- `docs/output/handoff/shanxi-bilingual-mvp/weapp-spot-list-detail.md`
- `docs/output/reports/shanxi-bilingual-mvp/epic-scratch.md`
- `docs/history/2026-07-10/commit-history.md`

### commit 信息
feat(weapp): show categorized bilingual service phrases on service tab

---

## 11. weapp-mvp-regression

### 做了什么
- Wave 1 Phase 6：跑 `wave1-regression-check.py`，ERRORS=0
- 勾选产品 PRD 验收标准；输出回归 handoff

### 改了哪些文件
- `docs/output/reports/shanxi-bilingual-mvp/wave1-regression-check.py`
- `docs/output/reports/shanxi-bilingual-mvp/prd.md`
- `docs/output/reports/shanxi-scenic-mock-data/prd.md`
- `docs/output/handoff/shanxi-bilingual-mvp/weapp-mvp-regression.md`
- `docs/output/handoff/shanxi-bilingual-mvp/weapp-service-phrases.md`
- `docs/output/handoff/shanxi-scenic-mock-data/weapp-mock-integration.md`
- `docs/output/reports/shanxi-bilingual-mvp/epic-scratch.md`
- `docs/history/2026-07-10/commit-history.md`

### commit 信息
test(weapp): record Wave-1 bilingual MVP regression results

---

## 12. archive-wave1

### 做了什么
- `/archive` Wave 1：物理移动 5 个产品 handoff + mock-integration 至 `handoff/archive/`
- `reports/shanxi-bilingual-mvp/` 保留（Wave 2 同 theme）
- 更新 epic-scratch

### 改了哪些文件
- `docs/output/handoff/archive/shanxi-bilingual-mvp/*`
- `docs/output/handoff/archive/shanxi-scenic-mock-data/weapp-mock-integration.md`
- `docs/output/reports/shanxi-bilingual-mvp/epic-scratch.md`
- `docs/output/handoff/shanxi-bilingual-mvp/.gitkeep`
- `docs/output/handoff/shanxi-scenic-mock-data/.gitkeep`
- `docs/history/2026-07-10/commit-history.md`

### commit 信息
docs(archive): archive Wave-1 bilingual MVP handoffs

---

## 13. api-seed-integration（Wave 2）

### 做了什么
- ADR-0002 + DDL + 幂等 Seed（6 P0，含 homeRank）
- `biz_spot` 实体/入参双语列；`getBySlug` / `listBilingualSpots`
- 游客双语 API：`/client/c/spot/bilingual/{catalog,detail,hotspots}` + 免登录白名单

### 改了哪些文件
- `docs/adr/0002-wave2-biz-spot-bilingual-columns.md`
- `tourism_api/sql/wave2_biz_spot_bilingual_ddl.sql`
- `tourism_api/sql/generate_wave2_seed.py`
- `tourism_api/sql/wave2_biz_spot_bilingual_seed.sql`
- `tourism_api/.../spot/entity/Spot.java`
- `tourism_api/.../spot/param/SpotAddParam.java`
- `tourism_api/.../spot/param/SpotEditParam.java`
- `tourism_api/.../spot/service/SpotService.java`
- `tourism_api/.../spot/service/impl/SpotServiceImpl.java`
- `tourism_api/.../wxspot/controller/WxSpotBilingualController.java`
- `tourism_api/.../wxspot/service/SpotBilingualService.java`
- `tourism_api/.../wxspot/result/BilingualSpotView.java`
- `tourism_api/.../config/GlobalConfigure.java`
- `docs/output/handoff/shanxi-bilingual-mvp/api-seed-integration.md`
- `docs/output/reports/shanxi-bilingual-mvp/epic-scratch.md`
- `docs/output/reports/shanxi-bilingual-mvp/implementation-roadmap.md`
- `docs/history/2026-07-10/commit-history.md`

### commit 信息
feat(api): add bilingual biz_spot seed and guest spot APIs

---

## 14. weapp-api-switch + admin-bilingual-fields（Wave 2）

### 做了什么
- 小程序 Repository：双语 API 优先，失败回退 Mock；http 白名单与失败 reject
- 首页/列表/详情改为异步加载
- 管理端景区表单：slug + 中英名称/摘要/简介/开放时间/交通

### 改了哪些文件
- `tourism_weapp/api/scenicBilingualApi.js`
- `tourism_weapp/utils/http.js`
- `tourism_weapp/services/scenicRepository.js`
- `tourism_weapp/services/scenicMockSmoke.js`
- `tourism_weapp/pages/home/home.vue`
- `tourism_weapp/pages/spot/spot.vue`
- `tourism_weapp/pages/spot/detail.vue`
- `tourism_admin/src/views/biz/spot/form.vue`
- `docs/output/handoff/shanxi-bilingual-mvp/weapp-api-switch.md`
- `docs/output/handoff/shanxi-bilingual-mvp/admin-bilingual-fields.md`
- `docs/output/reports/shanxi-bilingual-mvp/epic-scratch.md`
- `docs/history/2026-07-10/commit-history.md`

### commit 信息
feat(weapp,admin): switch scenic data to bilingual API with mock fallback

---

## 15. archive-wave2-core

### 做了什么
- Review 通过后归档 Wave 2 三任务 handoff → `handoff/archive/shanxi-bilingual-mvp/`
- `reports/shanxi-bilingual-mvp/` 保留（SD-15 可选）

### 改了哪些文件
- `docs/output/handoff/archive/shanxi-bilingual-mvp/api-seed-integration.md`
- `docs/output/handoff/archive/shanxi-bilingual-mvp/weapp-api-switch.md`
- `docs/output/handoff/archive/shanxi-bilingual-mvp/admin-bilingual-fields.md`
- `docs/output/reports/shanxi-bilingual-mvp/epic-scratch.md`
- `docs/history/2026-07-10/commit-history.md`

### commit 信息
docs(archive): archive Wave-2 bilingual Mode B handoffs

---

## 16. readme-diagrams + local DEV_URL + backend bootstrap brief

### 做了什么
- README 配图与 brief 入库；docs 索引更新
- 小程序 DEV_URL 改为本机 WLAN IP 便于联调
- 新增本机后端联调阻塞简报（供 GPT Pro 调研）

### commit 信息（分类）
docs(readme): add README diagrams and generation brief
fix(weapp): point DEV_URL to local WLAN API host
docs: add local backend bootstrap problem brief for research

---

## 17. readme-premium-images

### 做了什么
- 按精修仓结构打磨 `README.md`（为什么 / 功能 / 演示 / 快速开始 / 架构 / 路线图 / 文档）
- 新增配图生成 brief：`docs/output/reports/readme-diagrams/readme-diagram-brief.md`
- 入库 5 张 README 配图并挂引用：banner / architecture / tech-stack / workflow / structure

### 改了哪些文件
- `README.md`
- `docs/README.md`
- `docs/output/reports/readme-diagrams/readme-diagram-brief.md`
- `docs/images/readme/banner.png`
- `docs/images/readme/architecture.png`
- `docs/images/readme/tech-stack.png`
- `docs/images/readme/workflow.png`
- `docs/images/readme/structure.png`
- `docs/history/2026-07-10/commit-history.md`

### commit 信息
docs(readme): polish README and add premium diagram assets

---

## 18. readme-features-module

### 做了什么
- 入库功能模块图 `docs/images/readme/features.png`，配合 README「功能」章节引用

### 改了哪些文件
- `docs/images/readme/features.png`
- `docs/history/2026-07-10/commit-history.md`

### commit 信息
docs(readme): add features module diagram asset

---

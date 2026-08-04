# 五维调研报告 — tourism-master project-init 细致验收

> theme: `project-init`  
> 日期: 2026-08-04  
> 对照: `project-init` Full 验收清单 · Canvas `tourism-master-deep-analysis.canvas.tsx`  
> 方法: 基于仓库实文件核对，禁止臆测；不确定项标【待确认】

---

## 0. 结论摘要

| 维度 | 结论 | 扎实度 |
|---|---|---|
| 1 项目结构 | 三端 monorepo 清晰；根治理 + `docs/` + `assets/` 已对齐规范 | 高 |
| 2 技术栈 | UniApp / Vue3+Vite+AntDV / Spring Boot 2.5+Snowy；端口 85/86 | 高 |
| 3 资产现状 | 加速版缺口：`docs/output` 双轨、五维报告缺失、Showcase 未截、根 `images/` 游离 | 本轮已迁/补 |
| 4 业务领域 | 山西文旅双语主线；演示 Mock-only（ADR-0003）；Mode B 资产保留 | 高 |
| 5 规范差距 | 加速 init 未做完整迁移与报告；MDC 五份已齐且与用户级一致 | 本轮收口 |

---

## 1. 项目结构分析

### 1.1 仓库树（排除构建产物）

```
/
├── AGENTS.md · CLAUDE.md · CONTEXT.md · CONTEXT-MAP.md · LANGUAGES.md
├── README.md · README.en.md · preview-readme.{html,css,js,en.html}
├── assets/images/{readme,legacy-template}/
├── docs/
│   ├── agents/ · adr/ · contexts/ · knowledge/ · glossary/
│   └── outputs/{report,prd,handoff,commit-history}/
├── tourism_weapp/     # UniApp 小程序
├── tourism_admin/     # Vue3 管理端
└── tourism_api/       # Spring Boot / Snowy
```

### 1.2 关键入口

| 端 | 入口 / 关键路径 |
|---|---|
| Weapp | `tourism_weapp/pages/` · `services/scenic*.js` · `mock/scenic/` |
| Admin | `tourism_admin/src/main.js` · `views/biz/spot` · `api/biz` |
| API | `tourism_api/snowy-web-app` · `snowy-plugin-client` · `snowy-plugin-biz` · `sql/` |

### 1.3 规模（约，排除 node_modules/target/unpackage）

| 端 | 约文件数 | 备注 |
|---|---:|---|
| tourism_admin/src | ~560 | Snowy 壳 + biz 二次开发 |
| tourism_api | ~610 | 多模块 Maven |
| tourism_weapp | ~130 | 二次开发面相对集中 |

---

## 2. 技术栈识别

| 层 | 技术（实仓） | 路径 / 备注 |
|---|---|---|
| 用户端 | UniApp（Vue 运行时）+ ColorUI + 微信小程序 | `tourism_weapp/` · HBuilderX |
| 管理端 | Vue 3 · Vite · Ant Design Vue 3.2 · Pinia · TS | `tourism_admin/` · 端口 **85** |
| 后端 | Spring Boot **2.5.x** · MyBatis-Plus · Sa-Token · Knife4j | `tourism_api/` · Snowy 2.0.0 · 端口 **86** |
| 数据 | MySQL 8（库 tourism）· Redis | Mode B / 全栈时需要 |
| 构建 | JDK **8** · Maven 3.6+ · Node 18+ · pnpm 优先 | 演示可仅开 Weapp |

**硬约束**：勿擅自升 JDK 21 / 换 Spring Boot 大版本，须先 ADR。

**已知漂移【待确认/非阻塞】**：管理端 `.env.development` 仍有「黄山旅游助手」类品牌文案残留，与山西产品叙事未完全对齐（属业务文案，本轮 init 不改）。

---

## 3. 资产现状评估

### 3.1 加速版（09b70bd）已有

- `.cursor/rules/` 五份 MDC（`alwaysApply: true`，与用户级 SHA 一致）
- 根入口：AGENTS / CLAUDE / CONTEXT / CONTEXT-MAP / LANGUAGES
- `docs/agents/`：workflow · deliver · archive · domain · issue-tracker · triage-labels · **voice**（无 language.md / context.md）
- ADR-0000…0003
- 契约图已落盘：`banner/features/architecture/tech-stack/workflow/structure.png`
- Preview：声明无 Gallery；README 本地预览壳端口 8080
- `docs/outputs/commit-history/main/2026-08-04.md`

### 3.2 加速版缺口（本轮处理）

| 缺口 | 处理 |
|---|---|
| 无 `docs/outputs/report/` 五维报告 | **本文件** |
| `docs/output/` 与 `docs/outputs/` 双轨干扰 | **已整体迁移**至 `docs/outputs/{prd,handoff}` |
| `docs/history/` 旧攒批 | **已迁** `commit-history/archive/legacy-date-based/` |
| 根 `images/` 游离 | **已迁** `assets/images/legacy-template/` |
| Showcase 真机图缺失 | 占位槽位表（路径写清）；本环境无法 HBuilderX 截图 |
| `readme-diagram-brief` 仍在旧树 | **已并入** `docs/outputs/prd/readme-diagrams/` |
| glossary 空 | 补 `docs/glossary/frontend-ui.md` 最小对齐 |
| 空目录 `.gitkeep` | 已清理 |

### 3.3 配图契约

| 文件 | 状态 |
|---|---|
| banner / features / architecture / tech-stack / workflow / structure | ✅ 已有，**不重生** |
| preview-shell | 省略（单产品无 Gallery） |
| showcase-home / showcase-spot-detail / showcase-service | ⏳ 占位，见 README Showcase 表 |

---

## 4. 业务领域分析

### 4.1 产品主线

面向入境游客与中文用户：**景区介绍 + 中英双语服务**（非通用 OTA）。

| 能力 | 职责 |
|---|---|
| 景区介绍 | 列表/详情：名称、简介、看点、开放与交通 |
| 语言偏好 | 全局 `zh` ↔ `en` |
| 文化解读 | 礼仪、历史语境、参观提示 |
| 双语服务 | 通用话术 + 景区专属话术 |
| 首页热点 | `homeRecommendations` → 景区热点（≠ `biz_recommend`） |
| 数据接入 | 演示 Mode A（Mock-only）；Mode B 代码保留、运行时冻结 |

### 4.2 明确不做

真实支付 / 库存核销 / 完整行程 OTA / 日韩等多语言 / 语音·AR·深度地图 / 公网云部署（演示后置）。

### 4.3 P0 景区（slug）

`yungang-grottoes` · `wutai-mountain` · `pingyao-ancient-city` · `jinci-temple` · `hukou-waterfall` · `xuankong-temple`

### 4.4 数据流（演示默认）

```
页面 → scenicRepository → mock/scenic JSON → scenicAdapter(locale) → UI
```

开关：`tourism_weapp/services/scenicDataSource.js` → `USE_SCENIC_MOCK=true`（ADR-0003）。

---

## 5. 规范差距分析（对照 project-init DoD）

| 验收项 | 加速版 | 细致版（本轮后） |
|---|---|---|
| 五份 MDC | ✅ | ✅ |
| 根入口 + humanizer / voice | ✅ | ✅ |
| agents 无 language/context 双源 | ✅ | ✅ |
| ADR-0000 | ✅ | ✅ |
| outputs 规范树 | 部分（仅 stubs） | ✅ 主题已迁入 |
| 五维调研 → report + CONTEXT | ❌ / 浅 | ✅ 本报告 + CONTEXT 引用 |
| README Preview / Showcase | Preview ✅ · Showcase 弱 | Showcase 槽位路径表 ✅ |
| 配图契约 + prompts | ✅ | brief 归位 · 不重生图 |
| README 预览壳 | ✅ | ✅ |
| 无密钥 / 无绝对路径作唯一说明 | ✅ | ✅ |
| 目录树禁止 details 折叠 | 中文 ✅ · 英文有折叠 | 英文结构段展开 |

---

## 6. 后续建议（非本轮）

1. HBuilderX + 微信开发者工具按 Showcase 槽位截真机图 → `assets/images/readme/showcase-*.png`
2. 管理端品牌文案「黄山」残留 → 独立业务 theme
3. Mode B 真数据换接 → 独立分支 + PRD（勿在演示主干打开）

## 关联

- Canvas：`tourism-master-deep-analysis.canvas.tsx`
- CONTEXT：根 `CONTEXT.md`
- 既有主题 PRD：`docs/outputs/prd/shanxi-bilingual-mvp/prd.md` 等

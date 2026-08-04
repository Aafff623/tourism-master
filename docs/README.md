# docs/ — 资产目录

本目录存放**文档、决策、Agent 约定与产物**，不放应用源码。

## 目录结构

```
docs/
├── README.md
├── adr/                    架构决策（ADR-0000 …）
├── agents/                 Agent 规则（无 language.md / context.md）
│   ├── workflow.md         ★ 任务流
│   ├── deliver.md · archive.md
│   ├── domain.md · issue-tracker.md · triage-labels.md
│   └── voice.md            项目语气与回答格式
├── contexts/               分端 CONTEXT（weapp / admin / api）
├── knowledge/ · glossary/
└── outputs/                任务产物（按需建子目录）
    ├── report/{theme}/
    ├── prd/{theme}/
    ├── handoff/{theme}/
    └── commit-history/{branch}/
```

媒体 → 根 [`assets/`](../assets/README.md)；共享用词 → 根 [`LANGUAGES.md`](../LANGUAGES.md)。

> 旧路径 `docs/output/` · `docs/history/` 已于 2026-08-04 迁入 `docs/outputs/`，禁止再建。

## 仓库其他分区

| 路径 | 用途 |
|---|---|
| `/` 根目录 | `README` · `CONTEXT` · `CONTEXT-MAP` · `LANGUAGES` · `AGENTS` · `CLAUDE` |
| `assets/images/readme/` | README 契约配图 + Showcase |
| `assets/images/legacy-template/` | 模板原始截图（非终稿） |
| `tourism_weapp/` · `tourism_admin/` · `tourism_api/` | 三端工程 |
| `.cursor/rules/` | 五份 alwaysApply MDC |
| `.scratch/` | 本地草稿（Issue 真相源仍为 GitHub） |

## GitHub Issues ↔ 本地 docs

| GitHub | 本地路径 |
|---|---|
| Epic | `docs/outputs/prd/{theme}/prd.md` |
| 子 Issue | `docs/outputs/handoff/{theme}/{task}.md` |

## 关键主题状态（摘要）

| 路径 | 状态 |
|---|---|
| `outputs/report/project-init/` | 五维调研（细致 init） |
| `outputs/prd/shanxi-bilingual-mvp/` | PRD approved；Wave 1/2 核心已归档 |
| `outputs/prd/mock-demo-freeze/` | 演示 Mock 冻结 |
| `outputs/prd/local-backend-bootstrap/` | 本机后端联调（后置） |
| `outputs/prd/readme-diagrams/` | README 配图 brief + prompts |
| `outputs/prd/shanxi-scenic-mock-data/` | Mock 调研包与集成审计 |
| `assets/images/readme/` | 契约图已入库；Showcase 待真机截 |

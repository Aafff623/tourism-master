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
├── outputs/                规范产物（新主题）
│   ├── report/{theme}/
│   ├── prd/{theme}/
│   ├── handoff/{theme}/
│   └── commit-history/{branch}/
└── output/                 历史兼容（既有 PRD / handoff）
    ├── reports/ · handoff/ · decks/
```

媒体 → 根 [`assets/`](../assets/README.md)；共享用词 → 根 [`LANGUAGES.md`](../LANGUAGES.md)。

## 仓库其他分区

| 路径 | 用途 |
|---|---|
| `/` 根目录 | `README` · `CONTEXT` · `CONTEXT-MAP` · `LANGUAGES` · `AGENTS` · `CLAUDE` |
| `assets/images/readme/` | README 契约配图 |
| `tourism_weapp/` · `tourism_admin/` · `tourism_api/` | 三端工程 |
| `.cursor/rules/` | 五份 alwaysApply MDC |
| `.scratch/` | 本地草稿（Issue 真相源仍为 GitHub） |

## GitHub Issues ↔ 本地 docs

| GitHub | 新主题 | 历史主题 |
|---|---|---|
| Epic | `docs/outputs/prd/{theme}/prd.md` | `docs/output/reports/{theme}/prd.md` |
| 子 Issue | `docs/outputs/handoff/{theme}/{task}.md` | `docs/output/handoff/{theme}/{task}.md` |

## 关键主题状态（摘要）

| 路径 | 状态 |
|---|---|
| `output/reports/shanxi-bilingual-mvp/` | PRD approved；Wave 1/2 核心已归档 |
| `output/reports/mock-demo-freeze/` | 演示 Mock 冻结 |
| `output/reports/local-backend-bootstrap/` | 本机后端联调（后置） |
| `output/reports/readme-diagrams/` | README 配图 brief |
| `assets/images/readme/` | 契约图已入库 |

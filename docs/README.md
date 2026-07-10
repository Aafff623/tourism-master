# docs/ — 资产目录

本目录存放**文档、决策、Agent 约定与产物**，不放应用源码。

目录与流程设计参照可迁移知识 [`knowledge/ai-coding-asset-design.md`](knowledge/ai-coding-asset-design.md)（源自 my-blogs 实践）。

## 目录结构

```
docs/
├── README.md           ← 本文件：索引
├── adr/                架构决策记录（ADR-0001 …）
├── agents/             Agent 规则
│   ├── workflow.md     ★ 任务流（Issue→PRD→handoff→Review→archive）
│   ├── deliver.md      ★ 交付层（/deliver → commit-history + 摘要）
│   ├── archive.md      ★ 归档层（/archive → 物理移动 archive/）
│   ├── context.md      文档地图
│   ├── language.md     共享词汇
│   ├── domain.md       领域消费规则
│   ├── issue-tracker.md
│   └── triage-labels.md
├── contexts/           分端 CONTEXT（weapp / admin / api）
├── knowledge/          可迁移知识沉淀
├── history/            攒批 commit 记录
├── images/readme/      README 配图（banner / architecture / tech-stack / workflow / structure）
└── output/
    ├── reports/
    │   ├── archive/{theme}/
    │   ├── readme-diagrams/           README 配图生成 brief
    │   ├── local-backend-bootstrap/   本机后端联调阻塞简报（喂 GPT 调研）
    │   └── {theme}/                   prd.md、brief
    ├── handoff/
    │   ├── archive/{theme}/
    │   └── {theme}/{task}.md
    └── decks/
```

## 仓库其他分区（非 docs）

| 路径 | 用途 |
|---|---|
| `/` 根目录 | 入口文档（`README.md`、`CONTEXT.md`、`CONTEXT-MAP.md`、`CLAUDE.md`、`AGENTS.md`） |
| `tourism_weapp/` | UniApp 小程序 |
| `tourism_admin/` | Vue3 管理端 |
| `tourism_api/` | Spring Boot 后端 |
| `.claude/` | Claude Code 本地说明（指向根 `CLAUDE.md`） |
| `.scratch/` | 可选本地草稿（非 Issue 真相源；真相源为 GitHub Issues） |

## GitHub Issues ↔ 本地 docs 映射

| GitHub | 本地 |
|---|---|
| Epic Issue | `docs/output/reports/{theme}/prd.md` |
| 子 Issue | `docs/output/handoff/{theme}/{task}.md` |
| 已完结 | `docs/output/{reports,handoff}/archive/{theme}/` |

## 待建清单

| 路径 | 用途 | 状态 |
|---|---|---|
| `.cursor/skills/deliver/` | Cursor `/deliver` Skill | **已迁入** |
| `.cursor/skills/archive/` | Cursor `/archive` Skill | **已迁入** |
| `docs/adr/0001-bilingual-field-model.md` | 双语字段与 slug 导航 | **Accepted** |
| `docs/output/reports/shanxi-bilingual-mvp/` | 产品 PRD、二次开发清单、路线图 | **PRD approved**；Wave 1/2 核心已归档 |
| `docs/output/reports/shanxi-scenic-mock-data/` | 调研包 + 审计 + 数据 PRD | **进行中** |
| `docs/output/reports/local-backend-bootstrap/` | 本机缺框架 SQL / 后端无法启动问题简报 | **draft** |
| `docs/output/reports/readme-diagrams/` | README 配图生成 brief | **已用** |
| `docs/images/readme/` | README 终稿配图 | **已入库** |

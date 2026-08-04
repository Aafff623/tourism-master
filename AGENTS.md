# AGENTS.md

> **Output Style**: `humanizer-output-style` skill — 统一语气风格与去 AI 味配置。加载路径：`skills/humanizer-output-style/SKILL.md`  
> **Windows Rules**: `.cursor/rules/windows-path-discipline.mdc` · `windows-shell-discipline.mdc`  
> **Answer Format**: `.cursor/rules/answer-format.mdc`（含白话 Mermaid）  
> **Commit History**: `.cursor/rules/commit-history.mdc`  
> **项目语气**: [`docs/agents/voice.md`](docs/agents/voice.md)

跨 Agent 工具的项目入口。**流程规范 → [`docs/agents/workflow.md`](docs/agents/workflow.md)。**

## 速览

- 仓库：[`Aafff623/tourism-master`](https://github.com/Aafff623/tourism-master)
- 产品：山西文旅景区介绍与双语服务小程序（模板二次开发 · 三端 monorepo）
- 共享用词：[`LANGUAGES.md`](LANGUAGES.md)
- 领域上下文：[`CONTEXT.md`](CONTEXT.md) · 地图 [`CONTEXT-MAP.md`](CONTEXT-MAP.md)
- 文档索引：[`docs/README.md`](docs/README.md)
- 交付总结：Cursor `/deliver` · 规范 [`docs/agents/deliver.md`](docs/agents/deliver.md)
- 归档：Cursor `/archive` · 规范 [`docs/agents/archive.md`](docs/agents/archive.md)

## 任务流（硬约束）

```
Issue(Epic) → docs/outputs/prd/{theme}/prd.md → 用户确认
  → 子 Issue + docs/outputs/handoff/{theme}/{task}.md
  → 实施 → awaiting-review → 用户 Review 通过
  → archive + commit-history
```

| 规则 | 说明 |
|---|---|
| 一任务一 handoff | 覆盖式更新，**不用** 01/02 版本号；旧文件直接删除 |
| Review 门禁 | 交付后 `status: awaiting-review`，**停止**；用户确认后才继续 |
| **Review 说明** | 交付前**必须**说明：做了什么、改了哪些文件、**Review 重点** |
| PRD 门禁 | `prd.md` 为 `approved` 前，禁止拆任务写功能代码 |
| 主题同名 | `prd/{theme}/` ↔ `handoff/{theme}/` |
| 根治理优先 | 三端子包**不必**重复整套 AGENTS/CONTEXT；分端细节进 `docs/contexts/*` |

## 产物归位

| 产物 | 规范路径（新） | 历史兼容 |
|---|---|---|
| PRD / brief / 调研 | `docs/outputs/prd/{theme}/` · `docs/outputs/report/{theme}/` | `docs/output/reports/{theme}/` |
| 任务 handoff | `docs/outputs/handoff/{theme}/{task}.md` | `docs/output/handoff/{theme}/` |
| Commit 攒批 | `docs/outputs/commit-history/{branch}/YYYY-MM-DD.md` | `docs/history/{date}/` |
| README 配图 | `assets/images/readme/` | （旧 `docs/images/readme/` 已迁出） |
| 分端 CONTEXT | `docs/contexts/{weapp,admin,api}/CONTEXT.md` | — |

> 既有主题（如 `shanxi-bilingual-mvp`、`mock-demo-freeze`）仍读历史路径；**新主题**一律写 `docs/outputs/`。

## Commit 攒批（硬约束）

任务完成的**默认终点是 Review，不是 commit**。

```
Agent 完成任务
  → 写/更新 docs/outputs/commit-history/{branch}/YYYY-MM-DD.md
  → 进入 Review，停止
  → 用户明确同意后 → git commit
```

| 规则 | 说明 |
|---|---|
| Review 先于 commit | **禁止**未经用户同意自动 `git commit`（用户显式要求的 init/交付除外） |
| 只管自己改的 | Agent **只提交本轮对话自己改动的文件** |

## Review 说明（全局硬约束）

```
做了什么（要点列表）
改了哪些文件（路径）
Review 重点（用户应重点看什么、怎么验、有何风险/未决项）
```

## 会话开始

1. 本文件 + `LANGUAGES.md`
2. 用户给的 **theme + task** 或 **Issue 号**
3. `workflow.md` 规定的 PRD + handoff
4. 按需 `CONTEXT.md`、`CONTEXT-MAP.md`、分端 CONTEXT、ADR

## 会话结束

| 条件 | 动作 |
|---|---|
| 有交付待 Review | handoff → `awaiting-review`，**停止**；或执行 `/deliver` |
| Review 已通过 | 归档 handoff；主题完结归档 PRD |
| 可迁移知识 | **仅用户要求**；草稿 → Review → `docs/knowledge/` |

## Agent skills

### Issue tracker

Issues 以 GitHub Issues 跟踪（`gh` CLI）。详见 [`docs/agents/issue-tracker.md`](docs/agents/issue-tracker.md)。

### Triage labels

使用 canonical 标签词汇。详见 [`docs/agents/triage-labels.md`](docs/agents/triage-labels.md)。

### Domain docs

多上下文布局：根 `CONTEXT.md` + `CONTEXT-MAP.md` + `docs/contexts/*/CONTEXT.md` + `docs/adr/`。见 [`docs/agents/domain.md`](docs/agents/domain.md)。

### 交付 / 归档（Cursor 斜杠命令）

| 命令 | Skill | 规范 |
|---|---|---|
| `/deliver` | [`.cursor/skills/deliver/`](.cursor/skills/deliver/) | [`docs/agents/deliver.md`](docs/agents/deliver.md) |
| `/archive` | [`.cursor/skills/archive/`](.cursor/skills/archive/) | [`docs/agents/archive.md`](docs/agents/archive.md) |

项目规则资产：`.cursor/rules/` 五份 MDC（`alwaysApply: true`）。详细维护协议 → [`CLAUDE.md`](CLAUDE.md)。

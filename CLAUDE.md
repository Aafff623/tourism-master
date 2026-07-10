# CLAUDE.md

本文件包含 Claude Code 在本仓库中工作时的项目级指令。Cursor 等工具见 [`AGENTS.md`](AGENTS.md)。

## 项目速览

- **仓库**：[`Aafff623/tourism-master`](https://github.com/Aafff623/tourism-master)
- **来源**：闲鱼旅游系统模板（SpringBoot + Vue3 + UniApp）二次开发
- **产品目标**：山西文旅景区介绍与双语服务小程序（入境游客跨文化体验场景）
- **三端**：`tourism_weapp` · `tourism_admin` · `tourism_api`

## 新队友阅读顺序

| 顺序 | 路径 | 目的 |
|---|---|---|
| 1 | `README.md` | 项目定位、如何跑起来 |
| 2 | `CONTEXT.md` | 产品域事实、术语、约束 |
| 3 | `CONTEXT-MAP.md` | 多端上下文地图 |
| 4 | `docs/agents/language.md` | 共享命名词汇 |
| 5 | `docs/agents/workflow.md` | 任务流（做功能时） |
| 6 | `docs/agents/context.md` | 文档地图 |
| 7 | `CLAUDE.md` | Agent 工作纪律（本文件） |
| 8 | 对应端源码 + `docs/contexts/*/CONTEXT.md` | 实施 |
| 9 | `docs/adr/` | 架构决策记录 |

## 目录分工

| 路径 | 职责 |
|---|---|
| `docs/adr/` | 架构决策（ADR） |
| `docs/agents/` | Agent 规则；**任务流 → `workflow.md`** |
| `docs/contexts/` | 分端 CONTEXT |
| `docs/output/reports/{theme}/` | PRD、brief；完结 → `reports/archive/` |
| `docs/output/handoff/{theme}/` | 任务 handoff；完结 → `handoff/archive/` |
| `docs/knowledge/` | 可迁移知识沉淀 |
| `docs/images/readme/` | README 直接引用的终稿配图 |
| `docs/output/decks/` | 幻灯片 |
| `docs/history/{YYYY-MM-DD}/` | 当日改动记录（攒批合并用） |
| `tourism_weapp/` | 小程序源码 |
| `tourism_admin/` | 管理端源码 |
| `tourism_api/` | 后端源码 |
| `.claude/` | Claude Code 入口说明（指向本文件） |
| 根目录 | 入口文档：`README` / `CONTEXT` / `CONTEXT-MAP` / `CLAUDE` / `AGENTS` |

完整索引 → [`docs/README.md`](docs/README.md)。

## Agent skills

### Issue tracker

Issues 以 GitHub issue 的形式跟踪。详见 `docs/agents/issue-tracker.md`。

### Triage labels

使用 canonical 标签词汇。详见 `docs/agents/triage-labels.md`。

### Domain docs

多上下文布局：根目录 `CONTEXT.md` + `CONTEXT-MAP.md` + `docs/contexts/*/CONTEXT.md` + `docs/adr/`。消费规则见 `docs/agents/domain.md`、`docs/agents/context.md`；命名见 `docs/agents/language.md`。

### 交付 / 归档

- Cursor `/deliver` → [`.cursor/skills/deliver/`](.cursor/skills/deliver/) · [`docs/agents/deliver.md`](docs/agents/deliver.md)
- Cursor `/archive` → [`.cursor/skills/archive/`](.cursor/skills/archive/) · [`docs/agents/archive.md`](docs/agents/archive.md)

## 工作纪律

- 二次开发优先改模板三端，不另起无关栈（除非 ADR）
- 产品主线：景区介绍 + 双语服务；不主动扩大为通用 OTA
- 密钥与本地 DB/Redis/微信配置不提交仓库
- 术语以 `CONTEXT.md` 为准；新词先补术语再写代码
- PRD 未 `approved` 前不写功能代码

## 文档维护协议

> 任务流见 [`docs/agents/workflow.md`](docs/agents/workflow.md)。速查见 [`AGENTS.md`](AGENTS.md)。

### 原则

1. **精炼**：新 `.md` 只写必要内容；可选扩展先与用户确认。
2. **归位**：PRD/brief → `reports/{theme}/`；handoff → `handoff/{theme}/{task}.md`；完结 → `*/archive/{theme}/`。
3. **单一来源**：任务状态以 Issue + handoff 为准；PRD 以 `reports/{theme}/prd.md` 为准。
4. **Review 门禁**：交付后停止，等用户确认。
5. **Review 说明（全局）**：交付前必须说明做了什么、改了哪些文件、Review 重点。
6. **Commit 门禁**：先写 `docs/history/{date}/commit-history.md`，进入 Review；禁止未经同意自动 commit。
7. **边界**：Agent 只提交本轮自己改动的文件。
8. **术语**：新词 → `CONTEXT.md`（及分端 CONTEXT 如需要）→ `docs/agents/language.md`。

### 三层加载

| 层 | 文件 | 加载时机 |
|---|---|---|
| L0 | `AGENTS.md` | 每次 |
| L1 | `workflow.md` + PRD + handoff | 做任务时 |
| L2 | `CONTEXT.md`、`CONTEXT-MAP.md`、分端 CONTEXT、`docs/adr/` | 改领域 / 架构 |

### 已归档偏好（2026-07-10）

- 资产集中 `docs/`；根目录只留工具链与入口文档。
- Matt Pocock 基础集：`CONTEXT.md` + `CONTEXT-MAP.md` + `docs/agents/` + `docs/adr/`。
- Issue tracker：GitHub Issues（`Aafff623/tourism-master`）。
- 多上下文：product + weapp / admin / api。
- 产物 → `docs/output/`；knowledge 写入须用户 Review。
- **`.cursor/` 例外**：仅允许 `skills/deliver` 与 `skills/archive`（自 my-blogs 迁入）；规范正文仍在 `docs/agents/deliver.md` / `archive.md`。
- `.claude/` 仅作 Claude Code 入口指针，不重复维护第二套规范。
- **Mock 融合**：模式 A 先行；首页景区热点；游客浏览主链路；详情保留订票评论；导航 `slug`；双语成对字段 → ADR-0001。

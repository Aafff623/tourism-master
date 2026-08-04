# CLAUDE.md

> **Output Style**: `humanizer-output-style` — see `~/.claude/skills/humanizer-output-style/SKILL.md`  
> **Windows Rules**: `.cursor/rules/windows-path-discipline.mdc` · `windows-shell-discipline.mdc`  
> **Answer Format**: `.cursor/rules/answer-format.mdc`  
> **项目语气**: [`docs/agents/voice.md`](docs/agents/voice.md)

本文件包含 Claude Code 在本仓库中工作时的项目级指令。Cursor 等工具见 [`AGENTS.md`](AGENTS.md)。

## 项目速览

- **仓库**：[`Aafff623/tourism-master`](https://github.com/Aafff623/tourism-master)
- **来源**：闲鱼旅游系统模板（SpringBoot + Vue3 + UniApp）二次开发
- **产品目标**：山西文旅景区介绍与双语服务小程序（入境游客跨文化体验场景）
- **三端**：`tourism_weapp` · `tourism_admin` · `tourism_api`（根治理即可，子包不必重复整套）

## 新队友阅读顺序

| 顺序 | 路径 | 目的 |
|---|---|---|
| 1 | `README.md` | 项目定位、如何跑起来 |
| 2 | `CONTEXT.md` · `LANGUAGES.md` | 产品域事实、共享用词 |
| 3 | `CONTEXT-MAP.md` | 多端上下文地图 |
| 4 | `docs/agents/workflow.md` | 任务流（做功能时） |
| 5 | `AGENTS.md` · `CLAUDE.md` | Agent 纪律 |
| 6 | 对应端源码 + `docs/contexts/*/CONTEXT.md` | 实施 |
| 7 | `docs/adr/` | 架构决策记录 |

## 目录分工

| 路径 | 职责 |
|---|---|
| `docs/adr/` | 架构决策（ADR） |
| `docs/agents/` | Agent 规则；**任务流 → `workflow.md`**（无 language.md / context.md） |
| `docs/contexts/` | 分端 CONTEXT |
| `docs/outputs/{report,prd,handoff,commit-history}/` | 调研 / PRD / handoff / 攒批（禁止再建 `docs/output/`） |
| `docs/knowledge/` | 可迁移知识沉淀 |
| `docs/glossary/` | 人 ⇄ Agent 术语对齐（如 `frontend-ui.md`） |
| `assets/images/readme/` | README 契约配图 + Showcase |
| `assets/images/legacy-template/` | 模板原始截图参考 |
| `tourism_weapp/` · `tourism_admin/` · `tourism_api/` | 三端源码 |
| `.cursor/rules/` | 五份 alwaysApply MDC |
| `.cursor/skills/{deliver,archive}/` | Cursor 斜杠命令入口 |
| 根目录 | `README` / `CONTEXT` / `CONTEXT-MAP` / `LANGUAGES` / `CLAUDE` / `AGENTS` |

完整索引 → [`docs/README.md`](docs/README.md)。

## Agent skills

### Issue tracker

Issues 以 GitHub Issues 跟踪。详见 `docs/agents/issue-tracker.md`。

### Triage labels

使用 canonical 标签词汇。详见 `docs/agents/triage-labels.md`。

### Domain docs

多上下文布局：根 `CONTEXT.md` + `CONTEXT-MAP.md` + `docs/contexts/*/CONTEXT.md` + `docs/adr/`。消费规则见 `docs/agents/domain.md`；命名见根 `LANGUAGES.md`。

### 交付 / 归档

- Cursor `/deliver` → [`.cursor/skills/deliver/`](.cursor/skills/deliver/) · [`docs/agents/deliver.md`](docs/agents/deliver.md)
- Cursor `/archive` → [`.cursor/skills/archive/`](.cursor/skills/archive/) · [`docs/agents/archive.md`](docs/agents/archive.md)

## 工作纪律

- 二次开发优先改模板三端，不另起无关栈（除非 ADR）
- 产品主线：景区介绍 + 双语服务；不主动扩大为通用 OTA
- 演示阶段 Mock-only（ADR-0003）；Mode B 代码保留、运行时后置
- 密钥与本地 DB/Redis/微信配置不提交仓库
- 术语以 `CONTEXT.md` / `LANGUAGES.md` 为准；新词先补术语再写代码
- PRD 未 `approved` 前不写功能代码
- 本仓根治理；子包不重复整套 Agent 资产

## 文档维护协议

> 任务流见 [`docs/agents/workflow.md`](docs/agents/workflow.md)。速查见 [`AGENTS.md`](AGENTS.md)。

### 原则

1. **精炼**：新 `.md` 只写必要内容；可选扩展先与用户确认。
2. **归位**：新主题 PRD → `docs/outputs/prd/{theme}/`；handoff → `docs/outputs/handoff/`；历史主题仍读 `docs/outputs/`。
3. **单一来源**：任务状态以 Issue + handoff 为准；用词以 `LANGUAGES.md` 为准；领域以 `CONTEXT.md` 为准。
4. **Review 门禁**：交付后停止，等用户确认。
5. **Review 说明（全局）**：交付前必须说明做了什么、改了哪些文件、Review 重点。
6. **Commit 门禁**：先写 commit-history，进入 Review；禁止未经同意自动 commit（用户显式要求除外）。
7. **边界**：Agent 只提交本轮自己改动的文件。
8. **术语**：新词 → `CONTEXT.md`（及分端 CONTEXT）→ 同步 `LANGUAGES.md`。

### 三层加载

| 层 | 文件 | 加载时机 |
|---|---|---|
| L0 | `AGENTS.md` · `LANGUAGES.md` | 每次 |
| L1 | `workflow.md` + PRD + handoff | 做任务时 |
| L2 | `CONTEXT.md`、`CONTEXT-MAP.md`、分端 CONTEXT、`docs/adr/` | 改领域 / 架构 |

### 已归档偏好

- 资产：`docs/` + `assets/`；根目录只留工具链与入口文档。
- Issue tracker：GitHub Issues（本仓已采用；非默认 `.scratch`）。
- 多上下文：product + weapp / admin / api。
- 媒体：`assets/images/readme/`；禁止新建 `docs/images/`。
- **`.cursor/`**：五份 rules MDC + `skills/deliver` · `skills/archive`。
- `.claude/` 仅作 Claude Code 入口指针。
- Mock 融合：模式 A 先行；首页景区热点；导航 `slug`；双语成对字段 → ADR-0001；演示 Mock-only → ADR-0003。

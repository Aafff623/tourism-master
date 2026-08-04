# LANGUAGES.md

共享用词入口。Agent 输出（Issue 标题、重构名、测试名、注释、handoff）必须使用本表词汇。  
完整领域定义见根 [`CONTEXT.md`](CONTEXT.md) §领域术语表。

> **禁止**再维护 `docs/agents/language.md`（已废弃，避免双源漂移）。

## Issue tracker

| 术语 | 定义 | 避免 |
|---|---|---|
| **Issue tracker** | 本仓库 GitHub Issues（`Aafff623/tourism-master`） | backlog manager、ticket 系统 |
| **Issue** | tracker 中的单条工作单元 | ticket（除非引用外部系统原文） |
| **Triage role** | issue 上的 canonical 状态角色 | 自定义状态名 |

Triage 角色与标签字符串映射见 [`docs/agents/triage-labels.md`](docs/agents/triage-labels.md)。

## 任务流

| 术语 | 定义 |
|---|---|
| **主题** | theme；一个 Epic / 倡议，`prd/{theme}/` 与 `handoff/{theme}/` 同名 |
| **任务** | task；PRD 拆分后的工作单元，对应子 Issue + `handoff/{theme}/{task}.md` |
| **PRD** | 需求文档；`docs/outputs/prd/{theme}/prd.md`（历史主题仍在 `docs/output/reports/{theme}/`） |
| **Handoff** | 任务接力文件；一任务一文件，覆盖式更新 |
| **Review** | 用户确认交付；通过前 Agent 停止 |
| **Archive** | 已确认完结的 handoff / PRD 归档目录 |
| **Knowledge** | `docs/knowledge/`；跨项目可迁移经验；写入须用户 Review |
| **Commit-history** | `docs/outputs/commit-history/{branch}/YYYY-MM-DD.md` |

流程详见 [`docs/agents/workflow.md`](docs/agents/workflow.md)。

## 领域（山西文旅双语）

| 术语 | 英文 | 简述 |
|---|---|---|
| 景区 | Scenic Spot | 山西文旅景点实体 |
| 景点详情 | Spot Detail | 介绍与开放信息详情 |
| 双语内容 | Bilingual Content | zh / en 成对内容 |
| 语言偏好 | Locale Preference | 用户展示语言 |
| 文化解读 | Cultural Interpretation | 面向入境游客的语境说明 |
| 跨文化障碍 | Cross-cultural Barrier | 内容组织用障碍类型 |
| 双语服务条目 | Bilingual Service Item | 服务话术中英对照 |
| 攻略 | Strategy / Guide | 模板攻略模块 |
| 推荐 | Recommend | 运营推荐位 |
| 动态 | News / Feed | 公告/动态 |
| 管理端 | Admin | `tourism_admin` |
| 用户端 | Weapp | `tourism_weapp` |
| 后端 | API | `tourism_api` |
| Mock 数据 | Mock Data | 可替换演示数据 |
| 景区热点 | Home Hot Spots | 首页景区推荐；≠ `biz_recommend` |
| 景区Slug | Spot Slug | 导航业务键（ADR-0001） |
| 模式 A/B/C | Integration Mode | Mock 适配层 / Seed+API / 完整 CMS；演示默认 A（ADR-0003） |

## 上下文（多端）

| 术语 | 定义 |
|---|---|
| **Context** | `CONTEXT-MAP.md` 中的一个文档边界（product / weapp / admin / api） |
| **CONTEXT-MAP** | 根目录地图，指向各 `CONTEXT.md` |

术语缺口：先查根 `CONTEXT.md` 与对应 `docs/contexts/*/CONTEXT.md`；确需新词时与用户确认后再写入。

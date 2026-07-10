# 共享语言

Agent 输出（issue 标题、重构名、测试名、注释）必须使用下表词汇。完整定义见根目录 `CONTEXT.md` §领域术语表。

## Issue tracker

| 术语 | 定义 | 避免 |
|---|---|---|
| **Issue tracker** | 本仓库的 GitHub Issues | backlog manager、ticket 系统 |
| **Issue** | tracker 中的单条工作单元 | ticket（除非引用外部系统原文） |
| **Triage role** | issue 上的 canonical 状态角色 | 自定义状态名 |

Triage 角色与标签字符串映射见 `triage-labels.md`。

## 任务流

| 术语 | 定义 |
|---|---|
| **主题** | theme；一个 Epic / 倡议，`reports/{theme}/` 与 `handoff/{theme}/` 同名 |
| **任务** | task；PRD 拆分后的工作单元，对应子 Issue + `handoff/{theme}/{task}.md` |
| **PRD** | 需求文档；`reports/{theme}/prd.md`，用户确认前 `draft` |
| **Handoff** | 任务接力文件；一任务一文件，持续更新 |
| **Review** | 用户确认交付；通过前 Agent 停止 |
| **Archive** | `reports/archive/`、`handoff/archive/`；已确认完结 |
| **Knowledge** | `docs/knowledge/`；跨项目可迁移经验；写入须用户 Review |

流程详见 `workflow.md`。Knowledge 详见 `docs/knowledge/README.md`。

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

## 上下文（多端）

| 术语 | 定义 |
|---|---|
| **Context** | `CONTEXT-MAP.md` 中的一个文档边界（product / weapp / admin / api） |
| **CONTEXT-MAP** | 根目录地图，指向各 `CONTEXT.md` |

术语缺口：先查根 `CONTEXT.md` 与对应 `docs/contexts/*/CONTEXT.md`；确需新词时与用户确认后再写入。

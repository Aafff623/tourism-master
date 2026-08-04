# Deliver 交付工作流 — 可迁移知识摘要

> 本项目实操规范 → [`docs/agents/deliver.md`](../agents/deliver.md) · Cursor 入口 → `/deliver`

---

## (a) 设计流程与思路

### 问题

Agent 完成任务后常见两种失控：

1. **擅自 commit** — 用户还没 Review 就提交，历史碎片化
2. **文档不同步** — 代码改了，handoff / history 没更新，跨对话丢上下文

### 思路

把「干完活」和「可以提交」拆成两层：

```
实施层（改代码/文档）
  ↓
交付层（/deliver：总结 + 维护 handoff / commit-history）
  ↓
Review 层（用户看 diff + 摘要）
  ↓
提交层（用户说 commit → 攒批合并）
  ↓
归档层（用户说通过 → `/archive` 物理移动 + 关 Issue）
```

### 与现有资产的关系

| 已有机制 | Deliver 如何衔接 |
|---|---|
| `workflow.md` handoff | T3 交付时 → `awaiting-review` |
| `docs/outputs/commit-history/archive/legacy-date-based/` 攒批 | T0 横切，所有 Agent 改动都记一笔 |
| `AGENTS.md` Review 门禁 | deliver 后必须停止 |
| `knowledge/` | T8，仅用户要求时写入 |

### 判定模型（非二元分支）

不按「Plan / 普通」二分，而按 **工作单元 × 类型 × 阶段**：

1. 先切分对话里的 N 个工作单元
2. 每单元匹配 T1–T9（PRD、拆分、实施、brief、规范、ADR…）
3. T0 commit-history 横切所有有落地的改动
4. 多单元并行维护，一次 deliver 输出统一摘要

---

## (b) 创新点与新颖点

| 点 | 说明 |
|---|---|
| **交付层独立成命令** | `/deliver` 一键触发「该记的记下来」，而不是靠 Agent 自觉或用户口述 |
| **Skill + 规范双轨** | `.cursor/skills/deliver/` 提供 Cursor 快捷键；`docs/agents/deliver.md` 跨工具共享 |
| **T0 横切 + T1–T9 纵切** | commit-history 不与任务类型绑死；类型决定 handoff/PRD，history 统一攒批 |
| **同 slug 原地更新** | Review 未通过反复改时，不堆 `#2 #3`，改同一块 |
| **Review 说明（全局）** | 任何任务交付前须说明做了什么、改了哪些文件、Review 重点；与 `/deliver` 摘要对齐 |
| **Archive 物理移动** | `/archive` 专门做 handoff/reports → archive/；`/deliver` 只提示衔接 |
| **文件边界硬约束** | Agent 只记、只 commit 自己改的；用户 `/write` 改动隔离 |
| **`.cursor/` 最小例外** | 仅允许 `skills/deliver/`、`skills/archive/` |

---

## (c) 相关知识点

### Agent 资产分层（Matt Pocock 式）

- **L0** `AGENTS.md` — 硬约束速查
- **L1** `workflow.md` + handoff — 任务流
- **L1.5** `deliver.md` — 交付层（介于实施与 Review 之间）
- **L1.75** `archive.md` — 归档层（Review 通过后物理移动）
- **L2** `CONTEXT.md` / ADR — 领域与架构

### Cursor Skills vs Commands

- **Commands** `.cursor/commands/*.md` — 纯 Markdown prompt
- **Skills** `.cursor/skills/{name}/SKILL.md` — 带 frontmatter，`disable-model-invocation: true` 表示仅手动 `/` 触发
- 规范正文放 repo 的 `docs/agents/`，Skill 只负责「读规范 + 执行」

### Commit 攒批 vs 单次 commit

- 一天一个 `commit-history.md`，多条任务条目
- 用户同意后再 **合并为一个 commit**，减少 main 上的噪音 commit
- 与浏览器 `/write`「保存即 commit」的内容流 **刻意隔离**

### 跨工具限制

- `/deliver` Slash **仅 Cursor**（及自行配置的同构工具）
- Claude Code / Codex 等：读 `docs/agents/deliver.md` 或 `@` 引用，流程等价

### 延伸阅读

- [`ai-coding-asset-design.md`](ai-coding-asset-design.md) — 资产目录总设计
- [`docs/outputs/commit-history/archive/legacy-date-based/README.md`](../history/README.md) — commit-history 模板
- [`docs/agents/archive.md`](../agents/archive.md) — 归档层：物理移动与 reports↔handoff
- [`docs/agents/workflow.md`](../agents/workflow.md) — Issue → PRD → handoff → archive

---
name: archive
description: Review 通过后归档：物理移动 handoff/reports 到 archive/，同步 epic-scratch，关 Issue。禁止未经用户确认自动 archive。
disable-model-invocation: true
---

# Archive

用户调用 `/archive` 或说「通过 / archive」时，严格按归档规范执行。

## 必读（按顺序）

1. [`AGENTS.md`](../../AGENTS.md) — 主题同名、Review 说明
2. [`docs/agents/archive.md`](../../docs/agents/archive.md) — **本流程唯一操作手册**
3. [`docs/agents/workflow.md`](../../docs/agents/workflow.md) §8

## 执行

1. 确认用户 Review 已通过（或用户明确指定 archive）
2. 解析 `{theme}` / `{task}` 范围
3. **物理移动** handoff → `handoff/archive/{theme}/`；主题完结再移 `reports/{theme}/` → `reports/archive/{theme}/`
4. 同步 `epic-scratch.md`、PRD §任务拆分；关 Issue
5. 输出 archive.md §归档摘要（含 Review 重点）
6. **停止** — 不代替 `/deliver`；不擅自 commit

## 硬约束

- **归档 = 移动文件**，不是只改 frontmatter
- `reports/{theme}/` ↔ `handoff/{theme}/` 同名
- 主题 archive 前须 handoff 全部已在 `handoff/archive/{theme}/`

---
name: deliver
description: 任务交付总结：维护 handoff、commit-history、PRD 等，输出摘要并进入 Review。禁止自动 commit。
disable-model-invocation: true
---

# Deliver

用户调用 `/deliver` 时，严格按项目交付规范执行。

## 必读（按顺序）

1. [`AGENTS.md`](../../AGENTS.md) — Commit 攒批、Review 门禁、文件边界
2. [`docs/agents/deliver.md`](../../docs/agents/deliver.md) — **本流程唯一操作手册**
3. [`docs/agents/workflow.md`](../../docs/agents/workflow.md) — handoff / PRD / archive
4. [`docs/outputs/commit-history/archive/legacy-date-based/README.md`](../../docs/outputs/commit-history/archive/legacy-date-based/README.md) — commit-history 模板

## 执行

1. 扫描对话 + `git status` / `git diff`（**仅本轮 Agent 改动的文件**）
2. 切分工作单元，判定 T1–T9（见 deliver.md）
3. 维护对应文件；有 repo 改动则维护 T0 commit-history
4. 输出 deliver.md §交付摘要格式（**含 Review 重点**）
5. **Archive 衔接**：检查 handoff/reports 是否可归档并提示（不移动）；见 deliver.md §Archive 衔接
6. **停止** — 禁止 `git commit`，除非用户在同轮明确说 commit

## 硬约束

- 用户 `/write` 产生的改动：**不写入 commit-history，不 commit**
- knowledge/ 写入：**仅用户要求或 Review 通过**
- handoff 存在时：功能交付 → `status: awaiting-review`
- 同 slug 反复修改：原地更新 commit-history 块，不堆新编号

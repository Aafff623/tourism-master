# 任务工作流

从需求到交付的全流程。Agent 与用户交互的**唯一流程规范**。

## 1. 目录结构

```
docs/outputs/
├── report/{theme}/                 # 调研分析（可选，先于 PRD）
├── prd/{theme}/
│   └── prd.md                      # PRD（用户确认前 status: draft）
├── handoff/{theme}/
│   └── {task}.md                   # 一任务一文件，覆盖式更新
└── commit-history/
    ├── {branch}/YYYY-MM-DD.md
    └── archive/
        └── legacy-date-based/      # 旧 docs/history 迁入
```

**命名**：`{theme}`、`{task}` 用 kebab-case 英文。`prd/{theme}/` 与 `handoff/{theme}/` **必须同名**。

> **迁移说明（2026-08-04）**：历史 `docs/output/` 与 `docs/history/` 已整体迁入本树。禁止再新建 `docs/output/`。若外链仍写旧路径，以本文件为准改链。

---

## 2. 全流程

```
用户想法
  → GitHub Issue（Epic）
  → （可选）docs/outputs/report/{theme}/
  → docs/outputs/prd/{theme}/prd.md（draft）
  → 用户确认 PRD ✓
  → 拆任务：子 Issue + handoff/{theme}/{task}.md
  → Agent 实施 → 更新 handoff → 停止，请求 Review
  → 用户 Review 通过 ✓
  → 归档 handoff；主题完结归档 PRD
  → commit-history + git commit（用户同意后）
```

| 阶段 | 产物 | 位置 |
|---|---|---|
| 立项 | Epic Issue | GitHub |
| 调研 | report（可选） | `docs/outputs/report/{theme}/` |
| PRD | `prd.md` | `docs/outputs/prd/{theme}/` |
| 子任务 | 子 Issue + handoff | GitHub + `handoff/{theme}/{task}.md` |
| 攒批 | commit-history | `docs/outputs/commit-history/{branch}/` |
| 完结 | 归档 | 对应 `archive/` |

---

## 3. PRD 规范

路径：`docs/outputs/prd/{theme}/prd.md`  
示例：`docs/outputs/prd/shanxi-bilingual-mvp/prd.md`

```markdown
---
theme: example-theme
epic-issue: 42
status: draft | approved | archived
---

# PRD — {标题}

## 背景
## 目标
## 范围（做 / 不做）
## 验收标准
## 任务拆分
```

---

## 4. Handoff 规范

- 一任务一文件；**覆盖式**更新（旧日期文件直接删除）。
- 交付后 `status: awaiting-review`，Agent **停止**。
- 交付前必须输出 Review 说明（做了什么 / 改了哪些文件 / Review 重点）。

---

## 5. Review 与 Commit

1. Review 通过前禁止把「做完」当作可 commit 终点。
2. 用户明确同意后才 `git commit`。
3. 只提交本轮自己改动的文件。
4. commit-history 表格格式见 `.cursor/rules/commit-history.mdc`。

---

## 6. 交付 / 归档命令

| 命令 | 规范 |
|---|---|
| `/deliver` | [`deliver.md`](deliver.md) |
| `/archive` | [`archive.md`](archive.md) |

---

## 7. 本仓约定

- 三端 monorepo：**根治理即可**，子包不重复 AGENTS/CONTEXT。
- 演示默认 Mock-only（ADR-0003）。
- 用词入口：根 [`LANGUAGES.md`](../../LANGUAGES.md)；领域事实：根 [`CONTEXT.md`](../../CONTEXT.md)。

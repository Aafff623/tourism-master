# .claude/

Claude Code 在本仓库的本地入口。

| 文件 | 用途 |
|---|---|
| 根目录 [`CLAUDE.md`](../CLAUDE.md) | **唯一**项目级指令与维护协议 |
| [`AGENTS.md`](../AGENTS.md) | 跨工具硬约束速查 |
| [`docs/agents/`](../docs/agents/) | 任务流、交付、归档、领域消费规则 |
| [`.cursor/skills/deliver/`](../.cursor/skills/deliver/) | Cursor `/deliver`（规范 → `docs/agents/deliver.md`） |
| [`.cursor/skills/archive/`](../.cursor/skills/archive/) | Cursor `/archive`（规范 → `docs/agents/archive.md`） |

本目录不存放第二套互相冲突的规则。新增 Claude 专用偏好时，追加到根 `CLAUDE.md` §已归档偏好。

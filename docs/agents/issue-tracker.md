# Issue tracker: GitHub

本仓库的 issue 和 PRD 以 GitHub issue 的形式存在。所有操作都通过 `gh` CLI 进行。

仓库：`Aafff623/tourism-master`（从 `git remote -v` 推断；在 clone 目录中运行时 `gh` 会自动处理）。

> 全局 project-init 默认 tracker 为本地 `.scratch/`；**本仓特殊信号**已采用 GitHub，保持不变。

## 约定

- **创建 issue**：`gh issue create --title "..." --body "..."`。多行 body 使用 heredoc。
- **查看 issue**：`gh issue view <number> --comments`
- **列出 issue**：`gh issue list --state open --json number,title,body,labels,comments`
- **评论 issue**：`gh issue comment <number> --body "..."`
- **添加 / 移除标签**：`gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **关闭 issue**：`gh issue close <number> --comment "..."`

## 当 skill 说“发布到 issue tracker”

创建一个 GitHub issue。

## 当 skill 说“获取相关 ticket”

运行 `gh issue view <number> --comments`。

## 与本地 docs 的映射

| Issue 角色 | 新主题 | 历史主题 |
|---|---|---|
| Epic（主题） | `docs/outputs/prd/{theme}/prd.md` | `docs/output/reports/{theme}/prd.md` |
| 子 Issue（任务） | `docs/outputs/handoff/{theme}/{task}.md` | `docs/output/handoff/{theme}/{task}.md` |
| 完结 | 对应 `archive/{theme}/` | 同左（历史路径下） |

任务流详见 [`workflow.md`](workflow.md)。用词见根 [`LANGUAGES.md`](../../LANGUAGES.md)。

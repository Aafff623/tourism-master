# ADR-0000: Record architecture decisions

## Status

Accepted

## Context

本仓库从旅游模板二次开发为山西文旅双语小程序。技术选型与数据模型会随调研与 PRD 演进，需要可追溯的决策记录。

## Decision

采用 Architecture Decision Records，存放于 `docs/adr/`，编号 `000N-kebab-title.md`。

后续候选决策（尚未裁定，勿当作已定事实）：

- 双语字段存储模型（并列列 vs JSON）
- Mock 数据放置位置（SQL seed vs 静态 JSON vs 管理端录入）
- 小程序 i18n 方案（自研字典 vs 第三方库）

## Consequences

- 重大技术分叉必须先补 ADR 再大规模改代码
- Agent 输出若与已有 ADR 冲突须显式标注

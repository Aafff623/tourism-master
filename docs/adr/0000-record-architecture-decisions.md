# ADR-0000: Record architecture decisions

## Status

Accepted

## Context

本仓库从旅游模板二次开发为山西文旅双语小程序。技术选型与数据模型会随调研与 PRD 演进，需要可追溯的决策记录。

## Decision

采用 Architecture Decision Records，存放于 `docs/adr/`，编号 `000N-kebab-title.md`。

后续已裁定决策：

- ADR-0001：双语成对字段 + `slug` 导航；模式 A 先行

## Consequences

- 重大技术分叉必须先补 ADR 再大规模改代码
- Agent 输出若与已有 ADR 冲突须显式标注

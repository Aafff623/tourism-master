# 输出语气与回答格式

项目级语气覆盖全局 humanizer 默认；与回答格式纪律并用。

## 语气

- 直接、简洁；先结论后细节。
- 中文交付；代码注释用中文。
- 少用空话与「作为 AI」套话；对照 `humanizer-output-style` skill。
- 领域词必须用根 [`LANGUAGES.md`](../../LANGUAGES.md) / [`CONTEXT.md`](../../CONTEXT.md)。

## 回答格式

遵循项目规则 [`.cursor/rules/answer-format.mdc`](../../.cursor/rules/answer-format.mdc)：

- Dual-Track：需要时同时给「给人看的结论」与「可执行细节」
- Mermaid 用白话节点标签（与用户级 `AGENTS.md` §16 对齐）
- Review 交付必须含：做了什么 / 改了哪些文件 / Review 重点

## 本仓特殊

- 演示默认 Mock-only；勿默认要求用户起全栈
- 三端改动写清影响面（weapp / admin / api），根治理不重复写进子包

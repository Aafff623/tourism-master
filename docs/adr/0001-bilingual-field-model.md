# ADR-0001: Bilingual fields and spot navigation key

## Status

Accepted（2026-07-10，用户确认模式 A 及导航策略）

## Context

山西文旅双语 MVP 需要中英成对内容。模板 `biz_spot` 仅有单语字段与未使用的 `extJson`。调研包使用 `nameZh`/`nameEn` 与 `slug`。第一阶段采用小程序前端 Mock 适配层（模式 A），后端 Seed（B）与完整 CMS（C）延后。

用户确认：

- 模式 A 先行；B/C 后置
- 首页用「景区热点」承接调研 `homeRecommendations`，不写入 `biz_recommend`
- 允许游客浏览
- 详情保留订票与评论区
- 列表→详情跳转由实现方选定稳妥方案

## Decision

1. **双语建模（MVP）**：成对字段（`nameZh`/`nameEn` 等），与调研包一致；页面经 Adapter 输出当前 locale 的单语 ViewModel。
2. **导航键（模式 A）**：以 **`slug` 为业务主键**。列表/热点跳转携带 `slug`（兼容可将 `id` 设为与 `slug` 相同字符串，避免大改现有 `option.id` 读取）。接模式 B 后：API 仍暴露 `slug`，内部再映射雪花 `id`。
3. **游客浏览（模式 A）**：景区主链路走本地 Repository，**不经过**强制 Token 的 `http.js`；订票/评论等仍走原 API 时保持原鉴权（无 Token 则按模板行为）。
4. **动态字段**：开放时间、票价等保留 `UNVERIFIED` + 统一免责声明，不得展示为已核验事实。

## Consequences

- 需新增 `docs/adr` 本文件；三端长期扩展语言时再评估子表（另开 ADR）
- 模式 B Seed 必须以 `slug` 唯一幂等
- 管理端双语表单属模式 B/C，不阻塞模式 A

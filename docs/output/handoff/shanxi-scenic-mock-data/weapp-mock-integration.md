# weapp-mock-integration

```yaml
theme: shanxi-scenic-mock-data
task: weapp-mock-integration
issue: null
status: in-progress
updated: 2026-07-10
```

## 目标

按模式 A 将调研包 6 个 P0 景区以「前端 Mock 适配层」接入 `tourism_weapp`：列表、详情（`slug`）、首页景区热点、中英切换、服务话术、文化解读、UNVERIFIED 免责声明。游客可浏览主链路。详情保留订票/评论（仍走原 API 鉴权）。

## 已完成

- Phase 0：调研包归位、integration-audit、field-mapping、prd draft
- 用户拍板：模式 A；首页热点；游客浏览；详情保留订票评论；导航用 slug（ADR-0001）
- 迁入 Cursor `/deliver`、`/archive` skills；资产文件同步决策

## 待 Review（当前交付）

- 决策文档、ADR-0001、PRD approved、`/deliver`·`/archive` skills 是否齐套
- handoff 目标是否可进入小程序实施
- **尚未**改 `tourism_weapp` 业务代码

## 阻塞 / 问题

- 无。文档轮 Review 通过后即可改小程序（可与 commit 分开说）。

## 下次（仅 Review 通过后填写）

- 落地 `scenicMock/` + Repository/Adapter
- 改造 home / spot / spot/detail / service
- 回归：6 slug、中英、引用完整性、免责声明

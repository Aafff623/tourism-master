# weapp-mock-only-runtime

```yaml
theme: mock-demo-freeze
task: weapp-mock-only-runtime
status: review
updated: 2026-07-10
```

## 已完成

- 新增 `tourism_weapp/services/scenicDataSource.js`：`USE_SCENIC_MOCK = true`（ADR-0003）
- `scenicRepository`：catalog / detail / hotspots 在 Mock-only 时**不发起**双语 API
- `getSpotDetailByIdOrSlug`：Mock-only 下未知 id 返回 null，不再打 API
- `scenicMockSmoke`：增加 mockOnly、概况、遗产计数

## 待 Review

- 微信开发者工具：断网或 API 未启动时，主链路仍能出 6 个景区

## 切回 Mode B（后置）

将 `USE_SCENIC_MOCK` 改为 `false`（另开分支时再做）。

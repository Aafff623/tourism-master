# weapp-api-switch

```yaml
theme: shanxi-bilingual-mvp
task: weapp-api-switch
issue: null
status: done
updated: 2026-07-10
```

## 目标

Repository 优先调双语 API，失败回退本地 Mock；页面尽量只改异步加载；游客请求免登录。

## 已完成

- `api/scenicBilingualApi.js` — catalog / detail / hotspots
- `utils/http.js` — 白名单三条双语路径；网络失败 `reject`；无 data 不崩；未登录非白名单抛错而非坏请求
- `services/scenicRepository.js` — async API-first + sync Mock 保留；详情服务话术用本地 Mock 补全 id
- `pages/home|spot|detail` — await Repository
- `scenicMockSmoke.js` — 改用 sync Mock 路径

## 待 Review

- 无后端时是否静默回退 Mock（首页/列表/详情仍可用）
- 有后端 + DDL/Seed 后是否吃到 API 数据
- 服务 Tab 仍走本地 `getServiceItems`（有意保留）

## 阻塞 / 问题

- 本机未强制联调真实 API（依赖 DEV_URL）

## 下次

- 与 `admin-bilingual-fields` 一并 Review 后 commit

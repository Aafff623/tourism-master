# weapp-home-hotspots

```yaml
theme: shanxi-bilingual-mvp
task: weapp-home-hotspots
issue: null
status: done
updated: 2026-07-10
```

## 目标

首页「景区热点」承接 `homeRecommendations`；语言切换刷新名称/推荐理由；点击以 `slug` 进详情；不写入 `biz_recommend`。

## 已完成

- `home.vue` 去掉 `getredspot` API，改用 `getHomeHotspots(locale)`
- 展示 rank、levelLabel、tags、reason；封面占位图
- 切换中/EN 时重载热点文案
- 跳转 `/pages/spot/detail?id={slug}`（与 ADR-0001 兼容参数名）

## 待 Review（当前交付）

- 热点列表中英与排序（6 条）是否正确
- 点击进详情：当前详情页仍走旧 API，**slug 详情要等下一 phase `weapp-spot-list-detail`** 才会真正打开 Mock 内容（本 phase 只保证路由参数正确）
- 未改 `biz_recommend` / 美食住宿推荐页

## 阻塞 / 问题

- 无（详情 Mock 为已知后续依赖，非阻塞本 phase 验收「热点展示」）

## 下次（Review 通过并 commit 后）

- `weapp-spot-list-detail`

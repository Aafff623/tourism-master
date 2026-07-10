# weapp-spot-list-detail

```yaml
theme: shanxi-bilingual-mvp
task: weapp-spot-list-detail
issue: null
status: done
updated: 2026-07-10
```

## 目标

改造 `pages/spot/spot` 与 `pages/spot/detail`：Mock 列表/详情、`slug` 导航、文化解读、专属话术、UNVERIFIED 免责声明、占位图；保留订票与评论入口（API 失败则空）。

## 已完成

- `spot.vue`：`getSpotCatalog` + 本地搜索；壳文案 placeholder；locale 切换刷新；跳转 slug
- `detail.vue`：`getSpotDetailByIdOrSlug`；简介/看点/交通/提示/季节/文化解读/话术/免责声明
- 订票票种、历史、评论仍调原 API，失败静默（Mock slug 下通常为空）
- 首页热点 → 详情现可打开 Mock 内容

## 待 Review（当前交付）

- 景点 Tab：6 个 P0 列表 + 搜索
- 详情：中英切换后正文是否切换（从首页改语言再进详情，或需在详情页监听事件——已监听 `LOCALE_CHANGED_EVENT`）
- 文化解读 / 话术 / 免责声明区块是否可读
- 订票/评论在无后端时为空是否可接受

## 阻塞 / 问题

- 无

## 下次（Review 通过并 commit 后）

- `weapp-service-phrases`

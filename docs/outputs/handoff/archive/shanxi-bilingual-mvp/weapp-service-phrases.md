# weapp-service-phrases

```yaml
theme: shanxi-bilingual-mvp
task: weapp-service-phrases
issue: null
status: done
updated: 2026-07-10
```

## 目标

改造 `pages/service/service`：按 category 展示通用双语服务话术；天气/公交等降权保留在「其他服务」。

## 已完成

- `service.vue`：`getServiceItems(locale)` 按 ticketing/transport/food/emergency/etiquette/shopping 分组
- 壳文案分类标题中英；locale 切换刷新
- 概况/咨询/投诉/公交/天气保留在下方「其他服务」
- 去掉外链海报图依赖

## 待 Review（当前交付）

- 18 条通用话术分组与中英是否正确
- 「其他服务」降权布局是否可接受
- 下一 phase 为 `weapp-mvp-regression` 总验收

## 阻塞 / 问题

- 无

## 下次（Review 通过并 commit 后）

- `weapp-mvp-regression`

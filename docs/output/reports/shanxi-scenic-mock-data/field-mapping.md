# Field Mapping — 调研包 ↔ 三端

> theme: `shanxi-scenic-mock-data`  
> status: decisions-locked（2026-07-10）  
> date: 2026-07-10  
> 导航与双语：见 [`ADR-0001`](../../../adr/0001-bilingual-field-model.md)

约定：处理方式 = `复用` / `转换` / `新增` / `前端-only` / `延后`。

## 1. 景区主数据（`spots.json` → 列表/详情）

| 调研字段 | 小程序现用 | 后端 `Spot` / 列 | 管理端表单 | 处理方式 |
|---|---|---|---|---|
| `id` | （无；用后端雪花 id） | `id` | 隐式 | 转换：Mock 可用调研 `id`；接 API 后映射后端 id |
| `slug` | 无 | 无 | 无 | **新增**（推荐业务键；或暂存 `extJson.slug`） |
| `nameZh` | `spotName` | `spotName` | `spotName` | 转换：locale=zh → `spotName` |
| `nameEn` | 无 | 无 | 无 | **新增** `spotNameEn` 或 Adapter 按 locale 选 |
| `cityZh` / `cityEn` | 无（仅有 `address`） | 无 | 无 | **新增** 或塞进 `address` 前缀（弱） |
| `level` | `startLevel`（数字星级） | `startLevel` | `startLevel` | 转换：解析「5A」等；不能粗暴覆盖星级语义时另字段 `levelLabel` |
| `tags[].zh/en` | `spotTags: string[]` | `spot_tags` JSON | `spotTags` | 转换：按 locale 展平为 string[] |
| `summaryZh/En` | 无（列表无摘要） | 无 | 无 | **新增** 列表副文案；或截断 `intro*` |
| `introZh/En` | `description` | `description` | `description` | 转换：按 locale → `description` |
| `highlights[]` | 无 | 无 | 无 | **新增** / 前端-only（详情区块） |
| `openTimeZh/En` | `openingTime` | `openingTime` | `openingTime` | 转换 + **UNVERIFIED** 免责声明 |
| `ticketZh/En` | `ticketList`（结构化票种） | `biz_ticket` | ticket 模块 | 转换：MVP 用文案块，**不**强行造票种 SKU |
| `transportZh/En` | 无（有 `traffice`） | `traffice` | `traffice` | 转换：按 locale 写入/展示 |
| `bestSeasonZh/En` | 无 | 无 | 无 | 前端-only 或新增 |
| `visitTipsZh/En` | 无 | 无 | 无 | 前端-only 或新增 |
| `culturalNotes[]` | 无 | 无 | 无 | **新增**（JSON 列 / 子表 / 前端-only） |
| `services[]` (ids) | 无 | 无 | 无 | 前端-only 引用 `serviceItems` |
| `geo.lat/lng` | `latitude`/`longitude` | 同左 | 同左 | 复用（注意 UNVERIFIED） |
| `coverImageHint` | `cover.url` | `cover` | `cover` | **不下载**外链；占位图 + hint 仅文档 |
| `sources[]` | 无 | 可进 `extJson` | 无 | 延后暴露；Seed 时保留 |

## 2. 目录与推荐

| 调研字段 | 小程序 | 后端 | 处理方式 |
|---|---|---|---|
| `spotCatalog[]` | `getspotbook` 列表 | `biz_spot` 分页 | 模式 A：Mock catalog；模式 B：seed 6 条 |
| `homeRecommendations[].spotSlug` | 首页 `getredspot` | 无「景区推荐」表 | **转换到首页热点**；勿写入 `biz_recommend` |
| `provinceIntro` | `SNOWY_BIZ_SPOT` 配置 | 系统配置 | 替换富文本或改读 Mock |
| `heritageStrategy` | `biz_heritage` 列表 | `biz_heritage` | 可选映射；遵守包内去重规则 |

## 3. 服务话术与障碍

| 调研字段 | 小程序 | 后端 | 处理方式 |
|---|---|---|---|
| `serviceItems[]` | `service.vue` 静态 | 无 | **前端-only**（改造服务页）或新表（模式 C） |
| `spotServiceLinks[]` | 详情无 | 无 | 详情按 `spotSlug` 过滤展示 |
| `barrierTypes[]` | 无 | 无 | 字典；驱动 `culturalNotes.barrierType` |
| `religiousEtiquette` | 无 | 无 | 详情/服务复用块（五台山等） |
| `qualityCompliance` | 无 | 无 | UI 免责声明文案来源 |

## 4. Extras（第二刀）

| 文件 | 处理方式 |
|---|---|
| `extras/itineraries.json` | 延后 |
| `extras/accessibilityAndFamily.json` | 延后 |
| `extras/winterNotices.json` | 延后（可挂详情提示） |

## 5. Adapter 目标 ViewModel（模式 A 建议）

页面只消费下列稳定结构（示意），由 `scenicAdapter` 从调研 JSON 生成；日后 API 返回同形：

```text
SpotListItem {
  id, slug, name, coverUrl, rate?, levelLabel, tags[], address, city, minPrice?
}
SpotDetail {
  ...SpotListItem,
  summary, intro, highlights[], openTime, ticketSummary, transport,
  visitTips, bestSeason, culturalNotes[], serviceItems[],
  geo, verificationNotice, unverifiedFields[]
}
ServiceItem { id, category, title, phrase, note }
```

`name/summary/...` 已是**当前 locale 解析后的单语字符串**，页面不拼 `Zh/En`。

## 6. 双语建模与导航（已确认）

| 选项 | 决定 |
|---|---|
| 成对字段 `nameZh`/`nameEn` | **采用（MVP）** |
| `{ zh, en }` 对象 | 不采用（除非另开 ADR） |
| 只塞 `extJson` | 不作为主方案 |
| 列表→详情 | **`slug`**；路由参数可与页面原 `id` 读取兼容（传 slug 字符串） |

详见 `docs/adr/0001-bilingual-field-model.md`。

## 7. 引用完整性检查（实施时必跑）

- [ ] `homeRecommendations.spotSlug` ∈ `spots.slug`
- [ ] `spotServiceLinks.spotSlug` ∈ `spots.slug`
- [ ] `spots.services[]` ⊆ `serviceItems.id`
- [ ] 6 个 P0 均有非空 `nameZh/nameEn/summaryZh/summaryEn/introZh/introEn`

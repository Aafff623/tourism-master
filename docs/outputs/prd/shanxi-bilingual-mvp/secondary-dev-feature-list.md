# 二次开发功能清单

> theme: `shanxi-bilingual-mvp`  
> 配套 PRD：[`prd.md`](prd.md)  
> 路线图：[`implementation-roadmap.md`](implementation-roadmap.md)  
> 数据主题：[`../shanxi-scenic-mock-data/`](../shanxi-scenic-mock-data/)  
> 更新：2026-07-10

本文列出**在现有模板上要改什么**（页面 / 模块 / 数据 / 验收），供实施与拆 Issue 使用。

---

## 1. 改造策略总表

| 模板模块 | 路径线索 | 二次开发策略 | 波次 |
|---|---|---|---|
| 首页 | `pages/home/home` | **改造**：景区热点 + 语言切换入口；弱化原运营噪音 | W1 |
| 景点列表 | `pages/spot/spot` | **改造**：接 Mock catalog；按 locale 展示；跳转 `slug` | W1 |
| 景区详情 | `pages/spot/detail` | **改造**：双语详情 + 文化解读 + 专属话术 + 免责声明；**保留**订票/评论 | W1 |
| 服务 | `pages/service/service` | **改造**：通用双语话术分组；天气/公交可降权保留 | W1 |
| 景区概况 | `pages/home/children/introduce` | P1：接 `provinceIntro` 或暂留配置富文本 | W2 |
| 文化遗产 | `pages/home/children/heritage` | P1：按 `heritageStrategy`；与列表去重 | W2 |
| 推荐（美食等） | `pages/home/children/recommend` | **不验收**；入口可保留，首页主视觉让位热点 | — |
| 攻略 | `pages/strategy/*` | **不验收** | — |
| 订票/订单 | `prebook` / `order/*` | **不改造主逻辑**；详情入口保留 | — |
| 用户/登录 | `pages/user/*` | **不阻塞** MVP；主链路游客可进 | — |
| 管理端景区 | `tourism_admin/.../biz/spot` | Wave 2：双语字段 | W2 |
| 后端景区 | `biz_spot` / `WxSpot*` | Wave 2：Seed + slug API | W2 |

---

## 2. Wave 1 — 小程序模式 A（当前）

### 2.1 新增资产（建议落点，实施时按实勘微调）

| 资产 | 职责 |
|---|---|
| `tourism_weapp/.../scenicMock/*.json` | 从调研包复制的**拆分** JSON（非唯一用 bundle） |
| `scenicAdapter.js` | 调研结构 → 页面 ViewModel；按 locale 选字段 |
| `scenicRepository.js` | `getSpotCatalog` / `getSpotDetail(slug)` / `getHomeHotspots` / `getServiceItems` 等 |
| 语言 store / 工具 | 全局 `zh`\|`en`；持久化可选 |
| 壳文案字典 | Tab/按钮/区块标题中英 |

### 2.2 功能条目（实施清单）

| 编号 | 功能 | 改动要点 | 数据依赖 | 验收 |
|---|---|---|---|---|
| SD-01 | Mock 数据接入 | 拷贝最小闭环 JSON；校验 slug/service 引用 | spots, catalog, homeRecommendations, serviceItems, spotServiceLinks, barrierTypes, qualityCompliance | 引用检查通过 |
| SD-02 | Adapter + Repository | 页面不直接散落 `import` 多 JSON；稳定 ViewModel | field-mapping.md | 换 locale 只改 Repository 入参 |
| SD-03 | 语言切换 | 首页或全局入口；切换刷新当前页文案 | 壳字典 + Adapter | 中英来回不串字段 |
| SD-04 | 景区列表 | `spot.vue` 改读 Repository；搜索可先做名称过滤 | spotCatalog / spots | 展示 6 个 P0 |
| SD-05 | 景区详情 | `detail.vue` 按 `slug` 加载；文化解读/话术/免责声明 | spots + links + qualityCompliance | 6 slug 可开；订票评论仍在 |
| SD-06 | 首页热点 | 原热门景区区改为热点列表 | homeRecommendations | 点击进对应详情 |
| SD-07 | 服务话术 | `service.vue` 按 category 展示通用话术 | serviceItems | 包内通用条目可见 |
| SD-08 | 详情专属话术 | 详情内过滤 `spotServiceLinks` | spotServiceLinks | 有数据则展示 |
| SD-09 | 占位图 | 无合法封面时用本地占位 | — | 不崩、不拉不明版权图 |
| SD-10 | 回归 | PRD 验收 + 数据主题验收 | — | regression handoff |

### 2.3 明确不改（Wave 1）

- `tourism_api` 表结构 / Controller  
- `tourism_admin` 表单  
- 攻略、天气、公交、行程规划业务逻辑  
- `biz_recommend` 数据模型  

---

## 3. Wave 2 — 后端 Seed + 管理端（后置）

| 编号 | 功能 | 说明 |
|---|---|---|
| SD-11 | `biz_spot` 扩展或约定 | `slug`、成对双语字段或等价存储；幂等 Seed |
| SD-12 | 客户端查询 API | 列表摘要 / 详情 / 热点；响应对齐 Adapter ViewModel |
| SD-13 | 小程序切 API | Repository 换数据源，页面尽量不动 |
| SD-14 | 管理端双语表单 | name/intro 中英、核验状态、来源 URL（轻量） |
| SD-15 | 概况 / 遗产页 | `provinceIntro`、`heritageStrategy` |

---

## 4. Wave 3 — 完整内容管理（可选）

| 编号 | 功能 |
|---|---|
| SD-16 | 文化解读子表 / 服务话术表与关联 |
| SD-17 | 核验工作流、来源管理、动态公告 |
| SD-18 | extras：线路 / 无障碍 / 冬季提示产品化 |

---

## 5. 调研数据 → 功能映射

| 调研文件 | 支撑功能编号 |
|---|---|
| `spotCatalog.json` / `spots.json` | SD-01,04,05 |
| `homeRecommendations.json` | SD-06 |
| `serviceItems.json` | SD-07 |
| `spotServiceLinks.json` | SD-08 |
| `barrierTypes.json` + `culturalNotes` | SD-05 |
| `qualityCompliance.json` | SD-05 免责声明 |
| `provinceIntro.json` / `heritageStrategy.json` | SD-15 |
| `extras/*` | SD-18 |

---

## 6. 与 handoff 对应

| 功能编号 | handoff |
|---|---|
| SD-01,02 | `docs/output/handoff/shanxi-scenic-mock-data/weapp-mock-integration.md` |
| SD-03 | `docs/output/handoff/shanxi-bilingual-mvp/weapp-locale-shell.md` |
| SD-04,05,08,09 | `docs/output/handoff/shanxi-bilingual-mvp/weapp-spot-list-detail.md` |
| SD-06 | `docs/output/handoff/shanxi-bilingual-mvp/weapp-home-hotspots.md` |
| SD-07 | `docs/output/handoff/shanxi-bilingual-mvp/weapp-service-phrases.md` |
| SD-10 | `docs/output/handoff/shanxi-bilingual-mvp/weapp-mvp-regression.md` |
| SD-11+ | 后置，未建 handoff |

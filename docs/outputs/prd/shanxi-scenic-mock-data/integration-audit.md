# Integration Audit — 山西景区 Mock 融合

> theme: `shanxi-scenic-mock-data`  
> status: decisions-locked（用户已拍板；业务代码仍未改）  
> date: 2026-07-10  
> 依据：[`LOCAL-AGENT-INTEGRATION-GUIDE.md`](LOCAL-AGENT-INTEGRATION-GUIDE.md) · 调研包 [`research/shanxi-scenic-mock-research-v1/`](research/shanxi-scenic-mock-research-v1/) · [`ADR-0001`](../../../adr/0001-bilingual-field-model.md)

## 1. 调研包归位

| 项 | 路径 |
|---|---|
| 融合指南 | `docs/outputs/prd/shanxi-scenic-mock-data/LOCAL-AGENT-INTEGRATION-GUIDE.md` |
| ZIP | `docs/outputs/prd/shanxi-scenic-mock-data/research/shanxi-scenic-mock-research-v1.zip` |
| 解压内容 | `docs/outputs/prd/shanxi-scenic-mock-data/research/shanxi-scenic-mock-research-v1/` |
| P0 景区数 | 6（`data/spots.json`） |
| 候选目录 | 12（`data/spotCatalog.json`） |

运行时 Mock **尚未**写入 `tourism_weapp` / DB；本阶段仅文档与研究资产入库。

## 2. 小程序数据链路（实勘）

| 页面 | 路径 | 当前数据来源 |
|---|---|---|
| 首页 | `tourism_weapp/pages/home/home.vue` | `indexApi.getredspot` + 硬编码轮播图 URL |
| 景点列表 | `pages/spot/spot.vue` | `indexApi.getspotbook({ spotname })` |
| 景区详情 | `pages/spot/detail.vue` | `getspotinfo` / `getspotheritage` / `getticket` / `getcomment` |
| 推荐 | `pages/home/children/recommend/*` | `getrecommend` / `getRecommendInfo`（美食住宿等，**非景区推荐**） |
| 景区概况 | `pages/home/children/introduce/introduce.vue` | `getconfig({ key: 'SNOWY_BIZ_SPOT' })` 富文本 |
| 文化遗产 | `pages/home/children/heritage/*` | `getheritage` / `getheritagedetail` |
| 服务 | `pages/service/service.vue` | **无 API**；静态入口（电话/天气/公交） |

请求封装：`tourism_weapp/utils/http.js` → `BASE_URL` + `/client/c`；成功包络 `{ code, msg, data }`，页面取 `res.data`。

景区相关 API 集中在：`tourism_weapp/api/indexApi.js`。

| 能力 | 现状 |
|---|---|
| i18n / 语言切换 | **无**（壳文案与内容均为中文硬编码） |
| 本地 mock/ 目录 | **无** |
| 静态图 | `static/` 在仓库快照中缺失；首页用外链泰安文旅图 |

### 列表/详情现用字段（ViewModel）

列表：`id`, `cover.url`, `spotName`, `rate`, `startLevel`, `spotTags`, `address`, `minPrice`  
详情另加：`images[].url`, `openingTime`, `description`, `latitude/longitude`, `contactPhone`, `video`, `plat`；旁路：`ticketList`, `history`（实为 `biz_history`）, `commentList`

## 3. 后端数据链路（实勘）

| 模块 | 路径 / 表 |
|---|---|
| 客户端景区 | `WxSpotController` → `/client/c/spot/*`；列表热点在 `WxIndexControll` → `/client/c/index/*` |
| 实体 | `Spot` → 表 **`biz_spot`** |
| 管理 CRUD | `SpotController` → `/biz/spot/*` |
| 遗产（独立） | `BizHeritage` → `biz_heritage`（首页「文化遗产」） |
| 历史时间线 | `BizHistory` → `biz_history`（详情「历史」=`getspotheritage`） |
| 推荐 | `BizRecommend` → `biz_recommend`（FOOD/LIVE/TRIP/PRODUCTION，**不是景区推荐**） |
| Seed / SQL | 仓库内 **无** `*.sql` / Flyway；库名配置为 `tourism` |
| 双语字段 | **无**；仅有未使用的 `Spot.extJson` |
| 响应包络 | `CommonResult { code, msg, data }` |

`Spot` 主字段：`spotName`, `address`, `openingTime`, `description`, `spotTags`, `cover/images/video/plat`, `rate`, `startLevel`, `traffice`, `longitude/latitude`, `contactPhone`, `websiteUrl`, `isPrebook`, `extJson`, 审计与逻辑删除字段。

## 4. 管理端（实勘）

| 项 | 现状 |
|---|---|
| 景区页 | `tourism_admin/src/views/biz/spot/index.vue` + `form.vue` |
| API | `src/api/biz/spotApi.js` → `/biz/spot/page|add|edit|delete|detail|namelist` |
| 表单 | 单语：`spotName`, `description`, `openingTime`, `traffice` 等（见 field-mapping） |
| 双语表单 | **无** |
| 菜单路由 | 后端动态菜单，组件路径形如 `biz/spot/index` |

## 5. 调研包 ↔ 模板语义冲突（重要）

| 调研概念 | 模板现状 | 融合注意 |
|---|---|---|
| `homeRecommendations`（景区推荐） | 首页「推荐」= 美食/住宿/行程/文创 | **不要**塞进 `biz_recommend`；应改首页热点或新区块 |
| `heritageStrategy` / 文化遗产 | `biz_heritage` 独立模块 | 可映射，但需去重规则；与详情 `biz_history` 不同 |
| `provinceIntro` | `SNOWY_BIZ_SPOT` 配置富文本 | 可替换配置内容或改读 Mock |
| `serviceItems` 双语话术 | `service` 页无后端 | **新能力**；适合前端 Mock 或新表 |
| `culturalNotes` | 无对应 | **新能力**；详情新 section |
| `slug` | 仅有雪花 `id` | 需新增业务键或用 `extJson`/新列 |

## 6. 接入模式（已拍板）

| 模式 | 状态 |
|---|---|
| **A. 小程序前端 Mock 适配层** | **已确认：第一阶段** |
| B. 后端 Seed + API | 后置 |
| C. 完整内容管理 | 后置 |

理由不变：无 SQL seed；主链路用 Repository 绕过强制登录，便于游客浏览；Adapter ViewModel 与未来 API 对齐。

## 7. 产品决策（已拍板 2026-07-10）

| 议题 | 决定 |
|---|---|
| 首页推荐 | 改为**首页景区热点**，数据来自 `homeRecommendations`；不写入 `biz_recommend` |
| 游客浏览 | **允许**；景区 Mock 主链路不强制登录 |
| 详情订票/评论 | **保留**（仍走原 API；无 Token 时行为与模板一致） |
| 列表→详情 | **`slug` 业务键**（见 ADR-0001）；兼容层可将路由参数与 `id` 对齐为 slug 字符串 |
| 双语建模 | 成对字段；见 ADR-0001 |
| 美食住宿等推荐入口 | 可不删模板页；首页主视觉让位给景区热点 |

## 8. 第一阶段最小改动清单（下一步实施）

1. 研究包归位 — **Done**  
2. `tourism_weapp`：`scenicMock/` 拆分 JSON + `scenicRepository` / `scenicAdapter`  
3. 改造：景点列表、详情（slug）、首页热点、服务话术、语言切换、UNVERIFIED 免责声明  
4. 仅 6 个 P0；图片占位  
5. 本阶段不改 `tourism_api` / admin  

## 9. 残留风险（非阻塞）

- 订票/评论在无 Token 时仍可能跳登录（可接受）  
- 模式 B 依赖本机 `tourism` 库（后置再确认）  
- 外链封面仅作 hint，运行时用占位图  

## 10. 本阶段禁止项（文档轮仍遵守）

- 未修改三端业务代码（待 handoff 实施）  
- 未执行数据库迁移  
- 未 commit / push（等用户明确同意）

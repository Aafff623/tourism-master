# PRD — 山西文旅双语小程序（产品）

```yaml
theme: shanxi-bilingual-mvp
epic-issue: null
status: approved
related:
  - shanxi-scenic-mock-data
date: 2026-07-10
```

## 背景

基于闲鱼旅游模板（UniApp + Vue3 管理端 + Spring Boot）二次开发，产品定位为**山西文旅景区介绍与中英双语服务**小程序，服务入境游客与中文用户，降低跨文化信息获取成本。

课题叙事（产品背景，非论文交付）：入境游客跨文化旅游体验障碍及双语服务体系构建——以山西文旅景区为例。

调研与数据：`shanxi-scenic-mock-research-v1`（6 个 P0 景区完整双语 + 服务话术 + 文化解读等），融合主题见 [`../shanxi-scenic-mock-data/prd.md`](../shanxi-scenic-mock-data/prd.md)。

## 目标

1. 游客无需登录即可浏览山西重点景区的中/英介绍与文化解读。  
2. 提供可复用的双语服务话术（购票问询、礼仪、应急等）。  
3. 首页以「景区热点」进入主线，弱化非主线运营位。  
4. 第一阶段用前端 Mock 适配层交付可演示闭环；后端 Seed / 管理端双语维护后置。  
5. 动态信息（开放时间、票价等）带 `UNVERIFIED` 免责声明，不伪造成实时官方数据。

## 用户与场景

| 角色 | 场景 |
|---|---|
| 入境游客 | 切换英文 → 看景区详情与文化提示 → 复制/查看现场话术 |
| 中文用户 | 浏览山西景区介绍与服务指引 |
| 演示/答辩 | 展示双语能力与跨文化服务设计（Mock 数据可说明来源） |

## 范围

### 做（MVP / P0）

| ID | 能力 | 说明 |
|---|---|---|
| F1 | 语言偏好 / 切换 | 全局 `zh` ↔ `en`；壳文案 + 内容字段同步 |
| F2 | 景区列表 | 6 个 P0；按当前语言展示名称/城市/标签 |
| F3 | 景点详情 | 简介、开放/票价/交通概要、看点、文化解读、专属话术；**保留**订票与评论入口 |
| F4 | 文化解读 | `culturalNotes` + 障碍类型；可读区块非原始 JSON |
| F5 | 双语服务 | 通用话术（服务页）+ 景区专属话术（详情） |
| F6 | 首页景区热点 | `homeRecommendations`；不写入 `biz_recommend` |
| F7 | Mock 适配层 | Repository/Adapter；`slug` 导航；游客可浏览主链路 |

### 不做（本阶段）

- 真实支付、库存、核销  
- 日/韩等多语言  
- 语音讲解、AR、深度地图导航  
- 论文正文进小程序  
- 模式 B/C（API Seed、完整 CMS）— 另立阶段  
- 攻略 / 天气 / 公交 / 行程规划 — **不验收**（模板可保留）

### P1（后置，有余力）

| ID | 能力 |
|---|---|
| F8 | 管理端景区双语轻量表单 |
| F9 | 列表按城市/类型筛选 |
| F10 | 关于课题 / 关于我们（中英） |
| F11 | 景区概况页接 `provinceIntro`；文化遗产按 `heritageStrategy` |
| F12 | 模式 B：后端幂等 Seed + 查询 API |

## 已锁定决策

| 项 | 决定 | 依据 |
|---|---|---|
| 接入 | 模式 A → B → C | 用户 2026-07-10 |
| 首页 | 景区热点 | audit + 用户确认 |
| 游客 | Mock 主链路免登录 | ADR-0001 / CONTEXT |
| 详情订票评论 | 保留 | 用户确认 |
| 导航 | `slug` | ADR-0001 |
| 双语 | 成对字段 | ADR-0001 |
| P0 景区 | 云冈、五台山、平遥、晋祠、壶口（山西侧）、悬空寺 | 调研包 |

## 验收标准（产品）

- [x] 语言切换后，列表/详情/服务/热点核心文案随 locale 变化且不串字段  
- [x] 6 个 P0 `slug` 均可进入详情；中英 `name/summary/intro` 非空  
- [x] 首页热点引用有效；服务话术与 `spotServiceLinks` 无悬空 id  
- [x] 文化解读以可读区块展示；UNVERIFIED 字段可见免责声明  
- [x] 游客可完成：首页 → 列表/热点 → 详情 → 服务话术（主链路无登录墙）  
- [x] 订票/评论入口仍在详情；无 Token 时行为与模板一致（可跳登录）  
- [x] 不使用版权不明外链图作封面（占位图）  

> 自动化勾选依据：`wave1-regression-check.py`（2026-07-10，ERRORS=0）。UI 手测仍建议在微信开发者工具点验语言切换与页面渲染。

## 任务拆分

| task | 说明 | handoff | 阶段 |
|---|---|---|---|
| weapp-locale-shell | 语言状态 + 壳文案字典 | `handoff/shanxi-bilingual-mvp/weapp-locale-shell.md` | Wave 1 |
| weapp-mock-integration | Mock 数据层 + Adapter（与数据主题共用实施） | `../handoff/shanxi-scenic-mock-data/weapp-mock-integration.md` | Wave 1 |
| weapp-spot-list-detail | 列表/详情改造 | `handoff/shanxi-bilingual-mvp/weapp-spot-list-detail.md` | Wave 1 |
| weapp-home-hotspots | 首页景区热点 + 语言入口 | `handoff/shanxi-bilingual-mvp/weapp-home-hotspots.md` | Wave 1 |
| weapp-service-phrases | 服务页双语话术 | `handoff/shanxi-bilingual-mvp/weapp-service-phrases.md` | Wave 1 |
| weapp-mvp-regression | 引用完整性与验收回归 | `handoff/shanxi-bilingual-mvp/weapp-mvp-regression.md` | Wave 1 |
| api-seed-integration | 模式 B | 后置 | Wave 2 |
| admin-bilingual-fields | 模式 B/C 管理端 | 后置 | Wave 2 |

二次开发触点明细见 [`secondary-dev-feature-list.md`](secondary-dev-feature-list.md)。推进节奏见 [`implementation-roadmap.md`](implementation-roadmap.md)。

## 风险

| 风险 | 缓解 |
|---|---|
| 订票/评论需登录 | 主链路 Mock 免登；入口保留即可 |
| 模板推荐语义冲突 | 热点独立，不碰 `biz_recommend` |
| 动态字段过时 | UNVERIFIED + 免责声明 |
| Mock 与日后 API 分叉 | Adapter 稳定 ViewModel（field-mapping） |

## 参考

- [`mvp-feature-list.md`](mvp-feature-list.md)（早期清单，以本 PRD 为准）  
- [`../shanxi-scenic-mock-data/`](../shanxi-scenic-mock-data/)  
- [`../../../adr/0001-bilingual-field-model.md`](../../../adr/0001-bilingual-field-model.md)  
- 调研包 `research/shanxi-scenic-mock-research-v1/`

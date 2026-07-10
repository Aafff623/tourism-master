# 实施路线图 — 山西文旅双语 MVP

> theme: `shanxi-bilingual-mvp`  
> PRD：[`prd.md`](prd.md)  
> 二次开发清单：[`secondary-dev-feature-list.md`](secondary-dev-feature-list.md)  
> 数据融合：[`../shanxi-scenic-mock-data/prd.md`](../shanxi-scenic-mock-data/prd.md)

## 原则

```text
Issue/PRD → handoff → 实施 → /deliver → Review → commit（你同意）→ /archive
```

- 一次只推进一个 handoff 任务（可与数据层任务紧密串联，但仍分文件记录）。  
- Wave 1 完成并验收前，不启动 Wave 2 业务代码。  
- 动态字段始终带 UNVERIFIED 策略。

## Wave 0 — 已完成

| 项 | 状态 |
|---|---|
| 仓库资产 / Matt Pocock / docs 骨架 | done |
| 调研 Q&A + GPT 调研包入库 | done |
| 三端审计 + field-mapping + ADR-0001 | done |
| 模式 A 与产品决策锁定 | done |
| `/deliver` `/archive` skills | done |

## Wave 1 — 小程序可演示闭环（下一步）

推荐实施顺序（依赖从左到右）：

```text
weapp-mock-integration (SD-01/02)
        ↓
weapp-locale-shell (SD-03)
        ↓
   ┌────┴────┐
   ↓         ↓
spot-list-  home-
detail      hotspots
(SD-04/05/08/09) (SD-06)
   ↓         ↓
   └────┬────┘
        ↓
service-phrases (SD-07)
        ↓
mvp-regression (SD-10)
```

| 顺序 | task | 目标 | handoff |
|---:|---|---|---|
| 1 | weapp-mock-integration | Mock JSON + Adapter/Repository | `handoff/shanxi-scenic-mock-data/weapp-mock-integration.md` |
| 2 | weapp-locale-shell | 全局语言 + 壳文案 | `handoff/shanxi-bilingual-mvp/weapp-locale-shell.md` |
| 3 | weapp-spot-list-detail | 列表/详情/文化解读/专属话术 | `handoff/shanxi-bilingual-mvp/weapp-spot-list-detail.md` |
| 4 | weapp-home-hotspots | 首页景区热点 + 语言入口 | `handoff/shanxi-bilingual-mvp/weapp-home-hotspots.md` |
| 5 | weapp-service-phrases | 服务页通用话术 | `handoff/shanxi-bilingual-mvp/weapp-service-phrases.md` |
| 6 | weapp-mvp-regression | 验收清单打勾 | `handoff/shanxi-bilingual-mvp/weapp-mvp-regression.md` |

**Wave 1 完成定义：** PRD 产品验收标准全部勾选；数据主题「实施后」验收勾选。

## Wave 2 — 三端数据贯通（后置）

1. api-seed-integration（SD-11/12）  
2. weapp Repository 切 API（SD-13）  
3. admin-bilingual-fields（SD-14）  
4. 概况/遗产（SD-15）  

须另开 PRD 增量或新 theme，并确认本机 DB 可用。

## Wave 3 — 内容运营（可选）

SD-16～18；需模式 C 级 ADR/PRD。

## 下一行动（Agent）

1. Wave 2 核心三任务已 commit 并归档 handoff。  
2. `reports/shanxi-bilingual-mvp/` 保留；SD-15（概况/遗产）另开任务。  
3. 有库环境执行 DDL → Seed 后联调小程序双语 API。

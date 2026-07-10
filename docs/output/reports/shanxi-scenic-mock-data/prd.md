# PRD — 山西景区 Mock 数据融合

```yaml
theme: shanxi-scenic-mock-data
epic-issue: null
status: approved
related: shanxi-bilingual-mvp
date: 2026-07-10
```

## 背景

网页 GPT 已产出 `shanxi-scenic-mock-research-v1` 调研包（6 个 P0 完整双语景区 + 服务话术 + 文化障碍等）。需融入现有旅游模板三端，支撑「山西文旅双语小程序」MVP，且遵守仓库 Agent 门禁与融合指南。

## 目标

1. 研究资产入库并可追溯。  
2. 明确三端真实数据链路与字段映射。  
3. **模式 A** 以最小改动打通：列表 → 详情（slug）→ 中英切换 → 首页景区热点 → 服务话术 → 文化解读。  
4. 动态字段保留 `UNVERIFIED` 与免责声明；不把 Mock 宣称为实时官方数据。

## 已确认决策

| 项 | 决定 |
|---|---|
| 接入模式 | A 先行；B/C 后置 |
| 首页 | 景区热点（`homeRecommendations`） |
| 游客 | 允许浏览 Mock 主链路 |
| 详情 | 保留订票与评论 |
| 导航 | `slug`（ADR-0001） |
| 双语 | 成对字段（ADR-0001） |

## 范围

### 做

- Phase 0：审计 + 映射 — **Done**  
- Phase 1：模式 A 前端 Mock 适配层（handoff: `weapp-mock-integration`）  
- 仅 6 个 P0；拆分 JSON 运行时  

### 不做（第一阶段）

- 模式 B/C、真实购票支付、不明版权图片、三端大重构  
- 将景区热点写入 `biz_recommend`

## 验收标准

- [x] `integration-audit.md` / `field-mapping.md` 决策已锁定  
- [x] 接入模式 A 已拍板  
- [ ] 实施后：6 个 slug 可打开详情；中英核心字段非空；推荐/话术无悬空引用；UNVERIFIED 提示可见  
- [ ] 未经确认不 commit；不破坏性迁库  

## 任务拆分

| task | Issue | handoff | 状态 |
|---|---|---|---|
| phase0-audit | — | （并入 reports） | done |
| weapp-mock-integration | TBD | `handoff/shanxi-scenic-mock-data/weapp-mock-integration.md` | in-progress |
| api-seed | — | 后置 | deferred |
| admin-bilingual-fields | — | 后置 | deferred |

## 风险

订票/评论无 Token 时仍可能跳登录（可接受）。详见 audit §9。

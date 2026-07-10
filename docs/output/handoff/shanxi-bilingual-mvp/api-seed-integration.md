# api-seed-integration

```yaml
theme: shanxi-bilingual-mvp
task: api-seed-integration
issue: null
status: review
updated: 2026-07-10
```

## 目标

模式 B：`biz_spot` 扩展双语列 + 6 P0 幂等 Seed + 游客可读双语 API（按 slug）；响应对齐小程序 Adapter ViewModel。

## 已完成

- ADR-0002：`docs/adr/0002-wave2-biz-spot-bilingual-columns.md`
- DDL：`tourism_api/sql/wave2_biz_spot_bilingual_ddl.sql`
- Seed 生成器 + SQL：`generate_wave2_seed.py` → `wave2_biz_spot_bilingual_seed.sql`（含 `homeRank` / tags / culturalNotes）
- 实体与入参：`Spot` / `SpotAddParam` / `SpotEditParam` 双语列；`SpotService.getBySlug` / `listBilingualSpots`
- 游客 API：`GET /client/c/spot/bilingual/{catalog,detail,hotspots}?locale=`
- 免登录：`GlobalConfigure.NO_LOGIN_PATH_ARR` 增加 `/client/c/spot/bilingual/**`

## 待 Review（当前交付）

- DDL / Seed 列设计与 ADR-0002 是否一致
- 双语 API 路径与 ViewModel 字段是否够小程序下一刀 `weapp-api-switch` 直接消费
- **本机未强制执行 DDL/Seed**（无库环境只交脚本）；有库时请按序执行 DDL → Seed 后用接口冒烟

## 阻塞 / 问题

- 服务话术正文仍在前端 Mock；详情 `serviceItems` 目前仅回传 id 占位，完整话术在 `weapp-api-switch` 或后续服务表任务补齐
- 管理端表单字段属下一任务 `admin-bilingual-fields`（入参已就绪）

## 下次（Review 通过并 commit 后）

- `weapp-api-switch`：Repository 调双语 API，失败回退 Mock；`http.js` 白名单
- `admin-bilingual-fields`：slug + 中英名称/简介/摘要表单

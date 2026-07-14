# ADR-0002: Wave-2 bilingual columns on biz_spot

## Status

Accepted（2026-07-10，启动 Wave 2）

## Context

Wave 1 用前端 Mock 交付双语闭环。Wave 2 需把 6 个 P0 景区落入 `biz_spot`，并支持按 `slug` 查询与管理端维护。ADR-0001 已选定成对字段与 slug 导航。

`biz_spot` 现仅有单语 `spot_name` / `description` / `opening_time` / `traffice` 与未结构化的 `ext_json`。

## Decision

1. **新增一等公民列**（便于列表筛选与管理端表单）：
   - `slug` VARCHAR(64) UNIQUE NOT NULL
   - `spot_name_en` VARCHAR(255)
   - `summary` / `summary_en` TEXT
   - `description_en` TEXT（中文简介继续用 `description`）
   - `opening_time_en` VARCHAR(512)
   - `traffice_en` TEXT
   - `city` / `city_en` VARCHAR(128)
   - `level_label` VARCHAR(64)
   - `ticket_summary` / `ticket_summary_en` TEXT
   - `visit_tips` / `visit_tips_en` TEXT
   - `best_season` / `best_season_en` TEXT
   - `bilingual_json` LONGTEXT — 存放 highlights、culturalNotes、services、verificationNotice、unverifiedFields 等结构化扩展（JSON）
2. **幂等 Seed**：以 `slug` 为业务唯一键；重复执行 UPDATE 或跳过已存在行。
3. **游客 API**：新增 `/client/c/spot/bilingual/*`，并加入 `NO_LOGIN_PATH_ARR`（修正模板中错误的 `wx/c/...` 白名单前缀问题，至少覆盖双语接口）。
4. **小程序**：Repository 在 Mode B 联调时可「API 优先、Mock 回退」。**同学演示阶段**默认改为 Mock-only（见 **ADR-0003**），本条运行时优先级被冻结，实现代码保留。

## Consequences

- 需执行 DDL 后才能 Seed；无库环境仅提交脚本与代码，不强制本机跑通 DB。
- `bilingual_json` 避免为文化解读建多表（模式 C 再拆）。
- 管理端第一阶段编辑：slug、中英名称/简介/摘要；JSON 高级字段可第二刀。

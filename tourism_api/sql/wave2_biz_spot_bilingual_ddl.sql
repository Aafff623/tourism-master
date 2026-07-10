-- Wave 2 DDL: bilingual columns on biz_spot
-- Idempotent-ish: run once per environment; re-run may fail if columns exist.
-- DB: tourism (MySQL 8)

ALTER TABLE `biz_spot`
  ADD COLUMN `slug` VARCHAR(64) NULL COMMENT 'scenic business key' AFTER `id`,
  ADD COLUMN `spot_name_en` VARCHAR(255) NULL COMMENT 'English name' AFTER `spot_name`,
  ADD COLUMN `summary` TEXT NULL COMMENT 'zh summary' AFTER `description`,
  ADD COLUMN `summary_en` TEXT NULL COMMENT 'en summary' AFTER `summary`,
  ADD COLUMN `description_en` TEXT NULL COMMENT 'en intro' AFTER `summary_en`,
  ADD COLUMN `opening_time_en` VARCHAR(512) NULL AFTER `opening_time`,
  ADD COLUMN `traffice_en` TEXT NULL AFTER `traffice`,
  ADD COLUMN `city` VARCHAR(128) NULL AFTER `address`,
  ADD COLUMN `city_en` VARCHAR(128) NULL AFTER `city`,
  ADD COLUMN `level_label` VARCHAR(64) NULL AFTER `start_level`,
  ADD COLUMN `ticket_summary` TEXT NULL AFTER `level_label`,
  ADD COLUMN `ticket_summary_en` TEXT NULL AFTER `ticket_summary`,
  ADD COLUMN `visit_tips` TEXT NULL AFTER `ticket_summary_en`,
  ADD COLUMN `visit_tips_en` TEXT NULL AFTER `visit_tips`,
  ADD COLUMN `best_season` TEXT NULL AFTER `visit_tips_en`,
  ADD COLUMN `best_season_en` TEXT NULL AFTER `best_season`,
  ADD COLUMN `bilingual_json` LONGTEXT NULL COMMENT 'highlights/culturalNotes/services/disclaimer JSON' AFTER `ext_json`;

-- Unique index on slug (allow multiple NULLs in MySQL; seed fills all P0)
CREATE UNIQUE INDEX `uk_biz_spot_slug` ON `biz_spot` (`slug`);

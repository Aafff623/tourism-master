-- Patch: tourism fork SysMenu entity expects `visible` on sys_resource.
-- Official Snowy v2.0.0 `_sql/snowy_mysql.sql` does not include this column.
-- Values: NULL/TRUE = show; FALSE = hide (see SysUserServiceImpl.ownMenu).
-- Idempotent: skip if column already exists.

SET @col_exists := (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'sys_resource'
    AND COLUMN_NAME = 'visible'
);

SET @ddl := IF(
  @col_exists = 0,
  'ALTER TABLE `sys_resource` ADD COLUMN `visible` varchar(255) NULL DEFAULT ''TRUE'' COMMENT ''是否可见'' AFTER `color`',
  'SELECT ''sys_resource.visible already exists'' AS info'
);

PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Local convenience: rename built-in superAdmin login account to admin.
-- Password remains SM3(123456) from Snowy v2.0.0 seed (unchanged).
-- Role code stays superAdmin (built-in); only the login account string changes.
-- Idempotent: safe if already renamed.

UPDATE `sys_user`
SET `account` = 'admin'
WHERE `id` = '1543837863788879871'
  AND `account` = 'superAdmin';

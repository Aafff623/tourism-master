# research-notes — local-backend-bootstrap

## 方案结论

采用 **A（Snowy v2.0.0 官方 SQL）+ B（本仓库 biz_spot 全量 CREATE）+ 模板业务 stub 表**。

| 项 | 值 |
|---|---|
| 官方仓库 | https://gitee.com/xiaonuobase/snowy （GitHub 镜像 xiaonuobase/Snowy） |
| 钉死版本 | tag **`v2.0.0`**（commit `ec9ef0c4…`） |
| 禁止 | 直接使用当前 master（已升级 Spring Boot 3，与本仓库 2.5 / snowy 2.0.0 不兼容） |
| 框架 SQL 入库 | `tourism_api/sql/01_snowy_v2.0.0_framework.sql`（自 `_sql/snowy_mysql.sql` 复制） |
| 超管 | 账号 `superAdmin`，明文密码 **`123456`**，库内 password 为 SM3 哈希 `207cf410532f92a47dee245ce9b11ff71f578ebd763eb3bbea44ebd043d018fb` |
| 登录算法 | 前端 SM2 加密 → 后端 SM2 解密 → SM3 → 比对（`CommonCryptogramUtil`） |

## 裁剪说明

- 官方 SQL **不含** `biz_spot`（旅游模板业务表），故另写 `02_biz_spot_full.sql`（含双语列）。
- 空库**不要**再跑 `wave2_biz_spot_bilingual_ddl.sql`（非幂等 ALTER）；只跑 Seed。
- `level_label` 存 JSON 时需 **TEXT**（VARCHAR(64) 不够）。
- 启动后定时任务会查 `biz_plan` / `biz_order` 等 → `03_tourism_biz_stubs.sql` 提供空表，避免日志刷屏；非完整 OTA 模型。

## 本机验收（2026-07-10）

- Redis Docker `tourism-redis`：OK  
- 导入 00→01→02→seed→03：OK（6 景区）  
- JDK 8 `mvn clean install` + `snowy-web-app` `spring-boot:run`：Started Application，端口 86  
- `GET /client/c/spot/bilingual/catalog?locale=zh`：code 200，6 条  
- 管理端登录：请用浏览器验证 `superAdmin` / `123456`（需 :85 前端 + :86 后端）

## 已知噪音

- 缺 stub 前，调度任务会报 `biz_plan` / `biz_order` 不存在；导入 03 后应消失或减少。
- 部分业务实体字段可能比 stub 更宽；若某页 SQL 报 Unknown column，再按实体补列即可。

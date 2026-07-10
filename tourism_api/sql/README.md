# tourism_api SQL — 本地后端启动

## 前置

| 组件 | 要求 |
|---|---|
| JDK | **8**（勿用 21 跑本项目）本机示例：`C:\Users\Lenovo\.jdks\corretto-1.8.0_482` |
| Maven | 3.6+ |
| MySQL 8 | 库名 `tourism`，账号见 `application.properties`（默认 `root` / `123456`） |
| Redis | `127.0.0.1:6379`（可用 Docker：`docker run -d --name tourism-redis -p 6379:6379 redis:7-alpine`） |

## 导入顺序（空库）

在 PowerShell / CMD：

```bat
mysql -uroot -p123456 -e "source D:/OneDrive/Desktop/project/tourism-master/tourism_api/sql/00_create_database.sql"
mysql -uroot -p123456 tourism --default-character-set=utf8mb4 -e "source D:/OneDrive/Desktop/project/tourism-master/tourism_api/sql/01_snowy_v2.0.0_framework.sql"
mysql -uroot -p123456 tourism --default-character-set=utf8mb4 -e "source D:/OneDrive/Desktop/project/tourism-master/tourism_api/sql/02_biz_spot_full.sql"
mysql -uroot -p123456 tourism --default-character-set=utf8mb4 -e "source D:/OneDrive/Desktop/project/tourism-master/tourism_api/sql/wave2_biz_spot_bilingual_seed.sql"
mysql -uroot -p123456 tourism --default-character-set=utf8mb4 -e "source D:/OneDrive/Desktop/project/tourism-master/tourism_api/sql/03_tourism_biz_stubs.sql"
mysql -uroot -p123456 tourism --default-character-set=utf8mb4 -e "source D:/OneDrive/Desktop/project/tourism-master/tourism_api/sql/04_sys_resource_visible_patch.sql"
```

| 文件 | 作用 | 幂等 |
|---|---|---|
| `00_create_database.sql` | 建库 | 可重复 |
| `01_snowy_v2.0.0_framework.sql` | Snowy **v2.0.0** 框架表+超管（含菜单资源） | 含 `DROP TABLE`，会清空框架表 |
| `02_biz_spot_full.sql` | 景区全量表（已含双语列） | `CREATE IF NOT EXISTS` |
| `wave2_biz_spot_bilingual_seed.sql` | 6 个 P0 Seed | 按 slug `ON DUPLICATE KEY UPDATE` |
| `03_tourism_biz_stubs.sql` | 模板业务空表（plan/order/ticket…） | `CREATE IF NOT EXISTS` |
| `04_sys_resource_visible_patch.sql` | 为本仓库 `SysMenu.visible` 补列（官方 v2.0.0 SQL 无此列） | 幂等（已存在则跳过） |
| `wave2_biz_spot_bilingual_ddl.sql` | **跳过**（空库用 02 即可；对旧库补列时一次性执行） | **非幂等** |

## 启动后端

```bat
set JAVA_HOME=C:\Users\Lenovo\.jdks\corretto-1.8.0_482
set PATH=%JAVA_HOME%\bin;D:\develop\apache-maven-3.9.12\bin;%PATH%
cd tourism_api
mvn clean install -DskipTests
cd snowy-web-app
mvn spring-boot:run -DskipTests
```

端口：**86**。Knife4j：http://localhost:86/doc.html （basic `admin` / `123456`）

## 管理端登录

- 前端：http://localhost:85/（`tourism_admin` → `npm run dev`）
- 账号：**superAdmin**
- 密码：**123456**（Snowy v2.0.0 官方 seed；库内为 SM3 哈希）

## 验收 curl（PowerShell）

```powershell
Invoke-RestMethod "http://127.0.0.1:86/client/c/spot/bilingual/catalog?locale=zh"
Invoke-RestMethod "http://127.0.0.1:86/client/c/spot/bilingual/detail?slug=yungang-grottoes&locale=en"
Invoke-RestMethod "http://127.0.0.1:86/client/c/spot/bilingual/hotspots?locale=zh"
```

期望：`code=200`，catalog/hotspots 各 6 条。

## 小程序

- `tourism_weapp/utils/http.js` 的 `DEV_URL` 使用本机局域网 IP + `:86/client/c`
- 微信开发者工具勾选「不校验合法域名」
- HBuilderX 打开 `tourism_weapp` → 运行到微信开发者工具

## 来源

- 框架 SQL：`xiaonuobase/snowy` tag **`v2.0.0`** → `_sql/snowy_mysql.sql`
- 详见 [`docs/output/reports/local-backend-bootstrap/research-notes.md`](../../docs/output/reports/local-backend-bootstrap/research-notes.md)

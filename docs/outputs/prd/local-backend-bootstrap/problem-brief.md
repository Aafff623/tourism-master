# 本机联调阻塞问题简报（供深度调研）

```yaml
theme: local-backend-bootstrap
status: draft
date: 2026-07-10
audience: GPT Pro / 深度调研 Agent
repo: https://github.com/Aafff623/tourism-master
goal: 补齐本地可启动的后端数据库与启动文档，使管理端登录与双语 API 可联调
```

## 0. 一句话

山西文旅双语小程序（Wave 1 Mock + Wave 2 双语 API/管理端表单）**业务代码已合入**，但本机**无法启动完整后端**：仓库缺少 Snowy/旅游模板的**框架级数据库初始化 SQL**；当前仅有空库 `tourism` 与 Wave 2 的 `biz_spot` 增量 DDL/Seed。管理端登录返回「服务不可用」。

---

## 1. 具体遇到了什么问题

### 1.1 管理端登录失败（已复现）

- 前端：`tourism_admin` 已 `npm run dev`，地址 `http://localhost:85/`
- 用户尝试账号 `superAdmin` 登录
- 报错：**「请求错误 / 服务不可用，服务器暂时过载或维护。」**（前端对后端不可达的典型 503/网络失败文案）
- 根因：**后端 `tourism_api`（默认端口 86）未成功运行**；即使启动，空库也无系统用户表，无法完成 Sa-Token 登录

### 1.2 后端无法「开箱即用」

| 依赖 | 本机现状 | 说明 |
|---|---|---|
| JDK | 有 8 / 17 / 21；项目要求 **Java 8**（`pom.xml` `java.version=1.8`） | 应用 JDK：`C:\Users\Lenovo\.jdks\corretto-1.8.0_482` |
| Maven | `D:\develop\apache-maven-3.9.12` | 可用 |
| MySQL 8 | 已运行，端口 3306 | 账号见下 |
| Redis | Docker 容器 `tourism-redis` 已通（`PONG`） | 亦有本机目录 `D:\develop\Redis-8.6.1-Windows-x64-msys2` |
| 数据库 `tourism` | **已 CREATE DATABASE，但无表** | 非 MCP 建表；仅空库 |
| 框架初始化 SQL | **仓库内不存在** | 桌面/Downloads 亦未搜到 tourism/snowy 全量 dump |
| Wave 2 业务 SQL | 有 | 仅 `ALTER`/`INSERT` 依赖已存在的 `biz_spot` |

### 1.3 小程序联调配置

- `tourism_weapp/utils/http.js` 的 `DEV_URL` 已改为本机 WLAN：`http://10.170.248.52:86/client/c`
- 景区主链路：**API 优先，失败回退 Mock** → 无后端时仍可用 Mock Review Wave 1
- 模式 B（真吃双语 API）必须后端 + `biz_spot` 有 Seed 数据

### 1.4 采购物可能只有前端源码的假设

用户判断：闲鱼卖家**大概率只给了前端/三端源码，未给完整后端库脚本与运维说明**。  
因此不能假设「导入卖家 SQL 即可」；需要调研 **Snowy 开源版 / 同类旅游模板** 的标准建库方式，或从实体/Mapper **反推最小可启动 schema**。

---

## 2. 缺少哪些东西（调研清单）

### 2.1 必须补齐（P0）

1. **完整或最小可启动的 MySQL schema**  
   - Snowy 系统表：用户、角色、权限、菜单、字典、文件等（管理端登录硬依赖）  
   - 业务表：至少 `biz_spot` 及启动时 MyBatis 会碰到的关联表（ticket/comment/history 等，视启动报错收敛）  
   - 逻辑删除字段约定：`delete_flag` = `NOT_DELETE` / `DELETED`（见 `application.properties`）

2. **默认管理员账号数据**  
   - 管理端常见 `superAdmin`；需与 Sa-Token + 密码加密方式一致（Snowy 默认加密算法需对齐）

3. **后端启动验证步骤**  
   - 用 JDK 8 启动 `snowy-web-app`  
   - 健康检查：`http://localhost:86` / Knife4j  
   - 管理端登录打通  
   - 游客接口：`GET /client/c/spot/bilingual/catalog?locale=zh`（已加入免登录白名单）

4. **在仓库中落地的 SQL 文件建议路径**  
   - `tourism_api/sql/00_create_database.sql`  
   - `tourism_api/sql/01_snowy_framework_schema.sql`（或最小集）  
   - `tourism_api/sql/02_snowy_framework_seed_admin.sql`  
   - 已有：`wave2_biz_spot_bilingual_ddl.sql`、`wave2_biz_spot_bilingual_seed.sql`（须在 `biz_spot` 基表存在后执行）

### 2.2 强烈建议补齐（P1）

5. **本地联调 README 小节**：MySQL/Redis/API/Admin/HBuilderX 启动顺序与端口  
6. **微信开发者工具**：不校验合法域名；`DEV_URL` 使用局域网 IP 说明  
7. **确认卖家包内是否另有 SQL**（网盘/压缩包/文档链接）；若无，明确「从 Snowy 官方仓库移植」的版本对齐策略

### 2.3 已有、不要重复发明（P2 参考）

| 资产 | 路径 |
|---|---|
| 后端数据源配置 | `tourism_api/snowy-web-app/src/main/resources/application.properties` |
| Wave 2 ADR | `docs/adr/0002-wave2-biz-spot-bilingual-columns.md` |
| Wave 2 DDL | `tourism_api/sql/wave2_biz_spot_bilingual_ddl.sql` |
| Wave 2 Seed（6 P0） | `tourism_api/sql/wave2_biz_spot_bilingual_seed.sql` |
| Seed 生成器 | `tourism_api/sql/generate_wave2_seed.py` |
| 景区实体（含双语列） | `.../biz/modular/spot/entity/Spot.java` |
| 双语游客 API | `.../wxspot/controller/WxSpotBilingualController.java` |
| 免登录白名单 | `GlobalConfigure.NO_LOGIN_PATH_ARR` → `/client/c/spot/bilingual/**` |
| 产品 PRD | `docs/outputs/prd/shanxi-bilingual-mvp/prd.md` |
| Mock 数据（模式 A） | `tourism_weapp/mock/scenic/` |

### 2.4 本地配置快照（模板默认，非生产）

```properties
server.port=86
spring.datasource...url=jdbc:mysql://localhost:3306/tourism?...
spring.datasource...username=root
spring.datasource...password=123456
spring.redis.host=127.0.0.1
spring.redis.port=6379
snowy.config.common.front-url=http://localhost:85
snowy.config.common.backend-url=http://localhost:86
```

管理端：`tourism_admin/.env.development` → `VITE_API_BASEURL = http://127.0.0.1:86`，`VITE_PORT = 85`

---

## 3. 已澄清的误解（调研时勿走偏）

| 误解 | 事实 |
|---|---|
|「已经建了一张空表」 | 只建了**空数据库** `tourism`，**零张表** |
|「用 MCP 连的 MySQL」 | 用本机 `mysql` CLI / Docker；与业务 MCP 无关 |
|「业务模型不同所以完全不要模板库」 | 景区业务可自建；**登录/权限/菜单仍要 Snowy 框架表** |
|「只建 biz_spot 就能登录管理端」 | **不能**；缺 `sys_user` 等则登录链路不成立 |
|「Cursor 不能开发本项目」 | Cursor 改代码；HBuilderX→微信开发者工具跑小程序；浏览器跑管理端 |

---

## 4. 技术栈与版本约束

| 层 | 技术 | 路径 |
|---|---|---|
| 小程序 | UniApp（Vue） | `tourism_weapp/` |
| 管理端 | Vue3 + Vite + Ant Design Vue | `tourism_admin/` |
| 后端 | Spring Boot **2.5** + MyBatis-Plus + Sa-Token + Snowy 插件化 | `tourism_api/` |
| DB | MySQL 8 | 库名 `tourism` |
| Cache | Redis | db 1；Sa-Token alone-redis db 2 |

后端父 POM：`java.version=1.8`。用 JDK 21 强行编译/运行可能出问题，调研文档请写明 **JDK 8**。

---

## 5. 期望调研产出（请 GPT Pro 交付）

请按优先级输出可落地产物（可直接放进本仓库）：

1. **方案对比**（各附风险）  
   - A：从 Snowy 官方开源仓库抽取同代 schema + 初始数据  
   - B：从实体/Mapper XML 反生成最小 schema + 手写 admin seed  
   - C：其它（Docker 一键、第三方 dump 等）

2. **推荐方案的具体步骤**（Windows 11 + MySQL 8 + Redis + Maven）

3. **SQL 文件草稿或权威来源链接**（含版本号、commit、如何裁剪）

4. **默认管理员**：用户名/密码明文、加密字段如何生成

5. **启动后验收清单**  
   - 管理端登录  
   - `biz_spot` 执行 Wave2 DDL+Seed 后 bilingual API 返回 6 条  
   - 小程序 Network 出现 `/spot/bilingual/*`（或失败回退 Mock 的判断方法）

6. **明确不做**：不要把调研范围扩成重写后端框架；不要引入与 Snowy 无关的新后台栈。

---

## 6. 建议调研关键词 / 来源

- Snowy / xiaonuo 开源：`snowy` `snowy-admin` `xiaonuobase` Gitee/GitHub  
- Sa-Token + Spring Boot 2.5 初始化 SQL  
- 闲鱼「旅游系统 UniApp Vue3 SpringBoot」同类开源或文档中的 `tourism.sql`  
- MyBatis-Plus `@TableName` 批量导出 DDL 工具（仅作 B 方案辅助）  
- 本仓库实体包：`com.snowy.biz.modular.**.entity`、`com.snowy.sys.**`、`com.snowy.auth.**`

---

## 7. 当前环境已就绪 vs 未就绪

| 组件 | 状态 |
|---|---|
| Redis (Docker `tourism-redis`) | ✅ |
| MySQL 服务 | ✅ |
| 空库 `tourism` | ✅ 无表 |
| 管理端前端 :85 | ✅ 进程可起 |
| 后端 API :86 | ❌ |
| 框架 SQL / 管理员 seed | ❌ |
| Wave 2 业务 DDL/Seed 文件 | ✅ 待基表 |
| 小程序 Mock 主链路 | ✅ 可 Review |
| 小程序真 API 主链路 | ❌ 依赖后端 |

---

## 8. 给执行者的最短路径（调研完成后）

```text
1. 导入框架 schema + admin seed → tourism
2. 执行 wave2_biz_spot_bilingual_ddl.sql
3. 执行 wave2_biz_spot_bilingual_seed.sql
4. JDK 8 启动 snowy-web-app（:86）
5. 浏览器登录管理端（:85）
6. 浏览器或 curl 验 bilingual catalog
7. HBuilderX 运行 tourism_weapp → 微信开发者工具验 Network
```

---

## 9. 联系上下文

- 产品主线：景区介绍 + 中英双语；非通用 OTA  
- Wave 1/2 核心任务已 push；本简报只解决 **本地后端可运行性**  
- 相关提交：`9cddc85` api-seed；`390bc40` weapp/admin；`f8cdaf0` archive

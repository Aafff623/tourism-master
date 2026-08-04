# PRD — 本机后端可启动基线（local-backend-bootstrap）

```yaml
theme: local-backend-bootstrap
epic-issue: null
status: approved
related:
  - shanxi-bilingual-mvp
date: 2026-07-10
approved-note: 2026-07-10 按源码审查修正后批准实施实施
```

## 背景

Wave 1/2 业务代码已合入，但本机**无法启动完整后端**：仓库仅有 Wave 2 的 `biz_spot` 增量 DDL/Seed（`ALTER` 依赖已存在的基表），缺少 Snowy 框架级系统表（`sys_user` 等）与 `biz_spot` 基表 DDL。空库 `tourism` 下管理端登录返回「服务不可用」，模式 B 双语 API 无法联调。

详细背景见 [`problem-brief.md`](problem-brief.md)。

## 目标

1. **后端可开箱启动**：JDK 8 启动 `snowy-web-app`（:86），启动日志无缺表致命错误；Knife4j 可访问。
2. **管理端登录打通**：`superAdmin` 可在 `:85` 取得 token；后台首页不因缺菜单白屏（至少最小菜单/模块 seed）。
3. **双语 API 返 6 条**：`GET /client/c/spot/bilingual/catalog?locale=zh` 返回 6 个 P0 景区。
4. **产物可落地仓库**：SQL 与启动文档纳入 `tourism_api/sql/`，他人可复现。
5. **范围严格收敛**：只解决可启动性，不重写后端、不引入新栈。

## 技术约束（源码实证）

### 登录链路

`AuthServiceImpl.doLogin` → `CommonCryptogramUtil`：

```
前端 SM2(公钥) 加密密码
  → 后端 SM2(私钥) 解密
  → SM3 哈希
  → 与 sys_user.password 比对
```

- DB 中 `password` = `SM3(明文)`（非 BCrypt）。
- SM2/SM4 密钥硬编码于 `CommonCryptogramUtil`；seed 必须用同一套算 hash。
- 超管账号/角色码：`SysBuildInEnum` → `superAdmin`。

### 鉴权依赖表（最小集）

| 表 | 必要性 |
|---|---|
| `sys_user` / `sys_role` / `sys_relation` | P0 登录 |
| `sys_menu` / `sys_module` / `sys_button` | P0 首页不白屏（最小菜单） |
| `sys_org` / `sys_position` | P1（用户外键/@Trans） |
| `dev_config` / `dev_dict` | P1/P2 |

启动期若日志报缺表，按报错**收敛补表**，不预先臆造全库。

### 字段约定

- `delete_flag`：`NOT_DELETE` / `DELETED`；id 雪花字符串。
- DB：`tourism`，`root/123456`，Redis 6379；JDK **1.8**。

### biz_spot

Wave2 DDL 为 `ALTER … AFTER`，须先有基表 CREATE。完整基表 DDL 由本任务补齐（可与双语列一次建全，避免对空库再 ALTER）。

## 范围

### 做

| ID | 能力 | 产物 |
|---|---|---|
| B1 | 框架 schema + 初始数据 | 自 **xiaonuobase/snowy `v2.0.0`** 抽取/裁剪的 SQL（禁止用当前 master/SB3） |
| B2 | biz_spot 全量建表（含双语列） | `02_biz_spot_full.sql` 或基表+说明如何跳过已合并的 wave2 ALTER |
| B3 | 启动/导入文档 | `tourism_api/sql/README.md` + README 快速开始补充 |
| B4 | 调研记录 | `research-notes.md`（来源 tag、裁剪说明、默认密码） |

### 不做

- 重写 Snowy、换新后台栈
- 补全全部运营字典/示例业务数据
- 改生产密钥策略（本地 `123456` 示例保持）

## 方案（已定）

**A（sys_* / 框架）**：从 [xiaonuobase/snowy](https://gitee.com/xiaonuobase/snowy) **tag `v2.0.0`** 取 `_sql/snowy_mysql.sql`（或等价路径），导入 `tourism` 后按需裁剪冲突。  
**B（biz_spot）**：按本仓库 `Spot` 实体生成全量 CREATE（含 Wave2 双语列），Seed 继续用现有 `wave2_biz_spot_bilingual_seed.sql`。

> 若全量 CREATE 已含双语列，则**跳过** `wave2_biz_spot_bilingual_ddl.sql`（该文件非幂等，重复 ALTER 会失败）。

## 验收标准

- [x] 按 `tourism_api/sql/README.md` 建库导入后，JDK 8 启动 :86 无缺表致命错误
- [x] `http://localhost:86/doc.html`（knife4j basic admin/123456）可开（需 basic 认证）
- [x] 管理端 :85：`superAdmin` / `123456` 登录成功，进入后台（非 503、非白屏）
- [x] bilingual catalog 返回 6 条；detail `slug=yungang-grottoes&locale=en` 有英文名
- [x] 文档写明：JDK 8、端口、Redis、微信「不校验合法域名」、`DEV_URL` 局域网 IP
- [x] 新建 SQL 尽量幂等；**明确标注**既有 `wave2_*_ddl.sql` 一次性/可跳过；`04` 补 `visible`

## 产物落位

| 产物 | 路径 |
|---|---|
| 框架 SQL（可大文件） | `tourism_api/sql/01_snowy_v2.0.0_framework.sql`（或分卷 + 来源说明） |
| biz_spot | `tourism_api/sql/02_biz_spot_full.sql` |
| 文档 | `tourism_api/sql/README.md`、`research-notes.md` |
| handoff | `docs/outputs/handoff/local-backend-bootstrap/` |

## 风险

| 风险 | 缓解 |
|---|---|
| 拉错官方 master（SB3） | 钉死 tag `v2.0.0` |
| 旅游模板业务表与官方 biz 冲突 | 以本仓库实体为准；官方 biz 示例可删或改名 |
| wave2 ALTER 非幂等 | 全量建表后跳过 ALTER |
| 启动仍缺表 | 读启动日志补最小表 |

## 任务拆分

| task | 说明 |
|---|---|
| bootstrap-sql-import | 拉取 v2.0.0 SQL、写 biz_spot full、导入、起服务验收 |
| bootstrap-setup-docs | README / research-notes / handoff |

## 参考

- [`problem-brief.md`](problem-brief.md)
- [`../shanxi-bilingual-mvp/prd.md`](../shanxi-bilingual-mvp/prd.md)
- [`../../../adr/0002-wave2-biz-spot-bilingual-columns.md`](../../../adr/0002-wave2-biz-spot-bilingual-columns.md)

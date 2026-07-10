# tourism-master

山西文旅景区介绍与**双语服务**小程序——基于 SpringBoot + Vue3 + UniApp 旅游模板的二次开发。

课题叙事（产品背景）：入境游客跨文化旅游体验障碍及双语服务体系构建——以山西文旅景区为例。

| 资源 | 链接 |
|---|---|
| GitHub | https://github.com/Aafff623/tourism-master |
| 领域事实 | [`CONTEXT.md`](CONTEXT.md) · [`CONTEXT-MAP.md`](CONTEXT-MAP.md) |
| Agent 入口 | [`AGENTS.md`](AGENTS.md) · [`CLAUDE.md`](CLAUDE.md) |
| 文档资产 | [`docs/README.md`](docs/README.md) |

## 仓库结构

| 目录 | 说明 |
|---|---|
| `tourism_weapp/` | UniApp 微信小程序（用户端） |
| `tourism_admin/` | Vue3 + Ant Design Vue 管理端 |
| `tourism_api/` | Spring Boot（Snowy）后端 |
| `docs/` | ADR、Agent 规则、PRD/handoff、knowledge |
| `images/` | 模板演示截图 |

## 技术栈

- 后端：Spring Boot 2.5、MyBatis-Plus、Sa-Token、MySQL 8、Redis
- 管理端：Vue3、Vite、Ant Design Vue、TypeScript
- 小程序：UniApp（微信）
- 环境：JDK 8+、Node.js 18+、Maven 3.6+、MySQL 8、Redis

## 安装与运行

### 管理端（`tourism_admin`）

```bash
cd tourism_admin
pnpm install   # 或 npm / yarn
pnpm dev
```

### 后端（`tourism_api`）

用 IDEA 打开 `tourism_api`，配置 JDK、Maven、MySQL、Redis。库名与账号见 `tourism_api/snowy-web-app/src/main/resources/application.properties`（本地默认，勿把真实生产密钥提交进库）。

### 小程序（`tourism_weapp`）

用 HBuilderX 打开工程，待依赖就绪后运行到微信开发者工具预览。

## 二次开发说明

- 产品主线：景区介绍、中英双语内容、面向入境游客的文化解读与基础服务信息。
- 景区与文案初期使用 **Mock 数据**（调研清单另补）；字段设计须可替换为真实运营数据。
- 任务与需求走 **GitHub Issues**；本地 PRD/handoff 在 `docs/output/`。约定见 `AGENTS.md`。

## 模板截图

原模板演示图见 `images/`（演示数据，非山西正式内容）。

## License

见根目录 `LICENSE`（随模板）。

<div align="center">

# Tourism Master · 山西文旅双语小程序

*"欲穷千里目，更上一层楼。"* —— 王之涣《登鹳雀楼》（山西永济）

🏔️ 三晋纵贯千年古建与黄河风物：云冈佛影、平遥城垣、壶口雷响、悬空寺悬。  
面向入境游客与中文用户，用中英双语讲清**景区故事**与**跨文化现场话术**——先读懂山西，再走进山西。

<p>
  <strong>中文</strong> · <a href="README.en.md">English</a>
</p>

</div>

<p align="center">
  <img src="assets/images/readme/banner.png" alt="Tourism Master Banner" width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Wave_1-MVP_Done-brightgreen?style=for-the-badge" alt="Wave 1">
  <img src="https://img.shields.io/badge/Stack-UniApp_%7C_Vue3_%7C_Spring_Boot-blue?style=for-the-badge" alt="Stack">
  <img src="https://img.shields.io/badge/Locale-zh_%2B_en-orange?style=for-the-badge" alt="Locale">
  <img src="https://img.shields.io/badge/Demo-Mock_only-brightgreen?style=for-the-badge" alt="Demo Mock">
  <img src="https://img.shields.io/badge/Mode_B-Deferred_branch-lightgrey?style=for-the-badge" alt="Mode B deferred">
  <a href="https://github.com/Aafff623/tourism-master/stargazers"><img src="https://img.shields.io/github/stars/Aafff623/tourism-master?style=for-the-badge" alt="GitHub stars"></a>
</p>

<p align="center">
  <a href="#为什么需要本系统">为什么</a> ·
  <a href="#功能">功能</a> ·
  <a href="#演示--showcase">演示</a> ·
  <a href="#preview">Preview</a> ·
  <a href="#快速开始">快速开始</a> ·
  <a href="#架构">架构</a> ·
  <a href="#路线图">路线图</a> ·
  <a href="#文档">文档</a> ·
  <a href="#license">License</a>
</p>

---

## 为什么需要本系统

入境游客在山西景区游览时，通常会遇到以下信息与沟通障碍：

- 景区介绍与导览内容以中文为主，英文信息分布零散或缺失；
- 礼仪、历史语境与文化禁忌缺少易理解的跨文化表达；
- 购票问询、路线咨询与应急求助缺少可复用的中英对照话术；
- 通用旅游应用更关注交易与行程，对景区文化理解的支持相对有限。

Tourism Master 因此将产品主线收敛为：**景区介绍、文化解读与双语服务**。

| 能力 | 产品职责 |
|---|---|
| 景区介绍 | 列表与详情：名称、简介、看点、开放与交通概要 |
| 语言偏好 | 全局 `zh` ↔ `en`；界面文案与内容字段同步切换 |
| 文化解读 | 面向入境游客的礼仪、历史语境与参观提示 |
| 双语服务 | 通用服务话术与景区专属话术 |
| 首页热点 | 以景区热点进入主线，承接首批推荐景区 |
| 数据接入 | **演示默认模式 A（Mock-only）**；模式 B 代码已保留，真数据换接另开分支（ADR-0003） |

---

## 功能

<p align="center">
  <img src="assets/images/readme/features.png" alt="Tourism Master 核心功能模块" width="80%">
</p>

| 功能 | 说明 |
|---|---|
| **全局双语切换** | 支持中文与英文切换，界面文案和景区内容字段同步更新 |
| **景区热点与列表** | 首批覆盖云冈石窟、五台山、平遥古城、晋祠、黄河壶口瀑布（山西侧）与悬空寺 |
| **景点详情** | 展示简介、核心看点、开放与票价说明、交通概要和参观提示 |
| **文化解读** | 从历史语境、参观礼仪和跨文化差异等角度补充景区背景 |
| **景区专属话术** | 根据具体景区提供可直接使用的中英双语表达 |
| **通用服务话术** | 覆盖购票问询、路线咨询、礼仪提示和应急求助等常见场景 |
| **双模式数据接入** | 支持本地 Mock 独立演示，并可切换后端查询 API |

> **业务边界：** 当前不覆盖真实支付、库存核销、完整行程规划、日韩等多语言、语音讲解、AR 或深度地图。产品主线保持为景区介绍与双语服务。

---

## 演示 / Showcase

### 推荐演示路径

```
切换语言 → 首页景区热点 → 进入详情 → 阅读文化解读 / 专属话术
  → 服务页浏览通用话术（主链路无需登录）
```

动态字段（开放时间、票价等）带 **UNVERIFIED** 免责声明，避免将演示数据误解为实时官方信息。

### Showcase

本环境无法跑 HBuilderX / 微信开发者工具截真机图；**禁止**用文生图伪造产品 UI。槽位如下，功能与视觉验收后用 Playwright / 真机替换：

| 槽位 | 目标路径 | 演示步骤 | 状态 |
|---|---|---|---|
| 首页热点 | `assets/images/readme/showcase-home.png` | 语言切换 → 首页景区热点 | ⏳ 待截 |
| 景区详情 | `assets/images/readme/showcase-spot-detail.png` | 进入详情 → 文化解读 / 专属话术 | ⏳ 待截 |
| 双语服务 | `assets/images/readme/showcase-service.png` | 服务页浏览通用话术 | ⏳ 待截 |

模板原始界面（非山西终稿视觉）见 [`assets/images/legacy-template/`](assets/images/legacy-template/)，**勿**当作 Showcase。
---

## Preview

本仓是**单产品三端应用**，不单独建资产 Gallery Preview 站；用 Showcase + README 本地预览壳即可。

### README 本地预览壳

| 项 | 值 |
|---|---|
| 启动 | 仓库根：`python -m http.server 8080` |
| URL | http://127.0.0.1:8080/preview-readme.html |
| 英文 | http://127.0.0.1:8080/preview-readme-en.html |
| 文件 | `preview-readme.html` · `preview-readme.css` · `preview-readme.js` |

须用 HTTP 打开（`file://` 无法 `fetch` README）。无 port-registry，端口 **8080** 为本仓约定。

### 首批景区（Mock / Seed）

| Slug | 景区 |
|---|---|
| `yungang-grottoes` | 云冈石窟 |
| `wutai-mountain` | 五台山 |
| `pingyao-ancient-city` | 平遥古城 |
| `jinci-temple` | 晋祠 |
| `hukou-waterfall` | 黄河壶口瀑布（山西侧） |
| `xuankong-temple` | 悬空寺 |

---

## 快速开始

### 同学演示（推荐，只需小程序）

当前交付默认 **Mock-only**（[ADR-0003](docs/adr/0003-mock-first-demo-freeze.md)）：**不必**启动 MySQL / Redis / 后端。

1. HBuilderX 打开 `tourism_weapp` → 运行到微信开发者工具  
2. 勾选「不校验合法域名」（若工具提示）  
3. 演示：语言切换、首页热点、景区列表/详情、服务话术、概况、遗产  

真 API / 管理端 / 云部署见下方「本机全栈（后置）」；策略 PRD：[`docs/outputs/prd/mock-demo-freeze/prd.md`](docs/outputs/prd/mock-demo-freeze/prd.md)。

### 前置环境（全栈后置时才需要齐）

| 组件 | 版本建议 | 备注 |
|---|---|---|
| JDK | 8+ | 后端 Spring Boot（演示可不装） |
| Node.js | 18+ | 管理端 / 小程序工具链 |
| Maven | 3.6+ | 后端构建（演示可不装） |
| MySQL | 8 | 后端库（演示可不装） |
| Redis | 任意近期 | 会话 / 缓存（演示可不装） |
| HBuilderX | 近期版 | 打开 `tourism_weapp` |
| 微信开发者工具 | 近期版 | 小程序预览 |

### 管理端（`tourism_admin`，演示不强制）

```bash
git clone https://github.com/Aafff623/tourism-master.git
cd tourism-master/tourism_admin
pnpm install   # 或 npm / yarn
pnpm dev
```

### 本机全栈（后置，个人 Mode B 积累）

> 同学演示**不需要**本节。Mode B 代码与 SQL 已保留，启用时机见 ADR-0003。

### 后端（`tourism_api`）

1. MySQL 8 + Redis（见 [`tourism_api/sql/README.md`](tourism_api/sql/README.md)）  
2. 按该 README **依序导入** `00` → `01`（Snowy v2.0.0 框架）→ `02`（biz_spot）→ Wave2 Seed → `03`（业务空表）→ `04`（`sys_resource.visible` 补丁）→ `05`（登录账号改为 admin）  
3. **JDK 8** 下：`tourism_api` → `mvn clean install -DskipTests`，再进入 `snowy-web-app` 执行 `mvn spring-boot:run`（端口 **86**）  
4. 管理端默认账号：**admin** / **123456**（见 `05_local_admin_account.sql`）

库名与账号见：`tourism_api/snowy-web-app/src/main/resources/application.properties`（本地示例，勿提交真实生产密钥）。

本机联调阻塞与调研记录：[`docs/outputs/prd/local-backend-bootstrap/`](docs/outputs/prd/local-backend-bootstrap/)。

### 小程序（`tourism_weapp`）

用 HBuilderX 打开 `tourism_weapp`，依赖就绪后运行到微信开发者工具预览。

**演示默认**：景区主链路走本地 Mock（ADR-0003）。订票 / 评论等模板入口可保留，不纳入演示验收。

### 新成员阅读顺序

| 顺序 | 路径 | 目的 |
|---|---|---|
| 1 | `README.md` | 定位、跑起来、边界 |
| 2 | `CONTEXT.md` · `LANGUAGES.md` · `CONTEXT-MAP.md` | 术语、用词与多端地图 |
| 3 | `AGENTS.md` · `CLAUDE.md` | 任务流与 Agent 纪律 |
| 4 | `docs/outputs/prd/shanxi-bilingual-mvp/prd.md` | 产品验收真相源（历史路径） |
| 5 | `docs/adr/0001-bilingual-field-model.md` | 双语字段与 `slug` 导航 |
| 6 | 对应端源码 + `docs/contexts/*/CONTEXT.md` | 实施 |

---

## 架构

<p align="center">
  <img src="assets/images/readme/architecture.png" alt="系统架构图" width="80%">
</p>

- **`tourism_weapp`**：UniApp 小程序；Locale 切换、景区浏览、Mock Repository / API Adapter；订票与评论沿用 Token 鉴权
- **`tourism_admin`**：Vue3 管理端；景区双语内容维护
- **`tourism_api`**：Spring Boot / Snowy 后端；MyBatis-Plus、Sa-Token、MySQL 8、Redis；模式 B 提供 Seed 与查询 API
- **数据路径**：模式 A 本地 Mock 可独立演示；模式 B 经 API Adapter 读取后端数据

### 技术栈

<p align="center">
  <img src="assets/images/readme/tech-stack.png" alt="技术栈分层图" width="80%">
</p>

| 层级 | 技术 | 路径 |
|---|---|---|
| 用户端 | UniApp（Vue）、微信小程序 | `tourism_weapp/` |
| 管理端 | Vue3 · Vite · Ant Design Vue · TypeScript | `tourism_admin/` |
| 后端 | Spring Boot 2.5 · MyBatis-Plus · Sa-Token · MySQL 8 · Redis | `tourism_api/` |

### 游客主链路

<p align="center">
  <img src="assets/images/readme/workflow.png" alt="游客主链路流程图" width="80%">
</p>

**实现要点：**

- 导航键使用 `slug`（ADR-0001）；双语成对字段经 Adapter 输出当前 Locale 的 ViewModel
- 游客核心浏览链路免登录；订票与评论无 Token 时行为与模板一致
- 动态字段标注 **UNVERIFIED**；密钥与本地 DB / Redis / 微信配置不入库

### 目录结构

<p align="center">
  <img src="assets/images/readme/structure.png" alt="仓库目录结构图" width="80%">
</p>

```
/
├── AGENTS.md · CLAUDE.md · CONTEXT.md · CONTEXT-MAP.md · LANGUAGES.md
├── README.md · preview-readme.*
├── assets/images/readme/          # 契约配图 + Showcase
├── assets/images/legacy-template/ # 模板原始截图参考
├── docs/agents/ · adr/ · contexts/ · outputs/
├── tourism_weapp/                 # UniApp 小程序
├── tourism_admin/                 # Vue3 管理端
└── tourism_api/                   # Spring Boot / Snowy
```

---

## 路线图

| 阶段 | 状态 | 说明 |
|---|:---:|---|
| Wave 0 仓库资产 / 调研 / ADR | ✅ | docs 骨架、Mock 调研包、ADR-0001 |
| Wave 1 小程序可演示闭环 | ✅ | 语言壳、Mock、列表详情、热点、服务话术、回归 |
| Wave 2 三端数据贯通 | ✅ | API Seed、小程序切 API、管理端双语表单 |
| 概况 / 遗产页（SD-15） | 🔜 | 另开任务 |
| Wave 3 内容运营（模式 C） | ⚪ | 需独立 ADR / PRD |

推进节奏见 [`docs/outputs/prd/shanxi-bilingual-mvp/implementation-roadmap.md`](docs/outputs/prd/shanxi-bilingual-mvp/implementation-roadmap.md)。

---

## 文档

| 文档 | 说明 |
|---|---|
| [`CONTEXT.md`](CONTEXT.md) | 产品域事实、术语、约束 |
| [`LANGUAGES.md`](LANGUAGES.md) | 共享用词入口 |
| [`CONTEXT-MAP.md`](CONTEXT-MAP.md) | 多端上下文地图 |
| [`AGENTS.md`](AGENTS.md) · [`CLAUDE.md`](CLAUDE.md) | Agent 入口与维护协议 |
| [`docs/README.md`](docs/README.md) | 文档资产索引 |
| [`assets/README.md`](assets/README.md) | 媒体约定 |
| [`docs/outputs/prd/shanxi-bilingual-mvp/prd.md`](docs/outputs/prd/shanxi-bilingual-mvp/prd.md) | 产品 PRD（approved） |
| [`docs/adr/0001-bilingual-field-model.md`](docs/adr/0001-bilingual-field-model.md) | 双语字段与导航键 |
| [`docs/contexts/`](docs/contexts/) | weapp / admin / api 分端 CONTEXT |
| [`docs/outputs/prd/readme-diagrams/`](docs/outputs/prd/readme-diagrams/) | README 配图 brief + prompts |
| [`docs/outputs/report/project-init/five-dimension-research.md`](docs/outputs/report/project-init/five-dimension-research.md) | project-init 五维调研 |

任务流：GitHub Issues + `docs/outputs/`；规范见 [`docs/agents/workflow.md`](docs/agents/workflow.md)。

---

## 项目来源与说明

本项目基于既有的 Spring Boot + Vue3 + UniApp 旅游系统工程进行二次开发。原工程提供管理端、小程序端、后端以及订票、评论等基础能力；Tourism Master 在此基础上重新聚焦山西景区内容、跨文化解读与中英双语服务。

原始模板仅作为工程基础，不代表本项目最终的产品定位与正式展示内容。

---

## License

见根目录 [`LICENSE`](LICENSE)（随模板）。

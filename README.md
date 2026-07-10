# Tourism Master · 山西文旅双语小程序

_少做通用 OTA，把空间留给景区介绍与跨文化双语服务_

基于闲鱼「SpringBoot + Vue3 + UniApp」旅游模板二次开发。面向入境游客与中文用户，提供山西重点景区的介绍、文化解读与中英双语服务话术，降低跨文化信息获取成本。课题叙事（产品背景）：入境游客跨文化旅游体验障碍及双语服务体系构建——以山西文旅景区为例。

<p align="center">
  <img src="docs/images/readme/banner.png" alt="Tourism Master Banner" width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Wave_1-MVP_Done-brightgreen?style=for-the-badge" alt="Wave 1">
  <img src="https://img.shields.io/badge/Stack-UniApp_%7C_Vue3_%7C_SpringBoot-blue?style=for-the-badge" alt="Stack">
  <img src="https://img.shields.io/badge/Locale-zh_%2B_en-orange?style=for-the-badge" alt="Locale">
  <img src="https://img.shields.io/badge/Mode-A→B-lightgrey?style=for-the-badge" alt="Integration Mode">
  <a href="https://github.com/Aafff623/tourism-master/stargazers"><img src="https://img.shields.io/github/stars/Aafff623/tourism-master?style=for-the-badge" alt="GitHub stars"></a>
</p>

<p align="center">
  <a href="#为什么需要本系统">为什么</a> ·
  <a href="#功能">功能</a> ·
  <a href="#演示">演示</a> ·
  <a href="#快速开始">快速开始</a> ·
  <a href="#架构">架构</a> ·
  <a href="#路线图">路线图</a> ·
  <a href="#文档">文档</a> ·
  <a href="#license">License</a>
</p>

---

## 为什么需要本系统

入境游客在山西景区现场常遇到：

- 介绍与导览以中文为主，英文信息零散或缺失
- 礼仪、历史语境、禁忌等文化背景难以及时理解
- 购票问询、应急求助等现场沟通缺少可复用的中英对照话术
- 通用旅游 App 偏订票成交，弱化「读懂这座景区」

**本产品的核心边界：**

| 组件 | 职责 |
|---|---|
| 景区介绍 | 列表 / 详情：名称、简介、看点、开放与交通概要 |
| 语言偏好 | 全局 `zh` ↔ `en`；壳文案与内容字段同步切换 |
| 文化解读 | 面向入境游客的礼仪、历史语境、参观提示 |
| 双语服务 | 通用话术（服务页）+ 景区专属话术（详情） |
| 首页热点 | 用「景区热点」进入主线，不占用模板美食住宿推荐位 |
| Mock / API | 模式 A 前端 Mock 可演示；模式 B 后端 Seed + 查询 API 已贯通 |

```
语言切换 → 首页景区热点 / 列表 → 景点详情（文化解读 + 专属话术）
  → 服务页通用话术（游客主链路免登录）
```

---

## 功能

| 功能 | 说明 |
|---|---|
| **语言切换** | 全局中英切换；Tab / 按钮 / 景区字段同步 |
| **景区列表** | 6 个 P0：云冈、五台山、平遥、晋祠、壶口（山西侧）、悬空寺 |
| **景点详情** | 简介、开放/票价/交通概要、看点、文化解读、专属话术；保留订票与评论入口 |
| **文化解读** | `culturalNotes` + 障碍类型，可读区块展示 |
| **双语服务** | 购票问询、礼仪、应急等中英对照 |
| **首页景区热点** | 来自调研 `homeRecommendations`，**不写入** `biz_recommend` |
| **Mock 适配层** | Repository / Adapter；`slug` 导航；游客可浏览主链路 |
| **模式 B 贯通** | 后端幂等 Seed + 查询 API；小程序可切 API；管理端双语轻量表单 |

**业务边界（Out of scope）：** 真实支付 / 库存 / 核销、日韩等多语言、语音讲解 / AR / 深度地图、论文正文进小程序、完整 OTA 行程规划——主线是景区介绍 + 双语服务。

---

## 演示

### 推荐演示路径

```
切换语言 → 首页景区热点 → 进入详情 → 阅读文化解读 / 专属话术
  → 服务页浏览通用话术（主链路无需登录）
```

动态字段（开放时间、票价等）带 **UNVERIFIED** 免责声明，不伪造成实时官方数据。

### Showcase — 模板界面（演示数据）

> 下列截图为原模板「黄山旅游助手」演示数据，**非山西正式内容**。Banner / 架构 / 技术栈 / 流程 / 目录配图见 [`docs/images/readme/`](docs/images/readme/)。

| [管理端登录](images/1.png)**管理端登录**Vue3 后台入口 | [小程序首页](images/shortcut-20250727-095547.png)**小程序首页**模板首页示意 | [文化遗产](images/shortcut-20250727-095606.png)**文化遗产**模板列表示意 |
|---|---|---|

更多模板截图见 [`images/`](images/)。

### P0 景区（Mock / Seed）

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

### 前置环境

| 组件 | 版本建议 | 备注 |
|---|---|---|
| JDK | 8+ | 后端 Spring Boot |
| Node.js | 18+ | 管理端 / 小程序工具链 |
| Maven | 3.6+ | 后端构建 |
| MySQL | 8 | 后端库 |
| Redis | 任意近期 | 会话 / 缓存 |
| HBuilderX | 近期版 | 打开 `tourism_weapp` |
| 微信开发者工具 | 近期版 | 小程序预览 |

### 管理端（`tourism_admin`）

```bash
git clone https://github.com/Aafff623/tourism-master.git
cd tourism-master/tourism_admin
pnpm install   # 或 npm / yarn
pnpm dev
```

### 后端（`tourism_api`）

1. MySQL 8 + Redis（见 [`tourism_api/sql/README.md`](tourism_api/sql/README.md)）  
2. 按该 README **依序导入** `00` → `01`（Snowy v2.0.0 框架）→ `02`（biz_spot）→ Wave2 Seed → `03`（业务空表）  
3. **JDK 8** 下：`tourism_api` → `mvn clean install -DskipTests`，再进入 `snowy-web-app` 执行 `mvn spring-boot:run`（端口 **86**）  
4. 管理端默认账号：**superAdmin** / **123456**

库名与账号见：`tourism_api/snowy-web-app/src/main/resources/application.properties`（本地示例，勿提交真实生产密钥）。

本机联调阻塞与调研记录：[`docs/output/reports/local-backend-bootstrap/`](docs/output/reports/local-backend-bootstrap/)。

### 小程序（`tourism_weapp`）

用 HBuilderX 打开 `tourism_weapp`，依赖就绪后运行到微信开发者工具预览。

模式 A 下景区主链路走本地 Mock Repository，可不启后端即可演示双语浏览；订票 / 评论仍走原 API 鉴权。

<details>
<summary>新队友阅读顺序</summary>

| 顺序 | 路径 | 目的 |
|---|---|---|
| 1 | `README.md` | 定位、跑起来、边界 |
| 2 | `CONTEXT.md` · `CONTEXT-MAP.md` | 术语与多端地图 |
| 3 | `AGENTS.md` · `CLAUDE.md` | 任务流与 Agent 纪律 |
| 4 | `docs/output/reports/shanxi-bilingual-mvp/prd.md` | 产品验收真相源 |
| 5 | `docs/adr/0001-bilingual-field-model.md` | 双语字段与 `slug` 导航 |
| 6 | 对应端源码 + `docs/contexts/*/CONTEXT.md` | 实施 |

</details>

---

## 架构

<p align="center">
  <img src="docs/images/readme/architecture.png" alt="系统架构图" width="100%">
</p>

```
tourism_weapp (UniApp 微信小程序)
  → Locale Store + Mock Repository / API Adapter
    → 景区列表 · 详情 · 首页热点 · 服务话术
  →（订票 / 评论）原模板 HTTP + Token 鉴权

tourism_admin (Vue3 + Ant Design Vue)
  → 景区双语轻量表单（模式 B/C）

tourism_api (Spring Boot / Snowy)
  → MyBatis-Plus · Sa-Token · MySQL 8 · Redis
  → 幂等 Seed + 景区双语查询 API（模式 B）
```

### 技术栈

<p align="center">
  <img src="docs/images/readme/tech-stack.png" alt="技术栈分层图" width="100%">
</p>

| 层 | 技术 | 路径 |
|---|---|---|
| 用户端 | UniApp（Vue）、微信小程序 | `tourism_weapp/` |
| 管理端 | Vue3 · Vite · Ant Design Vue · TypeScript | `tourism_admin/` |
| 后端 | Spring Boot 2.5 · MyBatis-Plus · Sa-Token · MySQL 8 · Redis | `tourism_api/` |

### 游客主链路

<p align="center">
  <img src="docs/images/readme/workflow.png" alt="游客主链路流程图" width="100%">
</p>

**关键原则：**

- 二次开发优先改模板三端，不另起无关栈（除非 ADR）
- 产品主线：景区介绍 + 双语服务；不主动扩大为通用 OTA
- 导航键：`slug`（ADR-0001）；双语成对字段经 Adapter 输出当前 locale ViewModel
- 游客可浏览 Mock / 双语查询主链路；订票评论无 Token 时行为与模板一致
- 动态字段带 UNVERIFIED；密钥与本地 DB/Redis/微信配置不入库

### 目录结构

<p align="center">
  <img src="docs/images/readme/structure.png" alt="仓库目录结构图" width="100%">
</p>

```
tourism-master/
├── README.md · AGENTS.md · CLAUDE.md · CONTEXT.md · CONTEXT-MAP.md
├── docs/          # ADR · Agent 规则 · PRD/handoff · knowledge · README 配图
├── tourism_weapp/ # 小程序
├── tourism_admin/ # 管理端
├── tourism_api/   # 后端
└── images/        # 模板演示截图
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

推进节奏见 [`docs/output/reports/shanxi-bilingual-mvp/implementation-roadmap.md`](docs/output/reports/shanxi-bilingual-mvp/implementation-roadmap.md)。

---

## 文档

| 文档 | 说明 |
|---|---|
| [`CONTEXT.md`](CONTEXT.md) | 产品域事实、术语、约束 |
| [`CONTEXT-MAP.md`](CONTEXT-MAP.md) | 多端上下文地图 |
| [`AGENTS.md`](AGENTS.md) · [`CLAUDE.md`](CLAUDE.md) | Agent 入口与维护协议 |
| [`docs/README.md`](docs/README.md) | 文档资产索引 |
| [`docs/output/reports/shanxi-bilingual-mvp/prd.md`](docs/output/reports/shanxi-bilingual-mvp/prd.md) | 产品 PRD（approved） |
| [`docs/adr/0001-bilingual-field-model.md`](docs/adr/0001-bilingual-field-model.md) | 双语字段与导航键 |
| [`docs/contexts/`](docs/contexts/) | weapp / admin / api 分端 CONTEXT |
| [`docs/output/reports/readme-diagrams/readme-diagram-brief.md`](docs/output/reports/readme-diagrams/readme-diagram-brief.md) | README 配图（Banner / 架构 / 技术栈 / 流程 / 目录）生成说明 |

任务流：GitHub Issues + `docs/output/handoff/`；完结归档见 `docs/output/*/archive/`。

---

## License

见根目录 [`LICENSE`](LICENSE)（随模板）。

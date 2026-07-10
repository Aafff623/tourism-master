<div align="center">

# Tourism Master · 山西文旅双语小程序

**少做通用 OTA，把空间留给景区介绍与跨文化双语服务**

面向入境游客与中文用户，提供山西重点景区介绍、文化解读与中英双语服务话术，降低跨文化旅游中的信息理解与现场沟通成本。

</div>

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

入境游客在山西景区游览时，通常会遇到以下信息与沟通障碍：

- 景区介绍与导览以中文为主，英文信息分布零散或缺失；
- 礼仪、历史语境与文化禁忌缺少易理解的跨文化表达；
- 购票问询、路线咨询与应急求助缺少可复用的中英对照话术；
- 通用旅游应用更关注交易与行程，对“读懂景区”的支持相对有限。

**本产品的核心边界：**

| 组件 | 职责 |
|---|---|
| 景区介绍 | 列表 / 详情：名称、简介、看点、开放与交通概要 |
| 语言偏好 | 全局 `zh` ↔ `en`；界面文案与内容字段同步切换 |
| 文化解读 | 面向入境游客补充礼仪、历史语境与参观提示 |
| 双语服务 | 通用话术（服务页）+ 景区专属话术（详情） |
| 首页热点 | 以重点景区推荐进入内容主线，不强化交易入口 |
| Mock / API | 模式 A 支持前端独立演示；模式 B 已贯通 Seed 与查询 API |

```text
语言切换 → 首页景区热点 / 列表 → 景点详情（文化解读 + 专属话术）
  → 服务页通用话术（游客主链路免登录）
```

---

## 功能

<p align="center">
  <img src="docs/images/readme/features.svg" alt="Tourism Master 核心功能模块" width="100%">
</p>

| 功能 | 说明 |
|---|---|
| **语言切换** | 全局中英切换，Tab、按钮与景区内容字段同步更新 |
| **景区列表** | 首批覆盖云冈石窟、五台山、平遥古城、晋祠、黄河壶口瀑布（山西侧）与悬空寺 |
| **景点详情** | 展示简介、看点、开放与票价说明、交通概要、文化解读和专属话术 |
| **文化解读** | 从历史语境、参观礼仪和跨文化差异等角度补充景区背景 |
| **双语服务** | 提供购票问询、路线咨询、礼仪提示与应急求助等中英对照话术 |
| **首页景区热点** | 基于重点景区推荐进入内容主线，不占用模板美食与住宿推荐位 |
| **Mock 适配层** | 通过 Repository / Adapter 与 `slug` 导航支持游客独立浏览主链路 |
| **模式 B 贯通** | 后端提供幂等 Seed 与查询 API，小程序可切换 API，管理端支持双语内容维护 |

> **业务边界（Out of scope）：** 当前不覆盖真实支付、库存核销、完整行程规划、日韩等多语言、语音讲解、AR 或深度地图。产品主线保持为景区介绍与双语服务。

---

## 演示

### 推荐演示路径

```text
切换语言 → 首页景区热点 → 进入详情 → 阅读文化解读 / 专属话术
  → 服务页浏览通用话术（主链路无需登录）
```

开放时间、票价等可能变化的信息统一标记 **UNVERIFIED**，避免将演示数据误解为实时官方信息。

### Showcase

山西主题小程序的真机与管理端截图将在应用启动、内容替换和视觉验收完成后补充，本节暂时保留展示位。

<!--
建议后续采用三列相册：
1. 首页 / 景区热点
2. 景区详情 / 文化解读
3. 双语服务 / 管理端表单
-->

<details>
<summary>查看原始模板界面参考</summary>

> 以下截图仅用于说明现有工程骨架与基础交互，不代表 Tourism Master 的最终视觉与山西正式内容。

| 管理端登录 | 小程序首页 | 文化遗产列表 |
|---|---|---|
| [查看截图](images/1.png) | [查看截图](images/shortcut-20250727-095547.png) | [查看截图](images/shortcut-20250727-095606.png) |

更多模板截图见 [`images/`](images/)。

</details>

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
| MySQL | 8 | 后端数据库 |
| Redis | 近期稳定版 | 会话 / 缓存 |
| HBuilderX | 近期版 | 打开 `tourism_weapp` |
| 微信开发者工具 | 近期版 | 小程序预览与调试 |

### 管理端（`tourism_admin`）

```bash
git clone https://github.com/Aafff623/tourism-master.git
cd tourism-master/tourism_admin
pnpm install   # 或 npm / yarn
pnpm dev
```

### 后端（`tourism_api`）

用 IDEA 打开 `tourism_api`，配置 JDK、Maven、MySQL 与 Redis。默认配置文件位于：

`tourism_api/snowy-web-app/src/main/resources/application.properties`

请勿将真实生产密钥、数据库凭据或微信配置提交到仓库。

### 小程序（`tourism_weapp`）

用 HBuilderX 打开 `tourism_weapp`，依赖就绪后运行到微信开发者工具预览。

模式 A 下，景区主链路使用本地 Mock Repository，无需启动后端即可演示双语浏览；订票与评论仍沿用原有 API 鉴权逻辑。

<details>
<summary>新队友阅读顺序</summary>

| 顺序 | 路径 | 目的 |
|---|---|---|
| 1 | `README.md` | 理解项目定位、运行方式与产品边界 |
| 2 | `CONTEXT.md` · `CONTEXT-MAP.md` | 了解术语与多端上下文 |
| 3 | `AGENTS.md` · `CLAUDE.md` | 了解任务流与 Agent 协作规范 |
| 4 | `docs/output/reports/shanxi-bilingual-mvp/prd.md` | 查看产品范围与验收标准 |
| 5 | `docs/adr/0001-bilingual-field-model.md` | 查看双语字段与 `slug` 导航决策 |
| 6 | 对应端源码 + `docs/contexts/*/CONTEXT.md` | 进入具体实现 |

</details>

---

## 架构

<p align="center">
  <img src="docs/images/readme/architecture.png" alt="系统架构图" width="100%">
</p>

```text
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

- 以现有三端工程为基础演进，不引入与项目目标无关的新技术栈（除非 ADR）
- 产品主线保持为景区介绍与双语服务，不扩展为通用 OTA
- 列表到详情使用 `slug` 作为稳定导航键；双语字段经 Adapter 输出当前 Locale 对应的 ViewModel
- 游客可浏览 Mock / 双语查询主链路；订票与评论在无 Token 时沿用模板登录逻辑
- 动态字段统一标记 `UNVERIFIED`；本地数据库、Redis 与微信配置不得入库

### 目录结构

<p align="center">
  <img src="docs/images/readme/structure.png" alt="仓库目录结构图" width="100%">
</p>

```text
tourism-master/
├── README.md · AGENTS.md · CLAUDE.md · CONTEXT.md · CONTEXT-MAP.md
├── docs/          # ADR · Agent 规则 · PRD/handoff · knowledge · README 配图
├── tourism_weapp/ # 小程序
├── tourism_admin/ # 管理端
├── tourism_api/   # 后端
└── images/        # 原始模板界面参考截图
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
| [`CONTEXT.md`](CONTEXT.md) | 产品域事实、术语与约束 |
| [`CONTEXT-MAP.md`](CONTEXT-MAP.md) | 多端上下文地图 |
| [`AGENTS.md`](AGENTS.md) · [`CLAUDE.md`](CLAUDE.md) | Agent 入口与维护协议 |
| [`docs/README.md`](docs/README.md) | 文档资产索引 |
| [`docs/output/reports/shanxi-bilingual-mvp/prd.md`](docs/output/reports/shanxi-bilingual-mvp/prd.md) | 产品 PRD 与验收基线 |
| [`docs/adr/0001-bilingual-field-model.md`](docs/adr/0001-bilingual-field-model.md) | 双语字段与导航键 |
| [`docs/contexts/`](docs/contexts/) | weapp / admin / api 分端 CONTEXT |
| [`docs/output/reports/readme-diagrams/readme-diagram-brief.md`](docs/output/reports/readme-diagrams/readme-diagram-brief.md) | README 配图生成说明 |

任务流：GitHub Issues + `docs/output/handoff/`；完结归档见 `docs/output/*/archive/`。

---

## 项目来源与说明

本项目基于既有的 Spring Boot + Vue3 + UniApp 旅游系统工程进行二次开发。原工程提供管理端、小程序端、后端以及订票、评论等基础能力；Tourism Master 在此基础上重新聚焦山西景区内容、跨文化解读与中英双语服务。

原始模板仅作为工程基础，不代表本项目最终产品定位与正式展示内容。

---

## License

见根目录 [`LICENSE`](LICENSE)。

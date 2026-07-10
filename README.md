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

山西古建、石窟与历史街区拥有较高的文化信息密度，但入境游客在现场体验中仍可能面临以下障碍：

- 景区介绍与导览内容以中文为主，英文信息分布零散；
- 历史语境、参观礼仪与文化禁忌缺少易理解的跨文化表达；
- 购票问询、路线咨询和应急求助缺少可复用的中英对照话术；
- 通用旅游产品更关注交易与行程，对“理解景区”的支持相对有限。

Tourism Master 因此将产品主线收敛为：**景区介绍、文化解读与双语服务**。

| 能力 | 产品职责 |
|---|---|
| 景区内容 | 提供景区列表、详情、核心看点、开放与交通概要 |
| 语言偏好 | 全局 `zh` ↔ `en` 切换，界面文案与内容字段同步更新 |
| 文化解读 | 补充历史语境、参观礼仪、文化差异与注意事项 |
| 双语服务 | 提供通用服务话术与景区专属表达 |
| 首页热点 | 以重点景区推荐进入内容主线，而非强化交易入口 |
| 数据接入 | 支持本地 Mock 演示与后端 API 查询两种模式 |

> **产品边界：** 当前不覆盖真实支付、库存核销、完整行程规划、深度地图、AR 或语音讲解。订票与评论保留为兼容能力，不作为产品主线。

---

## 功能

<p align="center">
  <img src="docs/images/readme/features.svg" alt="Tourism Master 核心功能模块" width="100%">
</p>

| 功能 | 说明 |
|---|---|
| **全局双语切换** | 支持中文与英文切换，Tab、按钮及景区内容字段同步更新 |
| **景区热点与列表** | 首批覆盖云冈石窟、五台山、平遥古城、晋祠、黄河壶口瀑布（山西侧）与悬空寺 |
| **景点详情** | 展示简介、核心看点、开放与票价说明、交通概要和参观提示 |
| **文化解读** | 从历史语境、礼仪与跨文化差异等角度补充景区背景 |
| **景区专属话术** | 为不同景区提供可直接使用的中英双语表达 |
| **通用服务话术** | 覆盖购票问询、路线咨询、礼仪提示和应急求助等常见场景 |
| **双模式数据接入** | 模式 A 使用 Mock Repository 独立演示；模式 B 接入后端 Seed 与查询 API |

```text
切换语言 → 首页景区热点 / 景区列表 → 景点详情
  → 文化解读与景区专属话术 → 服务页通用话术
```

---

## 演示

### 推荐演示路径

```text
切换语言 → 首页景区热点 → 进入景点详情
  → 阅读文化解读 / 专属话术 → 服务页浏览通用话术
```

游客浏览主链路无需登录。开放时间、票价等可能变化的信息使用 **UNVERIFIED** 标识，避免将演示数据误解为实时官方信息。

### Showcase

山西主题小程序的真机与管理端截图将在应用启动、内容替换和视觉验收完成后补充。本节暂时保留展示位。

<!--
建议后续采用 3 列相册：
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

更多参考截图见 [`images/`](images/)。

</details>

### 首批景区数据

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

| 组件 | 版本建议 | 用途 |
|---|---|---|
| JDK | 8+ | Spring Boot 后端 |
| Node.js | 18+ | 管理端与小程序工具链 |
| Maven | 3.6+ | 后端构建 |
| MySQL | 8 | 业务数据存储 |
| Redis | 近期稳定版 | 会话与缓存 |
| HBuilderX | 近期版 | 打开并运行 `tourism_weapp` |
| 微信开发者工具 | 近期版 | 小程序预览与调试 |

### 管理端（`tourism_admin`）

```bash
git clone https://github.com/Aafff623/tourism-master.git
cd tourism-master/tourism_admin
pnpm install   # 也可使用 npm 或 yarn
pnpm dev
```

### 后端（`tourism_api`）

使用 IDEA 打开 `tourism_api`，配置 JDK、Maven、MySQL 与 Redis。默认配置文件位于：

```text
tourism_api/snowy-web-app/src/main/resources/application.properties
```

请勿将真实生产密钥、数据库凭据或微信配置提交到仓库。

### 小程序（`tourism_weapp`）

使用 HBuilderX 打开 `tourism_weapp`，依赖准备完成后运行到微信开发者工具。

模式 A 下，景区浏览主链路使用本地 Mock Repository，无需启动后端即可演示；订票与评论仍沿用原有 API 鉴权逻辑。

<details>
<summary>新成员建议阅读顺序</summary>

| 顺序 | 路径 | 目的 |
|---|---|---|
| 1 | `README.md` | 理解定位、运行方式与产品边界 |
| 2 | `CONTEXT.md` · `CONTEXT-MAP.md` | 了解术语与多端上下文 |
| 3 | `AGENTS.md` · `CLAUDE.md` | 了解 Agent 协作与维护规范 |
| 4 | `docs/output/reports/shanxi-bilingual-mvp/prd.md` | 查看产品范围与验收标准 |
| 5 | `docs/adr/0001-bilingual-field-model.md` | 查看双语字段与 `slug` 导航决策 |
| 6 | 对应端源码 + `docs/contexts/*/CONTEXT.md` | 进入具体实现 |

</details>

---

## 架构

<p align="center">
  <img src="docs/images/readme/architecture.png" alt="Tourism Master 系统架构图" width="100%">
</p>

- `tourism_weapp`：负责双语浏览、景区热点、列表、详情与服务话术；
- `tourism_admin`：负责景区双语内容的轻量维护；
- `tourism_api`：提供幂等 Seed、景区查询 API、鉴权、数据持久化与缓存；
- Mock Repository 与 API Adapter 共享面向当前 Locale 的内容输出模型。

### 技术栈

<p align="center">
  <img src="docs/images/readme/tech-stack.png" alt="Tourism Master 技术栈分层图" width="100%">
</p>

| 层级 | 技术 | 路径 |
|---|---|---|
| 用户端 | UniApp（Vue）、微信小程序 | `tourism_weapp/` |
| 管理端 | Vue3 · Vite · Ant Design Vue · TypeScript | `tourism_admin/` |
| 后端 | Spring Boot 2.5 · MyBatis-Plus · Sa-Token | `tourism_api/` |
| 数据层 | MySQL 8 · Redis | `tourism_api/` |

### 游客主链路

<p align="center">
  <img src="docs/images/readme/workflow.png" alt="Tourism Master 游客主链路" width="100%">
</p>

**实现原则：**

- 以既有三端工程为基础演进，不引入与目标无关的新技术栈；
- 产品主线保持为景区介绍与双语服务，不扩展为通用 OTA；
- 列表到详情使用 `slug` 作为稳定导航键；
- 双语字段经 Adapter 转换为当前 Locale 对应的 ViewModel；
- 游客可直接浏览核心内容，订票与评论沿用 Token 鉴权；
- 动态字段统一标记 `UNVERIFIED`，本地凭据与密钥不得入库。

### 目录结构

<p align="center">
  <img src="docs/images/readme/structure.png" alt="Tourism Master 仓库目录结构" width="100%">
</p>

```text
tourism-master/
├── README.md · AGENTS.md · CLAUDE.md · CONTEXT.md · CONTEXT-MAP.md
├── docs/          # ADR、上下文、PRD、handoff 与 README 配图
├── tourism_weapp/ # UniApp 微信小程序
├── tourism_admin/ # Vue3 管理端
├── tourism_api/   # Spring Boot 后端
└── images/        # 原始模板界面参考截图
```

---

## 路线图

| 阶段 | 状态 | 说明 |
|---|:---:|---|
| Wave 0：仓库资产、调研与 ADR | ✅ | 完成文档骨架、Mock 调研包与 ADR-0001 |
| Wave 1：小程序演示闭环 | ✅ | 完成语言切换、Mock、列表详情、首页热点与服务话术 |
| Wave 2：三端数据贯通 | ✅ | 完成 API Seed、小程序 API 切换与管理端双语表单 |
| 概况 / 遗产页（SD-15） | 🔜 | 作为独立任务推进 |
| Wave 3：内容运营（模式 C） | ⚪ | 需要独立 ADR 与 PRD |

详细计划见 [`docs/output/reports/shanxi-bilingual-mvp/implementation-roadmap.md`](docs/output/reports/shanxi-bilingual-mvp/implementation-roadmap.md)。

---

## 文档

| 文档 | 说明 |
|---|---|
| [`CONTEXT.md`](CONTEXT.md) | 产品域事实、术语与约束 |
| [`CONTEXT-MAP.md`](CONTEXT-MAP.md) | 多端上下文地图 |
| [`AGENTS.md`](AGENTS.md) · [`CLAUDE.md`](CLAUDE.md) | Agent 入口与维护协议 |
| [`docs/README.md`](docs/README.md) | 文档资产索引 |
| [`docs/output/reports/shanxi-bilingual-mvp/prd.md`](docs/output/reports/shanxi-bilingual-mvp/prd.md) | 产品 PRD 与验收基线 |
| [`docs/adr/0001-bilingual-field-model.md`](docs/adr/0001-bilingual-field-model.md) | 双语字段与导航键决策 |
| [`docs/contexts/`](docs/contexts/) | 小程序、管理端与后端的分端上下文 |
| [`docs/output/reports/readme-diagrams/readme-diagram-brief.md`](docs/output/reports/readme-diagrams/readme-diagram-brief.md) | README 配图生成规范 |

任务协作采用 GitHub Issues 与 `docs/output/handoff/`，归档内容位于 `docs/output/*/archive/`。

---

## 项目来源与说明

本项目基于既有的 Spring Boot + Vue3 + UniApp 旅游系统工程进行二次开发。原工程提供了管理端、小程序端、后端以及订票、评论等基础能力；Tourism Master 在此基础上重新聚焦山西景区内容、跨文化解读与中英双语服务。

原始模板仅作为工程基础，不代表本项目最终产品定位与正式展示内容。

---

## License

见根目录 [`LICENSE`](LICENSE)。

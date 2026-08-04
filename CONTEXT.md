# CONTEXT.md

## 项目定位

本仓库基于闲鱼购得的「SpringBoot + Vue3 + UniApp 旅游系统」模板，二次开发为**山西文旅景区介绍与双语服务小程序**。

课题背景（产品叙事，非论文交付物）：

> 入境游客跨文化旅游体验障碍及双语服务体系构建——以山西文旅景区为例

面向入境游客与中文用户，提供山西重点景区的介绍、导览信息与中英双语内容，降低跨文化理解成本。管理端维护景区与内容；小程序为主要消费端。

模板原能力（景点、攻略、订单、票务等）可保留或裁剪；**产品主线是景区介绍 + 双语服务**，非通用 OTA。

> 深度分析 Canvas：根目录 `tourism-master-deep-analysis.canvas.tsx`。  
> 五维调研报告：[`docs/outputs/report/project-init/five-dimension-research.md`](docs/outputs/report/project-init/five-dimension-research.md)。

## 领域术语表

| 术语 | 英文 | 定义 |
|---|---|---|
| 景区 | Scenic Spot / Attraction | 山西文旅景点实体；小程序「景点」模块的核心对象 |
| 景点详情 | Spot Detail | 景区图文介绍、开放信息、文化解读等详情页 |
| 双语内容 | Bilingual Content | 同一业务字段的中文（`zh`）与英文（`en`）成对内容 |
| 语言偏好 | Locale Preference | 用户选择的展示语言；默认跟随系统或显式切换 |
| 文化解读 | Cultural Interpretation | 针对入境游客的文化背景说明（礼仪、历史语境、禁忌等） |
| 跨文化障碍 | Cross-cultural Barrier | 入境游客在信息获取、文化理解、现场服务上的障碍类型（用于内容组织，非独立业务表） |
| 双语服务条目 | Bilingual Service Item | 可复用的服务话术/指引（购票、问询、应急等）的中英对照 |
| 攻略 | Strategy / Guide | 模板自带的游记/攻略内容；可挂山西线路，非主线必做 |
| 推荐 | Recommend | 首页或运营位推荐的景区/内容 |
| 动态 | News / Feed | 景区公告或运营动态 |
| 管理端 | Admin | `tourism_admin`，运营与内容后台 |
| 用户端 | Weapp | `tourism_weapp`，UniApp 微信小程序 |
| 后端 | API | `tourism_api`，Snowy / Spring Boot 服务 |
| Mock 数据 | Mock Data | 无官方资料时使用的山西景区演示数据；须可替换为真实数据 |
| 景区热点 | Home Hot Spots | 首页展示的景区推荐位；数据来自调研 `homeRecommendations`，**不是**模板 `biz_recommend`（美食住宿等） |
| 景区 Slug | Spot Slug | 景区业务唯一键（kebab-case）；模式 A 列表/详情导航主键，见 ADR-0001 |
| 接入模式 A/B/C | Integration Mode | A=前端 Mock 适配层；B=后端 Seed+API；C=完整内容管理。**同学演示阶段默认 A（Mock-only）**，见 ADR-0003；B 实现保留、运行时后置 |

共享用词入口 → [`LANGUAGES.md`](LANGUAGES.md)。

## 关键约束

1. **二次开发优先改模板**：在现有三端结构上演进，不另起无关技术栈，除非 ADR 明确批准。
2. **主线范围**：景区介绍、双语展示/切换、面向入境游客的文化解读与基础服务信息；购票/订单等模板能力按需保留，不主动扩大范围。
3. **数据可替换**：初期景区与文案以 Mock 为主；字段设计须支持后续替换真实数据与运营录入。
4. **密钥与本地配置不入库**：数据库密码、Redis、微信密钥等仅本地/环境变量；勿提交真实密钥。
5. **术语一致**：Issue、PRD、代码命名、测试名使用本表与 `LANGUAGES.md`；缺口先补术语再写代码。
6. **PRD 门禁**：功能开发前须有 PRD 且 `status: approved`（纯文档/初始化除外）。路径：`docs/outputs/prd/{theme}/prd.md`。
7. **模式 A 游客浏览**：景区双语主链路经本地 Repository，不强制登录；订票/评论等原 API 仍遵循模板鉴权。
8. **导航键**：景区跳转使用 `slug`（ADR-0001）。
9. **首页热点**：景区推荐展示为首页热点，禁止把调研景区推荐写入 `biz_recommend`。
10. **演示阶段 Mock-only（ADR-0003）**：同学演示交付以小程序本地 Mock 为准，不强制启动 API/MySQL/Redis；Mode B 代码保留，真数据换接另开分支。
11. **根治理**：三端 monorepo 只在根维护 AGENTS/CONTEXT/LANGUAGES；子包不重复整套。

## 技术栈（模板现状）

| 层 | 技术 | 路径 |
|---|---|---|
| 用户端 | UniApp（Vue）、微信小程序 · ColorUI | `tourism_weapp/` |
| 管理端 | Vue3、Vite、Ant Design Vue、TypeScript · 端口 85 | `tourism_admin/` |
| 后端 | Spring Boot 2.5、MyBatis-Plus、Sa-Token、MySQL 8、Redis · 端口 86 | `tourism_api/` |
| 运行环境 | JDK 8+、Node 18+、Maven 3.6+、MySQL 8、Redis | 见根 `README.md` |

> 后端锁定 Java 8 / Spring Boot 2.5；勿擅自升 JDK 21。延伸技术须先写 ADR。

## 首批 P0 景区（Mock / Seed）

| Slug | 景区 |
|---|---|
| `yungang-grottoes` | 云冈石窟 |
| `wutai-mountain` | 五台山 |
| `pingyao-ancient-city` | 平遥古城 |
| `jinci-temple` | 晋祠 |
| `hukou-waterfall` | 黄河壶口瀑布（山西侧） |
| `xuankong-temple` | 悬空寺 |

## 文件结构（仓库级）

```
/
├── AGENTS.md / CLAUDE.md / CONTEXT.md / CONTEXT-MAP.md / LANGUAGES.md
├── README.md · preview-readme.{html,css,js}
├── assets/images/
│   ├── readme/               # README 契约配图 + Showcase
│   └── legacy-template/      # 模板原始截图（非终稿）
├── docs/
│   ├── agents/               # workflow · deliver · archive · domain · issue-tracker · triage-labels · voice
│   ├── adr/                  # ADR-0000…0003
│   ├── contexts/             # weapp / admin / api
│   ├── knowledge/ · glossary/
│   └── outputs/              # report · prd · handoff · commit-history
└── tourism_weapp/ · tourism_admin/ · tourism_api/
```

## 常用约定

- 主题与任务目录名：`kebab-case` 英文。
- 双语字段：`titleZh` / `titleEn` 或嵌套 `{ zh, en }`；选定后写入 ADR，三端对齐。
- Agent 产物一律 → `docs/outputs/`（禁止新建 `docs/output/`）。
- Issue 真相源：GitHub Issues（`Aafff623/tourism-master`）。
- 二次开发主战场：`tourism_weapp/services/scenic*` · `mock/scenic/` · API `WxSpotBilingualController` · admin `views/biz/spot`。

分端细节见 [`CONTEXT-MAP.md`](CONTEXT-MAP.md)。

# tourism-master — README 配图生成说明

> **用途**：将本文档整份（或下方「逐图 Prompt」）拖给 GPT-4o / GPT Image，按规格生成 Banner 与信息图。  
> **本文档路径**：`docs/output/reports/readme-diagrams/readme-diagram-brief.md`  
> **输出目录**：`docs/images/readme/`，文件名必须与下表一致，README 会按文件名引用。

---

## 1. 项目一句话

**tourism-master** 是山西文旅景区介绍与中英双语服务小程序：基于 SpringBoot + Vue3 + UniApp 旅游模板二次开发，主线是「读懂景区 + 跨文化双语」，不是通用 OTA。

- 仓库：`Aafff623/tourism-master`
- 三端：`tourism_weapp` · `tourism_admin` · `tourism_api`
- Slogan：*少做通用 OTA，把空间留给景区介绍与跨文化双语服务*
- 课题叙事：入境游客跨文化旅游体验障碍及双语服务体系构建——以山西文旅景区为例

---

## 2. 视觉风格（全套图统一）

| 项 | 值 |
|---|---|
| 风格 | 专业扁平信息图 / 轻量技术插画；干净、可读、有设计感；允许大胆构图，但信息层级清晰 |
| 气质 | 山西文旅 · 古建克制现代 · 双语对照感 |
| 主色 | 赭石 / 赤陶 `#C45C26` |
| 辅色 | 青绿 `#2F6F5E`、暖石色 `#E8D5C4`、深墨 `#2C2420` |
| 背景 | 暖白或浅石色；模块用圆角卡片 + 轻阴影；可有极淡云纹 / 砖雕几何作底纹 |
| 文字 | **图中标签用中文**（技术名可保留英文：UniApp、Spring Boot、slug） |
| Banner 比例 | **3:1**，建议 1200×400 |
| 信息图比例 | **16:9**，建议宽度 ≥ 1600px |
| 禁止 | 人脸、卡通吉祥物、紫粉 AI 默认渐变、3D 炫光、虚假 Logo、订票 OTA 界面堆砌、拥挤到不可读 |

**发挥空间**：布局、图标隐喻、卡片形状、箭头样式可大胆设计；**节点名称与连线逻辑必须准确**，不要发明不存在的中间件。

---

## 3. 生成清单

| 文件 | 类型 | 用途 |
|---|---|---|
| `banner.png` | 横幅 3:1 | README 顶部第一视觉 |
| `architecture.png` | 系统架构 16:9 | 「架构」章节 |
| `tech-stack.png` | 技术栈分层 16:9 | 「架构」旁或独立小节 |
| `workflow.png` | 用户主链路流程 16:9 | 「为什么 / 演示」旁或架构下 |
| `structure.png` | 仓库目录结构 16:9 | 「架构」目录说明 |

截图类（真机 / 模板）不在本 brief 生成范围内，仍用 `images/` 或后续补 `docs/images/readme/*.jpg`。

---

## 4. 图 0 — Banner

**保存文件名**：`banner.png`  
**尺寸**：1200×400（3:1）

### 要表达什么

一眼看出：山西文旅 + 双语小程序，气质专业，适合 GitHub README 顶栏。

### 必须出现的语义元素

| 元素 | 说明 |
|---|---|
| 古建视觉锚点 | 悬空寺崖壁 / 平遥城墙 / 晋祠飞檐等剪影或柔焦形，占主导 |
| 双语暗示 | 抽象 `中 / EN`、双语书页、左右对照形，小而清晰 |
| 地域暗示 | 极淡的山西省轮廓或区位线（低透明度） |
| 留白 | 一侧或中部留干净区域，便于 Markdown 叠标题（也可要求图内无字） |

### 不要出现

人脸、游客群、订票按钮、手机整屏 UI 截图、卡通、赛博霓虹。

---

## 5. 图 A — 系统架构图

**保存文件名**：`architecture.png`

### 要表达什么

三端如何协作：游客在小程序读双语内容；管理端维护；后端 Seed / API；模式 A Mock 与模式 B API 两条读路径。

### 节点（必须出现）

| 节点 | 显示名 | 说明 |
|---|---|---|
| `visitor` | 入境游客 / 中文用户 | 消费端 |
| `weapp` | tourism_weapp 微信小程序 | UniApp |
| `locale` | 语言偏好 zh ↔ en | 全局切换 |
| `mock` | Mock Repository（模式 A） | 本地 JSON / Adapter |
| `api-client` | API Adapter（模式 B） | 切真实查询 |
| `admin` | tourism_admin 管理端 | Vue3 双语表单 |
| `api` | tourism_api 后端 | Spring Boot / Snowy |
| `db` | MySQL 8 + Redis | 持久化与缓存 |
| `booking` | 订票 / 评论（模板能力） | 仍走 Token 鉴权，非主线 |

### 连线逻辑

```text
【主链路 — 实线，游客浏览，免登录】
用户 → 小程序 → 语言切换
  → Mock Repository（模式 A）或 API Adapter（模式 B）
  → 首页热点 / 景区列表 / 详情（文化解读 + 专属话术）/ 服务话术

【管理链路 — 另一色】
管理端 → 后端 API → MySQL（双语字段维护）

【旁路 — 虚线，非主线】
详情页订票 / 评论 → 原模板 HTTP + Token（无 Token 则跳登录）
```

### 布局建议

- 左侧用户与小程序，中间内容层（Mock / API），右侧后端与数据库
- 角注：**主线 = 景区介绍 + 双语 · 非通用 OTA**
- 可用小标签标 `slug` 导航、`UNVERIFIED` 动态字段

---

## 6. 图 B — 技术栈分层图

**保存文件名**：`tech-stack.png`

### 分层（从上到下）

| 层级 | 名称 | 包含技术 | 职责 |
|---|---|---|---|
| L1 | 用户端 | UniApp · Vue · 微信小程序 | 双语浏览、热点、详情、服务话术 |
| L2 | 管理端 | Vue3 · Vite · Ant Design Vue · TypeScript | 景区双语轻量维护 |
| L3 | 后端 | Spring Boot 2.5 · MyBatis-Plus · Sa-Token · Snowy | Seed、查询 API、鉴权 |
| L4 | 数据与缓存 | MySQL 8 · Redis | 景区双语数据、会话 |
| L5 | 工程与协作 | GitHub Issues · docs/ADR · Agent 工作流 | PRD / handoff / Review |

### 绘图逻辑

- 5 个水平色带或堆叠卡片
- 每层左侧层级名，右侧 2–4 个技术 pill
- 侧注：JDK 8+ · Node 18+ · Maven 3.6+ · 模式 A→B→C

---

## 7. 图 C — 游客主链路流程图

**保存文件名**：`workflow.png`

### 流程步骤（按顺序）

| 步骤 | 动作 |
|---|---|
| 1 | 打开小程序 |
| 2 | 切换语言 zh ↔ en |
| 3 | 首页「景区热点」或进入景区列表 |
| 4 | 按 `slug` 进入景点详情 |
| 5 | 阅读简介 / 看点 / 文化解读 |
| 6 | 查看景区专属双语话术 |
| 7 | （可选）进入服务页浏览通用话术 |
| 8 | （旁路）订票 / 评论 — 需登录则走模板鉴权 |

### 绘图逻辑

- 主路径用赭石箭头；旁路用虚线青绿
- 圆角步骤框；可在步骤 2 旁标「壳文案 + 内容字段同步」
- 底部注释：主链路游客免登录 · 动态字段带 UNVERIFIED

---

## 8. 图 D — 仓库目录结构图

**保存文件名**：`structure.png`

### 精简目录树（必须体现）

```text
tourism-master/
├── README.md · AGENTS.md · CLAUDE.md · CONTEXT.md · CONTEXT-MAP.md
├── docs/
│   ├── adr/                 # ADR-0001 双语与 slug
│   ├── agents/              # 任务流
│   ├── contexts/            # weapp / admin / api
│   ├── images/readme/       # ★ README 配图（本图输出目录）
│   ├── output/reports/      # PRD
│   └── output/handoff/      # 任务交接
├── tourism_weapp/           # ★ 小程序（主演示端）
├── tourism_admin/           # 管理端
├── tourism_api/             # 后端
└── images/                  # 模板演示截图（非山西正式内容）
```

### 绘图逻辑

- 树状图；高亮 `tourism_weapp/`、`docs/images/readme/`、`docs/adr/`
- 不要画 `node_modules`、构建产物、密钥文件

---

## 9. 术语（图中可用）

| 中文 | 英文 / 符号 | 含义 |
|---|---|---|
| 景区 | Scenic Spot | 山西文旅景点实体 |
| 双语内容 | Bilingual | `nameZh` / `nameEn` 成对字段 |
| 语言偏好 | Locale | `zh` ↔ `en` |
| 文化解读 | Cultural Notes | 礼仪 / 历史语境 / 参观提示 |
| 景区热点 | Home Hot Spots | 首页推荐，非 `biz_recommend` |
| 景区 Slug | slug | 列表→详情导航主键 |
| 模式 A/B/C | Integration Mode | Mock → Seed+API → 完整 CMS |
| UNVERIFIED | — | 开放时间/票价等未核验声明 |

---

## 10. 给 GPT-4o 的逐图 Prompt（可直接复制）

> 使用方式：每次只生成一张；把对应 Prompt 整段粘贴。可在开头加一句「按专业信息图大胆发挥构图，但节点与逻辑必须准确」。

### Prompt 0 — banner.png

```
Create a wide GitHub README banner, 1200×400 (3:1), professional cultural-tourism aesthetic for a Shanxi bilingual mini-program project called Tourism Master.

Concept: scenic introduction + Chinese/English cross-cultural service — NOT a generic OTA booking app.

Visual style: restrained modern editorial; terracotta/ochre (#C45C26) + muted jade green (#2F6F5E) on warm stone/off-white atmosphere; subtle depth, clean composition as ONE scene (not a dashboard of cards).

Must include as semantic elements (interpret freely, keep hierarchy clear):
- Dominant Shanxi ancient-architecture silhouette or soft-focus form (cliffside temple / city wall / temple eaves)
- Small bilingual cue (abstract 中/EN or dual-language motif)
- Very faint Shanxi province outline in the background
- Optional sparse traditional pattern (cloud motif / brick geometry)

Avoid: human faces, cartoon mascots, ticket/booking UI, phone mockups, purple-indigo AI gradients, neon cyberpunk, cluttered icon rows.

No text overlay (title added in Markdown). High quality, cinematic wide crop, suitable as a dark-theme GitHub README header.
```

### Prompt A — architecture.png

```
Design a professional 16:9 Chinese technical architecture infographic for tourism-master — a Shanxi bilingual cultural tourism WeChat mini-program (secondary development on SpringBoot + Vue3 + UniApp).

Style: flat modern info-design; terracotta #C45C26 + jade #2F6F5E + warm stone cards; light shadow; readable Chinese labels; bold creative layout OK if hierarchy stays clear.

Must show these nodes and relationships accurately:
- Users (inbound visitors / Chinese users) → tourism_weapp (UniApp WeChat mini-program)
- Locale switch zh ↔ en
- Two read paths: Mode A Mock Repository / Adapter  AND  Mode B API Adapter → tourism_api (Spring Boot / Snowy) → MySQL 8 + Redis
- tourism_admin (Vue3) → API for bilingual content maintenance
- Side path (dashed): booking / comments still use template HTTP + Token auth (not the main product line)

Annotate corner: 「主线 = 景区介绍 + 双语 · 非通用 OTA」. Optional small tags: slug navigation, UNVERIFIED dynamic fields.

Do NOT invent extra middleware. No fake logos, no 3D glow, no purple gradients, no faces.
```

### Prompt B — tech-stack.png

```
Design a professional 16:9 Chinese tech-stack layer diagram for tourism-master.

Five horizontal layers top → bottom (stacked bands or cards), terracotta #C45C26 + jade #2F6F5E + warm neutrals, flat pills for tech names:

L1 用户端 — UniApp · Vue · 微信小程序
L2 管理端 — Vue3 · Vite · Ant Design Vue · TypeScript
L3 后端 — Spring Boot 2.5 · MyBatis-Plus · Sa-Token · Snowy
L4 数据 — MySQL 8 · Redis
L5 协作 — GitHub Issues · docs/ADR · Agent 工作流

Side note: JDK 8+ · Node 18+ · Maven 3.6+ · 接入模式 A→B→C.
Clean, editorial, high readability. Creative band shapes OK; do not omit layers or invent unrelated frameworks. No purple neon, no 3D chrome.
```

### Prompt C — workflow.png

```
Design a professional 16:9 Chinese user-journey flowchart for tourism-master bilingual mini-program.

Main path (solid terracotta arrows):
打开小程序 → 切换语言 zh↔en → 首页景区热点 / 景区列表 → 按 slug 进详情
→ 阅读简介·看点·文化解读 → 景区专属双语话术 →（可选）服务页通用话术

Side path (dashed jade): 订票 / 评论 → 模板鉴权（可能跳登录）

Footer note: 主链路游客免登录 · 开放时间/票价等带 UNVERIFIED 声明.

Style: rounded step cards, clear hierarchy, terracotta #C45C26 + jade #2F6F5E, warm off-white background, flat modern infographic. Be visually bold but keep steps accurate. No faces, no OTA checkout screens, no purple gradients.
```

### Prompt D — structure.png

```
Design a professional 16:9 Chinese repository structure tree diagram for tourism-master.

Root: tourism-master/
Highlight these paths:
- tourism_weapp/ (主演示端)
- tourism_admin/ · tourism_api/
- docs/adr/ · docs/images/readme/ (README 配图输出目录)
- docs/output/reports/ · docs/output/handoff/
- root docs: README · AGENTS · CLAUDE · CONTEXT · CONTEXT-MAP
- images/ = 模板演示截图（非山西正式内容）

Style: clean tree infographic, terracotta #C45C26 accents, jade highlights on starred folders, warm stone background, flat technical illustration. Do not draw node_modules or secrets. Creative framing OK; folder names must be accurate.
```

---

## 11. 生成后 Checklist

- [ ] `docs/images/readme/banner.png`
- [ ] `docs/images/readme/architecture.png`
- [ ] `docs/images/readme/tech-stack.png`
- [ ] `docs/images/readme/workflow.png`
- [ ] `docs/images/readme/structure.png`

全部就位后告诉 Agent，会把 README「架构」等章节挂上配图引用并进入 Review。

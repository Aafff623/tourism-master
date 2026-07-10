# 山西景区 Mock 调研包：本地 Agent 融合指南

> 目标仓库：`Aafff623/tourism-master`  
> 适用对象：Claude Code、Cursor Agent、Codex 或其他可读取本地仓库的编码 Agent  
> 配套资料：`shanxi-scenic-mock-research-v1.zip`  
> 本文职责：指导 Agent 将调研包转化为当前项目可消费的 Mock、接口、页面与后续数据库种子，而不是机械复制文件。

---

## 1. 这份 ZIP 调研包是什么

`shanxi-scenic-mock-research-v1.zip` 是面向“山西文旅景区介绍与双语服务小程序”的**研究型 Mock 数据包**。

它不是现成的生产数据库，也不是要求原样覆盖项目源码的模板。它提供的是：

- 山西重点景区的中英双语内容基础；
- 入境游客可能遇到的跨文化体验障碍；
- 通用与景区专属双语服务话术；
- 首页推荐、文化遗产、山西概况等聚合数据；
- 专名翻译、来源索引、待核验问题；
- 路线、家庭与无障碍提示、冬季提醒；
- 可供 Agent 读取的数据 Schema 与统一 JSON Bundle。

### 数据规模

| 内容 | 数量 |
|---|---:|
| 候选景区 | 12 |
| P0 完整景区 | 6 |
| 跨文化障碍类型 | 9 |
| 通用双语服务条目 | 18 |
| 景区专属话术 | 18 |
| 首页推荐 | 6 |
| 专名中英对照 | 30 |
| 来源索引 | 13 |
| 待人工核验问题 | 10 |

### 六个 P0 景区

1. 云冈石窟 / Yungang Grottoes
2. 五台山 / Mount Wutai
3. 平遥古城 / Ancient City of Ping Yao
4. 晋祠 / Jinci Temple
5. 黄河壶口瀑布（山西侧） / Hukou Waterfall of the Yellow River (Shanxi Side)
6. 悬空寺 / Hanging Temple

---

## 2. ZIP 内文件与用途

```text
shanxi-scenic-mock-research-v1/
├── README.md
├── AGENT-GUIDE.md
├── research-report.md
├── data/
│   ├── mock-bundle.json
│   ├── spotCatalog.json
│   ├── spots.json
│   ├── barrierTypes.json
│   ├── serviceItems.json
│   ├── spotServiceLinks.json
│   ├── homeRecommendations.json
│   ├── provinceIntro.json
│   ├── heritageStrategy.json
│   ├── religiousEtiquette.json
│   ├── glossary.json
│   ├── sourcesIndex.json
│   ├── openQuestions.json
│   └── qualityCompliance.json
├── schemas/
│   └── spot.schema.json
├── extras/
│   ├── itineraries.json
│   ├── accessibilityAndFamily.json
│   └── winterNotices.json
└── sources/
    └── source-notes.md
```

### 文件与项目模块映射

| 调研包文件 | 可支撑的项目模块 |
|---|---|
| `spotCatalog.json` | 景点列表、分类筛选、P0/P1 展示 |
| `spots.json` | 景区详情、看点、交通、票务、参观提示 |
| `homeRecommendations.json` | 首页推荐位、轮播、精选景区 |
| `provinceIntro.json` | “景区概况”或山西文旅概览 |
| `heritageStrategy.json` | “文化遗产”列表及去重规则 |
| `barrierTypes.json` | 跨文化障碍字典、文化解读分类 |
| `spots[].culturalNotes` | 各景区文化解读、礼仪、保护提示 |
| `serviceItems.json` | 通用双语服务话术 |
| `spotServiceLinks.json` | 景区专属问询话术 |
| `religiousEtiquette.json` | 五台山、关帝庙等宗教场所礼仪 |
| `glossary.json` | 专名翻译、搜索别名、统一英文名称 |
| `qualityCompliance.json` | 动态字段免责声明、敏感表述规则 |
| `sourcesIndex.json` | 内容来源及可追溯信息 |
| `openQuestions.json` | 上线前核验任务清单 |
| `itineraries.json` | 一日游、两日游线路 |
| `accessibilityAndFamily.json` | 家庭、老人、儿童、无障碍提示 |
| `winterNotices.json` | 冬季天气、山路、结冰等专项提醒 |
| `mock-bundle.json` | Agent 一次性分析全部数据，不建议直接作为页面唯一数据源 |
| `spot.schema.json` | 景区对象结构校验依据 |

---

## 3. 核心融合原则

### 3.1 先审项目，再落数据

禁止只看 ZIP 就直接新建一套目录、数据库表或 API。

Agent 必须先读取：

```text
AGENTS.md
CLAUDE.md
CONTEXT.md
CONTEXT-MAP.md
docs/agents/workflow.md
docs/contexts/weapp/CONTEXT.md
docs/contexts/admin/CONTEXT.md
docs/contexts/api/CONTEXT.md
```

然后检查三个端的真实结构：

```text
tourism_weapp/
tourism_admin/
tourism_api/
```

重点定位：

- 小程序景点列表、景区详情、首页推荐、文化遗产、服务页面；
- 小程序当前请求封装、静态数据和页面字段；
- 管理端现有景区 CRUD、菜单、表单和 API 文件；
- 后端现有景区实体、Controller、Service、Mapper、SQL；
- 数据库初始化脚本、字典表和逻辑删除规则。

### 3.2 调研包是“研究依据”，不是实时事实库

下列字段容易过时：

- `openTimeZh` / `openTimeEn`
- `ticketZh` / `ticketEn`
- 预约方式
- 交通管制
- 临时关闭区域
- A 级景区状态
- 英文讲解、无障碍设施等现场服务

出现 `UNVERIFIED` 的内容可以用于课程项目演示，但不能被 Agent 自动改写成“已确认事实”。

建议在数据模型中保留：

```json
{
  "verificationStatus": "UNVERIFIED",
  "verifiedAt": null,
  "sourceUrls": [],
  "noticeZh": "开放时间、票价及预约规则可能调整，请以景区当日官方公告为准。",
  "noticeEn": "Opening hours, prices and reservation rules may change. Check the attraction's official same-day notice."
}
```

### 3.3 不要把 `mock-bundle.json` 和拆分文件同时作为运行时数据源

`mock-bundle.json` 是聚合文件，适合：

- Agent 全局分析；
- 快速查看全部结构；
- 数据一致性检查；
- 生成类型、Schema 或 SQL。

运行时应优先使用拆分后的模块数据，否则容易重复维护。

### 3.4 保持引用关系稳定

以下字段相当于跨文件外键：

- `spots[].slug`
- `spotCatalog[].slug`
- `homeRecommendations[].spotSlug`
- `spotServiceLinks[].spotSlug`
- `serviceItems[].id`
- `spots[].services[]`

Agent 修改数据时必须检查：

- `spotSlug` 能否在 `spots.json` 中找到；
- `services[]` 中的 ID 是否存在；
- 首页推荐是否引用了有效景区；
- 不得随意修改已被引用的 `slug` 和 `id`。

---

## 4. 推荐的仓库归位方式

这一步是文档和研究资产归位，不等同于运行时 Mock 路径。

建议将原始研究包保存到：

```text
docs/output/reports/shanxi-scenic-mock-data/
├── prd.md
├── integration-audit.md
├── field-mapping.md
└── research/
    └── shanxi-scenic-mock-research-v1/
```

也可以保留原 ZIP：

```text
docs/output/reports/shanxi-scenic-mock-data/research/
└── shanxi-scenic-mock-research-v1.zip
```

### Windows PowerShell 解压示例

```powershell
$target = ".\docs\output\reports\shanxi-scenic-mock-data\research\shanxi-scenic-mock-research-v1"
New-Item -ItemType Directory -Force -Path $target | Out-Null
Expand-Archive `
  -Path ".\shanxi-scenic-mock-research-v1.zip" `
  -DestinationPath $target `
  -Force
```

### macOS / Linux 示例

```bash
mkdir -p docs/output/reports/shanxi-scenic-mock-data/research
unzip shanxi-scenic-mock-research-v1.zip \
  -d docs/output/reports/shanxi-scenic-mock-data/research/shanxi-scenic-mock-research-v1
```

运行时数据放在哪里，必须在完成源码审计后决定，不能仅凭本指南发明路径。

---

## 5. 推荐融合流程

## Phase 0：只读审计

目标：弄清当前模板的数据链路，不修改业务代码。

Agent 应输出：

```text
docs/output/reports/shanxi-scenic-mock-data/
├── integration-audit.md
└── field-mapping.md
```

`integration-audit.md` 至少写清：

- 景点列表页面路径；
- 景区详情页面路径；
- 首页推荐页面路径；
- 服务页面路径；
- 文化遗产页面路径；
- 页面当前数据来源；
- 请求封装位置；
- 后端景区相关模块；
- 管理端景区相关模块；
- 数据库相关表；
- 当前无法确认的问题。

`field-mapping.md` 至少包含：

| 调研字段 | 小程序现有字段 | 后端现有字段 | 管理端表单字段 | 处理方式 |
|---|---|---|---|---|
| `slug` | 待审计 | 待审计 | 待审计 | 新增 / 复用 / 转换 |
| `nameZh` | 待审计 | 待审计 | 待审计 |  |
| `nameEn` | 待审计 | 待审计 | 待审计 |  |
| `summaryZh` | 待审计 | 待审计 | 待审计 |  |
| `summaryEn` | 待审计 | 待审计 | 待审计 |  |
| `culturalNotes` | 待审计 | 待审计 | 待审计 | JSON / 子表 / 前端 Mock |
| `services` | 待审计 | 待审计 | 待审计 | ID 引用 |

审计完成后停止，等待用户确认，不直接进入大范围开发。

---

## Phase 1：决定接入模式

根据项目进度，从三种方式中选择。

### 模式 A：小程序前端 Mock 适配层

适合：

- 当前先完成页面效果；
- 后端尚未稳定；
- 课程演示优先；
- 需要快速验证中英切换和内容布局。

做法：

1. 在现有小程序数据约定下新增 Mock 数据；
2. 建立 Adapter，把调研包结构转换成页面现有 ViewModel；
3. 页面只调用统一数据服务，不直接散落 `import *.json`；
4. 后续切换真实 API 时保留相同返回结构。

推荐结构仅作示意，Agent 必须根据真实项目调整：

```text
tourism_weapp/
└── <existing-data-or-api-dir>/
    ├── scenicMock/
    │   ├── spots.json
    │   ├── serviceItems.json
    │   └── ...
    ├── scenicRepository.js
    └── scenicAdapter.js
```

### 模式 B：后端 Seed + 小程序走 API

适合：

- 后端和数据库已能启动；
- 要展示真实的三端链路；
- 管理端后续需要维护数据；
- 页面不希望依赖本地静态 JSON。

做法：

1. 读取当前实体、表结构和枚举；
2. 设计最小字段映射；
3. 生成可重复执行的 SQL seed 或 Java 初始化器；
4. 新增或复用景区查询接口；
5. 小程序调用 API；
6. 管理端只在必要时补字段。

禁止绕过现有 Snowy 模块规范另建独立后端工程。

### 模式 C：完整内容管理

适合：

- 需要管理端维护中英文内容；
- 需要上线级内容更新；
- 需要核验状态、来源和动态公告管理。

可能需要：

- 景区主表；
- 双语内容字段或本地化子表；
- 文化解读子表；
- 服务话术表；
- 景区与话术关联表；
- 来源与核验记录；
- 首页推荐配置。

此模式改动较大，必须先写 ADR/PRD，并由用户确认后实施。

---

## Phase 2：先接最小闭环

推荐最小闭环顺序：

1. 景区列表；
2. 景区详情；
3. 中英文切换；
4. 首页推荐；
5. 通用服务话术；
6. 景区专属话术；
7. 文化解读；
8. 山西概况和文化遗产；
9. 路线、无障碍、冬季提醒。

先接 6 个 P0，不要一开始扩充全部 P1。

### 最小闭环的数据集合

```text
spotCatalog.json
spots.json
homeRecommendations.json
serviceItems.json
spotServiceLinks.json
barrierTypes.json
provinceIntro.json
qualityCompliance.json
```

---

## Phase 3：三端融合要求

### 小程序端

需要完成：

- 景点列表使用 `spotCatalog` 或从 `spots` 派生；
- 景区详情通过 `slug` 查找；
- 首页推荐通过 `spotSlug` 关联景区；
- 服务页面按 `category` 分组；
- 景区详情关联 `spotServiceLinks`；
- `culturalNotes` 形成文化解读模块；
- 支持 `zh` / `en` 语言选择；
- `UNVERIFIED` 字段显示统一免责声明；
- 图片没有合法素材时使用占位图，不下载未知版权图片。

建议建立统一接口，例如：

```js
getSpotCatalog(locale)
getSpotDetail(slug, locale)
getHomeRecommendations(locale)
getServiceItems(category, locale)
getSpotServiceItems(slug, locale)
getProvinceIntro(locale)
```

页面不要自行拼接中英文字段。

### 后端

需要完成：

- 审计现有景区实体和表；
- 优先复用当前模块；
- 为双语字段定义稳定的 API Contract；
- 支持按 `slug` 查询；
- 列表接口只返回摘要字段；
- 详情接口返回长文、文化解读和服务引用；
- 动态字段保留核验状态；
- Seed 可重复执行，不重复插入；
- 不将 `UNVERIFIED` 转成确定性状态。

推荐 API 形态仅作参考：

```text
GET /api/scenic-spots
GET /api/scenic-spots/{slug}
GET /api/scenic-spots/recommendations
GET /api/bilingual-services
GET /api/bilingual-services/spot/{slug}
GET /api/province-intro
```

必须优先服从项目现有 Controller 命名、响应包络和权限规则。

### 管理端

第一阶段不必立即做完整后台。

若实施管理端，优先支持：

- 中文名、英文名；
- 城市；
- 优先级；
- 简介与详情；
- 标签；
- 推荐排序；
- 核验状态；
- 来源 URL；
- 上下架状态。

富文本、文化解读子项、服务话术关联可以第二阶段补充。

---

## 6. 双语数据建模建议

在未确认后端模型前，不强制选择一种方案。

### 方案 1：成对字段

```json
{
  "nameZh": "云冈石窟",
  "nameEn": "Yungang Grottoes"
}
```

优点：

- 与调研包直接一致；
- 课程项目实现简单；
- 前后端容易理解。

缺点：

- 扩展更多语言不方便。

### 方案 2：语言对象

```json
{
  "name": {
    "zh-CN": "云冈石窟",
    "en": "Yungang Grottoes"
  }
}
```

优点：

- 结构统一；
- 易扩展语言。

缺点：

- 与模板现有表和表单可能不匹配。

### 决策规则

- 只做中英双语且周期较短：优先成对字段；
- 计划支持多语言并长期维护：再评估本地化子表或语言对象；
- 一旦确定，三端必须统一，并写入 ADR 或 `field-mapping.md`。

---

## 7. 调研分析 Prompt

下面的 Prompt 用于让本地 Agent 先研究 ZIP 和项目，不立即改代码。

```text
你正在处理仓库 Aafff623/tourism-master。

目标：
分析 shanxi-scenic-mock-research-v1 调研包，判断如何融入现有
tourism_weapp、tourism_admin、tourism_api 三端。

必须先读：
1. AGENTS.md
2. CLAUDE.md
3. CONTEXT.md
4. CONTEXT-MAP.md
5. docs/agents/workflow.md
6. docs/contexts/weapp/CONTEXT.md
7. docs/contexts/admin/CONTEXT.md
8. docs/contexts/api/CONTEXT.md
9. 调研包 README.md、AGENT-GUIDE.md、research-report.md
10. data/mock-bundle.json、schemas/spot.schema.json
11. data/openQuestions.json、data/qualityCompliance.json
12. sources/source-notes.md

然后只读审计源码：
- 找到小程序的景点列表、景区详情、首页推荐、景区概况、文化遗产、服务页面；
- 找到这些页面当前的数据来源和请求封装；
- 找到管理端已有的景区管理、表单和 API；
- 找到后端已有的景区实体、Controller、Service、Mapper 和数据库脚本；
- 判断当前双语/i18n能力；
- 不得猜测不存在的目录、表或 API。

输出：
1. docs/output/reports/shanxi-scenic-mock-data/integration-audit.md
2. docs/output/reports/shanxi-scenic-mock-data/field-mapping.md
3. 推荐采用：前端 Mock、后端 Seed，还是完整内容管理
4. 第一阶段最小改动清单
5. 风险、未验证项和需要用户拍板的问题

此阶段禁止修改业务代码、数据库和依赖。
完成后给出 Review 说明并停止。
```

---

## 8. 研究补全 Prompt

用于核验动态字段或补充 P1 景区，不用于无来源扩写。

```text
请基于 shanxi-scenic-mock-research-v1 中的：
- data/openQuestions.json
- data/sourcesIndex.json
- sources/source-notes.md
- data/qualityCompliance.json

执行一次“数据核验缺口分析”。

规则：
1. 稳定事实优先使用 UNESCO、国家文物局、政府或景区官方来源。
2. 开放时间、票价、预约、交通管制、临时关闭属于动态信息。
3. 无法确认时保留 UNVERIFIED，不得自行补成确定事实。
4. 不要使用旅游聚合站作为唯一依据。
5. 英文面向外国游客，自然表达，不逐字机翻。
6. 图片只记录检索入口、许可和署名要求，不下载版权不明素材。
7. 每次变更记录 sourceUrl、verifiedAt、confidence 和变更原因。
8. 不要直接修改运行时数据，先输出核验报告供 Review。

输出：
- verified-data-report.md
- proposed-data-patch.json
- unresolved-questions.md
```

---

## 9. 小程序 Mock 接入 Prompt

只在用户确认采用“前端 Mock 适配层”后使用。

```text
根据已确认的 integration-audit.md 和 field-mapping.md，
将山西景区调研数据以“最小侵入的前端 Mock 适配层”接入 tourism_weapp。

约束：
1. 先遵守项目现有目录、模块和请求封装，不另起一套架构。
2. 不允许页面直接散落读取多个 JSON。
3. 建立统一 Repository/Adapter，向页面返回稳定 ViewModel。
4. 第一阶段只接 6 个 P0 景区。
5. 实现：
   - 景点列表
   - 景区详情
   - 首页推荐
   - 中英文切换
   - 通用服务话术
   - 景区专属话术
   - 文化解读
   - 动态字段免责声明
6. 保证 spotSlug、service id 引用完整。
7. 不使用版权不明的线上图片；缺图时使用项目已有占位素材。
8. 不改变现有页面公共接口，除非 field-mapping.md 已批准。
9. 增加最小回归检查：
   - 6 个 slug 均能打开详情
   - 中英字段不为空
   - 首页推荐无悬空引用
   - 服务话术分组正确
   - UNVERIFIED 提示可见
10. 完成后更新 handoff 和 commit-history，但未经用户确认不得 commit。

交付时说明：
- 做了什么
- 改了哪些文件
- 如何运行
- Review 重点
- 未完成与风险
```

---

## 10. 后端 Seed 接入 Prompt

只在后端实体和表结构已经审计后使用。

```text
根据 integration-audit.md、field-mapping.md 和已批准的数据模型，
把 shanxi-scenic-mock-research-v1 转换为 tourism_api 可重复执行的 Seed。

必须先确认：
- 当前景区相关表名
- 主键策略
- Snowy 模块归属
- 逻辑删除字段
- 创建人/创建时间字段
- JSON 字段支持情况
- 接口响应包络
- 数据库类型和字符集

实施规则：
1. 不新建第二套后端工程。
2. 优先复用现有景区模块。
3. Seed 必须幂等，重复执行不能重复插入。
4. 以 slug 或业务唯一键判定数据。
5. 不把 mock-bundle.json 整体塞入单个数据库字段。
6. 列表和详情数据分层返回。
7. culturalNotes、services 的存储方案必须与已批准设计一致。
8. UNVERIFIED 信息保留状态和免责声明。
9. sources 和 verifiedAt 可暂不暴露给前端，但不能丢失。
10. 生成最小测试或验证脚本。

输出：
- 数据库改动说明
- Seed 文件
- API Contract
- 回滚方法
- 验证结果
- Review 重点

未经用户确认，不执行破坏性迁移，不自动提交。
```

---

## 11. 管理端融合 Prompt

```text
在后端数据模型和 API Contract 已批准的前提下，
为 tourism_admin 补充山西景区双语内容管理能力。

第一阶段只实现：
- 中文名 / 英文名
- 城市
- P0/P1 优先级
- 中文简介 / 英文简介
- 标签
- 推荐排序
- 上下架状态
- 核验状态
- 来源 URL

要求：
1. 复用现有 Ant Design Vue、表单、表格和 API 约定。
2. 不重新实现 Snowy 已有通用组件。
3. 对英文必填、slug 唯一、来源 URL 格式做校验。
4. UNVERIFIED 状态必须清晰显示。
5. 不将票价和开放时间当作永久稳定字段。
6. 不做与当前 MVP 无关的复杂工作流。
7. 保持现有公共接口稳定。
8. 提供列表、编辑、新增和只读预览的回归检查。

完成后进入 awaiting-review，禁止自动 commit。
```

---

## 12. Review / Codex 审查 Prompt

```text
请审查本次山西景区 Mock 数据融合改动，不要只检查语法。

重点检查：
1. 是否遵守 AGENTS.md、CLAUDE.md 和 PRD 门禁。
2. 是否在未审计源码前发明目录、表、接口或依赖。
3. 小程序页面是否直接耦合原始 JSON。
4. 数据 Adapter/API Contract 是否稳定。
5. 双语字段是否完整，英文是否出现明显机翻或字段错配。
6. spotSlug、service id 是否有悬空引用。
7. mock-bundle 与拆分 JSON 是否被重复加载。
8. UNVERIFIED 是否被错误展示为已核验事实。
9. 开放时间、票价等动态字段是否有免责声明。
10. 是否引入版权不明确的图片。
11. Seed 是否幂等。
12. 是否破坏现有模板公共接口。
13. 是否缺少关键回归检查。
14. 是否存在过度设计，尤其是为了 Mock 数据重构整个项目。

请按以下格式输出：
- Blocking issues
- High-risk issues
- Medium/low issues
- Verified strengths
- Missing tests
- Recommended minimal fixes

不要直接修改代码，先给审查结论。
```

---

## 13. 一次性总控 Prompt

这段可以直接连同 ZIP 和本指南一起交给本地 Agent。

```text
你负责把 shanxi-scenic-mock-research-v1 融入当前
Aafff623/tourism-master 项目。

你的角色是“分析与实施 Agent”，不是自由重构者。

工作顺序：
1. 读取项目规则和三端 CONTEXT。
2. 解压并阅读调研包。
3. 审计小程序、管理端、后端的真实数据链路。
4. 输出 integration-audit.md 和 field-mapping.md。
5. 给出前端 Mock / 后端 Seed / 完整内容管理三种方式的判断。
6. 推荐一个最小可行方案。
7. 等用户确认后，再进入实施。
8. 实施时先完成 6 个 P0 的列表、详情、中英切换、推荐和服务话术闭环。
9. 所有动态字段保留 UNVERIFIED 和免责声明。
10. 完成后执行回归检查，更新 handoff 和 commit-history，进入 awaiting-review。
11. 未经用户明确同意，不 commit、不做破坏性数据库迁移。

硬约束：
- 不发明 API、目录、表和依赖。
- 不原样复制 mock-bundle.json 作为生产数据。
- 不把调研内容宣传成实时官方信息。
- 不使用版权不明图片。
- 不一次性重构三端。
- 不扩大为通用 OTA。
- 不跳过 Review 门禁。

第一轮只做只读审计和融合方案，不修改业务代码。
```

---

## 14. 验收清单

### 数据

- [ ] 6 个 P0 景区均存在；
- [ ] `slug` 全局唯一；
- [ ] 首页推荐引用有效；
- [ ] 景区专属话术引用有效；
- [ ] `spots[].services[]` 无悬空 ID；
- [ ] 中文和英文核心字段非空；
- [ ] `UNVERIFIED` 没有被删除或伪装成已核验；
- [ ] 来源 URL 和免责声明保留。

### 小程序

- [ ] 景点列表可显示；
- [ ] 点击列表可进入正确详情；
- [ ] 中英切换不串字段；
- [ ] 首页推荐排序正确；
- [ ] 服务条目能按分类展示；
- [ ] 景区专属话术能按 `slug` 过滤；
- [ ] 文化解读不会显示原始对象或 JSON；
- [ ] 缺图时页面不崩溃。

### 后端

- [ ] API Contract 已记录；
- [ ] Seed 幂等；
- [ ] 中文字符编码正常；
- [ ] 列表和详情字段分层；
- [ ] 动态字段状态保留；
- [ ] 迁移可回滚；
- [ ] 不破坏现有登录、权限和响应包络。

### 管理端

- [ ] 中英字段可编辑；
- [ ] `slug` 唯一校验；
- [ ] 核验状态可见；
- [ ] 推荐排序可控；
- [ ] 来源 URL 可保存；
- [ ] 未增加 MVP 不需要的复杂审批流。

### 流程

- [ ] 有 PRD 或已确认的实施说明；
- [ ] 有 handoff；
- [ ] 有 Review 说明；
- [ ] 有回归记录；
- [ ] 未经用户确认没有自动 commit。

---

## 15. Agent 最终应交付的文件

第一阶段：

```text
docs/output/reports/shanxi-scenic-mock-data/
├── prd.md
├── integration-audit.md
└── field-mapping.md
```

实施阶段：

```text
docs/output/handoff/shanxi-scenic-mock-data/
├── weapp-mock-integration.md
├── api-seed-integration.md
└── admin-content-integration.md
```

最终代码文件由真实源码审计结果决定，本指南不预设虚假的精确路径。

---

## 16. 最终判断标准

融合成功不等于“把 JSON 复制进项目”。

真正的完成标准是：

1. 调研数据与现有页面、接口、表结构之间有明确映射；
2. 小程序通过稳定的 Repository 或 API 获取数据；
3. 中英双语与文化解读成为产品能力，而不是散落文案；
4. 动态信息有核验状态和免责声明；
5. 本地 Agent 后续可以从 `openQuestions` 和 `sourcesIndex` 继续维护；
6. 从前端 Mock 切到后端真实数据时，不需要重写所有页面；
7. 整个改动遵守项目现有的 PRD、handoff、Review 和 commit 门禁。

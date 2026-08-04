# 山西景区双语 Mock 数据调研包 v1

生成日期：2026-07-10

这是给 `Aafff623/tourism-master` 本地 Agent 使用的研究型 Mock 数据包，覆盖：

- 12 个候选景区：6 个 P0 + 6 个 P1
- 6 个 P0 景区完整中英双语详情
- 9 类跨文化体验障碍
- 18 条通用双语服务话术
- 18 条景区专属话术
- 首页推荐、山西概况、文化遗产去重策略
- 专名表、来源索引、待人工核验问题
- 一日/两日路线、无障碍与家庭提示、冬季提醒
- JSON Schema 与单文件整包 `mock-bundle.json`

## P0 景区

1. 云冈石窟 / Yungang Grottoes
2. 五台山 / Mount Wutai
3. 平遥古城 / Ancient City of Ping Yao
4. 晋祠 / Jinci Temple
5. 黄河壶口瀑布（山西侧） / Hukou Waterfall of the Yellow River (Shanxi Side)
6. 悬空寺 / Hanging Temple

## 数据可信度

- UNESCO 遗产名称、入选信息和核心价值：优先采用 UNESCO。
- A 级、票价、开放时间、预约、交通管制：属于动态字段，包内以 `UNVERIFIED` 和区间表达。
- 图片链接仅用于素材检索，必须逐图检查许可和署名。
- 这是 Mock 与研发依据，不应被当成实时运营数据直接发布。

## 目录

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
├── schemas/spot.schema.json
├── extras/
│   ├── itineraries.json
│   ├── accessibilityAndFamily.json
│   └── winterNotices.json
└── sources/source-notes.md
```

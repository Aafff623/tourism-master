# CONTEXT — weapp

> 父级产品域 → 根 [`CONTEXT.md`](../../../CONTEXT.md) · 地图 → [`CONTEXT-MAP.md`](../../../CONTEXT-MAP.md)

## 范围

`tourism_weapp/`：UniApp 微信小程序用户端。二次开发主战场——山西景区介绍与双语展示。

## 现状模块（模板）

| 模块 | 路径线索 | 说明 |
|---|---|---|
| 首页 | `pages/home/` | 动态、推荐、概况入口 |
| 景点 | `pages/spot/` | 列表、详情、预约相关页 |
| 攻略 | `pages/strategy/` | 攻略列表/详情 |
| 服务 | `pages/service/` | 服务聚合 |
| 用户 | `pages/user/` | 用户中心 |
| API 封装 | `api/*.js` | 对接后端 client 接口 |

## 本端约定

1. 页面与路由以 `pages.json` 为准；新增页面须同步注册。
2. 网络请求走现有 `api/` 封装，不散落裸 `uni.request`（特殊情况须在 handoff 说明）。
3. 双语切换：UI 文案与景区内容字段分离；内容字段读后端/Mock 的 zh/en，界面壳文案可先用简单字典。
4. 样式沿用 ColorUI / uni.scss 体系时保持一致，避免另起一套设计系统 unless ADR。
5. 用 HBuilderX 或等价工具发微信开发者工具预览；勿提交 `unpackage/` 构建产物（见 `.gitignore`）。

## 二次开发关注点

- 景点详情页的双语正文、文化解读区块
- 语言切换入口（全局或页内）
- 山西 Mock 景区列表与详情数据契约与 `api` context 对齐
- **模式 A（已确认）**：`tourism_weapp/mock/scenic/` + `services/scenicRepository.js` / `scenicAdapter.js`；主链路游客可浏览；跳转用 `slug`；首页「景区热点」
- 页面禁止直接散落 `import` 多个 scenic JSON；统一走 Repository
- 详情保留订票/评论（原 API 鉴权不变）
- Cursor 斜杠命令：`/deliver`、`/archive`（`.cursor/skills/`）
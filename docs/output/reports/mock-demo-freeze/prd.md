# PRD — 同学演示 Mock 冻结（mock-demo-freeze）

```yaml
theme: mock-demo-freeze
epic-issue: null
status: approved
related:
  - shanxi-bilingual-mvp
  - local-backend-bootstrap
date: 2026-07-10
adr: ADR-0003
approved-note: 2026-07-10 用户确认开始实施
```

## 背景

同学需要一次**轻量、可演示**的山西文旅双语小程序展示，需求复杂度低：微信里能看到景区内容、图片与简单流程即可。

仓库已具备 Mode B（真 API + 库表）与本机 bootstrap，但对「随手演示」过重：依赖 JDK、MySQL、Redis、局域网 IP，失败面大。

用户决策（2026-07-10）：

- **先以 Mock 为主**完成演示；权限与流程从简。
- 演示结束后，本人**另开分支**再探索 Mock → 真数据，作为个人全流程积累。
- 管理端 Vercel、公网云主机等**全部后置**。

决策记录见 [`../../../adr/0003-mock-first-demo-freeze.md`](../../../adr/0003-mock-first-demo-freeze.md)。

## 目标

1. 微信开发者工具（或真机预览）**不启后端**即可演示双语主链路。  
2. 核心页面数据来自 `tourism_weapp/mock/scenic/`，行为稳定、可重复。  
3. Mode B / bootstrap 资产**保留且文档标明后置**，避免误删、误强制依赖。  
4. 为「演示后个人分支换真数据」留清晰分界（开关 / 分支约定）。

## 用户与场景

| 角色 | 场景 |
|---|---|
| 同学（演示者） | 打开小程序 → 切中/英 → 看热点/列表/详情/服务/概况/遗产 |
| 观众 | 理解「山西景区 + 双语服务」产品叙事，不追问后台与支付 |
| 本人（后置） | 演示结束后开分支接 Mode B，积累全流程 |

## 范围

### 做

| ID | 能力 | 说明 |
|---|---|---|
| D1 | Mock-only 运行时 | Repository 默认只读 Mock（或 `USE_MOCK` 默认 true）；演示不依赖 API |
| D2 | 演示主链路验收 | 首页热点、景区列表/详情、服务话术、概况、遗产；中英切换 |
| D3 | 文档对齐 | README / CONTEXT / 路线图写明「演示 = Mock」；Mode B 标为后置 |
| D4 | 权限从简 | 游客主链路免登录；管理端不纳入演示验收 |
| D5 | 资产冻结说明 | Wave 2 代码与 `tourism_api/sql/` 保留；不在本主题删除 |

### 不做

- 公网部署、Vercel、云主机、HTTPS 合法域名
- 复杂账号权限 / 生产密钥体系
- 支付、库存、核销、完整 CMS（模式 C）
- 强制本机起 API 才能演示
- 本主题内大规模新功能（非演示阻塞项）

## 已锁定决策

| 项 | 决定 |
|---|---|
| 数据源 | Mock-only（ADR-0003） |
| Mode B | 代码保留，运行时冻结；另开分支再启用 |
| 管理端 | 演示不强制；账密可保持简单本地账号 |
| 图片 | 以 Mock/静态资源现有方案为准；缺图用占位，不阻塞演示 |
| 订票评论 | 入口可留，不验收 |

## 验收标准

- [x] 不启动 MySQL/Redis/API 时，微信开发者工具可打开小程序主链路（代码路径已 Mock-only；请按 smoke handoff 点验）
- [ ] 中 ↔ 英切换后：壳文案 + 景区名称/简介等同步变化
- [ ] 可见 ≥ 6 个 P0 景区列表与详情（含文化解读或服务话术之一）
- [ ] 首页热点、服务页、概况、遗产页有内容（Mock）
- [x] README 写明：演示用 Mock；Mode B 为后置个人分支
- [x] Repository 默认不因 API 失败而卡住（`USE_SCENIC_MOCK=true` 不发起 bilingual API）

## 任务拆分

| task | 说明 | handoff |
|---|---|---|
| weapp-mock-only-runtime | Repository 改 Mock 优先/开关默认 true；去掉演示对局域网 API 的硬依赖 | `handoff/mock-demo-freeze/weapp-mock-only-runtime.md` |
| docs-demo-alignment | README、路线图、bootstrap 文档标注演示冻结 | `handoff/mock-demo-freeze/docs-demo-alignment.md` |
| weapp-demo-smoke | 按验收清单过一遍主链路（可 checklist） | `handoff/mock-demo-freeze/weapp-demo-smoke.md` |

## 风险

| 风险 | 缓解 |
|---|---|
| 封面图缺失影响观感 | 占位图；有余力再补静态图，不扩 scope |
| 同学误以为要起后端 | README 置顶「演示只需小程序」 |
| 日后忘记 Mode B 资产 | ADR-0003 + 本 PRD related 指向 sql/README |

## 后续（演示完成后，非本 PRD 范围）

1. 开分支启用 Mode B（恢复 API 优先）。  
2. 本机/云主机联调；再考虑管理端 Vercel 与权限加固。  
3. 另立 theme/PRD，不在本冻结主题内实施。

## 参考

- [`../../../adr/0003-mock-first-demo-freeze.md`](../../../adr/0003-mock-first-demo-freeze.md)
- [`../shanxi-bilingual-mvp/prd.md`](../shanxi-bilingual-mvp/prd.md)
- [`../local-backend-bootstrap/prd.md`](../local-backend-bootstrap/prd.md)
- [`analysis.md`](analysis.md)

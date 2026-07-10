# ADR-0003: Mock-first classmate demo; Mode B deferred to a later branch

## Status

Accepted（2026-07-10，用户确认：同学演示优先 Mock；真数据换接另开分支）

## Context

仓库已具备：

- Wave 1：小程序双语主链路 + 本地 Mock（模式 A）
- Wave 2：`biz_spot` 双语列、游客 API、Repository「API 优先 / Mock 回退」、管理端双语表单
- 本机后端 bootstrap：Snowy 框架 SQL、超管登录、Redis 等

当前交付对象是**同学的轻量演示需求**，不是完整运营上线。用户明确：

1. **先以 Mock 为主**，流程尽量简单；微信里能看到内容、图片与主流程即可。
2. **权限与账号体系简化**（非完全不管，但不做复杂公网权限设计）。
3. **演示结束后**，本人另开分支，再把 Mock 换成真实 API/库，作为全流程小程序积累。
4. 管理端 Vercel、云主机 HTTPS 等**后置**，不阻塞本次演示。

若继续默认「API 优先」，演示依赖本机 MySQL/Redis/JDK/局域网 IP，失败面大，不符合「随手演示」目标。

## Decision

1. **演示阶段数据源 = 模式 A（Mock-only）**  
   小程序景区主链路（列表、详情、热点、服务话术、概况、遗产）**只读** `tourism_weapp/mock/scenic/`（经 Repository/Adapter）。  
   不要求演示机启动 `tourism_api` / MySQL / Redis。

2. **Mode B 代码保留、运行时冻结**  
   Wave 2 已合入的 API、DDL、Seed、管理端双语表单**保留在 `main`（或当前主干）**，作为后续资产。  
   演示阶段：Repository 改为 **Mock 优先**（或显式 `USE_MOCK=true` 开关，默认 true）；不删除 Mode B 实现。  
   ADR-0002 第 4 条「API 优先」在演示阶段**让位于本 ADR**；真数据换接时在新分支恢复 API 优先并另开增量 ADR/PRD。

3. **权限与后台**  
   - 游客主链路：不登录（延续 ADR-0001）。  
   - 管理端：本机可选；演示不强制。临时账号保持简单（如 `admin` / `123456`），不做公网权限方案。  
   - 订票/订单/评论等模板能力：可保留入口，**不验收、不依赖真后端**。

4. **分支策略（后置）**  
   同学演示完成后，另开分支（建议名：`feat/mode-b-live` 或同类）做：Mock → 真 API、公网部署、管理端加固。主干演示配置保持 Mock-first，直到该分支合并策略另定。

5. **验收口径**  
   微信开发者工具 / 真机预览：中英切换、6 个 P0 景区、热点、服务话术、概况/遗产可见；图片与文案来自 Mock。不验收：支付、库存、CMS、公网 API。

## Consequences

- 演示准备成本最低：HBuilderX / 微信开发者工具打开 `tourism_weapp` 即可。  
- 需改 Repository 默认策略并更新 README / 路线图，避免新人误以为必须起后端。  
- Mode B 与 bootstrap SQL **不废弃**，文档标注「演示冻结 / 个人积累后置」。  
- 与 ADR-0001「模式 A 先行」一致；与 ADR-0002「已实现 Mode B」不冲突——实现保留，默认运行路径回退 Mock。

## Related

- ADR-0001（模式 A、slug、游客浏览）
- ADR-0002（Mode B 列与 API；本 ADR 冻结其默认运行时优先级）
- PRD：`docs/output/reports/mock-demo-freeze/prd.md`

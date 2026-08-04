# 分析 — 为何演示阶段改回 Mock-first

> theme: `mock-demo-freeze`  
> 配套：[`prd.md`](prd.md)、[`ADR-0003`](../../../adr/0003-mock-first-demo-freeze.md)

## 1. 需求本质

| 维度 | 同学演示 | 个人全流程积累 |
|---|---|---|
| 目标 | 微信里能看懂、能点通 | 真 API、库、部署、权限 |
| 复杂度 | 低 | 高 |
| 时间压力 | 随手 / 尽快可讲 | 演示后从容做 |
| 失败成本 | 起不来后端 = 演示翻车 | 可接受迭代 |

结论：当前交付应按**演示**优化，不是按**生产**优化。

## 2. 已有资产怎么用

| 资产 | 演示阶段 | 演示后分支 |
|---|---|---|
| `tourism_weapp/mock/scenic/*` | **主数据源** | 回退 / 对照 |
| Repository + Adapter | Mock-only | 恢复 API 优先 |
| Wave 2 API / DDL / Seed | **保留不删** | 启用 |
| `tourism_api/sql` bootstrap | 文档标后置 | 本机/云联调 |
| 管理端双语表单 | 不验收 | 可选联调 |
| Vercel / 云主机 | 不做 | 再议 |

Mode B 不是白做：它是「下一阶段的半成品」，只是**默认运行路径**先回到 Mock。

## 3. 流程为何变简单

```text
演示路径（推荐）
  打开 tourism_weapp → 微信开发者工具 → 切语言 / 看景区
  （无需 MySQL / Redis / JDK / 局域网 IP）

原 Mode B 路径（后置）
  起库 → 起 Redis → 起 API → 改 DEV_URL → 再开小程序
```

权限从简：游客免登录看内容即可；不在演示里做公网账号体系。

## 4. 与既有 ADR 关系

- **ADR-0001**：模式 A 先行 —— 本阶段完全对齐。  
- **ADR-0002**：Mode B 已实现 —— **实现保留**；「API 优先」运行时被 ADR-0003 冻结。  
- **local-backend-bootstrap**：对本机开发仍有价值；**不作为同学演示前置条件**。

## 5. 建议实施顺序（PRD 批准后）

1. `weapp-mock-only-runtime`：默认 Mock，避免静默打挂掉的 API。  
2. `docs-demo-alignment`：README 置顶「演示只需小程序」。  
3. `weapp-demo-smoke`：按验收清单过主链路。  
4. 停止扩 scope；演示通过后开分支再碰 Mode B。

## 6. 明确不做什么（防范围膨胀）

- 不为演示补全 OTA（票务/订单）
- 不为演示上 Vercel
- 不为演示重做权限模型
- 不删除 Mode B 代码「图省事」

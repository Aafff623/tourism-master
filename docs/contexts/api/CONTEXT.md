# CONTEXT — api

> 父级产品域 → 根 [`CONTEXT.md`](../../../CONTEXT.md) · 地图 → [`CONTEXT-MAP.md`](../../../CONTEXT-MAP.md)

## 范围

`tourism_api/`：基于 Snowy 的 Spring Boot 多模块后端。默认端口见 `snowy-web-app` 的 `application.properties`（模板为 `86`）。

## 模块线索

| 区域 | 说明 |
|---|---|
| `snowy-web-app` | 启动与配置 |
| `snowy-plugin/snowy-plugin-client` | 小程序侧接口（spot、strategy、order、ticket、user 等） |
| `snowy-plugin/*` | 系统、权限、业务插件 |
| MySQL | 库名模板为 `tourism`；账号仅本地配置 |
| Redis | 缓存 / 会话相关 |

## 本端约定

1. Java 8；勿擅自升到更高语言级别 unless ADR。
2. 小程序接口前缀沿用 `/client/c/...` 现有风格。
3. 持久化优先 MyBatis-Plus 现有模式；双语字段以可迁移的列或 JSON 策略二选一，选定后写 ADR。
4. 不提交 `target/`、真实生产密钥；本地 `application-*.properties` 若含密钥须 gitignore 或使用示例文件。
5. 接口变更须同步 weapp `api/` 与（如有）admin 调用方。

## 二次开发关注点

- 景区实体扩展：双语标题/正文、文化解读、服务信息
- Mock/种子数据：山西重点景区样例
- 只读双语查询接口供小程序语言切换使用

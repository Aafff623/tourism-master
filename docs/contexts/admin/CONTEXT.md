# CONTEXT — admin

> 父级产品域 → 根 [`CONTEXT.md`](../../../CONTEXT.md) · 地图 → [`CONTEXT-MAP.md`](../../../CONTEXT-MAP.md)

## 范围

`tourism_admin/`：Snowy 管理端（Vue3 + Vite + Ant Design Vue），运营配置景区、内容、用户与订单等。

## 本端约定

1. 包管理以仓库内锁文件为准（现有 `pnpm-lock.yaml` → 优先 pnpm）。
2. 业务页面与路由跟随后台现有模块结构；新增「双语字段」编辑时，表单须同时维护 zh/en。
3. 调用后端管理端 API，不直连小程序 client 接口。
4. 本地环境变量使用 `.env.development` / `.env.production`；密钥不入库。
5. TypeScript / ESLint / Prettier 保持与模板一致，不无故升级大版本。

## 二次开发关注点

- 景区 CRUD 增加双语与文化解读字段
- 双语服务条目（话术/指引）的后台维护（若 PRD 纳入）
- 列表/详情预览支持按语言切换查看

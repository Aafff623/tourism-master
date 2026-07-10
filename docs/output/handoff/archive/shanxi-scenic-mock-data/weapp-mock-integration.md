# weapp-mock-integration

```yaml
theme: shanxi-scenic-mock-data
task: weapp-mock-integration
issue: null
status: done
updated: 2026-07-10
```

## 目标

按模式 A 将调研包 6 个 P0 景区以「前端 Mock 适配层」接入 `tourism_weapp`：拆分 JSON + Adapter/Repository + 引用完整性校验。页面改造在后续 handoff。

## 已完成

- 拷贝最小闭环 JSON → `tourism_weapp/mock/scenic/`（7 个拆分文件，无 bundle）
- `services/locale.js` — 语言读写（供后续壳文案与 Adapter）
- `services/scenicAdapter.js` — 调研结构 → 稳定 ViewModel（含 `*Zh/*En` 解析、占位封面、文化解读、话术合并）
- `services/scenicRepository.js` — `getSpotCatalog` / `getSpotDetail(slug)` / `getHomeHotspots` / `getServiceItems` / `getSpotServiceItems` / `validateScenicMockIntegrity`
- `services/scenicMockSmoke.js` — 控制台冒烟入口
- 引用完整性：Python 校验 **0 errors**（6 spots、home/links slug、services id 含 spot-svc-*）

## 待 Review（当前交付）

- 目录是否接受：`tourism_weapp/mock/scenic` + `tourism_weapp/services/*`
- Adapter ViewModel 是否够后续列表/详情直接用（含兼容字段 `spotName`/`openingTime`/`description`）
- `services[]` 同时解析 `serviceItems` + `spotServiceLinks` 是否符合预期
- **本 phase 未改任何页面**（home/spot/service 仍走旧 API）

## 阻塞 / 问题

- 无

## 下次（Review 通过并 commit 后）

- `weapp-locale-shell` → 再 `weapp-spot-list-detail` / `weapp-home-hotspots` / `weapp-service-phrases`

## 关联

- 产品 PRD：`docs/output/reports/shanxi-bilingual-mvp/prd.md`
- 二次开发：SD-01 / SD-02
- 路线图 Wave 1 第 1 步

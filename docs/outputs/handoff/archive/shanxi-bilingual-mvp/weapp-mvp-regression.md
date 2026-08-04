# weapp-mvp-regression

```yaml
theme: shanxi-bilingual-mvp
task: weapp-mvp-regression
issue: null
status: done
updated: 2026-07-10
depends-on: weapp-spot-list-detail, weapp-home-hotspots, weapp-service-phrases
```

## 目标

对照产品 PRD 与数据主题验收清单做回归，输出勾选结果与缺陷列表。

## 已完成

- 运行 `docs/outputs/prd/shanxi-bilingual-mvp/wave1-regression-check.py`
- 结果：`SUMMARY spots=6 p0=6 home=6 services=18 links=18`，`ERRORS 0`，`OK`
- 覆盖检查：
  - 引用完整性（home / links / services id）
  - 6 P0 中英核心字段非空 + culturalNotes
  - 页面接入 Repository（home/spot/detail/service）
  - 列表不再 `getspotbook`；首页热点不再 `getredspot`
  - 详情保留 `getticket` / `getcomment` 钩子
  - Adapter 使用 `/static/images/empty.png` 占位
  - qualityCompliance 中英免责声明存在
- 产品 PRD §验收标准已全部勾选（附自动化依据说明）
- 用户确认通过（2026-07-10）

## 待 Review（当前交付）

- 无（已通过）

## 缺陷列表

- 无 blocking / high

## 已知非缺陷（预期）

- Mock slug 下订票票种/评论通常为空（API 失败静默）
- 攻略 / 美食推荐等模板页未纳入 MVP 验收
- 模式 B/C 未启动

## 阻塞 / 问题

- 无

## 下次

- 可选：`/archive` 归档 Wave 1 handoff / reports
- Wave 2（后置）：api-seed / admin 双语 — 另开任务

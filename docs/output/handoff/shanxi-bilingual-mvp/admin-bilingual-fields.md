# admin-bilingual-fields

```yaml
theme: shanxi-bilingual-mvp
task: admin-bilingual-fields
issue: null
status: review
updated: 2026-07-10
```

## 目标

管理端景区表单可维护 slug 与中英名称/摘要/简介/开放时间/交通（SD-14 轻量）。

## 已完成

- `tourism_admin/src/views/biz/spot/form.vue` — 增加 slug、city/cityEn、spotNameEn、openingTimeEn、summary/summaryEn、descriptionEn、trafficeEn
- 后端 Add/Edit 入参已在 `api-seed-integration` 就绪，表单字段可直接提交

## 待 Review

- 字段布局是否够用（未做 bilingual_json 高级编辑，属 Wave 3）
- 保存后列表是否仍正常（依赖后端已执行 DDL）

## 阻塞 / 问题

- 未执行 DDL 的环境保存双语列会 SQL 报错

## 下次

- Wave 2 Review 通过后归档 handoff；可选 SD-15 概况/遗产另开任务

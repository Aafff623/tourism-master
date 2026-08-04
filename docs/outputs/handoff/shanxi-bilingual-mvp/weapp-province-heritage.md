# shanxi-bilingual-mvp — SD-15 概况 / 遗产

```yaml
theme: shanxi-bilingual-mvp
task: weapp-province-heritage
status: review
updated: 2026-07-10
```

## 已完成

- Mock：`provinceIntro.json`、`heritageStrategy.json` 入库 `tourism_weapp/mock/scenic/`
- Repository：`getProvinceIntro` / `getHeritageList`（按 slug 引用景区，不复制正文）
- 页面：`introduce.vue`、`heritage.vue` 接双语 + 跳转 `/pages/spot/detail?id=slug`
- 本机管理端登录账号改为 **admin** / **123456**（`05_local_admin_account.sql`）

## 待 Review

- 微信开发者工具打开「景区概况」「文化遗产」，中英切换与跳转详情

## 下次

- Review 通过后 commit；可选归档

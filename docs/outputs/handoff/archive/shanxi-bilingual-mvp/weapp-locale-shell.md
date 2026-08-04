# weapp-locale-shell

```yaml
theme: shanxi-bilingual-mvp
task: weapp-locale-shell
issue: null
status: done
updated: 2026-07-10
```

## 目标

全局 `zh`/`en` 语言偏好与壳文案字典；切换后 Tab / 首页壳文案随 locale 变化；与 Repository `getLocale()` 打通。

## 已完成

- `services/shellCopy.js` — 壳文案字典 + `t` / `getShellCopy` / `applyTabBarLocale`
- `services/locale.js` — `setLocale` 持久化、`toggleLocale`、`LOCALE_CHANGED_EVENT`、切换时刷新 Tab
- `App.vue` — `onLaunch`/`onShow` 应用 Tab 文案；`globalData.scenicLocale`
- `pages/home/home.vue` — 中/EN 切换条；导航/指南/热点区标题走 `shell.*`；API 失败时不打断游客浏览

## 待 Review（当前交付）

- 首页语言条交互与样式是否可接受
- Tab 五文案中英是否合适（攻略仍显示 Guides，本阶段不验收攻略页）
- **未改** spot 列表/详情/服务页内容（仍中文硬编码 + 旧 API）；下一 phase 接 Repository
- 首页热点数据仍来自旧 `getredspot`（Phase 3 换 Mock）

## 阻塞 / 问题

- 无

## 下次（Review 通过并 commit 后）

- `weapp-spot-list-detail` 与/或 `weapp-home-hotspots`

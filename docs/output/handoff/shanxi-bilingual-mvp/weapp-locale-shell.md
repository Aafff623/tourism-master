# weapp-locale-shell

```yaml
theme: shanxi-bilingual-mvp
task: weapp-locale-shell
issue: null
status: in-progress
updated: 2026-07-10
depends-on: weapp-mock-integration
```

## 目标

全局 `zh`/`en` 语言偏好与壳文案字典；切换后列表/详情/服务/热点消费同一 locale。

## 已完成

- （待实施）

## 待 Review（当前交付）

- 无（规划占位；实施后填写）

## 阻塞 / 问题

- 依赖 Mock Repository 就绪后联调最顺；可与 mock-integration 紧耦合推进

## 下次

- 实现语言状态（可持久化）
- 壳文案覆盖 Tab/按钮/区块标题
- 与 Adapter `locale` 入参打通

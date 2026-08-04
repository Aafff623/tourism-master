# weapp-demo-smoke

```yaml
theme: mock-demo-freeze
task: weapp-demo-smoke
status: review
updated: 2026-07-10
```

## 自动化（开发者控制台可选）

```js
import { runScenicMockSmoke } from '@/services/scenicMockSmoke.js'
console.log(runScenicMockSmoke())
```

期望：`mockOnly: true`，`catalogZhCount >= 6`，`integrity.ok === true`，概况/遗产有长度或条数。

## 微信开发者工具手工清单

- [ ] **不启** MySQL / Redis / API，仅打开 `tourism_weapp`
- [ ] 首页：热点可见；可切中/英
- [ ] 景点 Tab：≥6 个景区；点进详情有简介/文化或话术
- [ ] 服务 Tab：双语话术有内容
- [ ] 概况页：中英正文
- [ ] 遗产页：列表可点进景区详情
- [ ] 网络面板：主链路**无**对 `:86` bilingual API 的请求（Mock-only）

## 说明

订票/评论失败可忽略，不纳入演示验收。

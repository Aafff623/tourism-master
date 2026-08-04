# assets/ — 媒体与备份约定

本目录存放**文档与演示用媒体**，不放应用运行时源码（业务 `public/` / `static/` 仍归各端工程）。

## 目录

```
assets/
├── README.md                 ← 本文件
└── images/
    └── readme/               ← README 契约配图（终稿）
        ├── banner.png
        ├── features.png
        ├── architecture.png
        ├── tech-stack.png
        ├── workflow.png
        └── structure.png
```

按需再建（空槽位不要用 `.gitkeep`）：`backup/` · `images/avatar/` · `images/icon/` · `video/` · `ppt/` · `speeches/`。

## README 配图契约

| 文件 | 用途 | 状态 |
|---|---|---|
| `banner.png` | 页首横幅 3:1 | ✅ |
| `features.png` | 核心功能一览 | ✅ |
| `architecture.png` | 系统架构 | ✅ |
| `tech-stack.png` | 技术栈分层 | ✅ |
| `workflow.png` | 游客主链路 | ✅ |
| `structure.png` | 仓库目录结构 | ✅ |
| `preview-shell.png` | Preview 站壳（本仓无 Gallery，省略） | 省略 |
| `showcase-*.png` | 真机主链路相册 | 待补 |

出图 brief / prompt：`docs/output/reports/readme-diagrams/`（历史路径）；新 brief 写 `docs/outputs/prd/readme-diagrams/`。

## 模板截图

原始模板界面参考仍在仓库根 `images/`（只读参考，不代表山西终稿视觉）。Showcase 真机图验收后写入 `assets/images/readme/showcase-*.png`。

## 还原说明

若 README 配图缺失：从 git 历史恢复 `assets/images/readme/`，或按 `readme-diagram-brief.md` 重新出图后落盘同名文件。

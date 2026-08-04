# assets/ — 媒体与备份约定

本目录存放**文档与演示用媒体**，不放应用运行时源码（业务 `public/` / `static/` 仍归各端工程）。

## 目录

```
assets/
├── README.md
└── images/
    ├── readme/                 # README 契约配图 + Showcase（终稿）
    │   ├── banner.png
    │   ├── features.png
    │   ├── architecture.png
    │   ├── tech-stack.png
    │   ├── workflow.png
    │   ├── structure.png
    │   └── showcase-*.png      # 待真机截图
    └── legacy-template/        # 模板原始界面参考（非山西终稿）
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
| `showcase-home.png` | 首页景区热点 | ⏳ 待真机 |
| `showcase-spot-detail.png` | 景区详情 + 文化解读 | ⏳ 待真机 |
| `showcase-service.png` | 双语服务话术 | ⏳ 待真机 |

出图 brief / prompt：[`docs/outputs/prd/readme-diagrams/`](../docs/outputs/prd/readme-diagrams/)。  
已齐契约图**不要重生**。

## 模板截图

`assets/images/legacy-template/` 为购得模板的原始界面参考，**不是** Showcase 终稿。  
Showcase 验收后写入 `assets/images/readme/showcase-*.png`。

## 还原说明

若 README 配图缺失：从 git 历史恢复 `assets/images/readme/`，或按 `readme-diagram-brief.md` 重新出图后落盘同名文件。

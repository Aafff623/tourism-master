# scenic mock (Mode A / Demo default)

Runtime split JSON copied from:

`docs/outputs/prd/shanxi-scenic-mock-data/research/shanxi-scenic-mock-research-v1/data/`

**同学演示阶段（ADR-0003）**：小程序主链路以本目录为**唯一数据源**（`services/scenicDataSource.js` → `USE_SCENIC_MOCK=true`）。不要依赖 `tourism_api`。

Do **not** load `mock-bundle.json` here. Pages must go through `services/scenicRepository.js`.

Cover images use placeholder `/static/images/empty.png` (no unverified remote downloads).

Includes: `spotCatalog`, `spots`, `homeRecommendations`, `serviceItems`, `spotServiceLinks`, `barrierTypes`, `qualityCompliance`, `provinceIntro`, `heritageStrategy`.

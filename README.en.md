<div align="center">

# Tourism Master · Shanxi Bilingual Cultural Tourism Mini Program

*"To see a thousand miles further, ascend one story higher."* — Wang Zhihuan, *Ascending the Stork Tower* (Yongji, Shanxi)

🏔️ Shanxi spans millennia of heritage along the Yellow River — Yungang grottoes, Pingyao walls, Hukou's thunder, and the Hanging Temple in mid-air.  
Built for inbound visitors and Chinese users alike, Tourism Master delivers **scenic storytelling** and **bilingual on-site phrases** in Chinese and English — understand Shanxi first, then explore it in person.

<p>
  <a href="README.md">中文</a> · <strong>English</strong>
</p>

</div>

<p align="center">
  <img src="assets/images/readme/banner.png" alt="Tourism Master Banner" width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Wave_1-MVP_Done-brightgreen?style=for-the-badge" alt="Wave 1">
  <img src="https://img.shields.io/badge/Stack-UniApp_%7C_Vue3_%7C_Spring_Boot-blue?style=for-the-badge" alt="Stack">
  <img src="https://img.shields.io/badge/Locale-zh_%2B_en-orange?style=for-the-badge" alt="Locale">
  <img src="https://img.shields.io/badge/Demo-Mock_only-brightgreen?style=for-the-badge" alt="Demo Mock">
  <img src="https://img.shields.io/badge/Mode_B-Deferred_branch-lightgrey?style=for-the-badge" alt="Mode B deferred">
  <a href="https://github.com/Aafff623/tourism-master/stargazers"><img src="https://img.shields.io/github/stars/Aafff623/tourism-master?style=for-the-badge" alt="GitHub stars"></a>
</p>

<p align="center">
  <a href="#why-this-project">Why</a> ·
  <a href="#features">Features</a> ·
  <a href="#demo--showcase">Demo</a> ·
  <a href="#preview">Preview</a> ·
  <a href="#quick-start">Quick Start</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#roadmap">Roadmap</a> ·
  <a href="#documentation">Docs</a> ·
  <a href="#license">License</a>
</p>

---

## Why This Project

Inbound visitors touring Shanxi scenic sites often face information and communication gaps:

- Scenic introductions and wayfinding content are predominantly in Chinese; English coverage is sparse or fragmented;
- Etiquette, historical context, and cultural taboos lack accessible cross-cultural explanations;
- Ticketing inquiries, route questions, and emergency help lack reusable Chinese–English phrase pairs;
- General travel apps prioritize transactions and itineraries over helping visitors understand site culture.

Tourism Master therefore focuses on: **scenic introduction, cultural interpretation, and bilingual service**.

| Capability | Product responsibility |
|---|---|
| Scenic introduction | List and detail views: name, summary, highlights, hours, and transport overview |
| Locale preference | Global `zh` ↔ `en`; UI copy and content fields switch in sync |
| Cultural interpretation | Etiquette, historical context, and visit guidance for inbound visitors |
| Bilingual service | Shared service phrases and spot-specific phrase sets |
| Home hot spots | Entry point on the home feed for the first batch of recommended sites |
| Data integration | **Demo defaults to Mode A (Mock-only)**; Mode B code is retained; live data wiring lives on a separate branch ([ADR-0003](docs/adr/0003-mock-first-demo-freeze.md)) |

---

## Features

<p align="center">
  <img src="assets/images/readme/features.png" alt="Tourism Master core feature modules" width="80%">
</p>

| Feature | Description |
|---|---|
| **Global bilingual toggle** | Switch between Chinese and English; UI copy and scenic content fields update together |
| **Hot spots & listing** | Initial coverage: Yungang Grottoes, Mount Wutai, Pingyao Ancient City, Jinci Temple, Hukou Waterfall (Shanxi side), and Hanging Temple |
| **Scenic detail** | Summary, highlights, hours and ticket notes, transport overview, and visit tips |
| **Cultural interpretation** | Background on history, visit etiquette, and cross-cultural context |
| **Spot-specific phrases** | Ready-to-use bilingual expressions per scenic site |
| **General service phrases** | Ticketing, directions, etiquette, and emergency scenarios |
| **Dual-mode data access** | Local Mock for standalone demos; optional backend query API |

> **Scope boundary:** No real payments, inventory settlement, full itinerary planning, Japanese/Korean locales, audio guides, AR, or deep mapping. The product line remains scenic introduction and bilingual service.

---

## Demo

### Recommended demo flow

```
Switch locale → Home hot spots → Open detail → Read cultural notes / spot phrases
  → Service page for shared phrases (core path requires no login)
```

Dynamic fields (opening hours, ticket prices, etc.) carry an **UNVERIFIED** disclaimer so demo data is not mistaken for live official information.

### Showcase

This environment cannot capture WeChat DevTools screenshots. Do **not** fake product UI with generative images. Slots:

| Slot | Target path | Demo step | Status |
|---|---|---|---|
| Home hot spots | `assets/images/readme/showcase-home.png` | Locale switch → home hot spots | pending |
| Spot detail | `assets/images/readme/showcase-spot-detail.png` | Open detail → cultural notes / phrases | pending |
| Bilingual service | `assets/images/readme/showcase-service.png` | Service page shared phrases | pending |

Original template UI (not final Shanxi visuals): [`assets/images/legacy-template/`](assets/images/legacy-template/). Do **not** treat as Showcase.

---

## Preview

This repo is a **single three-end product**. There is no asset Gallery Preview site; use Showcase + the README local preview shell.

### README local preview shell

| Item | Value |
|---|---|
| Start | Repo root: `python -m http.server 8080` |
| URL | http://127.0.0.1:8080/preview-readme-en.html |
| Chinese | http://127.0.0.1:8080/preview-readme.html |
| Files | `preview-readme.html` · `preview-readme-en.html` · `preview-readme.css` · `preview-readme.js` |

Must open over HTTP (`file://` cannot `fetch` README). No port-registry; port **8080** is this repo’s convention.

### Initial scenic sites (Mock / Seed)

| Slug | Site |
|---|---|
| `yungang-grottoes` | Yungang Grottoes |
| `wutai-mountain` | Mount Wutai |
| `pingyao-ancient-city` | Pingyao Ancient City |
| `jinci-temple` | Jinci Temple |
| `hukou-waterfall` | Hukou Waterfall (Yellow River, Shanxi side) |
| `xuankong-temple` | Hanging Temple |

---

## Quick Start

### Class demo (recommended — mini program only)

Current delivery defaults to **Mock-only** ([ADR-0003](docs/adr/0003-mock-first-demo-freeze.md)): **no need** to start MySQL, Redis, or the backend.

1. Open `tourism_weapp` in HBuilderX → run in WeChat DevTools  
2. Enable “Do not verify valid domains” if the DevTools prompt appears  
3. Demo: locale switch, home hot spots, scenic list/detail, service phrases, province intro, heritage  

For live API, admin, or cloud deployment, see **Full local stack (deferred)** below. Strategy PRD: [`docs/outputs/prd/mock-demo-freeze/prd.md`](docs/outputs/prd/mock-demo-freeze/prd.md).

### Prerequisites (full stack only)

| Component | Version | Notes |
|---|---|---|
| JDK | 8+ | Spring Boot backend (optional for demo) |
| Node.js | 18+ | Admin / mini program toolchain |
| Maven | 3.6+ | Backend build (optional for demo) |
| MySQL | 8 | Backend DB (optional for demo) |
| Redis | Recent | Session / cache (optional for demo) |
| HBuilderX | Recent | Open `tourism_weapp` |
| WeChat DevTools | Recent | Mini program preview |

### Admin (`tourism_admin`, optional for demo)

```bash
git clone https://github.com/Aafff623/tourism-master.git
cd tourism-master/tourism_admin
pnpm install   # or npm / yarn
pnpm dev
```

### Full local stack (deferred — personal Mode B work)

> **Not required** for class demo. Mode B code and SQL are retained; enable per [ADR-0003](docs/adr/0003-mock-first-demo-freeze.md).

### Backend (`tourism_api`)

1. MySQL 8 + Redis (see [`tourism_api/sql/README.md`](tourism_api/sql/README.md))  
2. Import scripts **in order**: `00` → `01` (Snowy v2.0.0) → `02` (biz_spot) → Wave2 Seed → `03` (empty biz tables) → `04` (`sys_resource.visible` patch) → `05` (admin login account)  
3. On **JDK 8**: from `tourism_api`, run `mvn clean install -DskipTests`, then `mvn spring-boot:run` in `snowy-web-app` (port **86**)  
4. Default admin credentials: **admin** / **123456** (see `05_local_admin_account.sql`)

Database name and credentials: `tourism_api/snowy-web-app/src/main/resources/application.properties` (local sample only — do not commit production secrets).

Local integration notes: [`docs/outputs/prd/local-backend-bootstrap/`](docs/outputs/prd/local-backend-bootstrap/).

### Mini program (`tourism_weapp`)

Open `tourism_weapp` in HBuilderX and preview in WeChat DevTools once dependencies are ready.

**Demo default:** the scenic browsing path uses local Mock ([ADR-0003](docs/adr/0003-mock-first-demo-freeze.md)). Booking and comment entry points from the template may remain but are out of demo acceptance scope.

### Onboarding reading order

| Order | Path | Purpose |
|---|---|---|
| 1 | `README.md` / `README.en.md` | Positioning, run locally, boundaries |
| 2 | `CONTEXT.md` · `LANGUAGES.md` · `CONTEXT-MAP.md` | Terminology and multi-context map |
| 3 | `AGENTS.md` · `CLAUDE.md` | Task flow and agent discipline |
| 4 | `docs/outputs/prd/shanxi-bilingual-mvp/prd.md` | Product acceptance source of truth |
| 5 | `docs/adr/0001-bilingual-field-model.md` | Bilingual fields and `slug` navigation |
| 6 | Source + `docs/contexts/*/CONTEXT.md` | Implementation |

---

## Architecture

<p align="center">
  <img src="assets/images/readme/architecture.png" alt="System architecture" width="80%">
</p>

- **`tourism_weapp`**: UniApp mini program; Locale switching, scenic browsing, Mock Repository / API Adapter; booking and comments keep Token auth
- **`tourism_admin`**: Vue3 admin; bilingual scenic content maintenance
- **`tourism_api`**: Spring Boot / Snowy backend; MyBatis-Plus, Sa-Token, MySQL 8, Redis; Mode B Seed and query APIs
- **Data path**: Mode A local Mock for standalone demos; Mode B via API Adapter to backend data

### Tech stack

<p align="center">
  <img src="assets/images/readme/tech-stack.png" alt="Tech stack layers" width="80%">
</p>

| Layer | Stack | Path |
|---|---|---|
| Client | UniApp (Vue), WeChat mini program | `tourism_weapp/` |
| Admin | Vue3 · Vite · Ant Design Vue · TypeScript | `tourism_admin/` |
| Backend | Spring Boot 2.5 · MyBatis-Plus · Sa-Token · MySQL 8 · Redis | `tourism_api/` |

### Visitor journey

<p align="center">
  <img src="assets/images/readme/workflow.png" alt="Visitor journey flow" width="80%">
</p>

**Implementation notes:**

- Navigation key: `slug` ([ADR-0001](docs/adr/0001-bilingual-field-model.md)); paired bilingual fields exposed via Adapter as Locale-specific ViewModels
- Core browsing path is login-free; booking and comments follow template behavior without Token
- Dynamic fields marked **UNVERIFIED**; secrets and local DB / Redis / WeChat config stay out of the repo

### Repository layout

<p align="center">
  <img src="assets/images/readme/structure.png" alt="Repository structure" width="80%">
</p>

```
/
├── AGENTS.md · CLAUDE.md · CONTEXT.md · CONTEXT-MAP.md · LANGUAGES.md
├── README.md · README.en.md · preview-readme.*
├── assets/images/readme/          # diagram assets + Showcase
├── assets/images/legacy-template/ # original template screenshots
├── docs/agents/ · adr/ · contexts/ · outputs/
├── tourism_weapp/                 # UniApp mini program
├── tourism_admin/                 # Vue3 admin
└── tourism_api/                   # Spring Boot / Snowy
```

---

## Roadmap

| Phase | Status | Notes |
|---|:---:|---|
| Wave 0 — repo assets / research / ADR | ✅ | docs scaffold, Mock research pack, ADR-0001 |
| Wave 1 — demonstrable mini program loop | ✅ | locale shell, Mock, list/detail, hot spots, service phrases, regression |
| Wave 2 — three-tier data integration | ✅ | API Seed, mini program API switch, admin bilingual forms |
| Province / heritage pages (SD-15) | 🔜 | Separate task |
| Wave 3 — content ops (Mode C) | ⚪ | Requires dedicated ADR / PRD |

Timeline: [`docs/outputs/prd/shanxi-bilingual-mvp/implementation-roadmap.md`](docs/outputs/prd/shanxi-bilingual-mvp/implementation-roadmap.md).

---

## Documentation

| Document | Description |
|---|---|
| [`CONTEXT.md`](CONTEXT.md) | Product domain facts, terms, constraints |
| [`LANGUAGES.md`](LANGUAGES.md) | Shared vocabulary |
| [`CONTEXT-MAP.md`](CONTEXT-MAP.md) | Multi-context map |
| [`AGENTS.md`](AGENTS.md) · [`CLAUDE.md`](CLAUDE.md) | Agent entry and maintenance protocol |
| [`docs/README.md`](docs/README.md) | Documentation index |
| [`assets/README.md`](assets/README.md) | Media conventions |
| [`docs/outputs/prd/shanxi-bilingual-mvp/prd.md`](docs/outputs/prd/shanxi-bilingual-mvp/prd.md) | Product PRD (approved) |
| [`docs/adr/0001-bilingual-field-model.md`](docs/adr/0001-bilingual-field-model.md) | Bilingual fields and navigation key |
| [`docs/contexts/`](docs/contexts/) | Per-end CONTEXT (weapp / admin / api) |
| [`docs/outputs/prd/readme-diagrams/`](docs/outputs/prd/readme-diagrams/) | README diagram brief + prompts |
| [`docs/outputs/report/project-init/five-dimension-research.md`](docs/outputs/report/project-init/five-dimension-research.md) | project-init five-dimension research |

Task flow: GitHub Issues + `docs/outputs/`; see [`docs/agents/workflow.md`](docs/agents/workflow.md).

---

## Project origin

This project extends an existing Spring Boot + Vue3 + UniApp tourism stack. The base system provides admin, mini program, backend, and template capabilities such as booking and comments. Tourism Master refocuses that foundation on Shanxi scenic content, cross-cultural interpretation, and Chinese–English bilingual service.

The original template is an engineering baseline only; it does not define this product’s final positioning or official presentation content.

---

## License

See [`LICENSE`](LICENSE) at the repository root (carried from the template).

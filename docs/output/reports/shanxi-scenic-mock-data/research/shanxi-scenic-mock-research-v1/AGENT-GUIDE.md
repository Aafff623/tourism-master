# Agent consumption guide / Agent 使用指南

## Recommended order

1. Read `README.md` and `sources/source-notes.md`.
2. Use `data/mock-bundle.json` when one import is easier.
3. Use split JSON files when modules are loaded separately.
4. Validate `spots.json` against `schemas/spot.schema.json`.
5. Do not publish `UNVERIFIED` dynamic fields as live facts.

## Suggested module mapping

| Mini-program module | Data file |
|---|---|
| Home recommendations | `data/homeRecommendations.json` + matching objects in `data/spots.json` |
| Scenic spot list | `data/spotCatalog.json` |
| Spot details | `data/spots.json` |
| Cultural barriers / interpretation | `data/barrierTypes.json` + `spots[].culturalNotes` |
| Bilingual service phrases | `data/serviceItems.json` |
| Spot-specific phrases | `data/spotServiceLinks.json` |
| Province overview | `data/provinceIntro.json` |
| Cultural heritage page | `data/heritageStrategy.json` |
| Proper-name search / translation | `data/glossary.json` |
| Data verification backlog | `data/openQuestions.json` |
| Disclaimer and volatility policy | `data/qualityCompliance.json` |
| Routes | `extras/itineraries.json` |
| Family / accessibility | `extras/accessibilityAndFamily.json` |
| Winter notices | `extras/winterNotices.json` |

## Import recommendation

For an early frontend-only mock, copy the split JSON files into the existing mock/data directory after inspecting the actual project conventions. Do not invent a new path before checking the UniApp source. For SQL seed generation, normalize only after the backend entity and current scenic-spot tables are reviewed.

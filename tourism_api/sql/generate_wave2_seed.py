# -*- coding: utf-8 -*-
"""Generate wave2_biz_spot_bilingual_seed.sql from weapp mock spots.json."""
import hashlib
import json
import pathlib

root = pathlib.Path(__file__).resolve().parents[2]
spots = json.loads((root / "tourism_weapp/mock/scenic/spots.json").read_text(encoding="utf-8"))
qc = json.loads((root / "tourism_weapp/mock/scenic/qualityCompliance.json").read_text(encoding="utf-8"))
home_rows = json.loads(
    (root / "tourism_weapp/mock/scenic/homeRecommendations.json").read_text(encoding="utf-8")
)
home_by_slug = {row["spotSlug"]: row for row in home_rows}


def esc(value):
    if value is None:
        return "NULL"
    return "'" + str(value).replace("\\", "\\\\").replace("'", "''") + "'"


def jesc(obj):
    return esc(json.dumps(obj, ensure_ascii=False))


def stable_id(slug):
    digest = hashlib.md5(slug.encode("utf-8")).hexdigest()
    return "9" + digest[:17]


def level_text_for_rating(level):
    if isinstance(level, dict):
        return str(level.get("zh") or "") + " " + str(level.get("en") or "")
    return str(level or "")


lines = [
    "-- Wave 2 seed: 6 P0 Shanxi spots (idempotent by slug unique index)",
    "-- Prerequisite: wave2_biz_spot_bilingual_ddl.sql",
    "SET NAMES utf8mb4;",
    "",
]

for spot in spots:
    home = home_by_slug.get(spot["slug"]) or {}
    bilingual = {
        "highlights": spot.get("highlights") or [],
        "culturalNotes": spot.get("culturalNotes") or [],
        "tags": spot.get("tags") or [],
        "services": spot.get("services") or [],
        "verificationNoticeZh": qc.get("disclaimerZh"),
        "verificationNoticeEn": qc.get("disclaimerEn"),
        "unverifiedFields": qc.get("volatileFields") or [],
        "coverImageHint": spot.get("coverImageHint") or {},
        "sources": spot.get("sources") or [],
        "researchId": spot.get("id"),
        "homeRank": home.get("rank"),
        "homeReasonZh": home.get("reasonZh"),
        "homeReasonEn": home.get("reasonEn"),
    }
    tags_zh = [tag.get("zh") for tag in (spot.get("tags") or []) if isinstance(tag, dict)]
    geo = spot.get("geo") or {}
    lat = geo.get("lat") or 0
    lng = geo.get("lng") or 0
    level = spot.get("level") or {}
    level_blob = level if isinstance(level, dict) else {"zh": str(level), "en": str(level)}
    rating_text = level_text_for_rating(level)
    if "5A" in rating_text:
        start_level = "5"
    elif "4A" in rating_text:
        start_level = "4"
    else:
        start_level = "NULL"
    spot_id = stable_id(spot["slug"])

    lines.append("-- " + spot["slug"])
    lines.append("INSERT INTO biz_spot (")
    lines.append("  id, slug, spot_name, spot_name_en, longitude, latitude, address, city, city_en,")
    lines.append("  opening_time, opening_time_en, description, description_en, summary, summary_en,")
    lines.append("  spot_tags, is_prebook, rate, start_level, level_label, traffice, traffice_en,")
    lines.append("  ticket_summary, ticket_summary_en, visit_tips, visit_tips_en, best_season, best_season_en,")
    lines.append("  bilingual_json, delete_flag, create_time")
    lines.append(") VALUES (")
    lines.append(
        "  {id}, {slug}, {name_zh}, {name_en}, {lng}, {lat}, {addr}, {city}, {city_en},".format(
            id=esc(spot_id),
            slug=esc(spot["slug"]),
            name_zh=esc(spot.get("nameZh")),
            name_en=esc(spot.get("nameEn")),
            lng=lng,
            lat=lat,
            addr=esc(spot.get("cityZh")),
            city=esc(spot.get("cityZh")),
            city_en=esc(spot.get("cityEn")),
        )
    )
    lines.append(
        "  {ot}, {ote}, {intro}, {intro_en}, {sum}, {sum_en},".format(
            ot=esc(spot.get("openTimeZh")),
            ote=esc(spot.get("openTimeEn")),
            intro=esc(spot.get("introZh")),
            intro_en=esc(spot.get("introEn")),
            sum=esc(spot.get("summaryZh")),
            sum_en=esc(spot.get("summaryEn")),
        )
    )
    lines.append(
        "  {tags}, 'notallow', 4.8, {start}, {level}, {tr}, {tre},".format(
            tags=jesc(tags_zh),
            start=start_level,
            level=jesc(level_blob),
            tr=esc(spot.get("transportZh")),
            tre=esc(spot.get("transportEn")),
        )
    )
    lines.append(
        "  {ticket}, {ticket_en}, {tips}, {tips_en}, {season}, {season_en},".format(
            ticket=esc(spot.get("ticketZh")),
            ticket_en=esc(spot.get("ticketEn")),
            tips=esc(spot.get("visitTipsZh")),
            tips_en=esc(spot.get("visitTipsEn")),
            season=esc(spot.get("bestSeasonZh")),
            season_en=esc(spot.get("bestSeasonEn")),
        )
    )
    lines.append("  {bj}, 'NOT_DELETE', NOW()".format(bj=jesc(bilingual)))
    lines.append(")")
    lines.append("ON DUPLICATE KEY UPDATE")
    lines.append("  spot_name=VALUES(spot_name), spot_name_en=VALUES(spot_name_en),")
    lines.append("  description=VALUES(description), description_en=VALUES(description_en),")
    lines.append("  summary=VALUES(summary), summary_en=VALUES(summary_en),")
    lines.append("  opening_time=VALUES(opening_time), opening_time_en=VALUES(opening_time_en),")
    lines.append("  city=VALUES(city), city_en=VALUES(city_en), level_label=VALUES(level_label),")
    lines.append("  traffice=VALUES(traffice), traffice_en=VALUES(traffice_en),")
    lines.append("  ticket_summary=VALUES(ticket_summary), ticket_summary_en=VALUES(ticket_summary_en),")
    lines.append("  visit_tips=VALUES(visit_tips), visit_tips_en=VALUES(visit_tips_en),")
    lines.append("  best_season=VALUES(best_season), best_season_en=VALUES(best_season_en),")
    lines.append("  bilingual_json=VALUES(bilingual_json), longitude=VALUES(longitude), latitude=VALUES(latitude);")
    lines.append("")

out = root / "tourism_api/sql/wave2_biz_spot_bilingual_seed.sql"
out.write_text("\n".join(lines), encoding="utf-8")
print("wrote", out, "bytes", out.stat().st_size)

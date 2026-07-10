# -*- coding: utf-8 -*-
import json
import pathlib

root = pathlib.Path(r"D:\OneDrive\Desktop\project\tourism-master")
base = root / "tourism_weapp" / "mock" / "scenic"
pages = root / "tourism_weapp" / "pages"
services = root / "tourism_weapp" / "services"

spots = json.loads((base / "spots.json").read_text(encoding="utf-8"))
catalog = json.loads((base / "spotCatalog.json").read_text(encoding="utf-8"))
home = json.loads((base / "homeRecommendations.json").read_text(encoding="utf-8"))
service_items = json.loads((base / "serviceItems.json").read_text(encoding="utf-8"))
links = json.loads((base / "spotServiceLinks.json").read_text(encoding="utf-8"))
qc = json.loads((base / "qualityCompliance.json").read_text(encoding="utf-8"))

slug_set = {s["slug"] for s in spots}
lookup = {i["id"]: i for i in service_items}
lookup.update({i["id"]: i for i in links})
errors = []

for row in home:
    if row["spotSlug"] not in slug_set:
        errors.append("home dangling " + row["spotSlug"])

for row in links:
    if row["spotSlug"] not in slug_set:
        errors.append("link dangling " + row["spotSlug"])

for spot in spots:
    for key in ["nameZh", "nameEn", "summaryZh", "summaryEn", "introZh", "introEn"]:
        if not spot.get(key):
            errors.append(spot["slug"] + " empty " + key)
    if not spot.get("culturalNotes"):
        errors.append(spot["slug"] + " no culturalNotes")
    for service_id in spot.get("services") or []:
        if service_id not in lookup:
            errors.append(spot["slug"] + " svc " + service_id)
    for suffix in ["Zh", "En"]:
        for base_key in ["name", "summary", "intro", "openTime", "ticket", "transport"]:
            if not spot.get(base_key + suffix):
                errors.append(spot["slug"] + " missing " + base_key + suffix)

p0 = [c for c in catalog if c.get("priority") == "P0" and c["slug"] in slug_set]
if len(spots) != 6:
    errors.append("spot count " + str(len(spots)))
if len(p0) != 6:
    errors.append("p0 catalog " + str(len(p0)))
if len(home) != 6:
    errors.append("hotspots " + str(len(home)))
if len(service_items) < 12:
    errors.append("services too few " + str(len(service_items)))

if not qc.get("disclaimerZh") or not qc.get("disclaimerEn"):
    errors.append("disclaimer missing")

adapter = (services / "scenicAdapter.js").read_text(encoding="utf-8")
if "/static/images/empty.png" not in adapter:
    errors.append("placeholder missing in adapter")

checks = {
    "home/home.vue": ["getHomeHotspots", "scenicRepository"],
    "spot/spot.vue": ["getSpotCatalog", "scenicRepository"],
    "spot/detail.vue": ["getSpotDetailByIdOrSlug", "scenicRepository", "culturalNotes", "verificationNotice"],
    "service/service.vue": ["getServiceItems", "scenicRepository"],
}
for rel, needles in checks.items():
    text = (pages / rel).read_text(encoding="utf-8")
    for needle in needles:
        if needle not in text:
            errors.append(rel + " missing " + needle)

spot_list = (pages / "spot/spot.vue").read_text(encoding="utf-8")
if "getspotbook" in spot_list:
    errors.append("spot still uses getspotbook")

home_page = (pages / "home/home.vue").read_text(encoding="utf-8")
if "getredspot" in home_page:
    errors.append("home still uses getredspot")

detail = (pages / "spot/detail.vue").read_text(encoding="utf-8")
if "getticket" not in detail or "getcomment" not in detail:
    errors.append("detail missing legacy ticket/comment hooks")

print("SUMMARY spots=%s p0=%s home=%s services=%s links=%s" % (
    len(spots), len(p0), len(home), len(service_items), len(links)))
print("ERRORS %s" % len(errors))
for err in errors:
    print(" - " + err)
print("OK" if not errors else "FAIL")

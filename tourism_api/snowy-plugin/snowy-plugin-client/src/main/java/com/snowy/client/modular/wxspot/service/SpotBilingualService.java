package com.snowy.client.modular.wxspot.service;

import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.snowy.biz.modular.spot.entity.Spot;
import com.snowy.biz.modular.spot.service.SpotService;
import com.snowy.client.modular.wxspot.result.BilingualSpotView;
import com.snowy.common.exception.CommonException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 将 biz_spot 双语列 + bilingual_json 组装为小程序 ViewModel。
 */
@Service
public class SpotBilingualService {

    private static final String PLACEHOLDER_COVER = "/static/images/empty.png";
    private static final String LOCALE_EN = "en";

    @Autowired
    private SpotService spotService;

    public List<BilingualSpotView> catalog(String locale) {
        String normalized = normalizeLocale(locale);
        return spotService.listBilingualSpots().stream()
                .map(spot -> toListItem(spot, normalized))
                .collect(Collectors.toList());
    }

    public BilingualSpotView detail(String slug, String locale) {
        if (StrUtil.isBlank(slug)) {
            throw new CommonException("slug 不能为空");
        }
        Spot spot = spotService.getBySlug(slug);
        if (spot == null) {
            throw new CommonException("景区不存在，slug={}", slug);
        }
        return toDetail(spot, normalizeLocale(locale));
    }

    public List<BilingualSpotView> hotspots(String locale) {
        String normalized = normalizeLocale(locale);
        return spotService.listBilingualSpots().stream()
                .map(spot -> {
                    JSONObject bilingual = parseBilingual(spot);
                    Integer rank = bilingual.getInt("homeRank");
                    if (rank == null) {
                        return null;
                    }
                    BilingualSpotView view = toListItem(spot, normalized);
                    view.setRank(rank);
                    view.setReason(pick(bilingual, "homeReason", normalized));
                    return view;
                })
                .filter(view -> view != null)
                .sorted(Comparator.comparing(BilingualSpotView::getRank, Comparator.nullsLast(Integer::compareTo)))
                .collect(Collectors.toList());
    }

    private BilingualSpotView toListItem(Spot spot, String locale) {
        JSONObject bilingual = parseBilingual(spot);
        BilingualSpotView view = new BilingualSpotView();
        view.setId(spot.getSlug());
        view.setSlug(spot.getSlug());
        view.setResearchId(bilingual.getStr("researchId"));
        String name = pickField(spot.getSpotName(), spot.getSpotNameEn(), locale);
        view.setName(name);
        view.setSpotName(name);
        view.setCoverUrl(PLACEHOLDER_COVER);
        Map<String, String> cover = new HashMap<>(2);
        cover.put("url", PLACEHOLDER_COVER);
        view.setCover(cover);
        view.setRate(spot.getRate());
        view.setStartLevel(spot.getStartLevel());
        view.setLevelLabel(resolveLevelLabel(spot.getLevelLabel(), locale));
        List<String> tags = localizeTagList(bilingual.getJSONArray("tags"), locale);
        if (tags.isEmpty() && spot.getSpotTags() != null) {
            tags = new ArrayList<>(spot.getSpotTags());
        }
        view.setTags(tags);
        view.setSpotTags(tags);
        String city = pickField(spot.getCity(), spot.getCityEn(), locale);
        view.setCity(city);
        view.setAddress(StrUtil.blankToDefault(spot.getAddress(), city));
        view.setMinPrice(null);
        view.setSummary(pickField(spot.getSummary(), spot.getSummaryEn(), locale));
        view.setPriority("P0");
        return view;
    }

    private BilingualSpotView toDetail(Spot spot, String locale) {
        BilingualSpotView view = toListItem(spot, locale);
        JSONObject bilingual = parseBilingual(spot);
        String intro = pickField(spot.getDescription(), spot.getDescriptionEn(), locale);
        view.setIntro(intro);
        view.setDescription(intro);
        view.setHighlights(localizePairList(bilingual.getJSONArray("highlights"), locale));
        String openTime = pickField(spot.getOpeningTime(), spot.getOpeningTimeEn(), locale);
        view.setOpenTime(openTime);
        view.setOpeningTime(openTime);
        view.setTicketSummary(pickField(spot.getTicketSummary(), spot.getTicketSummaryEn(), locale));
        String transport = pickField(spot.getTraffice(), spot.getTrafficeEn(), locale);
        view.setTransport(transport);
        view.setTraffice(transport);
        view.setVisitTips(pickField(spot.getVisitTips(), spot.getVisitTipsEn(), locale));
        view.setBestSeason(pickField(spot.getBestSeason(), spot.getBestSeasonEn(), locale));
        view.setCulturalNotes(adaptCulturalNotes(bilingual.getJSONArray("culturalNotes"), locale));
        view.setServiceItems(adaptServiceIds(bilingual.getJSONArray("services")));
        BilingualSpotView.GeoView geo = new BilingualSpotView.GeoView();
        geo.setLatitude(spot.getLatitude());
        geo.setLongitude(spot.getLongitude());
        geo.setPrecisionNote("");
        view.setGeo(geo);
        view.setLatitude(spot.getLatitude());
        view.setLongitude(spot.getLongitude());
        Map<String, String> image = new HashMap<>(2);
        image.put("url", PLACEHOLDER_COVER);
        image.put("name", "placeholder");
        view.setImages(Collections.singletonList(image));
        view.setVideo(Collections.emptyList());
        view.setPlat(null);
        view.setContactPhone(StrUtil.blankToDefault(spot.getContactPhone(), ""));
        view.setVerificationNotice(pick(bilingual, "verificationNotice", locale));
        JSONArray unverified = bilingual.getJSONArray("unverifiedFields");
        view.setUnverifiedFields(unverified == null ? Collections.emptyList() : unverified.toList(String.class));
        view.setCoverImageHint(bilingual.get("coverImageHint"));
        return view;
    }

    private List<BilingualSpotView.ServiceItemView> adaptServiceIds(JSONArray services) {
        if (services == null || services.isEmpty()) {
            return Collections.emptyList();
        }
        List<BilingualSpotView.ServiceItemView> list = new ArrayList<>();
        for (Object item : services) {
            BilingualSpotView.ServiceItemView row = new BilingualSpotView.ServiceItemView();
            row.setId(String.valueOf(item));
            row.setCategory("spot");
            row.setTitle(String.valueOf(item));
            row.setPhrase("");
            row.setNote("");
            list.add(row);
        }
        return list;
    }

    private List<BilingualSpotView.CulturalNoteView> adaptCulturalNotes(JSONArray notes, String locale) {
        if (notes == null || notes.isEmpty()) {
            return Collections.emptyList();
        }
        List<BilingualSpotView.CulturalNoteView> list = new ArrayList<>();
        for (Object raw : notes) {
            JSONObject note = JSONUtil.parseObj(raw);
            BilingualSpotView.CulturalNoteView row = new BilingualSpotView.CulturalNoteView();
            row.setBarrierType(note.getStr("barrierType", ""));
            row.setTitle(pick(note, "title", locale));
            row.setBody(pick(note, "body", locale));
            row.setDoText(pick(note, "do", locale));
            row.setDontText(pick(note, "dont", locale));
            list.add(row);
        }
        return list;
    }

    private List<String> localizePairList(JSONArray array, String locale) {
        if (array == null || array.isEmpty()) {
            return Collections.emptyList();
        }
        List<String> result = new ArrayList<>();
        for (Object raw : array) {
            if (raw instanceof CharSequence) {
                result.add(raw.toString());
                continue;
            }
            JSONObject obj = JSONUtil.parseObj(raw);
            String text = isEn(locale) ? firstNonBlank(obj.getStr("en"), obj.getStr("zh"))
                    : firstNonBlank(obj.getStr("zh"), obj.getStr("en"));
            if (StrUtil.isNotBlank(text)) {
                result.add(text);
            }
        }
        return result;
    }

    private List<String> localizeTagList(JSONArray tags, String locale) {
        return localizePairList(tags, locale);
    }

    private String resolveLevelLabel(String levelLabel, String locale) {
        if (StrUtil.isBlank(levelLabel)) {
            return "";
        }
        String trimmed = levelLabel.trim();
        if (trimmed.startsWith("{")) {
            JSONObject obj = JSONUtil.parseObj(trimmed);
            return isEn(locale) ? firstNonBlank(obj.getStr("en"), obj.getStr("zh"))
                    : firstNonBlank(obj.getStr("zh"), obj.getStr("en"));
        }
        return levelLabel;
    }

    private JSONObject parseBilingual(Spot spot) {
        if (spot == null || StrUtil.isBlank(spot.getBilingualJson())) {
            return new JSONObject();
        }
        try {
            return JSONUtil.parseObj(spot.getBilingualJson());
        } catch (Exception ex) {
            return new JSONObject();
        }
    }

    private String pick(JSONObject obj, String base, String locale) {
        if (obj == null) {
            return "";
        }
        if (isEn(locale)) {
            return firstNonBlank(obj.getStr(base + "En"), obj.getStr(base + "Zh"), obj.getStr(base));
        }
        return firstNonBlank(obj.getStr(base + "Zh"), obj.getStr(base + "En"), obj.getStr(base));
    }

    private String pickField(String zh, String en, String locale) {
        if (isEn(locale)) {
            return firstNonBlank(en, zh);
        }
        return firstNonBlank(zh, en);
    }

    private String firstNonBlank(String... values) {
        if (values == null) {
            return "";
        }
        for (String value : values) {
            if (StrUtil.isNotBlank(value)) {
                return value;
            }
        }
        return "";
    }

    private String normalizeLocale(String locale) {
        if (StrUtil.isBlank(locale)) {
            return "zh";
        }
        String lower = locale.trim().toLowerCase(Locale.ROOT);
        if (lower.startsWith("en")) {
            return LOCALE_EN;
        }
        return "zh";
    }

    private boolean isEn(String locale) {
        return LOCALE_EN.equals(locale);
    }
}

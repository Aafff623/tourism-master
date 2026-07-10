package com.snowy.client.modular.wxspot.result;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * 双语景区 ViewModel（对齐小程序 scenicAdapter 输出形状）
 */
@Getter
@Setter
public class BilingualSpotView {

    @ApiModelProperty("导航用 slug，同时作为 id")
    private String id;

    @ApiModelProperty("业务 slug")
    private String slug;

    @ApiModelProperty("调研包 researchId")
    private String researchId;

    private String name;
    private String spotName;
    private String coverUrl;
    private Map<String, String> cover;
    private BigDecimal rate;
    private Integer startLevel;
    private String levelLabel;
    private List<String> tags;
    private List<String> spotTags;
    private String address;
    private String city;
    private BigDecimal minPrice;
    private String summary;
    private String priority;

    private String intro;
    private String description;
    private List<String> highlights;
    private String openTime;
    private String openingTime;
    private String ticketSummary;
    private String transport;
    private String traffice;
    private String visitTips;
    private String bestSeason;
    private List<CulturalNoteView> culturalNotes;
    private List<ServiceItemView> serviceItems;
    private GeoView geo;
    private Double latitude;
    private Double longitude;
    private List<Map<String, String>> images;
    private List<Object> video;
    private Object plat;
    private String contactPhone;
    private String verificationNotice;
    private List<String> unverifiedFields;
    private Object coverImageHint;

    private Integer rank;
    private String reason;
    private String typeLabel;

    @Getter
    @Setter
    public static class CulturalNoteView {
        private String barrierType;
        private String title;
        private String body;
        private String doText;
        private String dontText;
    }

    @Getter
    @Setter
    public static class ServiceItemView {
        private String id;
        private String category;
        private String title;
        private String phrase;
        private String note;
        private String spotSlug;
    }

    @Getter
    @Setter
    public static class GeoView {
        private Double latitude;
        private Double longitude;
        private String precisionNote;
    }
}

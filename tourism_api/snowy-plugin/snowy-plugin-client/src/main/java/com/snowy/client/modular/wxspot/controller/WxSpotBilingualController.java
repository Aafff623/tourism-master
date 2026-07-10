package com.snowy.client.modular.wxspot.controller;

import com.github.xiaoymin.knife4j.annotations.ApiOperationSupport;
import com.github.xiaoymin.knife4j.annotations.ApiSupport;
import com.snowy.client.modular.wxspot.result.BilingualSpotView;
import com.snowy.client.modular.wxspot.service.SpotBilingualService;
import com.snowy.common.pojo.CommonResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 游客可读双语景区 API（需加入 NO_LOGIN_PATH_ARR）
 */
@Api(tags = "微信用户双语景区")
@ApiSupport(author = "SNOWY_TEAM", order = 4)
@RequestMapping("/client/c/spot/bilingual")
@RestController
@Validated
public class WxSpotBilingualController {

    @Autowired
    private SpotBilingualService spotBilingualService;

    @GetMapping("/catalog")
    @ApiOperationSupport(order = 1)
    @ApiOperation("双语景区目录")
    public CommonResult<List<BilingualSpotView>> catalog(
            @ApiParam("zh | en") @RequestParam(value = "locale", required = false, defaultValue = "zh") String locale) {
        return CommonResult.data(spotBilingualService.catalog(locale));
    }

    @GetMapping("/detail")
    @ApiOperationSupport(order = 2)
    @ApiOperation("双语景区详情（按 slug）")
    public CommonResult<BilingualSpotView> detail(
            @ApiParam(value = "景区 slug", required = true) @RequestParam("slug") String slug,
            @ApiParam("zh | en") @RequestParam(value = "locale", required = false, defaultValue = "zh") String locale) {
        return CommonResult.data(spotBilingualService.detail(slug, locale));
    }

    @GetMapping("/hotspots")
    @ApiOperationSupport(order = 3)
    @ApiOperation("首页景区热点（按 bilingual_json.homeRank）")
    public CommonResult<List<BilingualSpotView>> hotspots(
            @ApiParam("zh | en") @RequestParam(value = "locale", required = false, defaultValue = "zh") String locale) {
        return CommonResult.data(spotBilingualService.hotspots(locale));
    }
}

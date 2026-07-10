/**
 * Shell UI copy (chrome) for bilingual MVP.
 * Content fields come from scenicAdapter; do not put spot intros here.
 */
import { getLocale, LOCALE_EN, LOCALE_ZH, normalizeLocale } from './locale.js'

export const SHELL_COPY = {
	[LOCALE_ZH]: {
		tabHome: '首页',
		tabSpot: '景点',
		tabStrategy: '攻略',
		tabService: '服务',
		tabUser: '我的',
		langZh: '中文',
		langEn: 'EN',
		langHint: '语言',
		homeNavNews: '景区动态',
		homeNavSpot: '景点',
		homeNavRecommend: '推荐',
		homeNavHeritage: '文化遗产',
		homeGuideStrategy: '官方攻略',
		homeGuideStrategySub: '最具代表性的玩法',
		homeGuideService: '景区服务',
		homeGuideServiceSub: '双语话术与指引',
		homeHotSpots: '景区热点',
		homeHotSpotsSub: '山西重点景区精选',
		homePlanDetail: '详情',
		spotSearchPlaceholder: '搜索景区',
		spotListTitle: '山西景区',
		serviceTitle: '双语服务',
		serviceSubtitle: '现场沟通常用中英对照',
		detailCultural: '文化解读',
		detailServices: '景区话术',
		detailOpenTime: '开放时间',
		detailTicket: '门票概要',
		detailTransport: '交通',
		detailVisitTips: '参观提示',
		detailBestSeason: '适宜季节',
		detailDisclaimer: '信息说明',
		detailHighlights: '看点',
		commonDo: '建议',
		commonDont: '避免',
		emptyList: '暂无数据'
	},
	[LOCALE_EN]: {
		tabHome: 'Home',
		tabSpot: 'Spots',
		tabStrategy: 'Guides',
		tabService: 'Services',
		tabUser: 'Me',
		langZh: '中文',
		langEn: 'EN',
		langHint: 'Language',
		homeNavNews: 'Updates',
		homeNavSpot: 'Spots',
		homeNavRecommend: 'Picks',
		homeNavHeritage: 'Heritage',
		homeGuideStrategy: 'Official guides',
		homeGuideStrategySub: 'Signature itineraries',
		homeGuideService: 'Visitor services',
		homeGuideServiceSub: 'Bilingual phrases & tips',
		homeHotSpots: 'Hot spots',
		homeHotSpotsSub: 'Featured Shanxi attractions',
		homePlanDetail: 'Details',
		spotSearchPlaceholder: 'Search attractions',
		spotListTitle: 'Shanxi spots',
		serviceTitle: 'Bilingual help',
		serviceSubtitle: 'Useful Chinese–English phrases',
		detailCultural: 'Cultural notes',
		detailServices: 'On-site phrases',
		detailOpenTime: 'Hours',
		detailTicket: 'Tickets',
		detailTransport: 'Getting there',
		detailVisitTips: 'Visit tips',
		detailBestSeason: 'Best season',
		detailDisclaimer: 'Notice',
		detailHighlights: 'Highlights',
		commonDo: 'Do',
		commonDont: "Don't",
		emptyList: 'No data'
	}
}

const TAB_BAR_KEYS = ['tabHome', 'tabSpot', 'tabStrategy', 'tabService', 'tabUser']

export function t(key, locale) {
	const loc = normalizeLocale(locale || getLocale())
	const table = SHELL_COPY[loc] || SHELL_COPY[LOCALE_ZH]
	if (table[key]) {
		return table[key]
	}
	const fallback = SHELL_COPY[LOCALE_ZH][key]
	return fallback || key
}

export function getShellCopy(locale) {
	const loc = normalizeLocale(locale || getLocale())
	return Object.assign({}, SHELL_COPY[LOCALE_ZH], SHELL_COPY[loc])
}

/**
 * Update native tabBar labels for current locale.
 * Safe to call from App.onLaunch / after setLocale.
 */
export function applyTabBarLocale(locale) {
	const loc = normalizeLocale(locale || getLocale())
	TAB_BAR_KEYS.forEach((key, index) => {
		try {
			uni.setTabBarItem({
				index,
				text: t(key, loc)
			})
		} catch (error) {
			// Non-tab pages or early boot may throw; ignore.
		}
	})
}

export { TAB_BAR_KEYS }

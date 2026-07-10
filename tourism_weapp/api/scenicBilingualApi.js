/**
 * Guest bilingual scenic APIs (Mode B).
 * Paths are relative to http BASE_URL (.../client/c).
 */
import request from '@/utils/http.js'

export function fetchBilingualCatalog(locale) {
	return request({
		url: '/spot/bilingual/catalog',
		method: 'GET',
		data: { locale: locale || 'zh' },
		showLoading: false
	})
}

export function fetchBilingualDetail(slug, locale) {
	return request({
		url: '/spot/bilingual/detail',
		method: 'GET',
		data: { slug, locale: locale || 'zh' },
		showLoading: false
	})
}

export function fetchBilingualHotspots(locale) {
	return request({
		url: '/spot/bilingual/hotspots',
		method: 'GET',
		data: { locale: locale || 'zh' },
		showLoading: false
	})
}

export default {
	fetchBilingualCatalog,
	fetchBilingualDetail,
	fetchBilingualHotspots
}

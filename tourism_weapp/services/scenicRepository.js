/**
 * Scenic data access.
 * Demo default (ADR-0003): Mock-only via scenicDataSource.USE_SCENIC_MOCK.
 * Mode B branch: set USE_SCENIC_MOCK=false → API first, Mock fallback.
 */
import spotCatalog from '../mock/scenic/spotCatalog.json'
import spots from '../mock/scenic/spots.json'
import homeRecommendations from '../mock/scenic/homeRecommendations.json'
import serviceItems from '../mock/scenic/serviceItems.json'
import spotServiceLinks from '../mock/scenic/spotServiceLinks.json'
import barrierTypes from '../mock/scenic/barrierTypes.json'
import qualityCompliance from '../mock/scenic/qualityCompliance.json'
import provinceIntro from '../mock/scenic/provinceIntro.json'
import heritageStrategy from '../mock/scenic/heritageStrategy.json'
import {
	fetchBilingualCatalog,
	fetchBilingualDetail,
	fetchBilingualHotspots
} from '../api/scenicBilingualApi.js'
import { isScenicMockOnly } from './scenicDataSource.js'
import { getLocale } from './locale.js'
import {
	adaptCatalogItem,
	adaptHomeHotspot,
	adaptServiceItems,
	adaptSpotDetail,
	adaptSpotListItem,
	adaptSpotServiceLinks,
	buildServiceLookup
} from './scenicAdapter.js'

function buildSpotIndex() {
	const bySlug = Object.create(null)
	;(spots || []).forEach((spot) => {
		bySlug[spot.slug] = spot
	})
	return bySlug
}

const spotBySlug = buildSpotIndex()

function resolveLocale(locale) {
	return locale || getLocale()
}

function adapterContext() {
	return {
		serviceItems,
		spotServiceLinks,
		qualityCompliance
	}
}

function unwrapList(response) {
	if (!response) {
		return []
	}
	if (Array.isArray(response.data)) {
		return response.data
	}
	if (Array.isArray(response)) {
		return response
	}
	return []
}

function unwrapOne(response) {
	if (!response) {
		return null
	}
	if (response.data && typeof response.data === 'object') {
		return response.data
	}
	if (response.slug || response.id) {
		return response
	}
	return null
}

/** Enrich API detail service placeholders with local phrase copy. */
function enrichApiDetailServices(detail, locale) {
	if (!detail) {
		return detail
	}
	const lookup = buildServiceLookup(serviceItems, spotServiceLinks)
	const ids = (detail.serviceItems || [])
		.map((item) => (typeof item === 'string' ? item : item && item.id))
		.filter(Boolean)
	const enriched = ids
		.map((serviceId) => {
			const raw = lookup[serviceId]
			if (!raw) {
				return {
					id: serviceId,
					category: 'spot',
					title: serviceId,
					phrase: '',
					note: '',
					spotSlug: detail.slug || null
				}
			}
			const loc = resolveLocale(locale)
			const isEn = loc === 'en'
			return {
				id: raw.id,
				category: raw.category || 'spot',
				title: isEn ? raw.titleEn || raw.titleZh : raw.titleZh || raw.titleEn,
				phrase: isEn ? raw.phraseEn || raw.phraseZh : raw.phraseZh || raw.phraseEn,
				note: isEn ? raw.noteEn || raw.noteZh : raw.noteZh || raw.noteEn,
				spotSlug: raw.spotSlug || detail.slug || null
			}
		})
		.filter(Boolean)
	return {
		...detail,
		serviceItems: enriched
	}
}

/** P0 spots only (full detail objects in spots.json). Sync mock path. */
export function getSpotCatalogSync(locale, options = {}) {
	const loc = resolveLocale(locale)
	const includeP1 = options.includeP1 === true
	const rows = (spotCatalog || []).filter((row) => {
		if (includeP1) {
			return true
		}
		return row.priority === 'P0' && !!spotBySlug[row.slug]
	})
	return rows.map((row) => adaptCatalogItem(row, loc, spotBySlug))
}

export function getSpotDetailSync(slug, locale) {
	const loc = resolveLocale(locale)
	const spot = spotBySlug[slug]
	if (!spot) {
		return null
	}
	return adaptSpotDetail(spot, loc, adapterContext())
}

export function getSpotDetailByIdOrSlugSync(idOrSlug, locale) {
	if (!idOrSlug) {
		return null
	}
	if (spotBySlug[idOrSlug]) {
		return getSpotDetailSync(idOrSlug, locale)
	}
	const found = (spots || []).find((spot) => spot.id === idOrSlug)
	if (found) {
		return getSpotDetailSync(found.slug, locale)
	}
	return null
}

export function getHomeHotspotsSync(locale) {
	const loc = resolveLocale(locale)
	return (homeRecommendations || [])
		.slice()
		.sort((a, b) => (a.rank || 0) - (b.rank || 0))
		.map((row) => adaptHomeHotspot(row, loc, spotBySlug))
}

/** Async: Mock-only when USE_SCENIC_MOCK; else API first, mock fallback. */
export async function getSpotCatalog(locale, options = {}) {
	const loc = resolveLocale(locale)
	if (isScenicMockOnly()) {
		return getSpotCatalogSync(loc, options)
	}
	try {
		const response = await fetchBilingualCatalog(loc)
		const list = unwrapList(response)
		if (list.length) {
			return list
		}
	} catch (err) {
		console.warn('[scenicRepository] catalog API failed, using mock', err)
	}
	return getSpotCatalogSync(loc, options)
}

export async function getSpotDetail(slug, locale) {
	const loc = resolveLocale(locale)
	if (!slug) {
		return null
	}
	if (isScenicMockOnly()) {
		return getSpotDetailSync(slug, loc)
	}
	try {
		const response = await fetchBilingualDetail(slug, loc)
		const detail = unwrapOne(response)
		if (detail) {
			return enrichApiDetailServices(detail, loc)
		}
	} catch (err) {
		console.warn('[scenicRepository] detail API failed, using mock', err)
	}
	return getSpotDetailSync(slug, loc)
}

export async function getSpotDetailByIdOrSlug(idOrSlug, locale) {
	if (!idOrSlug) {
		return null
	}
	if (spotBySlug[idOrSlug]) {
		return getSpotDetail(idOrSlug, locale)
	}
	const found = (spots || []).find((spot) => spot.id === idOrSlug)
	if (found) {
		return getSpotDetail(found.slug, locale)
	}
	if (isScenicMockOnly()) {
		return null
	}
	// May be a DB numeric/string id unknown to mock — try API with value as slug first
	return getSpotDetail(idOrSlug, locale)
}

export async function getHomeHotspots(locale) {
	const loc = resolveLocale(locale)
	if (isScenicMockOnly()) {
		return getHomeHotspotsSync(loc)
	}
	try {
		const response = await fetchBilingualHotspots(loc)
		const list = unwrapList(response)
		if (list.length) {
			return list
		}
	} catch (err) {
		console.warn('[scenicRepository] hotspots API failed, using mock', err)
	}
	return getHomeHotspotsSync(loc)
}

export function getServiceItems(locale, category) {
	return adaptServiceItems(serviceItems, resolveLocale(locale), category)
}

export function getSpotServiceItems(slug, locale) {
	return adaptSpotServiceLinks(spotServiceLinks, resolveLocale(locale), slug)
}

export function getBarrierTypes(locale) {
	const loc = resolveLocale(locale)
	return (barrierTypes || []).map((item) => ({
		id: item.id,
		name: loc === 'en' ? item.nameEn || item.nameZh : item.nameZh || item.nameEn,
		manifestation:
			loc === 'en'
				? item.manifestationEn || item.manifestationZh
				: item.manifestationZh || item.manifestationEn,
		mitigation:
			loc === 'en' ? item.mitigationEn || item.mitigationZh : item.mitigationZh || item.mitigationEn
	}))
}

export function getVerificationNotice(locale) {
	const loc = resolveLocale(locale)
	return loc === 'en' ? qualityCompliance.disclaimerEn : qualityCompliance.disclaimerZh
}

export function getQualityCompliance() {
	return qualityCompliance
}

/** Province overview copy (SD-15). Mock-only for now. */
export function getProvinceIntro(locale) {
	const loc = resolveLocale(locale)
	const body =
		loc === 'en'
			? (provinceIntro && (provinceIntro.en || provinceIntro.zh)) || ''
			: (provinceIntro && (provinceIntro.zh || provinceIntro.en)) || ''
	return {
		locale: loc,
		body: body
	}
}

/**
 * Heritage list via heritageStrategy (SD-15): reference spotSlug, no duplicated body.
 * Enriches cover/name from catalog / spots when available.
 */
export function getHeritageList(locale) {
	const loc = resolveLocale(locale)
	const catalogBySlug = Object.create(null)
	;(spotCatalog || []).forEach((row) => {
		catalogBySlug[row.slug] = row
	})
	const items = ((heritageStrategy && heritageStrategy.items) || [])
		.map((row) => {
			const slug = row.spotSlug
			const catalog = catalogBySlug[slug]
			const spot = spotBySlug[slug]
			const adapted = catalog
				? adaptCatalogItem(catalog, loc, spotBySlug)
				: spot
					? adaptSpotListItem(spot, loc)
					: null
			return {
				slug: slug,
				heritageLabel:
					loc === 'en'
						? row.heritageLabelEn || row.heritageLabelZh
						: row.heritageLabelZh || row.heritageLabelEn,
				name: adapted ? adapted.name : slug,
				city: adapted ? adapted.city : '',
				coverUrl: adapted ? adapted.coverUrl : '',
				tags: adapted ? adapted.tags || [] : [],
				hasDetail: !!adapted
			}
		})
		.filter((item) => item.slug)
	const rule =
		loc === 'en'
			? (heritageStrategy && (heritageStrategy.ruleEn || heritageStrategy.ruleZh)) || ''
			: (heritageStrategy && (heritageStrategy.ruleZh || heritageStrategy.ruleEn)) || ''
	return {
		locale: loc,
		rule: rule,
		items: items
	}
}

/**
 * Reference integrity for research pack ↔ runtime mock.
 * Returns { ok, errors[] }.
 */
export function validateScenicMockIntegrity() {
	const errors = []
	const slugSet = new Set((spots || []).map((s) => s.slug))
	const serviceLookup = buildServiceLookup(serviceItems, spotServiceLinks)

	;(homeRecommendations || []).forEach((row) => {
		if (!slugSet.has(row.spotSlug)) {
			errors.push('homeRecommendations missing spot: ' + row.spotSlug)
		}
	})

	;(spotServiceLinks || []).forEach((row) => {
		if (!slugSet.has(row.spotSlug)) {
			errors.push('spotServiceLinks missing spot: ' + row.spotSlug)
		}
	})

	;(spots || []).forEach((spot) => {
		const required = ['nameZh', 'nameEn', 'summaryZh', 'summaryEn', 'introZh', 'introEn']
		required.forEach((key) => {
			if (!spot[key]) {
				errors.push(spot.slug + ' empty ' + key)
			}
		})
		;(spot.services || []).forEach((serviceId) => {
			if (!serviceLookup[serviceId]) {
				errors.push(spot.slug + ' dangling service id: ' + serviceId)
			}
		})
	})

	if ((spots || []).length < 6) {
		errors.push('expected at least 6 P0 spots, got ' + (spots || []).length)
	}

	return {
		ok: errors.length === 0,
		errors,
		spotCount: (spots || []).length,
		serviceItemCount: (serviceItems || []).length,
		hotspotCount: (homeRecommendations || []).length
	}
}

export default {
	getSpotCatalog,
	getSpotDetail,
	getSpotDetailByIdOrSlug,
	getHomeHotspots,
	getSpotCatalogSync,
	getSpotDetailSync,
	getSpotDetailByIdOrSlugSync,
	getHomeHotspotsSync,
	getServiceItems,
	getSpotServiceItems,
	getBarrierTypes,
	getVerificationNotice,
	getQualityCompliance,
	getProvinceIntro,
	getHeritageList,
	validateScenicMockIntegrity
}

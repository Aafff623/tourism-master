/**
 * Scenic data access for Mode A (frontend mock).
 * Swap implementation later for API without changing page ViewModels.
 */
import spotCatalog from '../mock/scenic/spotCatalog.json'
import spots from '../mock/scenic/spots.json'
import homeRecommendations from '../mock/scenic/homeRecommendations.json'
import serviceItems from '../mock/scenic/serviceItems.json'
import spotServiceLinks from '../mock/scenic/spotServiceLinks.json'
import barrierTypes from '../mock/scenic/barrierTypes.json'
import qualityCompliance from '../mock/scenic/qualityCompliance.json'
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

/** P0 spots only (full detail objects in spots.json). */
export function getSpotCatalog(locale, options = {}) {
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

export function getSpotDetail(slug, locale) {
	const loc = resolveLocale(locale)
	const spot = spotBySlug[slug]
	if (!spot) {
		return null
	}
	return adaptSpotDetail(spot, loc, adapterContext())
}

/** Alias for pages that still pass option.id (may be slug string). */
export function getSpotDetailByIdOrSlug(idOrSlug, locale) {
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
	return null
}

export function getHomeHotspots(locale) {
	const loc = resolveLocale(locale)
	return (homeRecommendations || [])
		.slice()
		.sort((a, b) => (a.rank || 0) - (b.rank || 0))
		.map((row) => adaptHomeHotspot(row, loc, spotBySlug))
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
	getServiceItems,
	getSpotServiceItems,
	getBarrierTypes,
	getVerificationNotice,
	getQualityCompliance,
	validateScenicMockIntegrity
}

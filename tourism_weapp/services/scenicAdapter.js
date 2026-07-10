/**
 * Maps research-pack scenic JSON into stable page ViewModels.
 * Pages must not read *Zh/*En fields directly — only these shapes.
 */
import { normalizeLocale, pickLocalized, LOCALE_EN } from './locale.js'

const PLACEHOLDER_COVER = '/static/images/empty.png'

function parseStartLevel(levelLabel) {
	if (!levelLabel || typeof levelLabel !== 'string') {
		return null
	}
	const match = levelLabel.match(/(\d)\s*A/i)
	if (match) {
		return Number(match[1])
	}
	return null
}

function localizeTagList(tags, locale) {
	if (!Array.isArray(tags)) {
		return []
	}
	const normalized = normalizeLocale(locale)
	return tags
		.map((tag) => {
			if (typeof tag === 'string') {
				return tag
			}
			if (!tag || typeof tag !== 'object') {
				return ''
			}
			if (normalized === LOCALE_EN) {
				return tag.en || tag.zh || ''
			}
			return tag.zh || tag.en || ''
		})
		.filter(Boolean)
}

function localizeHighlightList(highlights, locale) {
	if (!Array.isArray(highlights)) {
		return []
	}
	const normalized = normalizeLocale(locale)
	return highlights
		.map((item) => {
			if (typeof item === 'string') {
				return item
			}
			if (!item || typeof item !== 'object') {
				return ''
			}
			if (normalized === LOCALE_EN) {
				return item.en || item.zh || ''
			}
			return item.zh || item.en || ''
		})
		.filter(Boolean)
}

function adaptCulturalNotes(notes, locale) {
	if (!Array.isArray(notes)) {
		return []
	}
	return notes.map((note) => ({
		barrierType: note.barrierType || '',
		title: pickLocalized(note, 'title', locale),
		body: pickLocalized(note, 'body', locale),
		doText: pickLocalized(note, 'do', locale),
		dontText: pickLocalized(note, 'dont', locale)
	}))
}

function adaptServiceItem(raw, locale) {
	if (!raw) {
		return null
	}
	return {
		id: raw.id,
		category: raw.category || 'spot',
		title: pickLocalized(raw, 'title', locale),
		phrase: pickLocalized(raw, 'phrase', locale),
		note: pickLocalized(raw, 'note', locale),
		spotSlug: raw.spotSlug || null
	}
}

function buildServiceLookup(serviceItems, spotServiceLinks) {
	const map = Object.create(null)
	;(serviceItems || []).forEach((item) => {
		map[item.id] = item
	})
	;(spotServiceLinks || []).forEach((item) => {
		map[item.id] = item
	})
	return map
}

function resolveServicesForSpot(spot, serviceLookup, locale) {
	const ids = spot.services || []
	return ids
		.map((serviceId) => adaptServiceItem(serviceLookup[serviceId], locale))
		.filter(Boolean)
}

function adaptGeo(geo) {
	if (!geo || typeof geo !== 'object') {
		return null
	}
	return {
		latitude: geo.lat,
		longitude: geo.lng,
		precisionNote: geo.precision || ''
	}
}

/**
 * @param {object} spot research spot
 * @param {string} locale
 * @param {{ serviceItems?: array, spotServiceLinks?: array, qualityCompliance?: object }} ctx
 */
export function adaptSpotListItem(spot, locale, ctx = {}) {
	const city = pickLocalized(spot, 'city', locale)
	const name = pickLocalized(spot, 'name', locale)
	const levelLabel = spot.level || ''
	return {
		id: spot.slug,
		slug: spot.slug,
		researchId: spot.id,
		name,
		spotName: name,
		coverUrl: PLACEHOLDER_COVER,
		cover: { url: PLACEHOLDER_COVER },
		rate: null,
		startLevel: parseStartLevel(levelLabel),
		levelLabel,
		tags: localizeTagList(spot.tags, locale),
		spotTags: localizeTagList(spot.tags, locale),
		address: city,
		city,
		minPrice: null,
		summary: pickLocalized(spot, 'summary', locale),
		priority: spot.priority || null
	}
}

/**
 * @param {object} spot
 * @param {string} locale
 * @param {{ serviceItems?: array, spotServiceLinks?: array, qualityCompliance?: object }} ctx
 */
export function adaptSpotDetail(spot, locale, ctx = {}) {
	const listItem = adaptSpotListItem(spot, locale, ctx)
	const quality = ctx.qualityCompliance || {}
	const serviceLookup = buildServiceLookup(ctx.serviceItems, ctx.spotServiceLinks)
	const geo = adaptGeo(spot.geo)

	return {
		...listItem,
		summary: pickLocalized(spot, 'summary', locale),
		intro: pickLocalized(spot, 'intro', locale),
		description: pickLocalized(spot, 'intro', locale),
		highlights: localizeHighlightList(spot.highlights, locale),
		openTime: pickLocalized(spot, 'openTime', locale),
		openingTime: pickLocalized(spot, 'openTime', locale),
		ticketSummary: pickLocalized(spot, 'ticket', locale),
		transport: pickLocalized(spot, 'transport', locale),
		traffice: pickLocalized(spot, 'transport', locale),
		visitTips: pickLocalized(spot, 'visitTips', locale),
		bestSeason: pickLocalized(spot, 'bestSeason', locale),
		culturalNotes: adaptCulturalNotes(spot.culturalNotes, locale),
		serviceItems: resolveServicesForSpot(spot, serviceLookup, locale),
		geo,
		latitude: geo ? geo.latitude : null,
		longitude: geo ? geo.longitude : null,
		images: [{ url: PLACEHOLDER_COVER, name: 'placeholder' }],
		video: [],
		plat: null,
		contactPhone: '',
		verificationNotice: pickLocalized(
			{
				disclaimerZh: quality.disclaimerZh,
				disclaimerEn: quality.disclaimerEn
			},
			'disclaimer',
			locale
		),
		unverifiedFields: quality.volatileFields || [],
		coverImageHint: spot.coverImageHint || ''
	}
}

export function adaptCatalogItem(catalogRow, locale, spotBySlug) {
	const spot = spotBySlug[catalogRow.slug]
	if (spot) {
		const item = adaptSpotListItem(spot, locale)
		return {
			...item,
			priority: catalogRow.priority || item.priority,
			typeLabel: pickLocalized(catalogRow, 'type', locale),
			reason: pickLocalized(catalogRow, 'reason', locale)
		}
	}
	const name = pickLocalized(catalogRow, 'name', locale)
	const city = pickLocalized(catalogRow, 'city', locale)
	return {
		id: catalogRow.slug,
		slug: catalogRow.slug,
		name,
		spotName: name,
		coverUrl: PLACEHOLDER_COVER,
		cover: { url: PLACEHOLDER_COVER },
		rate: null,
		startLevel: null,
		levelLabel: '',
		tags: [],
		spotTags: [],
		address: city,
		city,
		minPrice: null,
		summary: pickLocalized(catalogRow, 'reason', locale),
		priority: catalogRow.priority || null,
		typeLabel: pickLocalized(catalogRow, 'type', locale),
		reason: pickLocalized(catalogRow, 'reason', locale)
	}
}

export function adaptHomeHotspot(row, locale, spotBySlug) {
	const spot = spotBySlug[row.spotSlug]
	const base = spot
		? adaptSpotListItem(spot, locale)
		: {
				id: row.spotSlug,
				slug: row.spotSlug,
				name: row.spotSlug,
				spotName: row.spotSlug,
				coverUrl: PLACEHOLDER_COVER,
				cover: { url: PLACEHOLDER_COVER },
				tags: [],
				spotTags: [],
				address: '',
				city: ''
		  }
	return {
		...base,
		rank: row.rank,
		reason: pickLocalized(row, 'reason', locale)
	}
}

export function adaptServiceItems(list, locale, category) {
	return (list || [])
		.filter((item) => !category || item.category === category)
		.map((item) => adaptServiceItem(item, locale))
		.filter(Boolean)
}

export function adaptSpotServiceLinks(list, locale, spotSlug) {
	return (list || [])
		.filter((item) => !spotSlug || item.spotSlug === spotSlug)
		.map((item) => adaptServiceItem(item, locale))
		.filter(Boolean)
}

export { PLACEHOLDER_COVER, buildServiceLookup }

/**
 * Locale helpers for scenic bilingual MVP (Wave 1).
 * Pages and Repository should read locale from here; shell copy comes in weapp-locale-shell.
 */
import tool from '../utils/tool.js'

export const LOCALE_STORAGE_KEY = 'SCENIC_LOCALE'
export const LOCALE_ZH = 'zh'
export const LOCALE_EN = 'en'

export function normalizeLocale(locale) {
	if (locale === LOCALE_EN || locale === 'en-US' || locale === 'en_US') {
		return LOCALE_EN
	}
	return LOCALE_ZH
}

export function getLocale() {
	const stored = tool.data.get(LOCALE_STORAGE_KEY)
	return normalizeLocale(stored || LOCALE_ZH)
}

export function setLocale(locale) {
	const next = normalizeLocale(locale)
	tool.data.set(LOCALE_STORAGE_KEY, next)
	return next
}

export function pickLocalized(entity, baseKey, locale) {
	if (!entity) {
		return ''
	}
	const normalized = normalizeLocale(locale)
	const enKey = baseKey + 'En'
	const zhKey = baseKey + 'Zh'
	if (normalized === LOCALE_EN) {
		return entity[enKey] || entity[zhKey] || entity[baseKey] || ''
	}
	return entity[zhKey] || entity[enKey] || entity[baseKey] || ''
}

/**
 * Dev-only smoke for scenic mock integrity (sync mock path).
 * In HBuilderX console: require or import and call runScenicMockSmoke().
 */
import {
	validateScenicMockIntegrity,
	getSpotCatalogSync,
	getSpotDetailSync,
	getHomeHotspotsSync,
	getServiceItems,
	getProvinceIntro,
	getHeritageList
} from './scenicRepository.js'
import { isScenicMockOnly } from './scenicDataSource.js'
import { LOCALE_EN, LOCALE_ZH } from './locale.js'

export function runScenicMockSmoke() {
	const integrity = validateScenicMockIntegrity()
	const catalogZh = getSpotCatalogSync(LOCALE_ZH)
	const catalogEn = getSpotCatalogSync(LOCALE_EN)
	const hotspots = getHomeHotspotsSync(LOCALE_ZH)
	const services = getServiceItems(LOCALE_ZH)
	const introZh = getProvinceIntro(LOCALE_ZH)
	const heritage = getHeritageList(LOCALE_ZH)
	const firstSlug = catalogZh[0] && catalogZh[0].slug
	const detail = firstSlug ? getSpotDetailSync(firstSlug, LOCALE_EN) : null

	const report = {
		mockOnly: isScenicMockOnly(),
		integrity,
		catalogZhCount: catalogZh.length,
		catalogEnCount: catalogEn.length,
		hotspotCount: hotspots.length,
		serviceCount: services.length,
		provinceIntroZhLen: introZh && introZh.body ? introZh.body.length : 0,
		heritageCount: heritage && heritage.items ? heritage.items.length : 0,
		sampleDetailSlug: firstSlug,
		sampleDetailNameEn: detail && detail.name,
		sampleCulturalNotes: detail && detail.culturalNotes && detail.culturalNotes.length,
		sampleServiceOnDetail: detail && detail.serviceItems && detail.serviceItems.length,
		hasDisclaimer: !!(detail && detail.verificationNotice)
	}
	return report
}

export default { runScenicMockSmoke }

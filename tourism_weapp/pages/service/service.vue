<template>
	<view>
		<view class="header-block">
			<text class="h2">{{ shell.serviceTitle }}</text>
			<text class="text-grey text-sm">{{ shell.serviceSubtitle }}</text>
		</view>

		<view v-if="groupedServices.length" class="phrase-section">
			<view class="category-block" v-for="group in groupedServices" :key="group.category">
				<text class="h3 category-title">{{ group.label }}</text>
				<view class="phrase-card" v-for="item in group.items" :key="item.id">
					<view class="text-bold">{{ item.title }}</view>
					<view class="margin-top-xs phrase-text">{{ item.phrase }}</view>
					<view class="text-grey text-sm margin-top-xs" v-if="item.note">{{ item.note }}</view>
				</view>
			</view>
		</view>
		<view v-else class="padding-sm text-grey">{{ shell.emptyList }}</view>

		<text class="h2 title">{{ shell.serviceLegacyTitle }}</text>

		<view class="guide_container" @click="gotoPage('child','/home/children/introduce/introduce')">
			<text class="h2">{{ shell.serviceIntro }}</text>
		</view>
		
		<view class="card_container margin-top">
			<view @click="callPhone('12301')" class="item" style="background: linear-gradient(to bottom,#07BCDA,#00D7C7 );">
				<view>
					<text class="h3">{{ shell.serviceConsult }}</text>
					<text>12301</text>
				</view>
				<view class="cuIcon-phone"></view>
			</view>
			<view @click="callPhone('12315')" class="item" style="background: linear-gradient(to bottom,#9C6DF7,#D780F1 );">
				<view>
					<text class="h3">{{ shell.serviceComplaint }}</text>
					<text>12315</text>
				</view>
				<view class="cuIcon-edit"></view>
			</view>
			<view @click="toTraffic" class="item" style="background: linear-gradient(to bottom,#FA8733,#FAA824);">
				<view>
					<text class="h3">{{ shell.serviceBus }}</text>
				</view>
				<view class="cuIcon-deliver"></view>
			</view>
			<view class="item" style="background: linear-gradient(to bottom,#2FD162,#7ADF65);" @click="gotoWeather">
				<view>
					<text class="h3">{{ shell.serviceWeather }}</text>
				</view>
				<view class="cuIcon-favorfill"></view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { getLocale, LOCALE_CHANGED_EVENT } from "@/services/locale.js"
	import { getShellCopy } from "@/services/shellCopy.js"
	import { getServiceItems } from "@/services/scenicRepository.js"

	const CATEGORY_ORDER = ['ticketing', 'transport', 'food', 'emergency', 'etiquette', 'shopping']
	const CATEGORY_SHELL_KEY = {
		ticketing: 'serviceCatTicketing',
		transport: 'serviceCatTransport',
		food: 'serviceCatFood',
		emergency: 'serviceCatEmergency',
		etiquette: 'serviceCatEtiquette',
		shopping: 'serviceCatShopping'
	}

	export default {
		data() {
			const locale = getLocale()
			return {
				locale,
				shell: getShellCopy(locale),
				groupedServices: []
			}
		},
		onLoad() {
			uni.$on(LOCALE_CHANGED_EVENT, this.onLocaleChanged)
			this.reload()
		},
		onShow() {
			this.reload()
		},
		onUnload() {
			uni.$off(LOCALE_CHANGED_EVENT, this.onLocaleChanged)
		},
		methods: {
			reload() {
				this.locale = getLocale()
				this.shell = getShellCopy(this.locale)
				const items = getServiceItems(this.locale)
				const buckets = Object.create(null)
				items.forEach((item) => {
					const cat = item.category || 'other'
					if (!buckets[cat]) {
						buckets[cat] = []
					}
					buckets[cat].push(item)
				})
				const ordered = []
				CATEGORY_ORDER.forEach((cat) => {
					if (buckets[cat] && buckets[cat].length) {
						const key = CATEGORY_SHELL_KEY[cat]
						ordered.push({
							category: cat,
							label: key ? this.shell[key] : cat,
							items: buckets[cat]
						})
						delete buckets[cat]
					}
				})
				Object.keys(buckets).forEach((cat) => {
					ordered.push({
						category: cat,
						label: cat,
						items: buckets[cat]
					})
				})
				this.groupedServices = ordered
			},
			onLocaleChanged() {
				this.reload()
			},
			gotoPage(type,path){
				if (type==='tabbar') {
					uni.switchTab({
						url:'/pages' + path
					})
				} else{
					uni.navigateTo({
						url:'/pages' + path
					})
				}
			},
			gotoWeather(){
				uni.navigateTo({
					url:'/pages/service/children/weather/weather'
				})
			},
			callPhone(phone){
				uni.makePhoneCall({
					phoneNumber: phone
				})
			},
			toTraffic(){
				uni.navigateTo({
					url:'/pages/service/children/traffic/traffic'
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		padding: 14px;
	}

	.header-block{
		margin-bottom: 12px;
		.h2{
			display: block;
		}
	}

	.phrase-section{
		margin-bottom: 16px;
	}

	.category-block{
		margin-bottom: 14px;
	}

	.category-title{
		display: block;
		margin-bottom: 8px;
	}

	.phrase-card{
		background: #fff;
		border-radius: 6px;
		padding: 12px;
		margin-bottom: 8px;
	}

	.phrase-text{
		line-height: 1.5;
	}
	
	.guide_container{
		margin-top: 10px;
		color: #fff;
		padding: 10px;
		border-radius: 6px;
		background: linear-gradient(to right,#2996FD,#44BAFA);
	}
	
	.title{
		margin: 14px 0;
	}
	
	.card_container{
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 16px;
		
		.item{
			border-radius: 4px;
			padding: 10px;
			color: #FFF;
			display: grid;
			grid-template-columns: 1fr 40px;
			align-items: center;
			
			view:nth-child(2){
				background-color: rgba(255, 255, 255, 0.2);
				height: 40px;
				border-radius: 50%;
				text-align: center;
				line-height: 40px;
				font-size: 20px;
			}
		}
	}

</style>

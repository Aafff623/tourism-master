<template>
	<view>
		<view class="search">
			<view class="inputbox">
				<view class="cuIcon-search"></view>
				<input type="text" @confirm="onSearch" @blur="onSearch" v-model="keyword" :placeholder="shell.spotSearchPlaceholder" />
			</view>
		</view>
		
		<view v-if="dataList.length>0" class="padding-sm">
			<view class="spot-list">
				<view class="spot-item" v-for="(item,index) in dataList" :key="item.slug || index" @click="toDetail(item.slug)">
					<image :src="item.coverUrl || (item.cover && item.cover.url)" style="width: 100%;height: 130px;" mode="aspectFill" />
					<view class="bg-orange cu-tag sm" style="position: absolute;right: 0;top: 0;" v-if="item.levelLabel">{{ item.levelLabel }}</view>
					
					<view class="flex-sub flex flex-direction justify-between padding-sm">
						<view class="h3 title">
							<view class="cu-tag sm bg-red margin-right-sm" v-if="item.startLevel">{{item.startLevel}}A</view>
							<text>{{ item.name || item.spotName }}</text>
						</view>
						<view class="margin-top-xs" v-if="item.spotTags && item.spotTags.length">
							<text v-for="(a, tagIndex) in item.spotTags" :key="tagIndex" class="cu-tag sm bg-blue light">{{a}}</text>
						</view>
						<view class="address weaktext margin-top-xs">{{ item.summary || item.city || item.address }}</view>
					</view>
				</view>
			</view>
		</view>
		
		<empty v-else></empty>
		
		<view style="position: fixed; right: 20px; top: 550px;" @click="scrollToTop">
			<button class="cu-btn cuIcon round bg-green lg">
			  <text class="cuIcon-upblock text-xxl text-bold"></text>
			</button>
		</view>	
		
	</view>
</template>

<script>
	import { getLocale, LOCALE_CHANGED_EVENT } from "@/services/locale.js"
	import { getShellCopy } from "@/services/shellCopy.js"
	import { getSpotCatalog } from "@/services/scenicRepository.js"

	export default {
		data() {
			const locale = getLocale()
			return {
				keyword: '',
				allList: [],
				dataList: [],
				locale,
				shell: getShellCopy(locale)
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
			scrollToTop() {
			  uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
			  });
			},
			reload() {
				this.locale = getLocale()
				this.shell = getShellCopy(this.locale)
				getSpotCatalog(this.locale).then((list) => {
					this.allList = list || []
					this.applyFilter()
				}).catch(() => {
					this.allList = []
					this.applyFilter()
				})
			},
			applyFilter() {
				const key = (this.keyword || '').trim().toLowerCase()
				if (!key) {
					this.dataList = this.allList.slice()
					return
				}
				this.dataList = this.allList.filter((item) => {
					const name = (item.name || item.spotName || '').toLowerCase()
					const city = (item.city || item.address || '').toLowerCase()
					const summary = (item.summary || '').toLowerCase()
					return name.indexOf(key) !== -1 || city.indexOf(key) !== -1 || summary.indexOf(key) !== -1
				})
			},
			onSearch() {
				this.applyFilter()
			},
			onLocaleChanged() {
				this.reload()
			},
			toDetail(slug){
				if (!slug) {
					return
				}
				uni.navigateTo({
					url:'/pages/spot/detail?id=' + encodeURIComponent(slug)
				})
			}
		}
	}
</script>

<style lang="scss">
	.spot-list{
		column-count: 2; 
		column-gap: 10px;
		
		.spot-item{
			position: relative;
			break-inside: avoid;
			width: 100%;
			background-color: #fff;
			margin-bottom: 10px;
		}
	}
	
	.search {
		padding: 10px 14px;
		background-color: #fff;

		.inputbox {
			padding: 8px;
			background-color: #F7F7F7;
			display: flex;
			align-items: center;
			gap: 4px;
			border-radius: 4px;
		}

		.nav {
			margin-top: 10px;

			.cu-item {
				border-radius: 2px;
				height: 26px;
				line-height: 26px;
				background-color: #F7F7F7;
				color: #000;
			}

			.cu-item.cur {
				background-color: #FADBD9;
				border-bottom: none;
			}
		}

	}
</style>

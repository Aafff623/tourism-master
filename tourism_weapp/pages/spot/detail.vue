<template>
	<view v-if="spot && spot.slug">
		<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true"
			interval="3000" duration="500" style="min-height: 220px;">
			<swiper-item v-for="(item,index) in displayImages" :key="index">
				<image :src="item.url" mode="aspectFill" style="width: 100%; height: 220px;"></image>
			</swiper-item>
		</swiper>

		<view class="card main_info" style="margin-top: 0;">
			<view class="title h2">{{ spot.name || spot.spotName }}</view>
			<view class="openTime" v-if="spot.openingTime || spot.openTime">
				<text class="cuIcon-time margin-right-xs"></text>
				<text>{{ shell.detailOpenTime }}：{{ spot.openingTime || spot.openTime }}</text>
			</view>
			<view class="margin-top-xs" v-if="spot.spotTags && spot.spotTags.length">
				<text v-for="(tag, tagIndex) in spot.spotTags" :key="tagIndex" class="cu-tag sm bg-blue light margin-right-xs">{{ tag }}</text>
			</view>
		</view>

		<view class="card flex justify-between" v-if="spot.city || spot.address">
			<view class="text-bold">{{ spot.city || spot.address }}</view>
			<view class="flex flex-gap-sm" v-if="spot.latitude && spot.longitude">
				<view @click="onGuide"><text class="cuIcon-locationfill margin-right-xs"></text>Map</view>
			</view>
		</view>

		<view class="card" v-if="spot.verificationNotice">
			<text class="h3">{{ shell.detailDisclaimer }}</text>
			<view class="text-grey text-sm margin-top-xs">{{ spot.verificationNotice }}</view>
		</view>

		<view class="card" v-if="spot.ticketSummary">
			<text class="h3">{{ shell.detailTicket }}</text>
			<view class="margin-top-xs">{{ spot.ticketSummary }}</view>
		</view>

		<!-- 模板订票区：有后端票种时保留；Mock slug 通常为空 -->
		<view class="card" v-if="ticketList && ticketList.length > 0">
			<text class="h3">门票</text>
			<view class="radius2">
				<view class="flex padding-sm" v-for="item in ticketList" :key="item.id"
					style="border-bottom: 1px solid #FFFFFF;background-color: #f2f2f2;"
					@click="toPreBook(item.id,item.status)">
					<view class="flex-sub margin-right-xl flex flex-direction">
						<text class="text-xl">{{item.name}}</text>
						<text class="text-grey margin-top-xs">{{item.remark||"暂无说明"}}</text>
					</view>
					<view class="flex flex-direction justify-between">
						<view class="text-right">
							<text v-if="item.status==='ONSALE'" class="cu-tag bg-green sm">在售</text>
							<text v-if="item.status==='STOPSALE'" class="cu-tag bg-red sm">停止售</text>
							<text v-if="item.status==='PRESALE'" class="cu-tag bg-grey sm">预售</text>
						</view>
						<text class="text-sm text-red margin-top-lg"><text
								class="text-xl">￥{{item.price.toFixed(1)}}</text>元/人</text>
					</view>
				</view>
			</view>
		</view>

		<view class="card">
			<text class="h3">简介</text>
			<view class="margin-bottom-sm">{{ spot.intro || spot.description }}</view>
		</view>

		<view class="card" v-if="spot.highlights && spot.highlights.length">
			<text class="h3">{{ shell.detailHighlights }}</text>
			<view class="margin-top-xs" v-for="(line, hIndex) in spot.highlights" :key="hIndex">
				<text class="text-grey">• </text>{{ line }}
			</view>
		</view>

		<view class="card" v-if="spot.transport || spot.traffice">
			<text class="h3">{{ shell.detailTransport }}</text>
			<view class="margin-top-xs">{{ spot.transport || spot.traffice }}</view>
		</view>

		<view class="card" v-if="spot.visitTips">
			<text class="h3">{{ shell.detailVisitTips }}</text>
			<view class="margin-top-xs">{{ spot.visitTips }}</view>
		</view>

		<view class="card" v-if="spot.bestSeason">
			<text class="h3">{{ shell.detailBestSeason }}</text>
			<view class="margin-top-xs">{{ spot.bestSeason }}</view>
		</view>

		<view class="card" v-if="spot.culturalNotes && spot.culturalNotes.length">
			<text class="h3">{{ shell.detailCultural }}</text>
			<view class="margin-top-sm padding-sm" style="background:#f7f7f7;border-radius:6px;"
				v-for="(note, nIndex) in spot.culturalNotes" :key="nIndex">
				<view class="text-bold">{{ note.title }}</view>
				<view class="margin-top-xs">{{ note.body }}</view>
				<view class="margin-top-xs text-green text-sm" v-if="note.doText">{{ shell.commonDo }}：{{ note.doText }}</view>
				<view class="margin-top-xs text-red text-sm" v-if="note.dontText">{{ shell.commonDont }}：{{ note.dontText }}</view>
			</view>
		</view>

		<view class="card" v-if="spot.serviceItems && spot.serviceItems.length">
			<text class="h3">{{ shell.detailServices }}</text>
			<view class="margin-top-sm padding-sm" style="border-bottom:1px solid #f0f0f0;"
				v-for="(svc, sIndex) in spot.serviceItems" :key="svc.id || sIndex">
				<view class="text-bold">{{ svc.title }}</view>
				<view class="margin-top-xs">{{ svc.phrase }}</view>
				<view class="text-grey text-sm margin-top-xs" v-if="svc.note">{{ svc.note }}</view>
			</view>
		</view>

		<!-- 历史动态：仅后端有数据时显示 -->
		<view class="card" v-if="history.length>0">
			<text class="h3">历史动态</text>
			<view class="cu-timeline" v-for="item in history" :key="item.id">
				<view class="cu-time" style="display: block;width: 110px;">{{item.tracingTime}}</view>
				<view class="cu-item">
					<view class="content">
						<view class="cu-capsule radius">
							<view class="cu-tag bg-cyan">标题</view>
							<view class="cu-tag line-cyan">{{item.title}}</view>
						</view>
						<view class="margin-top-sm flex flex-gap-sm">
							<image :src="img.url" v-for="(img,index) in item.images" :key="index"
								style="width: 40px;height: 40px;border-radius: 2px;"></image>
						</view>
						<view class="margin-top">{{item.description}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="card" v-if="spot.plat && spot.plat.url">
			<text class="h3">景区地图</text>
			<image @longpress="savePlat" :src="spot.plat.url" style="width: 100%;height: 200px;"></image>
		</view>

		<!-- 评论：保留入口；Mock slug 下通常为空 -->
		<view class="card" v-if="commentList.length>0">
			<text class="h3">景区评价</text>
			<view class="list">
				<view v-for="item in commentList" :key="item.id" class="flex padding-sm"
					style="border-bottom: 1px solid #f2f2f2;">
					<view class="flex-sub">
						<view class="margin-bottom-sm">{{item.content}}</view>
						<view class="text-grey text-xs">{{item.createTime}}</view>
					</view>
					<view>
						<view class="cu-capsule">
							<view class='cu-tag sm bg-red'>
								<text class='cuIcon-likefill'></text>
							</view>
							<view class="cu-tag sm line-red">{{item.score.toFixed(1)}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
	<view v-else class="padding-lg text-grey">{{ shell.emptyList }}</view>
</template>

<script>
	import indexApi from "@/api/indexApi.js"
	import { getLocale, LOCALE_CHANGED_EVENT } from "@/services/locale.js"
	import { getShellCopy } from "@/services/shellCopy.js"
	import { getSpotDetailByIdOrSlug } from "@/services/scenicRepository.js"

	export default {
		data() {
			const locale = getLocale()
			return {
				spotIdOrSlug: '',
				spot: {},
				history: [],
				ticketList: [],
				commentList: [],
				locale,
				shell: getShellCopy(locale)
			}
		},
		computed: {
			displayImages() {
				if (this.spot && this.spot.images && this.spot.images.length) {
					return this.spot.images
				}
				const url = (this.spot && (this.spot.coverUrl || (this.spot.cover && this.spot.cover.url))) || '/static/images/empty.png'
				return [{ url }]
			}
		},
		onLoad(option) {
			this.spotIdOrSlug = option.id || option.slug || ''
			uni.$on(LOCALE_CHANGED_EVENT, this.onLocaleChanged)
			this.loadMockDetail()
			this.loadLegacySideData()
		},
		onUnload() {
			uni.$off(LOCALE_CHANGED_EVENT, this.onLocaleChanged)
		},
		methods: {
			loadMockDetail() {
				this.locale = getLocale()
				this.shell = getShellCopy(this.locale)
				getSpotDetailByIdOrSlug(this.spotIdOrSlug, this.locale).then((detail) => {
					this.spot = detail || {}
				}).catch(() => {
					this.spot = {}
				})
			},
			loadLegacySideData() {
				// 订票/评论/历史：保留模板能力；slug 场景下 API 失败则静默为空
				const spotId = this.spotIdOrSlug
				if (!spotId) {
					return
				}
				indexApi.getspotheritage({ spotId }).then(res => {
					this.history = res.data || []
				}).catch(() => { this.history = [] })
				indexApi.getticket({ spotId }).then(res => {
					this.ticketList = res.data || []
				}).catch(() => { this.ticketList = [] })
				indexApi.getcomment({ current: 1, size: 20, spotId }).then(res => {
					this.commentList = (res.data && res.data.records) || []
				}).catch(() => { this.commentList = [] })
			},
			onLocaleChanged() {
				this.loadMockDetail()
			},
			toPreBook(id, status) {
				if (status !== "ONSALE") {
					uni.showToast({
						icon: 'none',
						title: '门票暂未开售'
					})
					return
				}
				uni.navigateTo({
					url: `/pages/spot/prebook?spotId=${this.spot.researchId || this.spot.id}&ticketId=${id}`
				})
			},
			onGuide() {
				let latitude = Number(this.spot.latitude)
				let longitude = Number(this.spot.longitude)
				if (!latitude || !longitude) {
					return
				}
				uni.openLocation({
					latitude,
					longitude,
					name: this.spot.name || this.spot.spotName || '',
					success: function() {}
				});
			},
			callPhone() {
				if (!this.spot.contactPhone) {
					return
				}
				uni.makePhoneCall({
					phoneNumber: this.spot.contactPhone
				});
			},
			savePlat() {
				if (!this.spot.plat || !this.spot.plat.url) {
					return
				}
				uni.saveImageToPhotosAlbum({
					filePath: this.spot.plat.url,
					success: () => {
						uni.showToast({
							title: '图片已保存'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		position: relative;
	}
		
	.main_info {
		background: linear-gradient(to bottom, #b4fffd, #f3ffff);
	}

	.tabbar {
		padding: 0 10px !important;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 20px;

		button {
			font-size: 14px !important;
			height: 30px !important;
		}
	}
</style>

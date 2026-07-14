<template>
	<view class="heritage-page">
		<view v-if="ruleText" class="heritage-rule">
			<view class="heritage-rule-title">{{ ruleTitle }}</view>
			<view class="heritage-rule-body">{{ ruleText }}</view>
		</view>

		<view v-if="dataList.length > 0" class="spotList">
			<view
				class="spot_item margin-bottom-sm bg-white padding-sm"
				v-for="(item, index) in dataList"
				:key="item.slug || index"
				@click="toDetail(item)"
			>
				<image :src="item.coverUrl || placeholderCover" mode="aspectFill"></image>
				<view class="content flex flex-direction justify-between">
					<view class="h3 title">{{ item.name }}</view>
					<view style="margin: 4px 0;">
						<text class="cu-tag sm bg-blue">{{ item.heritageLabel }}</text>
					</view>
					<view class="text-grey">{{ item.city }}</view>
				</view>
			</view>
		</view>

		<empty v-else></empty>
	</view>
</template>

<script>
	import { getLocale, LOCALE_CHANGED_EVENT } from "@/services/locale.js"
	import { getShellCopy } from "@/services/shellCopy.js"
	import { getHeritageList } from "@/services/scenicRepository.js"

	const PLACEHOLDER_COVER = '/static/images/empty.png'

	export default {
		data() {
			return {
				locale: getLocale(),
				dataList: [],
				ruleText: '',
				ruleTitle: '',
				placeholderCover: PLACEHOLDER_COVER
			}
		},
		onLoad() {
			uni.$on(LOCALE_CHANGED_EVENT, this.onLocaleChanged)
			this.refresh()
		},
		onShow() {
			this.refresh()
		},
		onUnload() {
			uni.$off(LOCALE_CHANGED_EVENT, this.onLocaleChanged)
		},
		methods: {
			onLocaleChanged() {
				this.refresh()
			},
			refresh() {
				this.locale = getLocale()
				const copy = getShellCopy(this.locale)
				uni.setNavigationBarTitle({ title: copy.heritageTitle })
				this.ruleTitle = copy.heritageRuleTitle
				const pack = getHeritageList(this.locale)
				this.ruleText = (pack && pack.rule) || ''
				this.dataList = (pack && pack.items) || []
			},
			toDetail(item) {
				if (!item || !item.slug || !item.hasDetail) {
					uni.showToast({ icon: 'none', title: getShellCopy(this.locale).emptyList })
					return
				}
				uni.navigateTo({
					url: '/pages/spot/detail?id=' + encodeURIComponent(item.slug)
				})
			}
		}
	}
</script>

<style lang="scss">
	.heritage-page {
		padding-bottom: 16px;
	}

	.heritage-rule {
		margin: 10px 10px 0;
		padding: 12px;
		background: #f7f8fa;
		border-radius: 6px;
	}

	.heritage-rule-title {
		font-size: 14px;
		font-weight: 600;
		margin-bottom: 6px;
		color: #333;
	}

	.heritage-rule-body {
		font-size: 13px;
		line-height: 1.6;
		color: #666;
	}

	.spotList {
		margin-top: 10px;
		padding: 10px;

		.spot_item {
			display: flex;
			gap: 10px;

			image {
				width: 80px;
				height: 80px;
				border-radius: 4px;
				background: #eee;
			}

			.content {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.title {
					display: flex;
					align-items: center;
					gap: 8px;
				}
			}
		}
	}
</style>

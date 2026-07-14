<template>
	<view class="intro-page">
		<view class="intro-body">{{ introBody }}</view>
		<view v-if="!introBody" class="intro-empty">{{ emptyText }}</view>
	</view>
</template>

<script>
	import { getLocale, LOCALE_CHANGED_EVENT } from "@/services/locale.js"
	import { getShellCopy } from "@/services/shellCopy.js"
	import { getProvinceIntro } from "@/services/scenicRepository.js"

	export default {
		data() {
			return {
				locale: getLocale(),
				introBody: '',
				emptyText: ''
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
				uni.setNavigationBarTitle({ title: copy.introTitle })
				this.emptyText = copy.emptyList
				const intro = getProvinceIntro(this.locale)
				this.introBody = (intro && intro.body) || ''
			}
		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}
	.intro-page {
		padding: 16px;
	}
	.intro-body {
		font-size: 15px;
		line-height: 1.7;
		color: #333;
		white-space: pre-wrap;
	}
	.intro-empty {
		color: #999;
		font-size: 14px;
	}
</style>

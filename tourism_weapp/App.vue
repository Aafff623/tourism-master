<script>
	import { getLocale } from './services/locale.js'
	import { applyTabBarLocale } from './services/shellCopy.js'

	export default {
		globalData: {
			scenicLocale: 'zh'
		},
		onLaunch: function() {
			const locale = getLocale()
			this.globalData.scenicLocale = locale
			applyTabBarLocale(locale)
		},
		onShow: function() {
			applyTabBarLocale(getLocale())
		},
		onHide: function() {
		}
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "./app.scss";
</style>

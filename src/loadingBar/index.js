/* istanbul ignore file */
import LoadingBarPlugin from './src/LoadingBarPlugin.js'
import { install } from '../_utils/naive/installThemeAwarableProperty'
import LoadingBar from './src/LoadingBar.vue'

LoadingBarPlugin.install = function (Vue, naive) {
  install(Vue, LoadingBarPlugin, `$${naive.componentPrefix}${LoadingBar.name}`)
  LoadingBarPlugin.Vue = Vue
}

export default LoadingBarPlugin

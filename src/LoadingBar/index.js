/* istanbul ignore file */
import LoadingBarPlugin from './src/LoadingBarPlugin.js'
import { install } from '../_utils/installThemeAwarableProperty'

LoadingBarPlugin.install = function (Vue) {
  install(Vue, LoadingBarPlugin, '$NLoadingBar')
  LoadingBarPlugin.Vue = Vue
}

export default LoadingBarPlugin

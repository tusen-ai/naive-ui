/* istanbul ignore file */
import LoadingBarPlugin from './src/LoadingBarPlugin.js'
import { install } from '../_utils/naive/installThemeAwarableProperty'

LoadingBarPlugin.install = function (Vue) {
  install(Vue, LoadingBarPlugin, '$NLoadingBar')
  LoadingBarPlugin.Vue = Vue
}

export default LoadingBarPlugin

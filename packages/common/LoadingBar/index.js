/* istanbul ignore file */
import LoadingBar from './src/main.js'
import { install } from '../../utils/installThemeAwarableProperty'

LoadingBar.install = function (Vue) {
  install(Vue, LoadingBar, '$NLoadingBar')
  LoadingBar.Vue = Vue
}

export default LoadingBar

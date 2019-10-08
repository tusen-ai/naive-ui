/* istanbul ignore file */
import LoadingBar from './src/main.js'

LoadingBar.install = function (Vue) {
  Vue.prototype.$NLoadingBar = LoadingBar
  LoadingBar.Vue = Vue
}

export default LoadingBar

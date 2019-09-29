/* istanbul ignore file */
import LoadingBar from './src/main.js'

LoadingBar.install = function (Vue) {
  // console.log('installLoadingBar')
  Vue.prototype.$NLoadingBar = LoadingBar
  LoadingBar.Vue = Vue
}

export default LoadingBar

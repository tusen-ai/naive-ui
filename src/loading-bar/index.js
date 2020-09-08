/* istanbul ignore file */
import LoadingBarPlugin from './src/LoadingBarPlugin.js'
import { install } from '../_utils/naive/installThemeAwarableProperty'
import LoadingBar from './src/LoadingBar.vue'

LoadingBarPlugin.install = function (app, naive) {
  install(app, LoadingBarPlugin, `$${naive.componentPrefix}${LoadingBar.name}`)
  LoadingBarPlugin.Vue = app
}

export default LoadingBarPlugin

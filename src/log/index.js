/* istanbul ignore file */
import NLog from './src/Log.vue'

NLog.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + NLog.name, NLog)
}

export default NLog

/* istanbul ignore file */
import NLog from './src/Log.vue'

NLog.install = function (Vue) {
  Vue.component(NLog.name, NLog)
}

export default NLog

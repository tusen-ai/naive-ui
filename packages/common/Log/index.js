/* istanbul ignore file */
import NLog from './src/main.vue'

NLog.install = function (Vue) {
  Vue.component(NLog.name, NLog)
}

export default NLog

/* istanbul ignore file */
import NLog from './src/Log.vue'

NLog.install = function (app, naive) {
  app.component(naive.componentPrefix + NLog.name, NLog)
}

export default NLog

/* istanbul ignore file */
import NCode from './src/Code.vue'

NCode.install = function (app, naive) {
  app.component(naive.componentPrefix + NCode.name, NCode)
}

export default NCode

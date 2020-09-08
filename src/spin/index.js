/* istanbul ignore file */
import Spin from './src/Spin.vue'

Spin.install = function (app, naive) {
  app.component(naive.componentPrefix + Spin.name, Spin)
}

export default Spin

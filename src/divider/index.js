/* istanbul ignore file */
import Divider from './src/Divider.vue'

Divider.install = function (app, naive) {
  app.component(naive.componentPrefix + Divider.name, Divider)
}

export default Divider

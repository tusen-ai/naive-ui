/* istanbul ignore file */
import Cascader from './src/Cascader.vue'

Cascader.install = function (app, naive) {
  app.component(naive.componentPrefix + Cascader.name, Cascader)
}

export default Cascader

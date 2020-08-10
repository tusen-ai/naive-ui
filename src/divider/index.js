/* istanbul ignore file */
import Divider from './src/Divider.vue'

Divider.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Divider.name, Divider)
}

export default Divider

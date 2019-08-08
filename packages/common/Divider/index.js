/* istanbul ignore file */
import Divider from './src/main.vue'

Divider.install = function (Vue) {
  Vue.component(Divider.name, Divider)
}

export default Divider

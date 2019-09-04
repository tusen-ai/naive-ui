/* istanbul ignore file */
import Spin from './src/main.vue'

Spin.install = function (Vue) {
  Vue.component(Spin.name, Spin)
}

export default Spin

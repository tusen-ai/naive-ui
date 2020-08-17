/* istanbul ignore file */
import Spin from './src/Spin.vue'

Spin.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Spin.name, Spin)
}

export default Spin

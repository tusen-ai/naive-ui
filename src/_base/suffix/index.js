/* istanbul ignore file */
import Suffix from './src/main.vue'

Suffix.install = function (Vue) {
  Vue.component(Suffix.name, Suffix)
}

export default Suffix

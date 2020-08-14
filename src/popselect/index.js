/* istanbul ignore file */
import Popselect from './src/Popselect.vue'

Popselect.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Popselect.name, Popselect)
}

export default Popselect

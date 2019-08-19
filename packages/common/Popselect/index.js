/* istanbul ignore file */
import Popselect from './src/main.vue'
import PopselectOption from './src/PopselectOption.vue'

Popselect.install = function (Vue) {
  Vue.component(Popselect.name, Popselect)
  Vue.component(PopselectOption.name, PopselectOption)
}

export default Popselect

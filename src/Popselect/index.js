/* istanbul ignore file */
import Popselect from './src/Popselect.vue'

Popselect.install = function (Vue) {
  Vue.component(Popselect.name, Popselect)
}

export default Popselect

/* istanbul ignore file */
import Dropdown from './src/Dropdown.vue'

Dropdown.install = function (Vue) {
  Vue.component(Dropdown.name, Dropdown)
}

export default Dropdown

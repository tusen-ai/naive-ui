/* istanbul ignore file */
import Dropdown from './src/Dropdown.vue'
import DropdownSubmenu from './src/DropdownSubmenu'
import DropdownDivider from './src/DropdownDivider'

Dropdown.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Dropdown.name, Dropdown)
  Vue.component(naive.componentPrefix + DropdownSubmenu.name, DropdownSubmenu)
  Vue.component(naive.componentPrefix + DropdownDivider.name, DropdownDivider)
}

export default Dropdown

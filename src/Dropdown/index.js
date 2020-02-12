/* istanbul ignore file */
import Dropdown from './src/Dropdown.vue'
import DropdownSubmenu from './src/DropdownSubmenu'
import DropdownDivider from './src/DropdownDivider'

Dropdown.install = function (Vue) {
  Vue.component(Dropdown.name, Dropdown)
  Vue.component(DropdownSubmenu.name, DropdownSubmenu)
  Vue.component(DropdownDivider.name, DropdownDivider)
}

export default Dropdown

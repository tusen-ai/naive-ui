/* istanbul ignore file */
import Dropdown from './src/Dropdown.vue'
import DropdownSubmenu from './src/DropdownSubmenu'
import DropdownItem from './src/DropdownItem'
import DropdownDivider from './src/DropdownDivider'

Dropdown.install = function (Vue) {
  Vue.component(Dropdown.name, Dropdown)
  Vue.component('NDropdownItem', DropdownItem)
  Vue.component(DropdownDivider.name, DropdownDivider)
  Vue.component(DropdownSubmenu.name, DropdownSubmenu)
}

export default Dropdown

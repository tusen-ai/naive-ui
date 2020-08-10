/* istanbul ignore file */
import Dropdown from './src/Dropdown.vue'
import DropdownSubmenu from './src/DropdownSubmenu'
import DropdownDivider from './src/DropdownDivider'

Dropdown.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Dropdown.name, Dropdown)
  // keep the following install statements
  // dropdown will use their name (string) to render component
  Vue.component(DropdownSubmenu.name, DropdownSubmenu)
  Vue.component(DropdownDivider.name, DropdownDivider)
}

export default Dropdown

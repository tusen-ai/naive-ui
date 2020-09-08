/* istanbul ignore file */
import Dropdown from './src/Dropdown.vue'
import DropdownSubmenu from './src/DropdownSubmenu'
import DropdownDivider from './src/DropdownDivider'

Dropdown.install = function (app, naive) {
  app.component(naive.componentPrefix + Dropdown.name, Dropdown)
  // keep the following install statements
  // dropdown will use their name (string) to render component
  app.component(DropdownSubmenu.name, DropdownSubmenu)
  app.component(DropdownDivider.name, DropdownDivider)
}

export default Dropdown

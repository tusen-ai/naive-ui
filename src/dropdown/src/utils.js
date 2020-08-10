import { createSelectOptionsFromDropdownOptions } from '../../_utils/component/dropdown'

function getRootDropdownMenu (instance) {
  let rootDropdownMenu = instance.NDropdownMenu
  while (rootDropdownMenu && rootDropdownMenu.NDropdownMenu) {
    rootDropdownMenu = rootDropdownMenu.NDropdownMenu
  }
  return rootDropdownMenu || []
}

const createSelectOptions = function (options) {
  return createSelectOptionsFromDropdownOptions(options, 'n-dropdown-submenu', 'n-dropdown-divider')
}

export {
  getRootDropdownMenu,
  createSelectOptions
}

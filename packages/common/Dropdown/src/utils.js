function getRootDropdownMenu (instance) {
  let rootDropdownMenu = instance.NDropdownMenu
  while (rootDropdownMenu && rootDropdownMenu.NDropdownMenu) {
    rootDropdownMenu = rootDropdownMenu.NDropdownMenu
  }
  return rootDropdownMenu || []
}

export {
  getRootDropdownMenu
}

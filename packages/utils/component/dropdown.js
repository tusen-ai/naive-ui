function createSelectOptionForDropdownOption (dropdownOption) {
  const selectOption = Object.assign({}, dropdownOption)
  selectOption.type = undefined
  selectOption.value = dropdownOption.key
  return selectOption
}

function createSelectOptionForDropdownSubmenu (dropdownSubmenu, DropdownSubmenu) {
  // console.log('createSelectOptionForDropdownSubmenu', DropdownSubmenu)
  const selectOption = Object.assign({}, dropdownSubmenu)
  selectOption.as = 'dropdown-submenu'
  selectOption.type = undefined
  selectOption.value = dropdownSubmenu.key
  selectOption.style = {
    ...dropdownSubmenu.style,
    overflow: 'visible'
  }
  /** const renderActivator = selectOption.option */
  selectOption.render = (h, data) => h(DropdownSubmenu, {
    props: {
      data,
      options: dropdownSubmenu.children
    }
  })
  return selectOption
}

function createSelectOptionForDropdownDivider (option, DropdownDivider) {
  const selectOption = Object.assign({}, option)
  selectOption.type = 'render'
  selectOption.style = {
    padding: 0
  }
  selectOption.render = h => h(DropdownDivider)
  return selectOption
}

function createSelectOptionsFromDropdownOptions (dropdownOptions, DropdownSubmenu, DropdownDivider) {
  const selectOptions = []
  dropdownOptions.forEach((option, index) => {
    if (option.type === undefined) {
      selectOptions.push(createSelectOptionForDropdownOption(option))
    } else if (option.type === 'submenu') {
      selectOptions.push(createSelectOptionForDropdownSubmenu(option, DropdownSubmenu))
    } else if (option.type === 'divider') {
      selectOptions.push(createSelectOptionForDropdownDivider(option, DropdownDivider))
    }
  })
  console.log('createSelectOptionsFromDropdownOptions', selectOptions)
  return selectOptions
}

export {
  createSelectOptionsFromDropdownOptions
}

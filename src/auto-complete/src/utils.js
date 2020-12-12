export function mapAutoCompleteOptionsToSelectOptions (options) {
  return (options || []).map(convertAutoCompleteOptionToSelectOption)
}

function convertAutoCompleteOptionToSelectOption (option) {
  if (typeof option === 'string') {
    return {
      label: option,
      value: option
    }
  } else if (
    typeof option === 'object' &&
    option !== null &&
    option.type === 'group'
  ) {
    return {
      type: 'group',
      name: option.name,
      children: option.children.map((groupOption) =>
        convertAutoCompleteOptionToSelectOption(groupOption)
      )
    }
  } else {
    return option
  }
}

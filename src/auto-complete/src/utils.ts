import { BaseOption, Option, Options } from '../../select/src/interface'
import { AutoCompleteOption } from './interface'

export function mapAutoCompleteOptionsToSelectOptions (
  options: Array<AutoCompleteOption | Option>
): Options {
  return options.map(convertAutoCompleteOptionToSelectOption)
}

function convertAutoCompleteOptionToSelectOption (
  option: AutoCompleteOption | Option
): Option {
  if (typeof option === 'string') {
    return {
      label: option,
      value: option
    }
  } else if (option.ignored) {
    return option
  } else if (option.type === 'group') {
    return {
      type: 'group',
      label: option.name,
      name: option.name,
      children: (option.children as Array<string | BaseOption>).map(
        (groupOption) =>
          convertAutoCompleteOptionToSelectOption(groupOption) as BaseOption
      )
    }
  } else {
    return option
  }
}

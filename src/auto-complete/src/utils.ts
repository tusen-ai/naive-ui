import {
  BaseOption,
  GroupOption,
  Option,
  Options
} from '../../select/src/interface'
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
  } else if (option.type === 'group') {
    const groupOption: GroupOption = {
      type: 'group',
      label: (option.label as any) ?? option.name,
      name: (option.value as any) ?? option.name,
      children: (option.children as Array<string | BaseOption>).map(
        (groupOption) =>
          convertAutoCompleteOptionToSelectOption(groupOption) as BaseOption
      )
    }
    return groupOption
  } else {
    return option as Option
  }
}

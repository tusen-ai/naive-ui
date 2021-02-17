import {
  SelectBaseOption,
  SelectGroupOption,
  SelectMixedOption
} from '../../select/src/interface'
import { AutoCompleteOption } from './interface'

export function mapAutoCompleteOptionsToSelectOptions (
  options: Array<AutoCompleteOption | SelectMixedOption>
): SelectMixedOption[] {
  return options.map(convertAutoCompleteOptionToSelectOption)
}

function convertAutoCompleteOptionToSelectOption (
  option: AutoCompleteOption | SelectMixedOption
): SelectMixedOption {
  if (typeof option === 'string') {
    return {
      label: option,
      value: option
    }
  } else if (option.type === 'group') {
    const groupOption: SelectGroupOption = {
      type: 'group',
      label: option.label ?? (option.name as any),
      value: option.value ?? (option.name as any),
      name: option.name as any,
      children: (option.children as Array<string | SelectBaseOption>).map(
        (groupOption) =>
          convertAutoCompleteOptionToSelectOption(
            groupOption
          ) as SelectBaseOption
      )
    }
    return groupOption
  } else {
    return option as SelectMixedOption
  }
}

import type {
  SelectBaseOption,
  SelectGroupOption,
  SelectMixedOption
} from '../../select/src/interface'
import type {
  AutoCompleteGroupOption,
  AutoCompleteOption,
  AutoCompleteOptions
} from './interface'

export function mapAutoCompleteOptionsToSelectOptions (
  options: AutoCompleteOptions
): SelectMixedOption[] {
  return options.map(convertAutoCompleteOptionToSelectOption)
}

function convertAutoCompleteOptionToSelectOption (
  option: AutoCompleteOption | AutoCompleteGroupOption | string
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
      key: (option.key || option.name) as any,
      children: (option.children as Array<string | AutoCompleteOption>).map(
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

import {
  SelectGroupOption,
  SelectMixedOption
} from '../../select/src/interface'

export type AutoCompleteOption =
  | AutoCompleteBaseOption
  | AutoCompleteGroupOption

export type AutoCompleteBaseOption = string
export interface AutoCompleteGroupOption
  extends Omit<SelectGroupOption, 'children'> {
  children: AutoCompleteBaseOption[]
}

export type AutoCompleteOptions = Array<AutoCompleteOption | SelectMixedOption>

export type OnUpdateValue = <T extends string & (string | null)>(
  value: T
) => void
export type OnUpdateImpl = (value: string | null) => void
export type OnSelect = (value: string | number) => void

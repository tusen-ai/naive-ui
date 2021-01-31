import {
  BaseOption,
  GroupOption,
  IgnoredOption
} from '../../select/src/interface'

export type AutoCompleteOption =
  | AutoCompleteBaseOption
  | AutoCompleteGroupOption

export type AutoCompleteBaseOption = string
export interface AutoCompleteGroupOption extends Omit<GroupOption, 'children'> {
  children: AutoCompleteBaseOption[]
}

export type AutoCompleteOptions = Array<
AutoCompleteOption | BaseOption | GroupOption | IgnoredOption
>

export type OnUpdateValue = <T extends string & (string | null)>(
  value: T
) => void
export type OnUpdateImpl = (value: string | null) => void
export type OnSelect = (value: string | number) => void

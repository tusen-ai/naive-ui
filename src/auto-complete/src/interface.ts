import {
  BaseOption,
  GroupOption,
  IgnoredOption
} from '../../select/src/interface'

export type AutoCompleteOption =
  | AutoCompleteBaseOption
  | AutoCompleteGroupOption

export type AutoCompleteBaseOption = string
export interface AutoCompleteGroupOption {
  type: 'group'
  label: string
  name: string
  children: AutoCompleteBaseOption[]
  ignored?: never
}

export type AutoCompleteOptions = Array<
AutoCompleteOption | BaseOption | GroupOption | IgnoredOption
>

export type OnUpdateValue = <T extends string & (string | null)>(
  value: T
) => void
export type OnUpdateImpl = (value: string | null) => void
export type OnSelect = (value: string | number) => void

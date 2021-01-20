export type Options = Option[]
export type Option = BaseOption | GroupOption | IgnoredOption

export interface BaseOption {
  value: string | number
  label: string
  disabled?: boolean
  [k: string]: any
}

export interface GroupOption {
  label: string
  name: string
  type: 'group'
  children: BaseOption[]
  [k: string]: any
}

export interface IgnoredOption {
  ignored: true
  value: string | number
  [k: string]: any
}

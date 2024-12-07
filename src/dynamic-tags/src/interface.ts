export type OnUpdateValue =
  | ((value: string[]) => void)
  | ((value: DynamicTagsOption[]) => void)

export type OnUpdateValueImpl = (
  value: Array<string | DynamicTagsOption>
) => void

export type OnCreate = (label: string) =>
  | {
    label: string
    value: string
  }
  | string

export interface DynamicTagsOption {
  label: string
  value: string
}

export interface DynamicTagsInputSlotOptions {
  submit: (value: any) => void
  deactivate: () => void
}

export interface DynamicTagsTriggerSlotOptions {
  activate: () => void
  disabled: boolean
}

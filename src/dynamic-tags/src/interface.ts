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

export interface DynamicTagsInputSlotProps {
  submit: (value: any) => void
  deactivate: () => void
}

export interface DynamicTagsTriggerSlotProps {
  activate: () => void
  disabled: boolean
}

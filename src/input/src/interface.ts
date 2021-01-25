export type Size = 'small' | 'medium' | 'large'

// null is for clearable
export type OnUpdateValue = <
  T extends string &
  (string | null) &
  [string, string] &
  ([string, string] | null)
>(
  value: T
) => void
export type OnUpdateValueImpl = (
  value: string | [string, string] | null
) => void

export interface InputRef {
  wrapperElRef: HTMLElement
  inputElRef: HTMLInputElement
  blur: () => void
  focus: () => void
  activate: () => void
  deactivate: () => void
}

export type OnUpdateChecked = (
  value: string & number & boolean,
  e: MouseEvent | KeyboardEvent
) => void
export type OnUpdateCheckedImpl = (
  value: string | number | boolean,
  e: MouseEvent | KeyboardEvent
) => void

export interface CheckboxInst {
  focus: () => void
  blur: () => void
}

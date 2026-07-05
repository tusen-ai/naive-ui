import type { VNode } from 'vue'
import type { InputInst } from '../../components'
import type { InputProps } from '../../input/src/Input'

export type InputOtpAllowInput = (
  char: string,
  index: number,
  currentValue: string[]
) => boolean
export type InputOtpSize = 'small' | 'medium' | 'large'
export type InputOtpOnUpdateValue = (
  value: string[],
  meta: InputOtpOnUpdateValueMeta
) => void
export type InputOtpOnFocus = (e: FocusEvent, index: number) => void
export type InputOtpOnBlur = (e: FocusEvent, index: number) => void
export interface InputOtpSlots {
  default?: InputOtpDefaultSlot
}
export type InputOtpDefaultSlot = (
  props: InputProps & { index: number, ref: (inst: InputInst) => void }
) => VNode[]
export type InputOtpOnFinish = (value: string[]) => void
export interface InputOtpOnUpdateValueMeta {
  diff: string
  index: number
  source: InputOtpOnUpdateValueMetaSource
}
export type InputOtpOnUpdateValueMetaSource = 'paste' | 'input' | 'delete'
export interface InputOtpInst {
  focusOnChar: (charIndex: number) => void
}

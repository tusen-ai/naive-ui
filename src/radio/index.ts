import type { HTMLAttributes, LabelHTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NRadioImpl from './src/Radio'
import NRadioButtonImpl from './src/RadioButton'
import NRadioGroupImpl from './src/RadioGroup'

export type * from './src/public-types'
export { radioProps } from './src/Radio'
export type { RadioProps } from './src/Radio'
export { radioButtonProps } from './src/RadioButton'
export type { RadioButtonProps } from './src/RadioButton'
export { radioGroupProps } from './src/RadioGroup'
export type { RadioGroupOption, RadioGroupProps } from './src/RadioGroup'

export const NRadio: WithNativeAttrs<typeof NRadioImpl, LabelHTMLAttributes>
  = NRadioImpl
export const NRadioButton: WithNativeAttrs<
  typeof NRadioButtonImpl,
  LabelHTMLAttributes
> = NRadioButtonImpl
export const NRadioGroup: WithNativeAttrs<
  typeof NRadioGroupImpl,
  HTMLAttributes
> = NRadioGroupImpl

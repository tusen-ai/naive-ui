import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NCheckboxImpl from './src/Checkbox'
import NCheckboxGroupImpl from './src/CheckboxGroup'

export { checkboxProps } from './src/Checkbox'
export type { CheckboxProps } from './src/Checkbox'
export { checkboxGroupProps } from './src/CheckboxGroup'
export type {
  CheckboxGroupOption,
  CheckboxGroupProps
} from './src/CheckboxGroup'
export type { CheckboxInst } from './src/interface'
export type * from './src/public-types'

export const NCheckbox: WithNativeAttrs<typeof NCheckboxImpl, HTMLAttributes>
  = NCheckboxImpl
export const NCheckboxGroup: WithNativeAttrs<
  typeof NCheckboxGroupImpl,
  HTMLAttributes
> = NCheckboxGroupImpl

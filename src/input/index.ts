import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NInputImpl from './src/Input'
import NInputGroupImpl from './src/InputGroup'
import NInputGroupLabelImpl from './src/InputGroupLabel'

export { inputProps } from './src/Input'
export type { InputProps, InputSlots } from './src/Input'
export { inputGroupProps } from './src/InputGroup'
export type { InputGroupProps } from './src/InputGroup'
export { inputGroupLabelProps } from './src/InputGroupLabel'
export type { InputGroupLabelProps } from './src/InputGroupLabel'
export type * from './src/public-types'

export const NInput: WithNativeAttrs<typeof NInputImpl, HTMLAttributes>
  = NInputImpl
export const NInputGroup: WithNativeAttrs<
  typeof NInputGroupImpl,
  HTMLAttributes
> = NInputGroupImpl
export const NInputGroupLabel: WithNativeAttrs<
  typeof NInputGroupLabelImpl,
  HTMLAttributes
> = NInputGroupLabelImpl

import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NInputNumberImpl from './src/InputNumber'

export { inputNumberProps } from './src/InputNumber'
export type { InputNumberProps, InputNumberSlots } from './src/InputNumber'
export type { InputNumberInst } from './src/interface'

export const NInputNumber: WithNativeAttrs<
  typeof NInputNumberImpl,
  HTMLAttributes
> = NInputNumberImpl

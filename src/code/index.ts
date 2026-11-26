import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NCodeImpl from './src/Code'

export { codeProps } from './src/Code'
export type { CodeProps } from './src/Code'

export const NCode: WithNativeAttrs<typeof NCodeImpl, HTMLAttributes>
  = NCodeImpl

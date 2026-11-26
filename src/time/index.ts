import type { TimeHTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NTimeImpl from './src/Time'

export { timeProps } from './src/Time'
export type { TimeProps } from './src/Time'

export const NTime: WithNativeAttrs<typeof NTimeImpl, TimeHTMLAttributes>
  = NTimeImpl

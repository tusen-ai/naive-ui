import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NProgressImpl from './src/Progress'

export { progressProps } from './src/Progress'
export type { ProgressProps } from './src/Progress'
export type * from './src/public-types'

export const NProgress: WithNativeAttrs<typeof NProgressImpl, HTMLAttributes>
  = NProgressImpl

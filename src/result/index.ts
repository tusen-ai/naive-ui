import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NResultImpl from './src/Result'

export type * from './src/public-types'
export { resultProps } from './src/Result'
export type { ResultProps, ResultSlots } from './src/Result'

export const NResult: WithNativeAttrs<typeof NResultImpl, HTMLAttributes>
  = NResultImpl

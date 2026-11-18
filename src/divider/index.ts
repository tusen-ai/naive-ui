import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NDividerImpl from './src/Divider'

export { dividerProps } from './src/Divider'
export type { DividerProps } from './src/Divider'

export const NDivider: WithNativeAttrs<typeof NDividerImpl, HTMLAttributes>
  = NDividerImpl

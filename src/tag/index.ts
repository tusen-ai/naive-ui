import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NTagImpl from './src/Tag'

export type * from './src/public-types'
export { tagProps } from './src/Tag'
export type { TagProps, TagSlots } from './src/Tag'

export const NTag: WithNativeAttrs<typeof NTagImpl, HTMLAttributes> = NTagImpl

import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NAnchorImpl from './src/AnchorAdapter'
import NAnchorLinkImpl from './src/Link'

export { anchorProps } from './src/AnchorAdapter'
export type { AnchorInst, AnchorProps } from './src/AnchorAdapter'
export { anchorLinkProps } from './src/Link'
export type { AnchorLinkProps } from './src/Link'
export type * from './src/public-types'

export const NAnchor: WithNativeAttrs<typeof NAnchorImpl, HTMLAttributes>
  = NAnchorImpl
export const NAnchorLink: WithNativeAttrs<
  typeof NAnchorLinkImpl,
  HTMLAttributes
> = NAnchorLinkImpl

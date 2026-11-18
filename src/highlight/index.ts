import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NHighlightImpl from './src/Highlight'

export { highlightProps } from './src/Highlight'
export type * from './src/public-types'

export const NHighlight: WithNativeAttrs<
  typeof NHighlightImpl,
  HTMLAttributes
> = NHighlightImpl

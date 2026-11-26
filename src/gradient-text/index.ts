import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NGradientTextImpl from './src/GradientText'

export { gradientTextProps } from './src/GradientText'
export type { GradientTextProps } from './src/GradientText'

export const NGradientText: WithNativeAttrs<
  typeof NGradientTextImpl,
  HTMLAttributes
> = NGradientTextImpl

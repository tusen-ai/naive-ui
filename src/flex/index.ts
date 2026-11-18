import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NFlexImpl from './src/Flex'

export { flexProps } from './src/Flex'
export type { FlexProps } from './src/Flex'
export type { FlexAlign, FlexJustify } from './src/type'

export const NFlex: WithNativeAttrs<typeof NFlexImpl, HTMLAttributes>
  = NFlexImpl

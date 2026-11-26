import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NScrollbarImpl from './src/Scrollbar'

export { scrollbarProps } from './src/Scrollbar'
export type { ScrollbarInst, ScrollbarProps } from './src/Scrollbar'

export const NScrollbar: WithNativeAttrs<
  typeof NScrollbarImpl,
  Omit<HTMLAttributes, 'role'>
> = NScrollbarImpl

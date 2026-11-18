import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NButtonImpl from './src/Button'

export { buttonProps, XButton as NxButton } from './src/Button'
export type { ButtonProps, ButtonSlots } from './src/Button'
export type * from './src/public-types'

export const NButton: WithNativeAttrs<
  typeof NButtonImpl,
  ButtonHTMLAttributes & AnchorHTMLAttributes
> = NButtonImpl

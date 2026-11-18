import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NPopconfirmImpl from './src/Popconfirm'

export type { PopconfirmInst } from './src/interface'
export { popconfirmProps } from './src/Popconfirm'
export type { PopconfirmProps, PopconfirmSlots } from './src/Popconfirm'

export const NPopconfirm: WithNativeAttrs<
  typeof NPopconfirmImpl,
  HTMLAttributes
> = NPopconfirmImpl

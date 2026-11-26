import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NCascaderImpl from './src/Cascader'

export { cascaderProps } from './src/Cascader'
export type { CascaderProps, CascaderSlots } from './src/Cascader'
export type { CascaderInst, CascaderOption } from './src/interface'
export type * from './src/public-types'

export const NCascader: WithNativeAttrs<typeof NCascaderImpl, HTMLAttributes>
  = NCascaderImpl

import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NSelectImpl from './src/Select'

export type {
  NodeProps as SelectNodeProps,
  RenderLabelImpl as SelectRenderLabel,
  RenderOptionImpl as SelectRenderOption
} from '../_internal/select-menu/src/interface'
export type { RenderTag as SelectRenderTag } from '../_internal/selection/src/interface'
export type {
  SelectFilter,
  SelectGroupOption,
  SelectInst,
  SelectOption
} from './src/interface'
export type * from './src/public-types'
export { selectProps } from './src/Select'
export type { SelectProps, SelectSlots } from './src/Select'

export const NSelect: WithNativeAttrs<typeof NSelectImpl, HTMLAttributes>
  = NSelectImpl

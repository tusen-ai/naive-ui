import { VNodeChild } from 'vue'
import type {
  SelectBaseOption,
  SelectGroupOption,
  SelectIgnoredOption
} from '../../../select/src/interface'

export type Size = 'small' | 'medium' | 'large' | 'huge'

export type RenderLabel = (
  option: SelectBaseOption & SelectGroupOption & SelectIgnoredOption,
  selected: boolean
) => VNodeChild

export type RenderLabelImpl = (
  option: SelectBaseOption | SelectGroupOption | SelectIgnoredOption,
  selected: boolean
) => VNodeChild

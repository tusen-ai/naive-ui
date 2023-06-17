import { type VNodeChild } from 'vue'
import type { SelectOption } from '../../../select/src/interface'

export type RenderTag = (props: {
  option: SelectOption
  handleClose: () => void
}) => VNodeChild

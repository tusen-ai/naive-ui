import { VNodeChild } from 'vue'
import type { SelectBaseOption } from '../../../select/src/interface'

export type RenderTag = (props: {
  option: SelectBaseOption
  handleClose: () => void
}) => VNodeChild

import { PropType, VNodeChild } from 'vue'
import type { ExtractPublicPropTypes } from '../../_utils'
import { keysOf } from '../../_utils'
import type { IconPlacement } from './interface'

const dialogProps = {
  icon: Function as PropType<() => VNodeChild>,
  type: {
    type: String as PropType<
    'info' | 'success' | 'warning' | 'error' | 'default'
    >,
    default: 'default'
  },
  title: [String, Function] as PropType<string | (() => VNodeChild)>,
  closable: {
    type: Boolean,
    default: true
  },
  draggable: Boolean,
  negativeText: String,
  positiveText: String,
  content: [String, Function] as PropType<string | (() => VNodeChild)>,
  action: Function as PropType<() => VNodeChild>,
  showIcon: {
    type: Boolean,
    default: true
  },
  loading: Boolean,
  bordered: Boolean,
  iconPlacement: String as PropType<IconPlacement>,
  onPositiveClick: Function as PropType<(e: MouseEvent) => void>,
  onNegativeClick: Function as PropType<(e: MouseEvent) => void>,
  onClose: Function as PropType<() => void>
} as const

export type DialogProps = ExtractPublicPropTypes<typeof dialogProps>
export { dialogProps }
export const dialogPropKeys = keysOf(dialogProps)

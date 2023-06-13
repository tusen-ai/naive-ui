import type { PropType, VNodeChild } from 'vue'
import type { ButtonProps } from '../../button'
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
  negativeText: String,
  positiveText: String,
  positiveButtonProps: Object as PropType<ButtonProps>,
  negativeButtonProps: Object as PropType<ButtonProps>,
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

import type { CSSProperties, PropType, VNodeChild } from 'vue'
import type { ButtonProps } from '../../button'
import type { ExtractPublicPropTypes } from '../../_utils'
import { keysOf } from '../../_utils'
import type { MaybeRefOrGetter } from '../../discrete/src/interface'
import type { IconPlacement } from './interface'

const dialogProps = {
  icon: Function as PropType<() => VNodeChild>,
  type: {
    type: String as PropType<
      'info' | 'success' | 'warning' | 'error' | 'default'
    >,
    default: 'default'
  },
  title: [String, Function] as PropType<
    MaybeRefOrGetter<string> | (() => VNodeChild)
  >,
  closable: {
    type: Boolean,
    default: true
  },
  negativeText: String as PropType<MaybeRefOrGetter<string>>,
  positiveText: String as PropType<MaybeRefOrGetter<string>>,
  positiveButtonProps: Object as PropType<ButtonProps>,
  negativeButtonProps: Object as PropType<ButtonProps>,
  content: [String, Function] as PropType<
    MaybeRefOrGetter<string> | (() => VNodeChild)
  >,
  action: Function as PropType<() => VNodeChild>,
  showIcon: {
    type: Boolean,
    default: true
  },
  loading: Boolean as PropType<MaybeRefOrGetter<boolean>>,
  bordered: Boolean,
  iconPlacement: String as PropType<IconPlacement>,
  titleClass: [String, Array] as PropType<string | Array<string | undefined>>,
  titleStyle: [String, Object] as PropType<string | CSSProperties>,
  contentClass: [String, Array] as PropType<string | Array<string | undefined>>,
  contentStyle: [String, Object] as PropType<string | CSSProperties>,
  actionClass: [String, Array] as PropType<string | Array<string | undefined>>,
  actionStyle: [String, Object] as PropType<string | CSSProperties>,
  onPositiveClick: Function as PropType<(e: MouseEvent) => void>,
  onNegativeClick: Function as PropType<(e: MouseEvent) => void>,
  onClose: Function as PropType<() => void>
} as const

export type DialogProps = ExtractPublicPropTypes<typeof dialogProps>
export { dialogProps }
export const dialogPropKeys = keysOf(dialogProps)

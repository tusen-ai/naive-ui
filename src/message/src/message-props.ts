import type { ExtractPropTypes, PropType, VNodeChild } from 'vue'
import type { BaseLoadingExposedProps } from '../../_internal'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { MessageType } from './types'

export const messageProps = {
  icon: Function as PropType<() => VNodeChild>,
  type: {
    type: String as PropType<MessageType>,
    default: 'info'
  },
  content: [String, Number, Function] as PropType<
    string | number | (() => VNodeChild)
  >,
  showIcon: {
    type: Boolean,
    default: true
  },
  closable: Boolean,
  keepAliveOnHover: Boolean,
  spinProps: { type: Object as PropType<BaseLoadingExposedProps> },
  onClose: Function as PropType<() => void>,
  onMouseenter: Function as PropType<(e: MouseEvent) => void>,
  onMouseleave: Function as PropType<(e: MouseEvent) => void>
} as const

export type MessageProps = ExtractPublicPropTypes<typeof messageProps>
export type MessageSetupProps = ExtractPropTypes<typeof messageProps>

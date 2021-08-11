import { PropType, VNodeChild } from 'vue'

export type MessageType = 'info' | 'success' | 'warning' | 'error' | 'loading'

export type CssClassItem = string | Record<string, any>
export type CssClass = CssClassItem | CssClassItem[]

export const messageProps = {
  icon: Function as PropType<() => VNodeChild>,
  type: {
    type: String as PropType<MessageType>,
    default: 'info'
  },
  content: [String, Number, Function] as PropType<
  string | number | (() => VNodeChild)
  >,
  closable: Boolean,
  onClose: Function as PropType<() => void>,
  cssClassWrapper: [String, Object, Array] as PropType<CssClass>
} as const

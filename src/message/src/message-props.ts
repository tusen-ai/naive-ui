import { PropType, VNodeChild } from 'vue'

export type MessageType = 'info' | 'success' | 'warning' | 'error' | 'loading'

export const messageProps = {
  icon: Function as PropType<() => VNodeChild>,
  type: {
    type: String as PropType<MessageType>,
    default: 'info'
  },
  content: {
    type: [String, Number, Boolean, Function] as PropType<
    string | number | boolean | (() => VNodeChild)
    >,
    default: undefined
  },
  closable: {
    type: Boolean,
    default: false
  },
  onClose: Function as PropType<() => void>
} as const

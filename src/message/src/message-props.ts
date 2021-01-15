import { PropType, VNodeChild } from 'vue'

export type MessageType = 'info' | 'success' | 'warning' | 'error' | 'loading'

export const messageProps = {
  icon: {
    type: Function as PropType<() => VNodeChild>,
    default: undefined
  },
  type: {
    type: String as PropType<MessageType>,
    default: 'info'
  },
  content: {
    type: [String, Number, Function] as PropType<string | (() => VNodeChild)>,
    default: undefined
  },
  closable: {
    type: Boolean,
    default: false
  },
  onClose: {
    type: Function,
    default: undefined
  }
} as const

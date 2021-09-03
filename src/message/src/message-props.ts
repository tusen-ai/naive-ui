import { PropType, VNodeChild, CSSProperties } from 'vue';

export type MessageType = 'info' | 'success' | 'warning' | 'error' | 'loading'

export const messageProps = {
  icon: Function as PropType<() => VNodeChild>,
  type: {
    type: String as PropType<MessageType>,
    default: 'info'
  },
  content: [String, Number, Function] as PropType<
  string | number | (() => VNodeChild)
  >,
  style: Object as PropType<CSSProperties>,
  closable: Boolean,
  onClose: Function as PropType<() => void>
} as const

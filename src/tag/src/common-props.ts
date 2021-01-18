import { PropType } from 'vue'

export default {
  type: {
    type: String as PropType<
    'default' | 'success' | 'info' | 'warning' | 'error'
    >,
    default: 'default'
  },
  round: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  closable: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
} as const

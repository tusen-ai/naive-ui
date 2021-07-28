import { PropType } from 'vue'

export default {
  color: String,
  textColor: String,
  type: {
    type: String as PropType<
    'default' | 'primary' | 'success' | 'info' | 'warning' | 'error'
    >,
    default: 'default'
  },
  round: Boolean,
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  closable: Boolean,
  disabled: Boolean
} as const

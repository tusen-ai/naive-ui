import { type PropType } from 'vue'

export interface TagColor {
  color?: string
  borderColor?: string
  textColor?: string
}

export default {
  color: Object as PropType<TagColor>,
  type: {
    type: String as PropType<
    'default' | 'primary' | 'success' | 'info' | 'warning' | 'error'
    >,
    default: 'default'
  },
  round: Boolean,
  size: {
    type: String as PropType<'tiny' | 'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  closable: Boolean,
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  }
} as const

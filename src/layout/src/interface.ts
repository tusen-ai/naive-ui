import { PropType } from 'vue'

export const positionProp = {
  type: String as PropType<'static' | 'absolute'>,
  default: 'static'
}

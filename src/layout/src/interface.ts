import { PropType } from 'vue'

export const positionProp = {
  type: String as PropType<'static' | 'absolute'>,
  default: 'static'
}

export interface LayoutRef {
  scrollTo: ((options: ScrollToOptions) => void) &
  ((x: number, y: number) => void)
}

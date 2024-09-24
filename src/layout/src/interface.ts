import type { PropType, Ref } from 'vue'
import { createInjectionKey } from '../../_utils'

export const layoutSiderInjectionKey = createInjectionKey<{
  collapsedRef: Ref<boolean>
  collapseModeRef: Ref<'transform' | 'width'>
}>('n-layout-sider')

export const positionProp = {
  type: String as PropType<'static' | 'absolute'>,
  default: 'static'
} as const

export interface LayoutInst {
  scrollTo: ((options: ScrollToOptions) => void) &
    ((x: number, y: number) => void)
}

export type LayoutSiderInst = LayoutInst

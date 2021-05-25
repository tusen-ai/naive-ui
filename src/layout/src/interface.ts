import { InjectionKey, PropType, Ref } from 'vue'

export const layoutSiderInjectionKey: InjectionKey<{
  collapsedRef: Ref<boolean>
}> = Symbol('layoutSiderInjection')

export const positionProp = {
  type: String as PropType<'static' | 'absolute'>,
  default: 'static'
} as const

export interface LayoutInst {
  scrollTo: ((options: ScrollToOptions) => void) &
  ((x: number, y: number) => void)
}

export type LayoutSiderInst = LayoutInst

import { InjectionKey, PropType, Ref } from 'vue'

export const layoutAsideInjectionKey: InjectionKey<{
  collapsedRef: Ref<boolean>
  collapseModeRef: Ref<'transform' | 'width'>
}> = Symbol('layoutAsideInjection')

export const positionProp = {
  type: String as PropType<'static' | 'absolute'>,
  default: 'static'
} as const

export interface LayoutInst {
  scrollTo: ((options: ScrollToOptions) => void) &
  ((x: number, y: number) => void)
}

export type LayoutAsideInst = LayoutInst

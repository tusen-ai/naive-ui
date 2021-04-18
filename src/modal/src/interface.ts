import { Ref, ComponentPublicInstance, InjectionKey } from 'vue'
import type { MergedTheme } from '../../_mixins'
import type { ModalTheme } from '../styles'

export type ModalBodyInjection = Ref<
HTMLElement | ComponentPublicInstance | null
> | null

export const modalBodyInjectionKey: InjectionKey<ModalBodyInjection> = Symbol(
  'modalBody'
)

export interface ModalInjection {
  getMousePosition: () => {
    x: number
    y: number
  } | null
  mergedClsPrefixRef: Ref<string>
  mergedThemeRef: Ref<MergedTheme<ModalTheme>>
  isMountedRef: Ref<boolean>
  appearRef: Ref<boolean | undefined>
}

export const modalInjectionKey: InjectionKey<ModalInjection> = Symbol('modal')

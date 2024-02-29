import type { Ref, ComponentPublicInstance } from 'vue'
import type { MergedTheme } from '../../_mixins'
import { createInjectionKey } from '../../_utils/vue/create-injection-key'
import type { ModalTheme } from '../styles'

export type ModalBodyInjection = Ref<
HTMLElement | ComponentPublicInstance | null
> | null

export const modalBodyInjectionKey =
  createInjectionKey<ModalBodyInjection>('n-modal-body')

export interface ModalProviderInjection {
  clickedRef: Ref<boolean>
  clickedPositionRef: Ref<{ x: number, y: number } | null>
}

export const modalProviderInjectionKey =
  createInjectionKey<ModalProviderInjection>('n-modal-provider')

export interface ModalInjection {
  getMousePosition: () => {
    x: number
    y: number
  } | null
  mergedClsPrefixRef: Ref<string>
  mergedThemeRef: Ref<MergedTheme<ModalTheme>>
  isMountedRef: Ref<boolean>
  appearRef: Ref<boolean | undefined>
  transformOriginRef: Ref<'mouse' | 'center'>
}

export const modalInjectionKey = createInjectionKey<ModalInjection>('n-modal')

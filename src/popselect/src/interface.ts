import { Ref } from '@vue/reactivity'
import { InjectionKey } from 'vue'
import type { MergedTheme } from '../../_mixins'
import type { PopselectTheme } from '../styles'

export type PopselectSize = 'small' | 'medium' | 'large' | 'huge'

export interface PopselectInjection {
  mergedThemeRef: Ref<MergedTheme<PopselectTheme>>
  setShow: (value: boolean) => void
  syncPosition: () => void
}

export const popselectInjectionKey: InjectionKey<PopselectInjection> = Symbol(
  'popselect'
)

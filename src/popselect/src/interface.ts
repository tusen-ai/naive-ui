import { Ref } from 'vue'
import type { MergedTheme } from '../../_mixins'
import { createInjectionKey } from '../../_utils'
import type { PopselectTheme } from '../styles'

export type PopselectSize = 'small' | 'medium' | 'large' | 'huge'

export interface PopselectInjection {
  mergedThemeRef: Ref<MergedTheme<PopselectTheme>>
  setShow: (value: boolean) => void
  syncPosition: () => void
}

export const popselectInjectionKey =
  createInjectionKey<PopselectInjection>('n-popselect')

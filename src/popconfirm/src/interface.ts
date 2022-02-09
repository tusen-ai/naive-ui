import { Ref } from 'vue'
import type { MergedTheme } from '../../_mixins'
import { createInjectionKey } from '../../_utils'
import type { PopconfirmTheme } from '../styles'

export interface PopconfirmInjection {
  mergedThemeRef: Ref<MergedTheme<PopconfirmTheme>>
  mergedClsPrefixRef: Ref<string>
}

export const popconfirmInjectionKey =
  createInjectionKey<PopconfirmInjection>('n-popconfirm')

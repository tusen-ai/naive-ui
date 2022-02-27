import { Ref } from 'vue'
import type { MergedTheme } from '../../_mixins'
import { createInjectionKey } from '../../_utils'
import type { PopconfirmTheme } from '../styles'
import type { PopconfirmSetupProps } from './Popconfirm'

export interface PopconfirmInjection {
  mergedThemeRef: Ref<MergedTheme<PopconfirmTheme>>
  mergedClsPrefixRef: Ref<string>
  props: PopconfirmSetupProps
}

export const popconfirmInjectionKey =
  createInjectionKey<PopconfirmInjection>('n-popconfirm')

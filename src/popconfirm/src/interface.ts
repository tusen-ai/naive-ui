import { type Ref } from 'vue'
import type { PopoverInst } from '../../popover'
import type { MergedTheme } from '../../_mixins'
import { createInjectionKey } from '../../_utils'
import type { PopconfirmTheme } from '../styles'
import type { PopconfirmSetupProps } from './Popconfirm'

export type PopconfirmInst = PopoverInst

export interface PopconfirmInjection {
  mergedThemeRef: Ref<MergedTheme<PopconfirmTheme>>
  mergedClsPrefixRef: Ref<string>
  props: PopconfirmSetupProps
}

export const popconfirmInjectionKey =
  createInjectionKey<PopconfirmInjection>('n-popconfirm')

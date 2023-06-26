import { type Ref } from 'vue'
import type { PopoverInst } from '../../popover/src/interface'
import type { MergedTheme } from '../../_mixins'
import { createInjectionKey } from '../../_utils'
import type { PopselectTheme } from '../styles'
import type { PopselectSetupProps } from './Popselect'

export type PopselectSize = 'small' | 'medium' | 'large' | 'huge'

export interface PopselectInjection {
  props: PopselectSetupProps
  mergedThemeRef: Ref<MergedTheme<PopselectTheme>>
  setShow: (value: boolean) => void
  syncPosition: () => void
}

export type PopselectInst = PopoverInst

export const popselectInjectionKey =
  createInjectionKey<PopselectInjection>('n-popselect')

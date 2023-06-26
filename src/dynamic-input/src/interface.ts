import type { Ref } from 'vue'
import type { MergedTheme } from '../../_mixins'
import { createInjectionKey } from '../../_utils'
import type { DynamicInputTheme } from '../styles'

export interface DynamicInputInjection {
  mergedThemeRef: Ref<MergedTheme<DynamicInputTheme>>
  keyPlaceholderRef: Ref<string | undefined>
  valuePlaceholderRef: Ref<string | undefined>
  placeholderRef: Ref<string | undefined>
}

export const dynamicInputInjectionKey =
  createInjectionKey<DynamicInputInjection>('n-dynamic-input')

export type OnUpdateValue = <T>(value: T[]) => void

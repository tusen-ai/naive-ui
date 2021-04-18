import { InjectionKey, Ref } from 'vue'
import type { MergedTheme } from '../../_mixins'
import type { DynamicInputTheme } from '../styles'

export interface DynamicInputInjection {
  mergedThemeRef: Ref<MergedTheme<DynamicInputTheme>>
  keyPlaceholderRef: Ref<string | undefined>
  valuePlaceholderRef: Ref<string | undefined>
  placeholderRef: Ref<string | undefined>
}

export const dynamicInputInjectionKey: InjectionKey<DynamicInputInjection> = Symbol(
  'dynamic-input'
)

export type OnUpdateValue = <T>(value: T[]) => void

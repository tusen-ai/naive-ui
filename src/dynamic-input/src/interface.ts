import { InjectionKey } from 'vue'
import type { MergedTheme } from '../../_mixins'
import type { DynamicInputTheme } from '../styles'

export interface DynamicInputInjection {
  mergedTheme: MergedTheme<DynamicInputTheme>
  keyPlaceholder?: string
  valuePlaceholder?: string
  placeholder?: string
}

export const dynamicInputInjectionKey: InjectionKey<DynamicInputInjection> = Symbol(
  'dynamic-input'
)

export type OnUpdateValue = <T>(value: T[]) => void

import type { MergedTheme } from '../../_mixins'
import type { DynamicInputTheme } from '../styles'

export interface DynamicInputInjection {
  mergedTheme: MergedTheme<DynamicInputTheme>
  keyPlaceholder?: string
  valuePlaceholder?: string
  placeholder?: string
}

export type OnUpdateValue = <T>(value: T[]) => void

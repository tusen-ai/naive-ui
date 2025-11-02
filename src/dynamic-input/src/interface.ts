import type { Ref } from 'vue'
import type { MergedTheme } from '../../_mixins'
import type { DynamicInputTheme } from '../styles'
import { createInjectionKey } from '../../_utils'

export interface DynamicInputInjection {
  mergedThemeRef: Ref<MergedTheme<DynamicInputTheme>>
  keyPlaceholderRef: Ref<string | undefined>
  valuePlaceholderRef: Ref<string | undefined>
  placeholderRef: Ref<string | undefined>
}

export const dynamicInputInjectionKey
  = createInjectionKey<DynamicInputInjection>('n-dynamic-input')

export type OnUpdateValue = <T>(value: T[]) => void

export interface DynamicInputDefaultSlotProps {
  value: any
  index: number
}

export interface DynamicInputActionSlotProps {
  value: any
  index: number
  create: (index: number) => void
  remove: (index: number) => void
  move: (type: 'up' | 'down', index: number) => void
}

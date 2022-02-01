import { ComputedRef, Ref, Slots } from 'vue'
import type { MergedTheme } from '../../_mixins'
import { createInjectionKey } from '../../_utils'
import type { GradientPickerTheme } from '../styles'
import type { RenderLabel } from './interface'

export const gradientPickerInjectionKey = createInjectionKey<{
  themeRef: ComputedRef<MergedTheme<GradientPickerTheme>>
  gradientPickerSlots: Slots
  renderLabelRef: Ref<RenderLabel | undefined>
}>('n-gradient-picker')

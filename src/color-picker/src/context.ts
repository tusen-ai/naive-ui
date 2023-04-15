import type { ComputedRef, Ref, Slots } from 'vue'
import type { MergedTheme } from '../../_mixins'
import { createInjectionKey } from '../../_utils'
import type { ColorPickerTheme } from '../styles'
import type { RenderLabel } from './interface'

export const colorPickerInjectionKey = createInjectionKey<{
  themeRef: ComputedRef<MergedTheme<ColorPickerTheme>>
  colorPickerSlots: Slots
  renderLabelRef: Ref<RenderLabel | undefined>
}>('n-color-picker')

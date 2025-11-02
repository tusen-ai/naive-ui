import type { ComputedRef, Ref } from 'vue'
import type { MergedTheme } from '../../_mixins'
import type { ColorPickerTheme } from '../styles'
import type { ColorPickerSlots } from './ColorPicker'
import type { RenderLabel } from './interface'
import { createInjectionKey } from '../../_utils'

export const colorPickerInjectionKey = createInjectionKey<{
  themeRef: ComputedRef<MergedTheme<ColorPickerTheme>>
  colorPickerSlots: ColorPickerSlots
  renderLabelRef: Ref<RenderLabel | undefined>
}>('n-color-picker')

import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import { commonLight } from '../../_styles/common'

export interface ButtonGroupThemeVars {}

const buttonGroupLight: ButtonGroupTheme = {
  name: 'ButtonGroup',
  common: commonLight
}

export interface ButtonGroupTheme extends Theme<
  'ButtonGroup',
  ButtonGroupThemeVars
> {}

export interface ButtonGroupThemeOverrides extends ExtractThemeOverrides<ButtonGroupTheme> {}

export default buttonGroupLight

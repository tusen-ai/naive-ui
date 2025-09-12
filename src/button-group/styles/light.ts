import type { Theme } from '../../_mixins'
import { commonLight } from '../../_styles/common'

export interface ButtonGroupThemeVars {}

const buttonGroupLight: Theme<'ButtonGroup', ButtonGroupThemeVars> = {
  name: 'ButtonGroup',
  common: commonLight
}

export default buttonGroupLight
export type ButtonGroupTheme = typeof buttonGroupLight

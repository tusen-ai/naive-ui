import { commonLight } from '../../_styles/common'
import type { Theme } from '../../_mixins'

export interface ButtonGroupThemeVars {}

const buttonGroupLight: Theme<'ButtonGroup', ButtonGroupThemeVars> = {
  name: 'ButtonGroup',
  common: commonLight
}

export default buttonGroupLight
export type ButtonGroupTheme = typeof buttonGroupLight

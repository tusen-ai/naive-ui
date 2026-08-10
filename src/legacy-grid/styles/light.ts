import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import { commonLight } from '../../_styles/common'

export interface RowThemeVars {}

const rowLight: RowTheme = {
  name: 'Row',
  common: commonLight
}

export interface RowTheme extends Theme<'Row', RowThemeVars> {}

export interface RowThemeOverrides extends ExtractThemeOverrides<RowTheme> {}

export default rowLight

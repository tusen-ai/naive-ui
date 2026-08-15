import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import { commonLight } from '../../_styles/common'

export interface ElementThemeVars {}

const elementLight: ElementTheme = {
  name: 'Element',
  common: commonLight
}

export interface ElementTheme extends Theme<'Element', ElementThemeVars> {}

export interface ElementThemeOverrides extends ExtractThemeOverrides<ElementTheme> {}

export default elementLight

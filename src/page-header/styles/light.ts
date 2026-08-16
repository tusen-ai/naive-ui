import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import common from './_common'

export function self(vars: ThemeCommonVars) {
  const {
    textColor1,
    textColor2,
    textColor3,
    fontSize,
    fontWeightStrong,
    primaryColorHover,
    primaryColorPressed
  } = vars
  return {
    ...common,
    titleFontWeight: fontWeightStrong,
    fontSize,
    titleTextColor: textColor1,
    backColor: textColor2,
    backColorHover: primaryColorHover,
    backColorPressed: primaryColorPressed,
    subtitleTextColor: textColor3
  }
}

export const pageHeaderLight: PageHeaderTheme = createTheme({
  name: 'PageHeader',
  common: commonLight,
  self
})

export interface PageHeaderThemeVars extends ReturnType<typeof self> {}

export interface PageHeaderTheme extends Theme<
  'PageHeader',
  PageHeaderThemeVars
> {}

export interface PageHeaderThemeOverrides extends ExtractThemeOverrides<PageHeaderTheme> {}

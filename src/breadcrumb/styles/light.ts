import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'
import commonVariables from './_common'

export function self(vars: ThemeCommonVars) {
  const {
    fontSize,
    textColor3,
    textColor2,
    borderRadius,
    buttonColor2Hover,
    buttonColor2Pressed
  } = vars
  return {
    ...commonVariables,
    fontSize,
    itemLineHeight: '1.25',
    itemTextColor: textColor3,
    itemTextColorHover: textColor2,
    itemTextColorPressed: textColor2,
    itemTextColorActive: textColor2,
    itemBorderRadius: borderRadius,
    itemColorHover: buttonColor2Hover,
    itemColorPressed: buttonColor2Pressed,
    separatorColor: textColor3
  }
}

export interface BreadcrumbThemeVars extends ReturnType<typeof self> {}

const breadcrumbLight: BreadcrumbTheme = {
  name: 'Breadcrumb',
  common: commonLight,
  self
}

export interface BreadcrumbTheme extends Theme<
  'Breadcrumb',
  BreadcrumbThemeVars
> {}

export interface BreadcrumbThemeOverrides extends ExtractThemeOverrides<BreadcrumbTheme> {}

export default breadcrumbLight

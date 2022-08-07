import commonVariables from './_common'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
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

export type BreadcrumbThemeVars = ReturnType<typeof self>

const breadcrumbLight: Theme<'Breadcrumb', BreadcrumbThemeVars> = {
  name: 'Breadcrumb',
  common: commonLight,
  self
}

export default breadcrumbLight
export type BreadcrumbTheme = typeof breadcrumbLight

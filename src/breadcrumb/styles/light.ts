import commonVariables from './_common'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const {
    fontSize,
    textColor3,
    primaryColorHover,
    primaryColorPressed,
    textColor2
  } = vars
  return {
    ...commonVariables,
    fontSize: fontSize,
    itemTextColor: textColor3,
    itemTextColorHover: primaryColorHover,
    itemTextColorPressed: primaryColorPressed,
    itemTextColorActive: textColor2,
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

import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { type Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const {
    popoverColor,
    textColor2,
    buttonColor2Hover,
    buttonColor2Pressed,
    primaryColor,
    primaryColorHover,
    primaryColorPressed,
    borderRadius
  } = vars
  return {
    color: popoverColor,
    colorHover: buttonColor2Hover,
    colorPressed: buttonColor2Pressed,
    colorPrimary: primaryColor,
    colorPrimaryHover: primaryColorHover,
    colorPrimaryPressed: primaryColorPressed,
    textColor: textColor2,
    boxShadow: '0 2px 8px 0px rgba(0, 0, 0, .16)',
    boxShadowHover: '0 2px 12px 0px rgba(0, 0, 0, .24)',
    boxShadowPressed: '0 2px 12px 0px rgba(0, 0, 0, .24)',
    textColorPrimary: '#fff',
    borderRadiusSquare: borderRadius
  }
}

export type FloatButtonThemeVars = ReturnType<typeof self>

const themeLight: Theme<'FloatButton', FloatButtonThemeVars> = {
  name: 'FloatButton',
  common: commonLight,
  self
}

export default themeLight
export type FloatButtonTheme = typeof themeLight

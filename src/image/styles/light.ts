import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const {
    primaryColorHover,
    textColor2,
    popoverColor,
    borderRadius,
    boxShadow2
  } = vars
  return {
    iconColor: 'rgba(255, 255, 255, .9)',
    color: popoverColor,
    textColor: textColor2,
    textColorHover: primaryColorHover,
    borderRadius,
    boxShadow: boxShadow2
  }
}

export type ImageThemeVars = ReturnType<typeof self>

const imageLight: Theme<'Image', ImageThemeVars> = {
  name: 'Image',
  common: commonLight,
  self
}

export default imageLight
export type ImageTheme = typeof imageLight

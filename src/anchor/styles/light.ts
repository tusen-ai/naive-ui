import { changeColor } from 'seemly'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'
import commonVars from './_common'

const self = (vars: ThemeCommonVars) => {
  const {
    borderRadius,
    railColorOverlay,
    primaryColor,
    primaryColorHover,
    primaryColorPressed,
    textColor2Overlay
  } = vars
  return {
    ...commonVars,
    borderRadius,
    railColor: railColorOverlay,
    railColorActive: primaryColor,
    linkColor: changeColor(primaryColor, { alpha: 0.15 }),
    linkTextColor: textColor2Overlay,
    linkTextColorHover: primaryColorHover,
    linkTextColorPressed: primaryColorPressed,
    linkTextColorActive: primaryColor
  }
}

export type AnchorThemeVars = ReturnType<typeof self>

const anchorLight: Theme<AnchorThemeVars> = {
  name: 'Anchor',
  common: commonLight,
  self
}

export default anchorLight
export type AnchorTheme = typeof anchorLight

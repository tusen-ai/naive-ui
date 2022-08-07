import { changeColor } from 'seemly'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'
import commonVars from './_common'

export const self = (vars: ThemeCommonVars) => {
  const {
    borderRadius,
    railColor,
    primaryColor,
    primaryColorHover,
    primaryColorPressed,
    textColor2
  } = vars
  return {
    ...commonVars,
    borderRadius,
    railColor,
    railColorActive: primaryColor,
    linkColor: changeColor(primaryColor, { alpha: 0.15 }),
    linkTextColor: textColor2,
    linkTextColorHover: primaryColorHover,
    linkTextColorPressed: primaryColorPressed,
    linkTextColorActive: primaryColor
  }
}

export type AnchorThemeVars = ReturnType<typeof self>

const anchorLight: Theme<'Anchor', AnchorThemeVars> = {
  name: 'Anchor',
  common: commonLight,
  self
}

export default anchorLight
export type AnchorTheme = typeof anchorLight

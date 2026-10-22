import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { changeColor } from 'seemly'
import { commonLight } from '../../_styles/common'
import commonVars from './_common'

export function self(vars: ThemeCommonVars) {
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

export interface AnchorThemeVars extends ReturnType<typeof self> {}

const anchorLight: AnchorTheme = {
  name: 'Anchor',
  common: commonLight,
  self
}

export interface AnchorTheme extends Theme<'Anchor', AnchorThemeVars> {}

export interface AnchorThemeOverrides extends ExtractThemeOverrides<AnchorTheme> {}

export default anchorLight

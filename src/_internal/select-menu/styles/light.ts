import { emptyLight } from '../../../empty/styles'
import { scrollbarLight } from '../../../scrollbar/styles'
import { commonLight } from '../../../_styles/common'
import type { ThemeCommonVars } from '../../../_styles/common'
import commonVariables from './_common'
import { createTheme } from '../../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const {
    borderRadius,
    popoverColor,
    boxShadow2,
    textColor3,
    dividerColorOverlay,
    textColor2,
    primaryColorPressed,
    textColorDisabled,
    primaryColor,
    opacityDisabled,
    hoverColorOverlay,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeHuge,
    heightSmall,
    heightMedium,
    heightLarge,
    heightHuge
  } = vars
  return {
    ...commonVariables,
    optionFontSizeSmall: fontSizeSmall,
    optionFontSizeMedium: fontSizeMedium,
    optionFontSizeLarge: fontSizeLarge,
    optionFontSizeHuge: fontSizeHuge,
    optionHeightSmall: heightSmall,
    optionHeightMedium: heightMedium,
    optionHeightLarge: heightLarge,
    optionHeightHuge: heightHuge,
    borderRadius: borderRadius,
    color: popoverColor,
    boxShadow: boxShadow2,
    groupHeaderTextColor: textColor3,
    actionDividerColor: dividerColorOverlay,
    optionTextColor: textColor2,
    optionTextColorPressed: primaryColorPressed,
    optionTextColorDisabled: textColorDisabled,
    optionTextColorActive: primaryColor,
    optionOpacityDisabled: opacityDisabled,
    optionCheckColor: primaryColor,
    optionColorPending: hoverColorOverlay,
    actionTextColor: textColor2
  }
}

export type InternalSelectMenuThemeVars = ReturnType<typeof self>

const internalSelectMenuLight = createTheme({
  name: 'InternalSelectMenu',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight,
    Empty: emptyLight
  },
  self
})

export default internalSelectMenuLight
export type InternalSelectMenuTheme = typeof internalSelectMenuLight

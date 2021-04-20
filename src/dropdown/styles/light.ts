import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins/use-theme'
import commonVariables from './_common'
import { popoverLight } from '../../popover/styles'

export const self = (vars: ThemeCommonVars) => {
  const {
    primaryColor,
    textColor2,
    boxShadow2,
    dividerColor,
    hoverColor,
    popoverColor,
    borderRadius,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeHuge,
    heightSmall,
    heightMedium,
    heightLarge,
    heightHuge,
    textColor3
  } = vars
  return {
    ...commonVariables,
    optionHeightSmall: heightSmall,
    optionHeightMedium: heightMedium,
    optionHeightLarge: heightLarge,
    optionHeightHuge: heightHuge,
    optionTextColor: textColor2,
    optionTextColorActive: primaryColor,
    color: popoverColor,
    dividerColor,
    borderRadius,
    boxShadow: boxShadow2,
    suffixColor: textColor2,
    prefixColor: textColor2,
    optionColorHover: hoverColor,
    groupHeaderTextColor: textColor3,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeHuge
  }
}

export type DropdownThemeVars = ReturnType<typeof self>

const dropdownLight = createTheme({
  name: 'Dropdown',
  common: commonLight,
  peers: {
    Popover: popoverLight
  },
  self
})

export type DropdownTheme = typeof dropdownLight
export default dropdownLight

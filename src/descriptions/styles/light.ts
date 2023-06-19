import { composite } from 'seemly'
import commonVariables from './_common'
import { commonLight, type ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins/use-theme'

export const self = (vars: ThemeCommonVars) => {
  const {
    tableHeaderColor,
    textColor2,
    textColor1,
    cardColor,
    modalColor,
    popoverColor,
    dividerColor,
    borderRadius,
    fontWeightStrong,
    lineHeight,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge
  } = vars
  return {
    ...commonVariables,
    lineHeight,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    titleTextColor: textColor1,
    thColor: composite(cardColor, tableHeaderColor),
    thColorModal: composite(modalColor, tableHeaderColor),
    thColorPopover: composite(popoverColor, tableHeaderColor),
    thTextColor: textColor1,
    thFontWeight: fontWeightStrong,
    tdTextColor: textColor2,
    tdColor: cardColor,
    tdColorModal: modalColor,
    tdColorPopover: popoverColor,
    borderColor: composite(cardColor, dividerColor),
    borderColorModal: composite(modalColor, dividerColor),
    borderColorPopover: composite(popoverColor, dividerColor),
    borderRadius
  }
}

export type DescriptionsThemeVars = ReturnType<typeof self>

const descriptionsLight: Theme<'Descriptions', DescriptionsThemeVars> = {
  name: 'Descriptions',
  common: commonLight,
  self
}

export default descriptionsLight
export type DescriptionsTheme = typeof descriptionsLight

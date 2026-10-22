import type { ExtractThemeOverrides, Theme } from '../../_mixins/use-theme'
import type { ThemeCommonVars } from '../../_styles/common'
import { composite } from 'seemly'
import { commonLight } from '../../_styles/common'
import commonVariables from './_common'

export function self(vars: ThemeCommonVars) {
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

export interface DescriptionsThemeVars extends ReturnType<typeof self> {}

const descriptionsLight: DescriptionsTheme = {
  name: 'Descriptions',
  common: commonLight,
  self
}

export interface DescriptionsTheme extends Theme<
  'Descriptions',
  DescriptionsThemeVars
> {}

export interface DescriptionsThemeOverrides extends ExtractThemeOverrides<DescriptionsTheme> {}

export default descriptionsLight

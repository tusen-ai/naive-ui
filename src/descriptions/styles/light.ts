import { composite } from 'seemly'
import commonVariables from './_common'
import { commonLight, ThemeCommonVars } from '../../_styles/common'
import { Theme } from '../../_mixins/use-theme'

const self = (vars: ThemeCommonVars) => {
  const {
    tableHeaderColor,
    textColor1,
    textColor2,
    cardColor,
    modalColor,
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
    thColor: composite(cardColor, tableHeaderColor),
    thTextColor: textColor1,
    thFontWeight: fontWeightStrong,
    tdTextColor: textColor2,
    tdColor: cardColor,
    tdColorModal: modalColor,
    borderColor: dividerColor,
    borderRadius: borderRadius
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

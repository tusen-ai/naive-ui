import { composite } from 'seemly'
import commonVariables from './_common'
import { commonLight, ThemeCommonVars } from '../../_styles/common'
import { Theme } from '../../_mixins/use-theme'

const self = (vars: ThemeCommonVars) => {
  const {
    tableHeaderColorOverlay,
    textColor1Overlay,
    textColor2Overlay,
    cardColor,
    modalColor,
    dividerColorOverlay,
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
    thColor: composite(cardColor, tableHeaderColorOverlay),
    thTextColor: textColor1Overlay,
    thFontWeight: fontWeightStrong,
    tdTextColor: textColor2Overlay,
    tdColor: cardColor,
    tdColorModal: modalColor,
    borderColor: dividerColorOverlay,
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

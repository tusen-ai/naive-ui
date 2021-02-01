import sizeVariables from './_common'
import { commonLight } from '../../_styles/new-common'
import type { ThemeCommonVars } from '../../_styles/new-common'
import { Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const {
    dividerColorOverlay,
    cardColor,
    modalColor,
    actionColorOverlay,
    textColor1,
    textColor2,
    borderRadius,
    fontWeightStrong,
    lineHeight,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge
  } = vars
  return {
    ...sizeVariables,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    lineHeight,
    borderRadius,
    borderColor: dividerColorOverlay,
    bodyColor: cardColor,
    bodyColorModal: modalColor,
    thColor: actionColorOverlay,
    thTextColor: textColor1,
    tdTextColor: textColor2,
    tdFontWeight: fontWeightStrong
  }
}

export type TableThemeVars = ReturnType<typeof self>

const tableLight: Theme<TableThemeVars> = {
  name: 'Table',
  common: commonLight,
  self
}

export default tableLight
export type TableTheme = typeof tableLight

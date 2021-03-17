import sizeVariables from './_common'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const {
    dividerColor,
    cardColor,
    modalColor,
    actionColor,
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
    borderColor: dividerColor,
    tdColor: cardColor,
    tdColorModal: modalColor,
    thColor: actionColor,
    thTextColor: textColor1,
    tdTextColor: textColor2,
    thFontWeight: fontWeightStrong
  }
}

export type TableThemeVars = ReturnType<typeof self>

const tableLight: Theme<'Table', TableThemeVars> = {
  name: 'Table',
  common: commonLight,
  self
}

export default tableLight
export type TableTheme = typeof tableLight

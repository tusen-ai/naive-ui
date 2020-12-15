import create from '../../_styles/utils/create-component-base'
import commonVars from './_common'
import { baseLight } from '../../_styles/base'

export default create({
  theme: 'light',
  name: 'Typography',
  peer: [baseLight],
  getLocalVars (vars) {
    return {
      ...commonVars,
      aTextColor: vars.primaryColor,
      blockquoteTextColor: vars.textColor2,
      blockquotePrefixColor: vars.borderColor,
      blockquoteLineHeight: vars.lineHeight,
      blockquoteFontSize: vars.fontSize,
      codeBorderRadius: vars.borderRadiusSmall,
      liTextColor: vars.textColor2,
      liLineHeight: vars.lineHeight,
      liFontSize: vars.fontSize,
      hrColor: vars.dividerColor,
      headerFontWeight: vars.fontWeightStrong,
      headerTextColor: vars.textColor1,
      pTextColor: vars.textColor2,
      pTextColor1Depth: vars.textColor1,
      pTextColor2Depth: vars.textColor2,
      pTextColor3Depth: vars.textColor3,
      pLineHeight: vars.lineHeight,
      pFontSize: vars.fontSize,
      headerBarColor: vars.primaryColor,
      headerBarColorPrimary: vars.primaryColor,
      headerBarColorInfo: vars.infoColor,
      headerBarColorError: vars.errorColor,
      headerBarColorWarning: vars.warningColor,
      headerBarColorSuccess: vars.successColor,
      textColor: vars.textColor2,
      textColorStrong: vars.textColor1,
      textColor1Depth: vars.textColor1,
      textColor2Depth: vars.textColor2,
      textColor3Depth: vars.textColor3,
      textColor1: vars.primaryColor,
      textColorInfo: vars.infoColor,
      textColorSuccess: vars.successColor,
      textColorWarning: vars.warningColor,
      textColorError: vars.errorColor,
      codeTextColor: vars.textColor2,
      codeColor: vars.codeColorOverlay,
      codeBorderColor: 'transparent'
    }
  }
})

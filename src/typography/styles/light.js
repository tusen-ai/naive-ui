import commonVars from './_common'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Typography',
  common: commonLight,
  self (vars) {
    const {
      primaryColor,
      textColor2,
      borderColor,
      lineHeight,
      fontSize,
      borderRadiusSmall,
      dividerColor,
      fontWeightStrong,
      textColor1,
      textColor3,
      infoColor,
      warningColor,
      errorColor,
      successColor,
      codeColorOverlay
    } = vars
    return {
      ...commonVars,
      aTextColor: primaryColor,
      blockquoteTextColor: textColor2,
      blockquotePrefixColor: borderColor,
      blockquoteLineHeight: lineHeight,
      blockquoteFontSize: fontSize,
      codeBorderRadius: borderRadiusSmall,
      liTextColor: textColor2,
      liLineHeight: lineHeight,
      liFontSize: fontSize,
      hrColor: dividerColor,
      headerFontWeight: fontWeightStrong,
      headerTextColor: textColor1,
      pTextColor: textColor2,
      pTextColor1Depth: textColor1,
      pTextColor2Depth: textColor2,
      pTextColor3Depth: textColor3,
      pLineHeight: lineHeight,
      pFontSize: fontSize,
      headerBarColor: primaryColor,
      headerBarColorPrimary: primaryColor,
      headerBarColorInfo: infoColor,
      headerBarColorError: errorColor,
      headerBarColorWarning: warningColor,
      headerBarColorSuccess: successColor,
      textColor: textColor2,
      textColor1Depth: textColor1,
      textColor2Depth: textColor2,
      textColor3Depth: textColor3,
      textColorPrimary: primaryColor,
      textColorInfo: infoColor,
      textColorSuccess: successColor,
      textColorWarning: warningColor,
      textColorError: errorColor,
      codeTextColor: textColor2,
      codeColor: codeColorOverlay,
      codeBorder: '1px solid transparent'
    }
  }
}

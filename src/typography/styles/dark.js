import commonVars from './_common'
import { commonDark } from '../../_styles/new-common'

export default {
  name: 'Typography',
  common: commonDark,
  self (vars) {
    const {
      primaryColor,
      textColor2Overlay,
      borderColorOverlay,
      lineHeight,
      fontSize,
      borderRadiusSmall,
      dividerColorOverlay,
      fontWeightStrong,
      textColor1Overlay,
      textColor3Overlay,
      infoColor,
      warningColor,
      errorColor,
      successColor,
      codeColorOverlay
    } = vars
    return {
      ...commonVars,
      aTextColor: primaryColor,
      blockquoteTextColor: textColor2Overlay,
      blockquotePrefixColor: borderColorOverlay,
      blockquoteLineHeight: lineHeight,
      blockquoteFontSize: fontSize,
      codeBorderRadius: borderRadiusSmall,
      liTextColor: textColor2Overlay,
      liLineHeight: lineHeight,
      liFontSize: fontSize,
      hrColor: dividerColorOverlay,
      headerFontWeight: fontWeightStrong,
      headerTextColor: textColor1Overlay,
      pTextColor: textColor2Overlay,
      pTextColor1Depth: textColor1Overlay,
      pTextColor2Depth: textColor2Overlay,
      pTextColor3Depth: textColor3Overlay,
      pLineHeight: lineHeight,
      pFontSize: fontSize,
      headerBarColor: primaryColor,
      headerBarColorPrimary: primaryColor,
      headerBarColorInfo: infoColor,
      headerBarColorError: errorColor,
      headerBarColorWarning: warningColor,
      headerBarColorSuccess: successColor,
      textColor: textColor2Overlay,
      textColor1Depth: textColor1Overlay,
      textColor2Depth: textColor2Overlay,
      textColor3Depth: textColor3Overlay,
      textColorPrimary: primaryColor,
      textColorInfo: infoColor,
      textColorSuccess: successColor,
      textColorWarning: warningColor,
      textColorError: errorColor,
      codeTextColor: textColor2Overlay,
      codeColor: codeColorOverlay,
      codeBorder: '1px solid transparent'
    }
  }
}

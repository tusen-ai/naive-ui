import create from '../../_styles/utils/create-component-base'
import commonVars from './_common'

export default create({
  theme: 'dark',
  name: 'Typography',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVars,
      aTextColor: derived.primaryColor,
      blockquoteTextColor: derived.textColor2Overlay,
      blockquotePrefixColor: derived.borderColorOverlay,
      codeBorderRadius: base.borderRadiusSmall,
      liTextColor: derived.textColor2Overlay,
      hrColor: derived.dividerColorOverlay,
      headerFontWeight: base.fontWeightStrong,
      headerTextColor: derived.textColor1Overlay,
      pTextColor: derived.textColor2Overlay,
      pTextColor1Depth: derived.textColor1Overlay,
      pTextColor2Depth: derived.textColor2Overlay,
      pTextColor3Depth: derived.textColor3Overlay,
      headerBarColor: derived.primaryColor,
      headerBarColorPrimary: derived.primaryColor,
      headerBarColorInfo: derived.infoColor,
      headerBarColorError: derived.errorColor,
      headerBarColorWarning: derived.warningColor,
      headerBarColorSuccess: derived.successColor,
      textColor: derived.textColor2Overlay,
      textColorStrong: derived.textColor1Overlay,
      textColor1Depth: derived.textColor1Overlay,
      textColor2Depth: derived.textColor2Overlay,
      textColor3Depth: derived.textColor3Overlay,
      textColor1: derived.primaryColor,
      textColorInfo: derived.infoColor,
      textColorSuccess: derived.successColor,
      textColorWarning: derived.warningColor,
      textColorError: derived.errorColor,
      codeTextColor: derived.textColor2Overlay,
      codeColor: derived.codeColorOverlay,
      codeBorderColor: 'transparent'
    }
  }
})

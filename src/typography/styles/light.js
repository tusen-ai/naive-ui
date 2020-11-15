import create from '../../_styles/utils/create-component-base'
import commonVars from './_common'

export default create({
  theme: 'light',
  name: 'Typography',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVars,
      aTextColor: derived.primaryColor,
      blockquoteTextColor: derived.textColor2,
      blockquotePrefixColor: derived.borderColor,
      codeBorderRadius: base.borderRadiusSmall,
      liTextColor: derived.textColor2,
      hrColor: derived.dividerColor,
      headerFontWeight: base.fontWeightStrong,
      headerTextColor: derived.textColor1,
      pTextColor: derived.textColor2,
      pTextColor1Depth: derived.textColor1,
      pTextColor2Depth: derived.textColor2,
      pTextColor3Depth: derived.textColor3,
      headerBarColor: derived.primaryColor,
      headerBarColorPrimary: derived.primaryColor,
      headerBarColorInfo: derived.infoColor,
      headerBarColorError: derived.errorColor,
      headerBarColorWarning: derived.warningColor,
      headerBarColorSuccess: derived.successColor,
      textColor: derived.textColor2,
      textColorStrong: derived.textColor1,
      textColor1Depth: derived.textColor1,
      textColor2Depth: derived.textColor2,
      textColor3Depth: derived.textColor3,
      textColor1: derived.primaryColor,
      textColorInfo: derived.infoColor,
      textColorSuccess: derived.successColor,
      textColorWarning: derived.warningColor,
      textColorError: derived.errorColor,
      codeTextColor: derived.textColor2,
      codeColor: derived.codeColor,
      codeBorderColor: 'transparent'
    }
  }
})

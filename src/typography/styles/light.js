import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'light',
  name: 'Typography',
  getDerivedVariables ({ base, derived }) {
    return {
      aTextColor: derived.primaryColor,
      blockquoteTextColor: derived.textColor2,
      blockquotePrefixColor: derived.borderColor,
      codeBorderRadius: base.borderRadiusSmall,
      liTextColor: derived.textColor2,
      hrColor: derived.dividerColor,
      headerFontWeight: base.fontWeightStrong,
      headerTextColor: derived.textColor1,
      pTextColor: derived.textColor2,
      pTextColorPrimaryDepth: derived.textColor1,
      pTextColorSecondaryDepth: derived.textColor2,
      pTextColorTertiaryDepth: derived.textColor3,
      headerFontSize: {
        1: '30px',
        2: '26px',
        3: '18px',
        4: '16px',
        5: '14px',
        6: '14px'
      },
      headerMargin: {
        1: '1.6em 0 .8em 0',
        2: '1.6em 0 .8em 0',
        3: '1.6em 0 1.2em 0',
        4: '1.4em 0 1.2em 0',
        5: '1.4em 0 1.2em 0',
        6: '1.4em 0 1.2em 0'
      },
      headerPrefixWidth: {
        1: '16px',
        2: '16px',
        3: '12px',
        4: '12px',
        5: '12px',
        6: '12px'
      },
      headerBarWidth: {
        1: '4px',
        2: '4px',
        3: '3px',
        4: '3px',
        5: '3px',
        6: '3px'
      },
      headerBarColor: {
        default: derived.primaryColor,
        primary: derived.primaryColor,
        info: derived.infoColor,
        error: derived.errorColor,
        warning: derived.warningColor,
        success: derived.successColor
      },
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
      textOpacityPrimaryDepth: derived.opacity1,
      textOpacitySecondaryDepth: derived.opacity2,
      textOpacityTertiaryDepth: derived.opacity3,
      codeTextColor: derived.textColor2,
      codeColor: derived.codeColor,
      codeBorderColor: 'transparent'
    }
  }
})

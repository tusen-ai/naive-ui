import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'Typography',
  getDerivedVariables ({ base, derived }) {
    return {
      aTextColor: derived.primaryColor,
      blockquoteTextColor: derived.textColorSecondaryOverlay,
      blockquotePrefixColor: derived.borderColorOverlay,
      codeBorderRadius: base.borderRadiusSmall,
      liTextColor: derived.textColorSecondaryOverlay,
      hrColor: derived.dividerColorOverlay,
      headerFontWeight: base.fontWeightStrong,
      headerTextColor: derived.textColorPrimaryOverlay,
      pTextColor: derived.textColorSecondaryOverlay,
      pTextColorPrimaryDepth: derived.textColorPrimaryOverlay,
      pTextColorSecondaryDepth: derived.textColorSecondaryOverlay,
      pTextColorTertiaryDepth: derived.textColorTertiaryOverlay,
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
      textColor: derived.textColorSecondaryOverlay,
      textColorStrong: derived.textColorPrimaryOverlay,
      textColorPrimaryDepth: derived.textColorPrimaryOverlay,
      textColorSecondaryDepth: derived.textColorSecondaryOverlay,
      textColorTertiaryDepth: derived.textColorTertiaryOverlay,
      textColorPrimary: derived.primaryColor,
      textColorInfo: derived.infoColor,
      textColorSuccess: derived.successColor,
      textColorWarning: derived.warningColor,
      textColorError: derived.errorColor,
      textOpacityPrimaryDepth: derived.opacityPrimary,
      textOpacitySecondaryDepth: derived.opacitySecondary,
      textOpacityTertiaryDepth: derived.opacityTertiary,
      codeTextColor: derived.textColorSecondaryOverlay,
      codeColor: derived.codeColorOverlay,
      codeBorderColor: 'transparent'
    }
  }
})

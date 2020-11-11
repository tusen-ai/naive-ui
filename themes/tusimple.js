// Unstable!
// Draft Code!
// Variable Names Will Be Refactored!
import { composite, read } from '../src/_utils/color'
import { cB, cE, c } from '../src/_utils/cssr'

const unconfigurableStyle = c([
  cB('tag', [
    cE('close', {
      borderRadius: '50%'
    }, [
      c('&:hover', {
        backgroundColor: composite('#D7DAE0', 'rgba(255, 255, 255, .5)')
      }),
      c('&:hover', {
        backgroundColor: composite('#D7DAE0', 'rgba(255, 255, 255, .25)')
      })
    ])
  ])
])

function tusimpleTheme (naive) {
  naive.avoidHollowOut = true
  unconfigurableStyle.mount({
    target: 'naive-ui/tusimple-theme',
    count: false
  })
  const primaryColor = '#4FB233'
  const inputColorDisabled = '#EBEDF0'
  naive.styles.light.override({
    base: {
      borderRadius: '16px',
      alpha4: '0.2',
      boxShadow2: '0 2px 16px 0 rgba(0,0,0,0.10), 0 0 16px -2px rgba(0,0,0,0.06)'
    },
    derived: {
      borderColor: '#999',
      divider: '#EBEDF0',
      primaryColor,
      primaryColorHover: composite(primaryColor, 'rgba(255, 255, 255, .15)'),
      primaryColorPressed: composite(primaryColor, 'rgba(0, 0, 0, .15)'),
      primaryColorPressedLight: composite(primaryColor, 'rgba(255, 255, 255, .15)'),
      infoColor: '#335FFF',
      infoColorHover: composite('#335FFF', 'rgba(255, 255, 255, .15)'),
      infoColorPressed: composite('#335FFF', 'rgba(0, 0, 0, .15)'),
      successColor: primaryColor,
      successColorHover: composite(primaryColor, 'rgba(255, 255, 255, .15)'),
      successColorPressed: composite(primaryColor, 'rgba(0, 0, 0, .15)'),
      errorColor: '#F22451',
      errorColorHover: composite('#F22451', 'rgba(255, 255, 255, .15)'),
      errorColorPressed: composite('#F22451', 'rgba(0, 0, 0, .15)'),
      warningColor: '#FAC70D',
      warningColorHover: composite('#FAC70D', 'rgba(255, 255, 255, .15)'),
      warningColorPressed: composite('#FAC70D', 'rgba(0, 0, 0, .15)'),
      textColorSecondary: '#333',
      tableHeaderColorOverlay: '#EBEDF0',
      inputColorDisabled,
      actionColor: inputColorDisabled,
      textColor2: '#333',
      optionColorHover: composite(primaryColor, 'rgba(255, 255, 255, .1)'),
      clearIconColor: composite('#FFF', 'rgba(0, 0, 0, .4)')
    }
  })
  const {
    base,
    derived
  } = naive.styles.light.base

  naive.styles.light.Button.override({
    textColorWarning: '#333',
    iconSizeTiny: '16px',
    iconSizeSall: '20px',
    iconSizeMedium: '20px',
    iconSizeLarge: '28px',
    borderRadiusTiny: '12px',
    borderRadiusSmall: '16px',
    borderRadiusMedium: '24px',
    borderRadiusLarge: '40px',
    heightTiny: '24px',
    heightSmall: '32px',
    heightMedium: '48px',
    heightLarge: '80px',
    fontSizeTiny: '14px',
    fontSizeSmall: '16px',
    fontSizeMedium: '16px',
    fontSizeLarge: '24px',
    paddingTiny: '0 12px',
    paddingSmall: '0 24px',
    paddingMedium: '0 48px',
    paddingLarge: '0 80px',
    paddingRoundTiny: '0 12px',
    paddingRoundSmall: '0 24px',
    paddingRoundMedium: '0 48px',
    paddingRoundLarge: '0 80px',
    opacityDisabled: '1',
    colorDisabled: '#EBEDF0',
    colorPrimaryDisabled: '#EBEDF0',
    colorInfoDisabled: '#EBEDF0',
    colorSuccessDisabled: '#EBEDF0',
    colorWarningDisabled: '#EBEDF0',
    colorErrorDisabled: '#EBEDF0',
    borderColorDisabled: '#EBEDF0',
    borderColorPrimaryDisabled: '#EBEDF0',
    borderColorInfoDisabled: '#EBEDF0',
    borderColorSuccessDisabled: '#EBEDF0',
    borderColorWarningDisabled: '#EBEDF0',
    borderColorErrorDisabled: '#EBEDF0',
    textColorDisabled: '#CCCCCC',
    textColor1Disabled: '#CCCCCC',
    textColorInfoDisabled: '#CCCCCC',
    textColorSuccessDisabled: '#CCCCCC',
    textColorWarningDisabled: '#CCCCCC',
    textColorErrorDisabled: '#CCCCCC',
    textColorGhostDisabled: '#D7DAE0',
    textColor1GhostDisabled: '#D7DAE0',
    textColorInfoGhostDisabled: '#D7DAE0',
    textColorSuccessGhostDisabled: '#D7DAE0',
    textColorWarningGhostDisabled: '#D7DAE0',
    textColorErrorGhostDisabled: '#D7DAE0',
    textColorTextDisabled: '#D7DAE0',
    textColor1TextDisabled: '#D7DAE0',
    textColorInfoTextDisabled: '#D7DAE0',
    textColorSuccessTextDisabled: '#D7DAE0',
    textColorWarningTextDisabled: '#D7DAE0',
    textColorErrorTextDisabled: '#D7DAE0',
    iconMarginSmall: '8px',
    iconMarginMedium: '8px',
    iconMarginLarge: '12px'
  })
  naive.styles.light.BaseSuffix.override({
    iconSize: '24px',
    arrowSize: '13px',
    arrowBorderWidth: '2px',
    arrowRight: '2px',
    default: {
      crossColor: derived.clearIconColor
    }
  })
  naive.styles.light.Input.override({
    heightMedium: '32px',
    fontSizeMedium: '16px',
    paddingLeft: '12px',
    paddingRight: '12px',
    paddingIcon: '44px',
    iconSize: '24px',
    borderMaskColorHover: primaryColor,
    borderMaskColorFocus: primaryColor,
    boxShadow: 'none',
    boxShadowDisabled: 'none'
  })
  naive.styles.light.InputGroupLabel.override({
    boxShadow: 'none'
  })
  naive.styles.light.InputNumber.override({
    boxShadow: 'none',
    borderColor: 'none',
    borderColorHover: derived.primaryColor,
    buttonTextColor: 'rgba(0, 0, 0, .6)',
    buttonTextColorHover: derived.primaryColor,
    widthSmall: '140px',
    widthMedium: '140px',
    widthLarge: '140px',
    heightMedium: '32px',
    fontSizeMedium: '16px',
    buttonWidthSmall: '28px',
    buttonWidthMedium: '32px',
    buttonWidthLarge: '40px',
    buttonFontSizeSmall: '16px',
    buttonFontSizeMedium: '24px',
    buttonFontSizeLarge: '24px'
  })
  naive.styles.light.BaseTrackingRect.override({
    rectColor: `rgba( ${read(derived.primaryColor).slice(0, 3).join(', ')}, .1) `
  })
  naive.styles.light.BaseSelectMenu.override({
    boxShadow: base.boxShadow2,
    paddingSmall: '4px 0',
    paddingMedium: '6px 0',
    paddingLarge: '6px 0',
    paddingHuge: '8px 0'
  })
  naive.styles.light.BaseSelection.override({
    height: {
      medium: '32px'
    },
    fontSize: {
      medium: '16px'
    },
    paddingSingle: '0 36px 0 12px',
    default: {
      boxShadow: 'none',
      disabledBoxShadow: 'none'
    }
  })
  naive.styles.light.Tag.override({
    borderRadius: '16px',
    default: {
      borderColor: 'none',
      color: 'rgba(153,153,153,0.10)',
      closeColor: derived.closeColorOverlay,
      closeColorHover: derived.closeColorOverlay,
      closeColorActive: derived.closeColorOverlay
    },
    primary: {
      borderColor: 'none',
      closeColor: derived.closeColorOverlay,
      closeColorHover: derived.closeColorOverlay,
      closeColorActive: derived.closeColorOverlay
    },
    info: {
      borderColor: 'none'
    },
    success: {
      borderColor: 'none'
    },
    warning: {
      borderColor: 'none'
    },
    error: {
      borderColor: 'none'
    },
    paddingLeft: '12px',
    paddingRight: '12px',
    closeMarginLeft: '8px',
    height: {
      medium: '24px'
    },
    closeSizeSmall: '24px',
    closeSizeMedium: '24px',
    closeSizeLarge: '24px',
    fontSize: {
      small: '12px',
      medium: '16px',
      large: '16px'
    },
    closeBackgroundColor: 'transparent',
    closeBackgroundColorHover: composite('#D7DAE0', 'rgba(255, 255, 255, .5)'),
    closeBackgroundColorActive: composite('#D7DAE0', 'rgba(255, 255, 255, .25)')
  })
  naive.styles.light.DynamicTags.override({
    addHeight: '24px',
    addBorderStyle: 'dashed'
  })
}

tusimpleTheme.install = tusimpleTheme

export default tusimpleTheme

// Unstable!
// Draft Code!
// Variable Names Will Be Refactored!
import { composite, read } from '../../src/_utils/color'
import { cB, cE, c } from '../../src/_utils/cssr'
import typedColor from './color'
import cssMute from './const'

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
  ]),
  cB('message', [
    cE('close', [
      c('&:hover', {
        backgroundColor: composite('#D7DAE0', 'rgba(255, 255, 255, .5)')
      }),
      c('&:active', {
        backgroundColor: composite('#D7DAE0', 'rgba(255, 255, 255, .25)')
      })
    ])
  ])
])

function tusimpleTheme (naive) {
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
    colorDisabledPrimary: '#EBEDF0',
    colorDisabledInfo: '#EBEDF0',
    colorDisabledSuccess: '#EBEDF0',
    colorDisabledWarning: '#EBEDF0',
    colorDisabledError: '#EBEDF0',
    borderColorDisabled: '#EBEDF0',
    borderColorDisabledPrimary: '#EBEDF0',
    borderColorDisabledInfo: '#EBEDF0',
    borderColorDisabledSuccess: '#EBEDF0',
    borderColorDisabledWarning: '#EBEDF0',
    borderColorDisabledError: '#EBEDF0',
    textColorDisabled: '#CCCCCC',
    textColor1Disabled: '#CCCCCC',
    textColorDisabledInfo: '#CCCCCC',
    textColorDisabledSuccess: '#CCCCCC',
    textColorDisabledWarning: '#CCCCCC',
    textColorDisabledError: '#CCCCCC',
    textColorGhostDisabled: '#D7DAE0',
    textColor1GhostDisabled: '#D7DAE0',
    textColorGhostDisabledInfo: '#D7DAE0',
    textColorGhostDisabledSuccess: '#D7DAE0',
    textColorGhostDisabledWarning: '#D7DAE0',
    textColorGhostDisabledError: '#D7DAE0',
    textColorTextDisabled: '#D7DAE0',
    textColor1TextDisabled: '#D7DAE0',
    textColorTextDisabledInfo: '#D7DAE0',
    textColorTextDisabledSuccess: '#D7DAE0',
    textColorTextDisabledWarning: '#D7DAE0',
    textColorTextDisabledError: '#D7DAE0',
    iconMarginSmall: '8px',
    iconMarginMedium: '8px',
    iconMarginLarge: '12px'
  })
  naive.styles.light.BaseSuffix.override({
    iconSize: '24px',
    arrowSize: '13px',
    arrowBorderWidth: '2px',
    crossColor: derived.clearIconColor
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
  naive.styles.light.BaseSelectMenu.override({
    boxShadow: base.boxShadow2,
    paddingSmall: '4px 0',
    paddingMedium: '6px 0',
    paddingLarge: '6px 0',
    paddingHuge: '8px 0'
  })
  naive.styles.light.BaseSelection.override({
    heightMedium: '32px',
    fontSizeMedium: '16px',
    paddingSingle: '0 36px 0 12px',
    borderColor: 'transparent'
  })
  naive.styles.light.Tag.override({
    borderRadius: '16px',
    borderColor: 'transparent',
    color: 'rgba(153,153,153,0.10)',
    closeColor: derived.closeColorOverlay,
    closeColorHover: derived.closeColorOverlay,
    closeColorPressed: derived.closeColorOverlay,
    borderColorPrimary: 'transparent',
    closeColorPrimary: derived.closeColorOverlay,
    closeColorHoverPrimary: derived.closeColorOverlay,
    closeColorPressedPrimary: derived.closeColorOverlay,
    borderColorInfo: 'transparent',
    borderColorSuccess: 'transparent',
    borderColorWarning: 'transparent',
    borderColorError: 'transparent',
    padding: '0 12px',
    closeMargin: '0 0 0 8px',
    heightMedium: '24px',
    closeSizeSmall: '20px',
    closeSizeMedium: '20px',
    closeSizeLarge: '20px',
    fontSizeSmall: '12px',
    fontSizeMedium: '16px',
    fontSizeLarge: '16px'
  })
  naive.styles.light.DynamicTags.override({
    addHeight: '24px',
    addBorderStyle: 'dashed'
  })
  naive.styles.light.Form.override({
    blankHeightSmall: cssMute.CONTENT_SPACE,
    blankHeightMedium: cssMute.CONTENT_SPACE,
    blankHeightLarge: cssMute.CONTENT_SPACE,
    feedbackHeightSmall: cssMute.CONTENT_SPACE,
    feedbackHeightMedium: cssMute.CONTENT_SPACE,
    feedbackHeightLarge: cssMute.CONTENT_SPACE,
    feedbackFontSizeSmall: cssMute.SMALL_FRONT_SIZE,
    feedbackFontSizeMedium: cssMute.SMALL_FRONT_SIZE,
    feedbackFontSizeLarge: cssMute.SMALL_FRONT_SIZE,
    labelFontSizeLeftSmall: cssMute.SMALL_FRONT_SIZE,
    labelFontSizeLeftMedium: cssMute.SMALL_FRONT_SIZE,
    labelFontSizeLeftLarge: cssMute.NORMAL_FRONT_SIZE,
    labelFontSizeTopSmall: cssMute.SMALL_FRONT_SIZE,
    labelFontSizeTopMedium: cssMute.SMALL_FRONT_SIZE,
    labelFontSizeTopLarge: cssMute.NORMAL_FRONT_SIZE,
    labelHeightSmall: '22px',
    labelHeightMedium: '22px',
    labelHeightLarge: '22px',
    labelTextAlignHorizontal: 'left'
  })
  naive.styles.light.Message.override({
    height: '48px',
    padding: '0 20px 0 12px',
    paddingClosable: '0 12px',
    maxWidth: '720px',
    minWidth: '420px',
    iconMargin: '20px',
    closeMargin: '0 0 0 22px',
    colorInfo: derived.warningColor,
    colorWarning: derived.errorColor,
    iconColorInfo: 'rgb(0, 0, 0)',
    iconColorSuccess: 'rgb(255, 255, 255)',
    iconColorWarning: 'rgb(255, 255, 255)',
    iconColorError: 'rgb(255, 255, 255)',
    iconColorLoading: 'rgb(255, 255, 255)',
    closeColorInfo: 'rgb(0, 0, 0)',
    closeColorHoverInfo: 'rgb(0, 0, 0)',
    closeColorPressedInfo: 'rgb(0, 0, 0)',
    closeColorSuccess: 'rgb(255, 255, 255)',
    closeColorHoverSuccess: 'rgb(255, 255, 255)',
    closeColorPressedSuccess: 'rgb(255, 255, 255)',
    closeColorError: 'rgb(255, 255, 255)',
    closeColorHoverError: 'rgb(255, 255, 255)',
    closeColorPressedError: 'rgb(255, 255, 255)',
    closeColorWarning: 'rgb(255, 255, 255)',
    closeColorHoverWarning: 'rgb(255, 255, 255)',
    closeColorPressedWarning: 'rgb(255, 255, 255)',
    closeColorLoading: 'rgb(0, 0, 0)',
    closeColorHoverLoading: 'rgb(0, 0, 0)',
    closeColorActiveLoading: 'rgb(0, 0, 0)',
    closeColor: 'transparent',
    closeColorHover: composite('#D7DAE0', 'rgba(255, 255, 255, .5)'),
    closeColorActive: composite('#D7DAE0', 'rgba(255, 255, 255, .25)'),
    closeSize: '24px',
    iconSize: '20px'
  })
  naive.styles.light.Pagination.override({
    itemSize: '32px',
    itemPadding: 0,
    buttonFontSize: '24px',
    itemFontSize: '16px',
    inputWidth: '80px',
    selectWidth: '100px',
    inputMargin: '0 20px',
    itemMargin: '0 20px 0 0',
    itemBorder: 'none',
    itemBorderActive: 'none',
    itemBorderDisabled: 'none',
    itemColor: 'transparent',
    itemColorHover: composite(derived.primaryColor, 'rgba(255, 255, 255, 0.9)'),
    itemColorActive: 'transparent',
    itemColorDisabled: 'transparent',
    itemBorderRadius: '100px',
    itemTextColorHover: derived.textColorSecondary,
    itemTextColorDisabled: '#D7DAE0',
    buttonBorder: 'none',
    buttonTextColorHover: derived.primaryColor
  })
  naive.styles.light.BackTop.override({
    width: '48px',
    height: '48px',
    iconSize: '24px',
    borderRadius: '24px',
    iconColor: 'rgba(0, 0, 0, .8)',
    iconColorHover: derived.primaryColor,
    iconColorPressed: derived.primaryColorPressed,
    boxShadow: '0 40px 16px -24px rgba(0,0,0,0.04), 0 8px 16px -8px rgba(0,0,0,0.12), 0 16px 40px 16px rgba(0,0,0,0.04)',
    boxShadowHover: '0 40px 16px -24px rgba(0,0,0,0.04), 0 8px 16px -8px rgba(0,0,0,0.12), 0 16px 40px 16px rgba(0,0,0,0.04)',
    boxShadowPressed: '0 40px 16px -24px rgba(0,0,0,0.04), 0 8px 16px -8px rgba(0,0,0,0.12), 0 16px 40px 16px rgba(0,0,0,0.04)'
  })
  naive.styles.light.Breadcrumb.override({
    fontSize: '16px',
    fontWeightActive: '500'
  })
}

tusimpleTheme.install = tusimpleTheme

export default tusimpleTheme

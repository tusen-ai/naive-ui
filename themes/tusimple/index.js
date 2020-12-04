// Unstable!
// Draft Code!
// Variable Names Will Be Refactored!
import { composite, changeColor } from 'seemly'
import { cB, cE, cM, c } from '../../src/_utils/cssr'
import typedColor from './color'
import cssMute from './const'

const unconfigurableStyle = c([
  cB('card', [
    cE('content', {
      minHeight: '213px',
      maxHeight: '673px',
      overflow: 'auto'
    })
  ]),
  cB('tag', [
    cE('close', {
      borderRadius: '50%'
    }, [
      c('&:hover', {
        backgroundColor: changeColor('#D7DAE0', { alpha: 0.5 })
      }),
      c('&:hover', {
        backgroundColor: changeColor('#D7DAE0', { alpha: 0.25 })
      })
    ])
  ]),
  cB('message', [
    cE('close', [
      c('&:hover', {
        backgroundColor: changeColor('#D7DAE0', { alpha: 0.5 })
      }),
      c('&:active', {
        backgroundColor: changeColor('#D7DAE0', { alpha: 0.25 })
      })
    ])
  ]),
  cB('progress', [
    cB('progress-graph-line-fill', {
      background: 'linear-gradient(270deg, #FFAC26 0%, #F2E93D 100%) !important'
    }),
    cM('circle', [
      cB('progress-graph-circle-fill', {
        stroke: 'url(#progress-warning) !important'
      })
    ]),
    cM('info', [
      cB('progress-graph-line-fill', {
        background: 'linear-gradient(270deg, #FFAC26 0%, #F2E93D 100%) !important'
      }),
      cM('circle', [
        cB('progress-graph-circle-fill', {
          stroke: 'url(#progress-warning) !important'
        })
      ])
    ]),
    cM('success', [
      cB('progress-graph-line-fill', {
        background: 'linear-gradient(270deg, #4FB233 0%, #AFF25E 100%) !important'
      }),
      cM('circle', [
        cB('progress-graph-circle-fill', {
          stroke: 'url(#progress-success) !important'
        })
      ])
    ]),
    cM('warning', [
      cB('progress-graph-line-fill', {
        background: 'linear-gradient(270deg, #FF66BA 0%, #D92149 100%) !important'
      }),
      cM('circle', [
        cB('progress-graph-circle-fill', {
          stroke: 'url(#progress-error) !important'
        })
      ])
    ]),
    cM('error', [
      cB('progress-graph-line-fill', {
        background: 'linear-gradient(270deg, #FF66BA 0%, #D92149 100%) !important'
      }),
      cM('circle', [
        cB('progress-graph-circle-fill', {
          stroke: 'url(#progress-error) !important'
        })
      ])
    ])
  ])
])

function tusimpleTheme (naive) {
  naive.unstableConfig = {
    Pagination: {
      inputSize: 'medium'
    },
    DatePicker: {
      timePickerSize: 'medium'
    }
  }
  unconfigurableStyle.mount({
    target: 'naive-ui/tusimple-theme',
    count: false
  })
  const svgDefs = `
  <defs>
    <linearGradient id="progress-success">
      <stop offset="0%" stop-color="#4FB233" />
      <stop offset="100%" stop-color="#AFF25E" />
    </linearGradient>
    <linearGradient id="progress-warning">
      <stop offset="0%" stop-color="#FFAC26" />
      <stop offset="100%" stop-color="#F2E93D" />
    </linearGradient>
    <linearGradient id="progress-error">
      <stop offset="0%" stop-color="#FF66BA" />
      <stop offset="100%" stop-color="#D92149" />
    </linearGradient>
  </defs>`
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svgEl.innerHTML = svgDefs
  document.body.appendChild(
    svgEl
  )
  const primaryColor = '#4FB233'
  const inputColorDisabled = '#EBEDF0'
  naive.styles.light.override({
    borderRadius: '16px',
    alpha4: '0.2',
    boxShadow2: '0 2px 16px 0 rgba(0,0,0,0.10), 0 0 16px -2px rgba(0,0,0,0.06)',
    borderColor: '#999',
    divider: '#EBEDF0',
    primaryColor: typedColor.normalSuccess,
    primaryColorHover: typedColor.hoverSuccess,
    primaryColorPressed: typedColor.clickSuccess,
    infoColor: typedColor.normalInfo,
    infoColorHover: typedColor.HoverInfo,
    infoColorPressed: typedColor.clickInfo,
    successColor: typedColor.normalSuccess,
    successColorHover: typedColor.hoverSuccess,
    successColorPressed: typedColor.clickSuccess,
    errorColor: typedColor.normalError,
    errorColorHover: typedColor.hoverError,
    errorColorPressed: typedColor.clickError,
    warningColor: typedColor.normalWarning,
    warningColorHover: typedColor.hoverWarning,
    warningColorPressed: typedColor.clickWarning,
    textColor2: '#333',
    tableHeaderColorOverlay: '#EBEDF0',
    inputColorDisabled,
    actionColor: inputColorDisabled,
    optionColorHover: composite(primaryColor, 'rgba(255, 255, 255, .1)'),
    clearIconColor: composite('#FFF', 'rgba(0, 0, 0, .4)')
  })
  const {
    vars
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
    crossColor: vars.closeColor
  })
  naive.styles.light.Input.override({
    heightMedium: '32px',
    fontSizeMedium: '16px',
    paddingLeft: '12px',
    paddingRight: '12px',
    paddingIcon: '44px',
    iconSize: '24px',
    borderHover: `1px solid ${primaryColor}`,
    borderFocus: `1px solid ${primaryColor}`,
    border: 'none',
    borderDisabled: 'none'
  })
  naive.styles.light.InputGroupLabel.override({
    boxShadow: 'none'
  })
  naive.styles.light.InputNumber.override({
    boxShadow: 'none',
    borderColor: 'none',
    borderColorHover: vars.primaryColor,
    buttonTextColor: 'rgba(0, 0, 0, .6)',
    buttonTextColorHover: vars.primaryColor,
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
    boxShadow: vars.boxShadow2,
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
    closeColor: vars.closeColorOverlay,
    closeColorHover: vars.closeColorOverlay,
    closeColorPressed: vars.closeColorOverlay,
    borderColorPrimary: 'transparent',
    closeColorPrimary: vars.closeColorOverlay,
    closeColorHoverPrimary: vars.closeColorOverlay,
    closeColorPressedPrimary: vars.closeColorOverlay,
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
    colorInfo: vars.warningColor,
    colorWarning: vars.errorColor,
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
    closeSize: '20px',
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
    itemColorHover: composite(vars.primaryColor, 'rgba(255, 255, 255, 0.9)'),
    itemColorActive: 'transparent',
    itemColorDisabled: 'transparent',
    itemBorderRadius: '100px',
    itemTextColorHover: vars.textColor2,
    itemTextColorDisabled: '#D7DAE0',
    buttonBorder: 'none',
    buttonIconColorHover: vars.primaryColor
  })
  naive.styles.light.BackTop.override({
    width: '48px',
    height: '48px',
    iconSize: '24px',
    borderRadius: '24px',
    iconColor: 'rgba(0, 0, 0, .8)',
    iconColorHover: vars.primaryColor,
    iconColorPressed: vars.primaryColorPressed,
    boxShadow: '0 40px 16px -24px rgba(0,0,0,0.04), 0 8px 16px -8px rgba(0,0,0,0.12), 0 16px 40px 16px rgba(0,0,0,0.04)',
    boxShadowHover: '0 40px 16px -24px rgba(0,0,0,0.04), 0 8px 16px -8px rgba(0,0,0,0.12), 0 16px 40px 16px rgba(0,0,0,0.04)',
    boxShadowPressed: '0 40px 16px -24px rgba(0,0,0,0.04), 0 8px 16px -8px rgba(0,0,0,0.12), 0 16px 40px 16px rgba(0,0,0,0.04)'
  })
  naive.styles.light.Breadcrumb.override({
    fontSize: '16px',
    fontWeightActive: '500'
  })
  naive.styles.light.DatePicker.override({
    itemBorderRadius: '14px',
    panelHeaderDividerColor: 'transparent',
    panelDayDividerColor: 'transparent',
    panelArrowButtonColor: '#CCC',
    itemFontSize: '16px',
    panelDayFontSize: '16px',
    panelMonthFontSize: '16px',
    panelActionPadding: '12px 20px',
    itemSize: '28px',
    itemSpaceWidth: '40px',
    itemSpaceHeight: '34px',
    panelMonthPadding: '0 8px 8px 8px',
    panelMonthHeight: '32px',
    panelDatePaddingDate: '12px 16px 9px 16px',
    panelDatePaddingDateTime: '6px 16px 9px 16px',
    panelArrowButtonSize: '24px',
    panelHeaderPadding: '12px 20px 8px 20px',
    panelVerticalDividerColor: 'transparent'
  })
  naive.styles.light.TimePicker.override({
    itemFontSize: '16px',
    itemHeight: '38px',
    itemWidth: '66px',
    panelActionPadding: '12px 20px'
  })
  naive.styles.light.Progress.override({
    railHeight: '4px',
    fontSizeCircle: '24px',
    iconSizeCircle: '30px',
    iconSizeLine: '20px',
    iconColor: typedColor.normalWarning,
    iconColorInfo: typedColor.normalWarning,
    iconColorSuccess: typedColor.normalSuccess,
    iconColorWarning: typedColor.normalError,
    iconColorError: typedColor.normalError,
    fillColor: typedColor.normalWarning,
    fillColorInfo: typedColor.normalWarning,
    fillColorSuccess: typedColor.normalSuccess,
    fillColorWarning: typedColor.normalError,
    fillColorError: typedColor.normalError,
    textColorCircle: '#666666'
  })
}

tusimpleTheme.install = tusimpleTheme

export default tusimpleTheme

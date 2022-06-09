import { composite, changeColor } from 'seemly'
import type { GlobalThemeOverrides } from 'naive-ui'
import { commonLight } from 'naive-ui'
import vars from './vars'

function createHoverColor (color: string, overlayAlpha: number = 0.15): string {
  return composite(color, [255, 255, 255, overlayAlpha])
}

function createPressedColor (
  color: string,
  overlayAlpha: number = 0.15
): string {
  return composite(color, [0, 0, 0, overlayAlpha])
}

export const colors = {
  primaryColor: '#4FB233',
  primaryColorHover: createHoverColor('#4FB233'),
  primaryColorPressed: createPressedColor('#4FB233'),
  infoColor: '#335FFF',
  infoColorHover: createHoverColor('#335FFF'),
  infoColorPressed: createPressedColor('#335FFF'),
  successColor: '#4FB233',
  successColorHover: createHoverColor('#4FB233'),
  successColorPressed: createPressedColor('#4FB233'),
  errorColor: '#D92149',
  errorColorHover: createHoverColor('#D92149'),
  errorColorPressed: createPressedColor('#D92149'),
  warningColor: '#FFAC26',
  warningColorHover: createHoverColor('#FFAC26', 0.2),
  warningColorPressed: createPressedColor('#FFAC26', 0.05),
  textColorDisabled: '#D7DAE0',
  textColor1: '#333',
  textColor2: '#333'
}

export const themeOverridesLight: GlobalThemeOverrides = {
  common: {
    fontSize: '16px',
    fontSizeMedium: '16px',
    fontWeightStrong: '700',
    borderRadius: '16px',
    boxShadow2: vars.NORMAL_BOX_SHADOW,
    borderColor: '#999',
    dividerColor: '#EBEDF0',
    tableHeaderColor: '#EBEDF0',
    inputColorDisabled: '#EBEDF0',
    actionColor: '#EBEDF0',
    hoverColor: changeColor(colors.primaryColor, { alpha: 0.1 }),
    clearColor: composite('#FFF', 'rgba(0, 0, 0, .4)'),
    ...colors
  },
  Avatar: {
    borderRadius: '50%'
  },
  BackTop: {
    width: '48px',
    height: '48px',
    iconSize: '24px',
    borderRadius: '24px',
    iconColor: 'rgba(0, 0, 0, .8)',
    iconColorHover: commonLight.primaryColor,
    iconColorPressed: commonLight.primaryColorPressed,
    boxShadow:
      '0 40px 16px -24px rgba(0,0,0,0.04), 0 8px 16px -8px rgba(0,0,0,0.12), 0 16px 40px 16px rgba(0,0,0,0.04)',
    boxShadowHover:
      '0 40px 16px -24px rgba(0,0,0,0.04), 0 8px 16px -8px rgba(0,0,0,0.12), 0 16px 40px 16px rgba(0,0,0,0.04)',
    boxShadowPressed:
      '0 40px 16px -24px rgba(0,0,0,0.04), 0 8px 16px -8px rgba(0,0,0,0.12), 0 16px 40px 16px rgba(0,0,0,0.04)'
  },
  Breadcrumb: {
    fontSize: '16px',
    fontWeightActive: '500',
    itemTextColor: '#999',
    separatorColor: '#999'
  },
  Button: {
    textColorWarning: '#333',
    textColorHoverWarning: '#333',
    textColorFocusWarning: '#333',
    textColorPressedWarning: '#333',
    iconSizeTiny: '14px',
    iconSizeSmall: '20px',
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
    paddingTiny: '0 16px',
    paddingSmall: '0 24px',
    paddingMedium: '0 40px',
    paddingLarge: '0 72px',
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
    borderDisabled: '1px solid #EBEDF0',
    borderDisabledPrimary: '1px solid #EBEDF0',
    borderDisabledInfo: '1px solid #EBEDF0',
    borderDisabledSuccess: '1px solid #EBEDF0',
    borderDisabledWarning: '1px solid #EBEDF0',
    borderDisabledError: '1px solid #EBEDF0',
    textColorDisabled: '#CCCCCC',
    textColorDisabledPrimary: '#CCCCCC',
    textColorDisabledInfo: '#CCCCCC',
    textColorDisabledSuccess: '#CCCCCC',
    textColorDisabledWarning: '#CCCCCC',
    textColorDisabledError: '#CCCCCC',
    textColorGhostDisabled: '#D7DAE0',
    textColorGhostDisabledPrimary: '#D7DAE0',
    textColorGhostDisabledInfo: '#D7DAE0',
    textColorGhostDisabledSuccess: '#D7DAE0',
    textColorGhostDisabledWarning: '#D7DAE0',
    textColorGhostDisabledError: '#D7DAE0',
    textColorTextDisabled: '#D7DAE0',
    textColorTextDisabledPrimary: '#D7DAE0',
    textColorTextDisabledInfo: '#D7DAE0',
    textColorTextDisabledSuccess: '#D7DAE0',
    textColorTextDisabledWarning: '#D7DAE0',
    textColorTextDisabledError: '#D7DAE0',
    iconMarginSmall: '8px',
    iconMarginMedium: '8px',
    iconMarginLarge: '12px',
    fontWeightStrong: '600'
  },
  Checkbox: {
    sizeMedium: '16px',
    fontSizeMedium: '16px',
    borderRadius: '4px',
    borderDisabled: `1px solid ${colors.textColorDisabled}`,
    borderDisabledChecked: '1px solid #0000',
    checkMarkColorDisabled: colors.textColorDisabled,
    checkMarkColorDisabledChecked: '#FFF',
    colorDisabled: '#0000',
    colorDisabledChecked: '#F5F6F7 ',
    textColor: colors.textColor1,
    textColorDisabled: colors.textColorDisabled
  },
  Card: {
    paddingSmall: '20px',
    paddingMedium: '20px',
    paddingLarge: '20px',
    paddingHuge: '20px'
  },
  Cascader: {
    menuHeight: '290px',
    optionHeight: '38px'
  },
  DataTable: {
    fontSizeMedium: '16px',
    thColor: '#EBEDF0',
    thIconColor: '#ccc',
    thTextColor: commonLight.textColor2,
    thFontWeight: commonLight.fontWeight,
    tdColorHover: 'rgba(79, 178, 51, .1)',
    thButtonColorHover: '#0000',
    thColorModal: '#EBEDF0',
    tdColorHoverModal: composite(
      commonLight.primaryColor,
      'rgba(255, 255, 255, .9)'
    ),
    thPaddingSmall: '10px 20px',
    thPaddingMedium: '10px 20px',
    thPaddingLarge: '10px 20px',
    tdPaddingSmall: '10px 20px',
    tdPaddingMedium: '10px 20px',
    tdPaddingLarge: '10px 20px'
  },
  DatePicker: {
    itemBorderRadius: '14px',
    panelHeaderDividerColor: '#0000',
    calendarDaysDividerColor: '#0000',
    arrowColor: '#CCC',
    arrowSize: '24px',
    itemFontSize: '16px',
    calendarDaysFontSize: '16px',
    calendarTitleFontSize: '16px',
    panelActionPadding: '12px 20px',
    itemSize: '28px',
    itemCellHeight: '34px',
    itemCellWidth: '40px',
    calendarTitlePadding: '0 8px 8px 8px',
    calendarTitleHeight: '32px',
    calendarLeftPaddingDate: '12px 16px 9px 16px',
    calendarLeftPaddingDaterange: '12px 16px 9px 16px',
    calendarLeftPaddingDatetime: '6px 16px 9px 16px',
    calendarLeftPaddingDatetimerange: '6px 16px 9px 16px',
    calendarRightPaddingDaterange: '12px 16px 9px 16px',
    calendarRightPaddingDatetimerange: '6px 16px 9px 16px',
    calendarDividerColor: '#0000',
    panelHeaderPadding: '12px 20px 8px 20px'
  },
  Dialog: {
    padding: '40px',
    iconSize: '36px',
    iconMarginIconTop: '0 0 12px 0',
    closeMarginIconTop: '24px 24px 0 0',
    titleFontSize: '24px',
    fontSize: '16px',
    actionSpace: '20px',
    contentMargin: '12px 0 40px 0'
  },
  Dropdown: {
    optionHeightMedium: '38px'
  },
  DynamicTags: {
    peers: {
      Tag: {
        heightMedium: '24px'
      },
      Input: {
        heightSmall: '24px'
      }
    }
  },
  Empty: {
    iconColor: colors.textColorDisabled,
    textColor: colors.textColorDisabled,
    extraTextColor: colors.textColorDisabled
  },
  Input: {
    heightMedium: '32px',
    fontSizeMedium: '16px',
    paddingMedium: '0 12px',
    iconSize: '24px',
    borderHover: `1px solid ${colors.primaryColor}`,
    borderFocus: `1px solid ${colors.primaryColor}`
  },
  InternalSelection: {
    heightMedium: '32px',
    fontSizeMedium: '16px',
    paddingSingle: '0 36px 0 12px'
  },
  InternalSelectMenu: {
    height: '290px',
    optionHeightMedium: '38px',
    paddingSmall: '4px 0',
    paddingMedium: '6px 0',
    paddingLarge: '6px 0',
    paddingHuge: '8px 0'
  },
  Form: {
    blankHeightSmall: vars.CONTENT_SPACE,
    blankHeightMedium: vars.CONTENT_SPACE,
    blankHeightLarge: vars.CONTENT_SPACE,
    feedbackHeightSmall: vars.CONTENT_SPACE,
    feedbackHeightMedium: vars.CONTENT_SPACE,
    feedbackHeightLarge: vars.CONTENT_SPACE,
    feedbackFontSizeSmall: vars.SMALL_FRONT_SIZE,
    feedbackFontSizeMedium: vars.SMALL_FRONT_SIZE,
    feedbackFontSizeLarge: vars.SMALL_FRONT_SIZE,
    labelFontSizeLeftSmall: vars.SMALL_FRONT_SIZE,
    labelFontSizeLeftMedium: vars.SMALL_FRONT_SIZE,
    labelFontSizeLeftLarge: vars.NORMAL_FRONT_SIZE,
    labelFontSizeTopSmall: vars.SMALL_FRONT_SIZE,
    labelFontSizeTopMedium: vars.SMALL_FRONT_SIZE,
    labelFontSizeTopLarge: vars.NORMAL_FRONT_SIZE,
    labelHeightSmall: '22px',
    labelHeightMedium: '22px',
    labelHeightLarge: '22px',
    labelTextAlignHorizontal: 'left'
  },
  Menu: {
    borderRadius: '100px',
    itemIconColor: colors.textColor2
  },
  Message: {
    padding: '12px 20px 12px 12px',
    borderRadius: '24px',
    maxWidth: '720px',
    minWidth: '420px',
    iconMargin: '0 20px 0 0',
    closeMargin: '0 -8px 0 20px',
    colorSuccess: colors.successColor,
    colorInfo: colors.infoColor,
    colorWarning: colors.warningColor,
    colorError: colors.errorColor,
    textColorError: '#FFF',
    textColorSuccess: '#FFF',
    textColorInfo: '#FFFFFF',
    textColorWarning: '#333',
    iconColorInfo: '#FFF',
    iconColorSuccess: 'rgb(255, 255, 255)',
    iconColorWarning: '#333',
    iconColorError: 'rgb(255, 255, 255)',
    closeIconColorInfo: 'rgb(0, 0, 0)',
    closeIconColorHoverInfo: 'rgb(0, 0, 0)',
    closeIconColorPressedInfo: 'rgb(0, 0, 0)',
    closeIconColorSuccess: 'rgb(255, 255, 255)',
    closeIconColorHoverSuccess: 'rgb(255, 255, 255)',
    closeIconColorPressedSuccess: 'rgb(255, 255, 255)',
    closeIconColorError: 'rgb(255, 255, 255)',
    closeIconColorHoverError: 'rgb(255, 255, 255)',
    closeIconColorPressedError: 'rgb(255, 255, 255)',
    closeIconColorWarning: 'rgb(255, 255, 255)',
    closeIconColorHoverWarning: 'rgb(255, 255, 255)',
    closeIconColorPressedWarning: 'rgb(255, 255, 255)',
    closeIconColorLoading: 'rgb(0, 0, 0)',
    closeIconColorHoverLoading: 'rgb(0, 0, 0)',
    closeIconColorPressedLoading: 'rgb(0, 0, 0)',
    closeSize: '15px',
    iconSize: '20px'
  },
  Pagination: {
    itemSizeMedium: '32px',
    itemPaddingMedium: '0',
    // buttonFontSize: '24px',
    itemFontSizeMedium: '16px',
    inputWidthMedium: '80px',
    selectWidthMedium: '100px',
    inputMarginMedium: '0 20px',
    itemMarginMedium: '0 0 0 20px',
    itemBorder: '0 solid #0000',
    itemBorderHover: '0 solid #0000',
    itemBorderActive: '0 solid #0000',
    itemBorderDisabled: '0 solid #0000',
    itemColor: '#0000',
    itemColorPressed: composite(
      commonLight.primaryColor,
      'rgba(255, 255, 255, 0.9)'
    ),
    itemColorHover: 'rgba(79,178,51,.1)',
    itemColorActiveHover: composite(
      commonLight.primaryColor,
      'rgba(255, 255, 255, 0.9)'
    ),
    itemColorActive: '#0000',
    itemColorDisabled: '#0000',
    itemBorderRadius: '100px',
    itemTextColorHover: commonLight.textColor2,
    itemTextColorDisabled: '#D7DAE0',
    buttonBorder: '0 solid #0000',
    buttonBorderHover: '0 solid #0000',
    buttonBorderPressed: '0 solid #0000',
    buttonIconColorHover: commonLight.primaryColor
  },
  Popover: {
    fontSize: '16px',
    arrowOffset: '40px',
    arrowOffsetVertical: '16px',
    arrowHeight: '8px',
    space: '4px',
    spaceArrow: '14px',
    padding: '12px 20px'
  },
  Progress: {
    fontWeightCircle: '700',
    railHeight: '4px',
    fontSizeCircle: '24px',
    iconSizeCircle: '30px',
    iconSizeLine: '20px',
    iconColor: colors.warningColor,
    iconColorInfo: colors.warningColor,
    iconColorSuccess: colors.successColor,
    iconColorWarning: colors.errorColor,
    iconColorError: colors.errorColor,
    fillColor: colors.warningColor,
    fillColorInfo: colors.warningColor,
    fillColorSuccess: colors.successColor,
    fillColorWarning: colors.warningColor,
    fillColorError: colors.errorColor,
    textColorCircle: '#666666'
  },
  Radio: {
    dotColorDisabled: '#D7DAE0',
    buttonColorActive: '#4FB233',
    buttonTextColorActive: '#FFF'
  },
  Switch: {
    railHeightMedium: '15px',
    railHeightLarge: '20px',
    railBorderRadiusMedium: '8px',
    railBorderRadiusLarge: '10px',
    railWidthMedium: '40px',
    railWidthLarge: '50px',
    buttonHeightMedium: '24px',
    buttonHeightLarge: '32px',
    buttonWidthMedium: '24px',
    buttonWidthLarge: '32px',
    buttonWidthPressedMedium: '30px',
    buttonWidthPressedLarge: '38px',
    buttonBorderRadiusMedium: '12px',
    buttonBorderRadiusLarge: '16px',
    opacityDisabled: '1',
    railColor: '#D7DAE0',
    railColorActive: '#D7DAE0',
    buttonBoxShadow: '0 2px 3px 0 rgba(0,0,0,0.10)'
  },
  Table: {
    thColor: '#EBEDF0',
    thTextColor: commonLight.textColor2,
    thFontWeight: commonLight.fontWeight,
    thPaddingSmall: '10px 20px',
    thPaddingMedium: '10px 20px',
    thPaddingLarge: '10px 20px',
    tdPaddingSmall: '10px 20px',
    tdPaddingMedium: '10px 20px',
    tdPaddingLarge: '10px 20px'
  },
  Tag: {
    borderRadius: '100px',
    border: '1px solid #0000',
    color: 'rgba(153,153,153,0.10)',
    closeIconColor: commonLight.closeIconColor,
    closeIconColorHover: commonLight.closeIconColor,
    closeIconColorPressed: commonLight.closeIconColor,
    borderPrimary: '1px solid #0000',
    closeIconColorPrimary: commonLight.closeIconColor,
    closeIconColorHoverPrimary: commonLight.closeIconColor,
    closeIconColorPressedPrimary: commonLight.closeIconColor,
    borderInfo: '1px solid #0000',
    borderSuccess: '1px solid #0000',
    borderWarning: '1px solid #0000',
    borderError: '1px solid #0000',
    padding: '0 12px',
    closeMargin: '0 0 0 8px',
    heightMedium: '24px',
    closeSizeSmall: '20px',
    closeSizeMedium: '20px',
    closeSizeLarge: '20px',
    fontSizeSmall: '12px',
    fontSizeMedium: '16px',
    fontSizeLarge: '16px',
    colorCheckable: 'rgba(102, 102, 102, .1)',
    colorHoverCheckable: 'rgba(79, 178, 51, 0.1)'
  },
  TimePicker: {
    itemFontSize: '16px',
    itemHeight: '38px',
    itemWidth: '74px',
    panelActionPadding: '12px 0'
  },
  Tooltip: {
    peers: {
      Popover: {
        padding: '20px',
        fontSize: '16px'
      }
    }
  },
  Transfer: {
    extraTextColor: '#666'
  },
  Typography: {
    headerPrefixWidth3: '15px',
    headerPrefixWidth4: '15px',
    headerPrefixWidth5: '15px',
    headerPrefixWidth6: '15px'
  }
}

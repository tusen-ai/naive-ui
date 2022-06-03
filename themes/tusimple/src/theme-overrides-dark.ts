import { composite } from 'seemly'
import type { GlobalThemeOverrides } from 'naive-ui'
import { commonDark } from 'naive-ui'
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

// TODO
// 2. input suffix & prefix text color
// 3. input icon color?
// 6. notification size customization
// 7. upload style
// 8. missing attrs
//
// Some demands are really not easy to implement,
// particularly related to component layout.
//
// It's nearly impossible to expose all layout params (with a balanced count)

export const colors = {
  primaryColor: '#4FB233',
  primaryColorHover: createHoverColor('#4FB233'),
  primaryColorPressed: createPressedColor('#4FB233'),
  infoColor: '#4B70FA',
  infoColorHover: createHoverColor('#4B70FA'),
  infoColorPressed: createPressedColor('#4B70FA'),
  successColor: '#4FB233',
  successColorHover: createHoverColor('#4FB233'),
  successColorPressed: createPressedColor('#4FB233'),
  errorColor: '#EB3B61',
  errorColorHover: createHoverColor('#EB3B61'),
  errorColorPressed: createPressedColor('#EB3B61'),
  warningColor: '#FAB23E',
  warningColorHover: createHoverColor('#FAB23E', 0.2),
  warningColorPressed: createPressedColor('#FAB23E', 0.05),
  textColorDisabled: '#5B5B5B',
  textColor1: '#FFFFFF',
  textColor2: '#D6D6D6'
}

export const themeOverridesDark: GlobalThemeOverrides = {
  common: {
    fontSize: '16px',
    fontSizeMedium: '16px',
    fontWeightStrong: '700',
    borderRadius: '16px',
    borderColor: '#5B5B5B',
    opacity1: '0.8',
    opacity2: '0.6',
    opacity3: '0.4',
    opacity4: '0.2',
    opacity5: '0.2',
    baseColor: '#FFFFFF',
    dividerColor: '#5B5B5B',
    popoverColor: '#333333',
    inputColor: '#282828',
    inputColorDisabled: '#333333',

    textColor3: '#ADADAD',
    placeholderColor: '#5B5B5B', // disabled, placeholder, icon
    placeholderColorDisabled: '#848484',
    tableHeaderColor: '#282828',

    hoverColor: 'rgba(79, 178, 51, 0.15)',
    closeIconColor: '#D6D6D6',

    modalColor: '#282828',
    clearColor: '#ADADAD',
    boxShadow2: vars.NORMAL_BOX_SHADOW_DARK_THEME,
    ...colors
  },
  Avatar: {
    borderRadius: '50%'
  },
  Badge: {
    color: '#EB3B61'
  },
  BackTop: {
    width: '48px',
    height: '48px',
    iconSize: '24px',
    borderRadius: '24px',
    color: '#333',
    iconColor: '#ADADAD',
    iconColorHover: colors.primaryColor,
    iconColorPressed: colors.primaryColorPressed,
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
    itemTextColorPressed: colors.primaryColor,
    itemTextColor: '#ADADAD'
  },
  Button: {
    fontWeightStrong: commonDark.fontWeightStrong,
    textColor: '#FFFFFF',
    textColorWarning: '#333',
    textColorSuccess: '#333',
    textColorPrimary: '#333',
    iconSizeTiny: '14px',
    iconSizeSmall: '20px',
    iconSizeMedium: '20px',
    iconSizeLarge: '28px',
    borderRadiusTiny: '16px',
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
    colorDisabled: '#0000',
    colorDisabledPrimary: '#333',
    colorDisabledInfo: '#333',
    colorDisabledSuccess: '#333',
    colorDisabledWarning: '#333',
    colorDisabledError: '#333',
    border: '1px solid #ADADAD',
    borderDisabled: '1px solid #5B5B5B',
    borderDisabledPrimary: '1px solid #333',
    borderDisabledInfo: '1px solid #333',
    borderDisabledSuccess: '1px solid #333',
    borderDisabledWarning: '1px solid #333',
    borderDisabledError: '1px solid #333',
    textColorGhost: '#FFFFFF',
    textColorDisabled: '#5B5B5B',
    textColorDisabledPrimary: '#5B5B5B',
    textColorDisabledInfo: '#5B5B5B',
    textColorDisabledSuccess: '#5B5B5B',
    textColorDisabledWarning: '#5B5B5B',
    textColorDisabledError: '#5B5B5B',
    textColorGhostDisabled: '#5B5B5B',
    textColorGhostDisabledPrimary: '#5B5B5B',
    textColorGhostDisabledInfo: '#5B5B5B',
    textColorGhostDisabledSuccess: '#5B5B5B',
    textColorGhostDisabledWarning: '#5B5B5B',
    textColorGhostDisabledError: '#5B5B5B',
    textColorTextDisabled: '#5B5B5B',
    textColorTextDisabledPrimary: '#5B5B5B',
    textColorTextDisabledInfo: '#5B5B5B',
    textColorTextDisabledSuccess: '#5B5B5B',
    textColorTextDisabledWarning: '#5B5B5B',
    textColorTextDisabledError: '#5B5B5B',
    iconMarginSmall: '8px',
    iconMarginMedium: '8px',
    iconMarginLarge: '12px'
  },
  Checkbox: {
    labelPadding: '0 8px 0 12px',
    sizeMedium: '16px',
    fontSizeMedium: '16px',
    borderRadius: '4px',
    borderDisabled: '1px solid #5B5B5B',
    colorDisabled: '#0000',
    colorDisabledChecked: '#D8D8D8',
    textColor: '#FFFFFF'
  },
  Card: {
    paddingSmall: '20px',
    paddingMedium: '20px',
    paddingLarge: '20px',
    paddingHuge: '20px',
    color: '#282828',
    borderColor: '#5b5b5b',
    closeIconColorHover: colors.primaryColor,
    closeIconColorPressed: colors.primaryColorPressed
  },
  Cascader: {
    menuHeight: '290px',
    optionHeight: '38px'
  },
  DataTable: {
    fontSizeMedium: '16px',
    borderColor: '#404040',
    thTextColor: '#FFFFFF',
    tdColor: '#1E1E1E',
    tdTextColor: '#FFFFFF',
    thFontWeight: commonDark.fontWeight,
    tdColorHover: '#222C1F',
    thButtonColorHover: '#0000',
    thColorModal: '#282828',
    tdColorModal: '#1E1E1E',
    tdColorHoverModal: '#222C1F',
    thIconColor: '#848484',
    thColorHover: '#0000',
    thPaddingSmall: '10px 20px',
    thPaddingMedium: '10px 20px',
    thPaddingLarge: '10px 20px',
    tdPaddingSmall: '10px 20px',
    tdPaddingMedium: '10px 20px',
    tdPaddingLarge: '10px 20px'
  },
  DatePicker: {
    itemTextColor: '#FFF',
    itemColorHover: 'rgba(79, 178, 51, 0.15)',
    itemTextColorActive: '#333333',
    iconColor: '#848484',
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
    iconMarginIconTop: '0 0 20px 0',
    closeMarginIconTop: '24px 24px 0 0',
    titleFontSize: '24px',
    fontSize: '16px',
    actionSpace: '20px',
    contentMargin: '12px 0 40px 0',
    closeIconColorHover: colors.primaryColor,
    closeIconColorPressed: colors.primaryColorPressed
  },
  Dropdown: {
    optionHeightMedium: '38px'
  },
  Divider: {
    color: '#5B5B5B'
  },
  Drawer: {
    bodyPadding: '20px'
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
    heightSmall: '24px',
    heightMedium: '32px',
    fontSizeMedium: '16px',
    paddingSmall: '0 12px',
    paddingMedium: '0 12px',
    paddingLarge: '0 12px',
    iconSize: '24px',
    border: '1px solid #5B5B5B',
    borderWarning: '1px solid #FAB23E',
    borderError: '1px solid EB3B61',
    borderDisabled: '1px #333333 !important',
    colorDisabled: '#333333',
    borderHover: `1px solid ${colors.primaryColor}`,
    borderFocus: `1px solid ${colors.primaryColor}`,
    color: '#282828',
    textColor: '#FFFFFF',
    placeholderColor: '#848484',
    lineHeight: '22px',
    groupLabelColor: '#5B5B5B',
    groupLabelTextColor: '#FFF'
  },
  InternalSelection: {
    heightMedium: '32px',
    fontSizeMedium: '16px',
    paddingSingle: '0 36px 0 12px'
  },
  InternalSelectMenu: {
    height: '290px',
    optionTextColor: colors.textColor1,
    optionFontSizeMedium: '16px',
    optionPaddingMedium: '0 12px',
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
  Icon: {
    color: '#848484',
    opacity1Depth: '1',
    opacity2Depth: '1',
    opacity3Depth: '1'
  },
  List: {
    color: '#333',
    borderColor: '#5B5B5B'
  },
  Menu: {
    borderRadius: '100px',
    itemIconColor: '#D6D6D6'
  },
  Message: {
    padding: '12px 20px 12px 12px',
    borderRadius: '32px',
    maxWidth: '720px',
    minWidth: '420px',
    iconMargin: '0 20px 0 0',
    closeMargin: '0 -8px 0 20px',
    colorSuccess: colors.successColor,
    colorInfo: colors.infoColor,
    colorWarning: colors.warningColor,
    colorError: colors.errorColor,
    boxShadowInfo: vars.SPECIAL_BOX_SHADOW_DARK_THEME,
    boxShadowSuccess: vars.SPECIAL_BOX_SHADOW_DARK_THEME,
    boxShadowError: vars.SPECIAL_BOX_SHADOW_DARK_THEME,
    boxShadowWarning: vars.SPECIAL_BOX_SHADOW_DARK_THEME,
    textColorError: '#FFF',
    textColorSuccess: '#333',
    textColorInfo: '#FFF',
    textColorWarning: '#333',
    iconColorInfo: 'FFF',
    iconColorSuccess: '#333333',
    iconColorWarning: '#333333',
    iconColorError: 'rgb(255, 255, 255)',
    iconColorLoading: '#4FB233',
    closeIconColorInfo: 'rgb(255, 255, 255)',
    closeIconColorHoverInfo: 'rgb(255, 255, 255)',
    closeIconColorPressedInfo: 'rgb(255, 255, 255)',
    closeIconColorSuccess: '#333333',
    closeIconColorHoverSuccess: '#333333',
    closeIconColorPressedSuccess: '#333333',
    closeIconColorError: 'rgb(255, 255, 255)',
    closeIconColorHoverError: 'rgb(255, 255, 255)',
    closeIconColorPressedError: 'rgb(255, 255, 255)',
    closeIconColorWarning: '#333333',
    closeIconColorHoverWarning: '#333333',
    closeIconColorPressedWarning: '#333333',
    closeIconColorLoading: 'rgb(255, 255, 255)',
    closeIconColorHoverLoading: 'rgb(255, 255, 255)',
    closeIconColorPressedLoading: 'rgb(255, 255, 255)',
    closeSize: '24px',
    iconSize: '20px'
  },
  Modal: {
    textColor: '#FFF',
    color: '#545454'
  },
  Notification: {
    fontSize: '16px',
    headerTextColor: '#FFF',
    descriptionTextColor: '#ADADAD',
    textColor: colors.textColor2,
    closeIconColor: '#FFFFFF',
    closeIconColorHover: colors.primaryColor,
    closeIconColorPressed: colors.primaryColorPressed,
    boxShadow: vars.SPECIAL_BOX_SHADOW_DARK_THEME
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
    itemBorderActive: '0 solid #0000',
    itemBorderDisabled: '0 solid #0000',
    itemColor: '#0000',
    itemColorHover: 'rgba(79, 178, 51, 0.15)',
    itemColorActive: '#0000',
    itemColorDisabled: '#0000',
    itemBorderRadius: '100px',
    itemTextColor: colors.textColor1,
    itemTextColorHover: colors.primaryColor,
    itemTextColorDisabled: '#5B5B5B',
    buttonIconColor: '#FFFFFF',
    buttonBorder: '0 solid #0000',
    buttonIconColorHover: commonDark.primaryColor
  },
  Popover: {
    fontSize: '16px',
    arrowOffset: '40px',
    arrowOffsetVertical: '16px',
    arrowHeight: '8px',
    space: '4px',
    spaceArrow: '14px',
    textColor: '#FFF',
    boxShadow: vars.NORMAL_BOX_SHADOW_DARK_THEME,
    padding: '12px 20px'
  },
  Popconfirm: {
    iconColor: '#FAB23E !important'
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
    textColorCircle: '#ADADAD'
  },
  Steps: {
    indicatorTextColorProcess: '#333'
  },
  Radio: {
    labelPadding: '0 8px 0 12px',
    fontSizeMedium: '16px',
    radioSizeMedium: '16px',
    dotColorDisabled: '#5B5B5B',
    boxShadowDisabled: 'inset 0 0 0 1px #5B5B5B',
    textColor: '#FFFFFF',
    buttonTextColorActive: '#333'
  },
  Slider: {
    railColor: '#5B5B5B',
    fillColor: colors.primaryColor,
    fillColorHover: colors.primaryColorHover,
    railColorHover: '#5B5B5B',
    handleBoxShadow: vars.NORMAL_BOX_SHADOW_DARK_THEME,
    handleBoxShadowHover: vars.NORMAL_BOX_SHADOW_DARK_THEME,
    handleBoxShadowActive: vars.NORMAL_BOX_SHADOW_DARK_THEME,
    handleBoxShadowFocus: vars.NORMAL_BOX_SHADOW_DARK_THEME,
    dotColor: '#333333',
    dotBorder: '2px solid #5B5B5B',
    dotBorderActive: `2px solid ${colors.primaryColor}`
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
    railColor: '#5B5B5B',
    railColorActive: '#5B5B5B',
    buttonColor: '#5B5B5B',
    buttonBoxShadow: '0 2px 3px 0 rgba(0,0,0,0.10)'
  },
  Table: {
    thColor: '#282828',
    thTextColor: '#FFFFFF',
    tdColor: '#1E1E1E',
    tdTextColor: '#FFFFFF',
    thFontWeight: commonDark.fontWeight,
    borderColor: '#404040',
    thPaddingSmall: '10px 20px',
    thPaddingMedium: '10px 20px',
    thPaddingLarge: '10px 20px',
    tdPaddingSmall: '10px 20px',
    tdPaddingMedium: '10px 20px',
    tdPaddingLarge: '10px 20px'
  },
  Tabs: {
    tabTextColorLine: '#D6D6D6',
    tabTextColorBar: '#D6D6D6'
  },
  Tag: {
    borderRadius: '100px',
    border: '1px solid #0000',
    color: 'rgba(153,153,153,0.10)',
    colorError: 'rgba(235,59,97,0.15)',
    colorInfo: 'rgba(51,95,255,0.15)',
    colorSuccess: 'rgba(79,178,51,0.15)',
    closeIconColor: commonDark.closeIconColor,
    closeIconColorHover: commonDark.closeIconColor,
    closeIconColorPressed: commonDark.closeIconColor,
    borderPrimary: '1px solid #0000',
    closeIconColorPrimary: commonDark.closeIconColor,
    closeIconColorHoverPrimary: commonDark.closeIconColor,
    closeIconColorPressedPrimary: commonDark.closeIconColor,
    closeIconColorError: colors.errorColor,
    closeIconColorHoverError: colors.errorColorHover,
    closeIconColorPressedError: colors.errorColorPressed,
    closeIconColorInfo: colors.infoColor,
    closeIconColorHoverInfo: colors.infoColorHover,
    closeIconColorPressedInfo: colors.infoColorPressed,
    closeIconColorSuccess: colors.successColor,
    closeIconColorHoverSuccess: colors.successColorHover,
    closeIconColorPressedSuccess: colors.successColorPressed,
    closeIconColorWarning: colors.warningColor,
    closeIconColorHoverWarning: colors.warningColorHover,
    closeIconColorPressedWarning: colors.warningColorPressed,
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
    textColorCheckable: colors.textColor1,
    textColorHoverCheckable: colors.primaryColor,
    textColorChecked: '#000',
    colorCheckable: 'rgba(173,173,173,0.20)',
    colorHoverCheckable: 'rgba(79,178,51,0.15)',
    colorPressedCheckable: 'rgba(79,178,51,0.15)',
    colorChecked: colors.primaryColor,
    colorCheckedHover: colors.primaryColorHover,
    colorCheckedPressed: colors.primaryColorPressed
  },
  TimePicker: {
    itemFontSize: '16px',
    itemHeight: '38px',
    itemWidth: '74px',
    panelActionPadding: '12px 0',
    itemTextColor: '#FFF'
  },
  Tooltip: {
    peers: {
      Popover: {
        padding: '20px',
        fontSize: '16px',
        color: '#D6D6D6',
        textColor: '#333333'
      }
    }
  },
  Transfer: {
    borderColor: '#5B5B5B',
    headerColor: '#363636',
    extraTextColor: '#D6D6D6'
  },
  Typography: {
    headerPrefixWidth3: '15px',
    headerPrefixWidth4: '15px',
    headerPrefixWidth5: '15px',
    headerPrefixWidth6: '15px',
    headerBarColor: '#ADADAD'
  },
  Upload: {
    itemColorHover: 'rgba(255, 255, 255, 0.09)',
    itemColorHoverError: 'rgba(232, 128, 128, 0.09)',
    itemIconColor: '#FFFFFF',
    fontSize: '16px'
  }
}

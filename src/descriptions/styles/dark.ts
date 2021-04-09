import { composite } from 'seemly'
import commonVariables from './_common'
import { commonDark } from '../../_styles/common'
import type { DescriptionsTheme } from './light'

const descriptionsDark: DescriptionsTheme = {
  name: 'Descriptions',
  common: commonDark,
  self (vars) {
    const {
      tableHeaderColor,
      textColor1,
      textColor2,
      cardColor,
      modalColor,
      popoverColor,
      dividerColor,
      borderRadius,
      fontWeightStrong,
      lineHeight,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge
    } = vars
    return {
      ...commonVariables,
      lineHeight,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      thColor: composite(cardColor, tableHeaderColor),
      thColorModal: composite(modalColor, tableHeaderColor),
      thColorPopover: composite(popoverColor, tableHeaderColor),
      thTextColor: textColor1,
      thFontWeight: fontWeightStrong,
      tdTextColor: textColor2,
      tdColor: cardColor,
      tdColorModal: modalColor,
      tdColorPopover: popoverColor,
      borderColor: composite(cardColor, dividerColor),
      borderColorModal: composite(modalColor, dividerColor),
      borderColorPopover: composite(popoverColor, dividerColor),
      borderRadius: borderRadius
    }
  }
}

export default descriptionsDark

import { composite } from 'seemly'
import sizeVariables from './_common'
import { commonDark } from '../../_styles/common'
import type { TableTheme } from './light'

const tableDark: TableTheme = {
  name: 'Table',
  common: commonDark,
  self (vars) {
    const {
      dividerColor,
      cardColor,
      modalColor,
      popoverColor,
      tableHeaderColor,
      textColor1,
      textColor2,
      fontWeightStrong,
      borderRadius,
      lineHeight,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge
    } = vars
    return {
      ...sizeVariables,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      lineHeight,
      borderRadius,
      borderColor: composite(cardColor, dividerColor),
      borderColorModal: composite(modalColor, dividerColor),
      borderColorPopover: composite(popoverColor, dividerColor),
      tdColor: cardColor,
      tdColorModal: modalColor,
      tdColorPopover: popoverColor,
      thColor: composite(cardColor, tableHeaderColor),
      thColorModal: composite(modalColor, tableHeaderColor),
      thColorPopover: composite(popoverColor, tableHeaderColor),
      thTextColor: textColor1,
      tdTextColor: textColor2,
      thFontWeight: fontWeightStrong
    }
  }
}

export default tableDark

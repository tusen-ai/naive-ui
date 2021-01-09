import { composite } from 'seemly'
import commonVariables from './_common'
import { iconLight } from '../../icon/styles'
import { buttonLight } from '../../button/styles'
import { checkboxLight } from '../../checkbox/styles'
import { radioLight } from '../../radio/styles'
import { paginationLight } from '../../pagination/styles'
import { scrollbarLight } from '../../scrollbar/styles'
import { dividerLight } from '../../divider/styles'
import { spinLight } from '../../spin/styles'
import { emptyDark } from '../../empty/styles'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'DataTable',
  common: commonLight,
  peers: {
    Icon: iconLight,
    Button: buttonLight,
    Checkbox: checkboxLight,
    Radio: radioLight,
    Pagination: paginationLight,
    Scrollbar: scrollbarLight,
    Divider: dividerLight,
    Spin: spinLight,
    Empty: emptyDark
  },
  self (vars) {
    const {
      cardColor,
      modalColor,
      dividerColorOverlay,
      textColor2,
      textColor1,
      tableHeaderColorOverlay,
      tableColorHoverOverlay,
      iconColorOverlay,
      primaryColor,
      fontWeightStrong,
      borderRadius,
      lineHeight,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge
    } = vars
    return {
      ...commonVariables,
      lineHeight,
      borderRadius,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      borderColor: composite(cardColor, dividerColorOverlay),
      tdColorHover: composite(cardColor, tableColorHoverOverlay),
      thColor: composite(cardColor, tableHeaderColorOverlay),
      thColorHover: composite(
        composite(cardColor, tableHeaderColorOverlay),
        tableHeaderColorOverlay
      ),
      tdColor: cardColor,
      tdTextColor: textColor2,
      thTextColor: textColor1,
      thFontWeight: fontWeightStrong,
      thButtonColorHover: tableColorHoverOverlay,
      thIconColor: iconColorOverlay,
      thIconColorActive: primaryColor,
      // modal
      borderColorModal: composite(modalColor, dividerColorOverlay),
      tdColorHoverModal: composite(modalColor, tableColorHoverOverlay),
      thColorModal: composite(modalColor, tableHeaderColorOverlay),
      thColorHoverModal: composite(
        composite(modalColor, tableHeaderColorOverlay),
        tableHeaderColorOverlay
      ),
      tdColorModal: modalColor
    }
  }
}

import create from '../../_styles/utils/create-component-base'
import { composite } from 'seemly'
import commonVariables from './_common'
import { baseLight } from '../../_styles/base'
import { iconLight } from '../../icon/styles'
import { buttonLight } from '../../button/styles'
import { checkboxLight } from '../../checkbox/styles'
import { radioLight } from '../../radio/styles'
import { paginationLight } from '../../pagination/styles'
import { scrollbarLight } from '../../scrollbar/styles'
import { dividerLight } from '../../divider/styles'

export default create({
  theme: 'light',
  name: 'DataTable',
  peer: [
    baseLight,
    iconLight,
    buttonLight,
    checkboxLight,
    radioLight,
    paginationLight,
    scrollbarLight,
    dividerLight
  ],
  getLocalVars (vars) {
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
      lineHeight
    } = vars
    return {
      ...commonVariables,
      lineHeight,
      borderRadius,
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
      thButtonIconColor: iconColorOverlay,
      thButtonIconColorActive: primaryColor,
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
})

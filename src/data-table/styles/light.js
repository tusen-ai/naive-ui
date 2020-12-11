import create from '../../_styles/utils/create-component-base'
import { composite } from 'seemly'
import commonVariables from './_common'
import { baseLight } from '../../_styles/base'
import { iconLight } from '../../icon'
import { buttonLight } from '../../button'
import { checkboxLight } from '../../checkbox'
import { radioLight } from '../../radio'
import { paginationLight } from '../../pagination'
import { scrollbarLight } from '../../scrollbar'
import { dividerLight } from '../../divider'

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
      borderRadius
    } = vars
    return {
      ...commonVariables,
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

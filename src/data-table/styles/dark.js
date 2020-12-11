import create from '../../_styles/utils/create-component-base'
import { composite } from 'seemly'
import commonVariables from './_common'
import { baseDark } from '../../_styles/base'
import { iconDark } from '../../icon'
import { buttonDark } from '../../button'
import { checkboxDark } from '../../checkbox'
import { radioDark } from '../../radio'
import { paginationDark } from '../../pagination'
import { scrollbarDark } from '../../scrollbar'
import { dividerDark } from '../../divider'

export default create({
  theme: 'dark',
  name: 'DataTable',
  peer: [
    baseDark,
    iconDark,
    buttonDark,
    checkboxDark,
    radioDark,
    paginationDark,
    scrollbarDark,
    dividerDark
  ],
  getLocalVars (vars) {
    const {
      cardColor,
      modalColor,
      dividerColorOverlay,
      textColor2Overlay,
      textColor1Overlay,
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
      tdTextColor: textColor2Overlay,
      thTextColor: textColor1Overlay,
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

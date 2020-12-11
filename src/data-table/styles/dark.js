import create from '../../_styles/utils/create-component-base'
import { composite } from 'seemly'
import commonVariables from './_common'
import { baseDark } from '../../_styles/base'
import { iconDark } from '../../icon/styles'
import { buttonDark } from '../../button/styles'
import { checkboxDark } from '../../checkbox/styles'
import { radioDark } from '../../radio/styles'
import { paginationDark } from '../../pagination/styles'
import { scrollbarDark } from '../../scrollbar/styles'
import { dividerDark } from '../../divider/styles'

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

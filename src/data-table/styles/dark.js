import create from '../../_styles/utils/create-component-base'
import { composite } from 'seemly'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'DataTable',
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

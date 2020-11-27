import create from '../../_styles/utils/create-component-base'
import { composite } from 'seemly'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'DataTable',
  getDerivedVariables ({ base, derived }) {
    const {
      fontWeightStrong,
      borderRadius
    } = base
    const {
      cardColor,
      modalColor,
      dividerColorOverlay,
      textColor2,
      textColor1,
      tableHeaderColorOverlay,
      tableColorHoverOverlay,
      iconColorOverlay,
      primaryColor
    } = derived
    return {
      ...commonVariables,
      borderRadius,
      borderColor: composite(cardColor, dividerColorOverlay),
      bodyColorHover: composite(cardColor, tableColorHoverOverlay),
      headerColor: composite(cardColor, tableHeaderColorOverlay),
      headerColorHover: composite(
        composite(cardColor, tableHeaderColorOverlay),
        tableHeaderColorOverlay
      ),
      bodyColor: cardColor,
      bodyTextColor: textColor2,
      headerTextColor: textColor1,
      headerFontWeight: fontWeightStrong,
      headerButtonColorHover: tableColorHoverOverlay,
      headerButtonIconColor: iconColorOverlay,
      headerButtonIconColorActive: primaryColor,
      fixedColumnBoxShadowColor: 'rgba(0, 0, 0, .36)',

      borderColorModal: composite(modalColor, dividerColorOverlay),
      bodyColorHoverModal: composite(modalColor, tableColorHoverOverlay),
      headerColorModal: composite(modalColor, tableHeaderColorOverlay),
      headerColorHoverModal: composite(
        composite(modalColor, tableHeaderColorOverlay),
        tableHeaderColorOverlay
      ),
      bodyColorModal: modalColor
    }
  }
})

import create from '../../styles/_utils/create-component-base'
import { composite } from '../../_utils/color'
import commonVariables from './_common'

export default create({
  theme: 'light',
  name: 'DataTable',
  getDerivedVariables ({ base, derived }) {
    const {
      strongFontWeight,
      borderRadius
    } = base
    const {
      cardBackgroundColor,
      modalBackgroundColor,
      dividerOverlayColor,
      secondaryTextColor,
      primaryTextColor,
      tableHeaderBackgroundOverlayColor,
      tablePendingBackgroundOverlayColor,
      iconOverlayColor,
      primaryColor
    } = derived
    return {
      ...commonVariables,
      borderRadius,
      default: {
        borderColor: composite(cardBackgroundColor, dividerOverlayColor),
        bodyColorHover: composite(cardBackgroundColor, tablePendingBackgroundOverlayColor),
        headerColor: composite(cardBackgroundColor, tableHeaderBackgroundOverlayColor),
        headerColorHover: composite(
          composite(cardBackgroundColor, tableHeaderBackgroundOverlayColor),
          tableHeaderBackgroundOverlayColor
        ),
        bodyColor: cardBackgroundColor,
        bodyTextColor: secondaryTextColor,
        headerTextColor: primaryTextColor,
        headerFontWeight: strongFontWeight,
        headerButtonColorHover: tablePendingBackgroundOverlayColor,
        headerButtonIconColor: iconOverlayColor,
        headerButtonIconColorActive: primaryColor,
        fixedColumnBoxShadowColor: 'rgba(0, 0, 0, .18)'
      },
      modal: {
        borderColor: composite(modalBackgroundColor, dividerOverlayColor),
        bodyColorHover: composite(modalBackgroundColor, tablePendingBackgroundOverlayColor),
        headerColor: composite(modalBackgroundColor, tableHeaderBackgroundOverlayColor),
        headerColorHover: composite(
          composite(modalBackgroundColor, tableHeaderBackgroundOverlayColor),
          tableHeaderBackgroundOverlayColor
        ),
        bodyColor: modalBackgroundColor
      }
    }
  }
})

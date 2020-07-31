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
        bodyHoverBackgroundColor: composite(cardBackgroundColor, tablePendingBackgroundOverlayColor),
        headerBackgroundColor: composite(cardBackgroundColor, tableHeaderBackgroundOverlayColor),
        headerHoverBackgroundColor: composite(
          composite(cardBackgroundColor, tableHeaderBackgroundOverlayColor),
          tableHeaderBackgroundOverlayColor
        ),
        bodyBackgroundColor: cardBackgroundColor,
        bodyTextColor: secondaryTextColor,
        headerTextColor: primaryTextColor,
        headerFontWeight: strongFontWeight,
        headerButtonHoverBackgroundColor: tablePendingBackgroundOverlayColor,
        headerButtonIconColor: iconOverlayColor,
        headerButtonIconActiveColor: primaryColor,
        fixedColumnBoxShadowColor: 'rgba(0, 0, 0, .18)'
      },
      modal: {
        borderColor: composite(modalBackgroundColor, dividerOverlayColor),
        bodyHoverBackgroundColor: composite(modalBackgroundColor, tablePendingBackgroundOverlayColor),
        headerBackgroundColor: composite(modalBackgroundColor, tableHeaderBackgroundOverlayColor),
        headerHoverBackgroundColor: composite(
          composite(modalBackgroundColor, tableHeaderBackgroundOverlayColor),
          tableHeaderBackgroundOverlayColor
        ),
        bodyBackgroundColor: modalBackgroundColor
      }
    }
  }
})

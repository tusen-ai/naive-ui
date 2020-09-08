import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'
import { composite } from '../../_utils/color'

export default create({
  theme: 'light',
  name: 'Descriptions',
  getDerivedVariables ({ base, derived }) {
    const {
      tableHeaderBackgroundOverlayColor,
      primaryTextOverlayColor,
      secondaryTextOverlayColor,
      cardBackgroundColor,
      modalBackgroundColor,
      dividerOverlayColor
    } = derived
    const {
      borderRadius,
      strongFontWeight
    } = base
    return {
      ...commonVariables,
      headerBackgroudColor: composite(cardBackgroundColor, tableHeaderBackgroundOverlayColor),
      headerTextColor: primaryTextOverlayColor,
      contentTextColor: secondaryTextOverlayColor,
      contentBackgroundColorDefault: cardBackgroundColor,
      contentBackgroundColorModal: modalBackgroundColor,
      borderColor: dividerOverlayColor,
      borderRadius: borderRadius,
      strongFontWeight: strongFontWeight
    }
  }
})

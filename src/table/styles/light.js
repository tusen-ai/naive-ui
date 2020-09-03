import create from '../../styles/_utils/create-component-base'
import { composite } from '../../_utils/color'
import sizeVariables from './_common'

export default create({
  theme: 'light',
  name: 'Table',
  getDerivedVariables ({ base, derived }) {
    const {
      dividerOverlayColor,
      cardBackgroundColor,
      modalBackgroundColor,
      actionBackgroundOverlayColor,
      primaryTextColor,
      secondaryTextColor,
      borderRadius
    } = derived
    const {
      strongFontWeight
    } = base
    return {
      ...sizeVariables,
      borderColor: dividerOverlayColor,
      bodyColor: cardBackgroundColor,
      bodyColorModal: modalBackgroundColor,
      headerColor: composite(cardBackgroundColor, actionBackgroundOverlayColor),
      headerTextColor: primaryTextColor,
      bodyTextColor: secondaryTextColor,
      borderRadius,
      strongFontWeight
    }
  }
})

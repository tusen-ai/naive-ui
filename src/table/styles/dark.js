import create from '../../styles/_utils/create-component-base'
import sizeVariables from './_common'

export default create({
  theme: 'dark',
  name: 'Table',
  getDerivedVariables ({ base, derived }) {
    const {
      dividerOverlayColor,
      cardBackgroundColor,
      modalBackgroundColor,
      actionBackgroundOverlayColor,
      primaryTextOverlayColor,
      secondaryTextOverlayColor
    } = derived
    const {
      strongFontWeight,
      borderRadius
    } = base
    return {
      ...sizeVariables,
      borderColor: dividerOverlayColor,
      bodyColor: cardBackgroundColor,
      bodyColorModal: modalBackgroundColor,
      headerColor: actionBackgroundOverlayColor,
      headerTextColor: primaryTextOverlayColor,
      bodyTextColor: secondaryTextOverlayColor,
      borderRadius,
      headFontWeight: strongFontWeight
    }
  }
})

import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'

export default create({
  theme: 'dark',
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
      headerColor: tableHeaderBackgroundOverlayColor,
      headerTextColor: primaryTextOverlayColor,
      headerFontWeight: strongFontWeight,
      contentTextColor: secondaryTextOverlayColor,
      contentColor: cardBackgroundColor,
      contentColorModal: modalBackgroundColor,
      borderColor: dividerOverlayColor,
      borderRadius: borderRadius
    }
  }
})

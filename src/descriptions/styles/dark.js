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
      headerBackgroudColor: tableHeaderBackgroundOverlayColor,
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

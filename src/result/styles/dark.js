import create from '../../styles/_utils/create-component-base'
import sizeVariables from './_common'

export default create({
  name: 'Result',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      primaryTextOverlayColor,
      secondaryTextOverlayColor,
      errorColor,
      successColor,
      infoColor,
      warningColor
    } = derived
    const {
      lineHeight,
      strongFontWeight
    } = base
    return {
      ...sizeVariables,
      lineHeight,
      headerFontWeight: strongFontWeight,
      headerTextColor: primaryTextOverlayColor,
      descriptionTextColor: secondaryTextOverlayColor,
      iconColorError: errorColor,
      iconColorSuccess: successColor,
      iconColorInfo: infoColor,
      iconColorWarning: warningColor
    }
  }
})

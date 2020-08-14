import create from '../../styles/_utils/create-component-base'
import sizeVariables from './_common'

export default create({
  name: 'Result',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextColor,
      primaryTextColor,
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
      strongFontWeight,
      headerTextColor: primaryTextColor,
      descriptionTextColor: secondaryTextColor,
      iconColorError: errorColor,
      iconColorSuccess: successColor,
      iconColorInfo: infoColor,
      iconColorWarning: warningColor
    }
  }
})

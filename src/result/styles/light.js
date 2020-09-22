import create from '../../styles/_utils/create-component-base'
import sizeVariables from './_common'

export default create({
  name: 'Result',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      textColorSecondary,
      textColorPrimary,
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
      headerTextColor: textColorPrimary,
      descriptionTextColor: textColorSecondary,
      iconColorError: errorColor,
      iconColorSuccess: successColor,
      iconColorInfo: infoColor,
      iconColorWarning: warningColor
    }
  }
})

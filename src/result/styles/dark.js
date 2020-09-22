import create from '../../styles/_utils/create-component-base'
import sizeVariables from './_common'

export default create({
  name: 'Result',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      textColorPrimaryOverlay,
      textColorSecondaryOverlay,
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
      headerTextColor: textColorPrimaryOverlay,
      descriptionTextColor: textColorSecondaryOverlay,
      iconColorError: errorColor,
      iconColorSuccess: successColor,
      iconColorInfo: infoColor,
      iconColorWarning: warningColor
    }
  }
})

import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'

export default create({
  theme: 'light',
  name: 'Table',
  getDerivedVariables ({ base, derived }) {
    const {
      dividerColorOverlay,
      cardColor,
      modalColor,
      actionColorOverlay,
      textColor1,
      textColor2
    } = derived
    const {
      borderRadius,
      fontWeightStrong
    } = base
    return {
      ...sizeVariables,
      borderColor: dividerColorOverlay,
      bodyColor: cardColor,
      bodyColorModal: modalColor,
      headerColor: actionColorOverlay,
      headerTextColor: textColor1,
      bodyTextColor: textColor2,
      borderRadius,
      headFontWeight: fontWeightStrong
    }
  }
})

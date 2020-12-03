import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'

export default create({
  theme: 'light',
  name: 'Table',
  getLocalVars (vars) {
    const {
      dividerColorOverlay,
      cardColor,
      modalColor,
      actionColorOverlay,
      textColor1,
      textColor2,
      borderRadius,
      fontWeightStrong
    } = vars
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

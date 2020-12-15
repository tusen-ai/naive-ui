import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'
import { baseLight } from '../../_styles/base'

export default create({
  theme: 'light',
  name: 'Table',
  peer: [baseLight],
  getLocalVars (vars) {
    const {
      dividerColorOverlay,
      cardColor,
      modalColor,
      actionColorOverlay,
      textColor1,
      textColor2,
      borderRadius,
      fontWeightStrong,
      lineHeight,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge
    } = vars
    return {
      ...sizeVariables,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      lineHeight,
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

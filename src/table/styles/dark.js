import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'
import { baseDark } from '../../_styles/base'

export default create({
  theme: 'dark',
  name: 'Table',
  peer: [baseDark],
  getLocalVars (vars) {
    const {
      dividerColorOverlay,
      cardColor,
      modalColor,
      actionColorOverlay,
      textColor1Overlay,
      textColor2Overlay,
      fontWeightStrong,
      borderRadius,
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
      headerTextColor: textColor1Overlay,
      bodyTextColor: textColor2Overlay,
      borderRadius,
      headFontWeight: fontWeightStrong
    }
  }
})

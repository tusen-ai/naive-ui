import sizeVariables from './_common'
import { commonDark } from '../../_styles/new-common'

export default {
  name: 'Table',
  common: commonDark,
  self (vars) {
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
      borderRadius,
      borderColor: dividerColorOverlay,
      bodyColor: cardColor,
      bodyColorModal: modalColor,
      thColor: actionColorOverlay,
      thTextColor: textColor1Overlay,
      tdTextColor: textColor2Overlay,
      tdFontWeight: fontWeightStrong
    }
  }
}

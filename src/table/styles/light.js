import sizeVariables from './_common'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Table',
  common: commonLight,
  self (vars) {
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
      borderRadius,
      borderColor: dividerColorOverlay,
      bodyColor: cardColor,
      bodyColorModal: modalColor,
      thColor: actionColorOverlay,
      thTextColor: textColor1,
      tdTextColor: textColor2,
      tdFontWeight: fontWeightStrong
    }
  }
}

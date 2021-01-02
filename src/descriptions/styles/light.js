import { composite } from 'seemly'
import commonVariables from './_common'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Descriptions',
  common: commonLight,
  self (vars) {
    const {
      tableHeaderColorOverlay,
      textColor1Overlay,
      textColor2Overlay,
      cardColor,
      modalColor,
      dividerColorOverlay,
      borderRadius,
      fontWeightStrong,
      lineHeight,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge
    } = vars
    return {
      ...commonVariables,
      lineHeight,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      thColor: composite(cardColor, tableHeaderColorOverlay),
      thTextColor: textColor1Overlay,
      thFontWeight: fontWeightStrong,
      tdTextColor: textColor2Overlay,
      tdColor: cardColor,
      tdColorModal: modalColor,
      borderColor: dividerColorOverlay,
      borderRadius: borderRadius
    }
  }
}

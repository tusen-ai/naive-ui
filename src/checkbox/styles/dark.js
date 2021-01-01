import commonVariables from './_common'
import { changeColor } from 'seemly'
import { commonDark } from '../../_styles/new-common'

export default {
  common: commonDark,
  self (vars) {
    const {
      inputColorDisabledOverlay,
      cardColor,
      modalColor,
      borderColorOverlay,
      primaryColor,
      textColor2Overlay,
      textColorDisabledOverlay,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      borderRadiusSmall
    } = vars
    return {
      ...commonVariables,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      borderRadius: borderRadiusSmall,
      color: 'transparent',
      colorActive: primaryColor,
      colorDisabled: inputColorDisabledOverlay,
      colorTableHeader: cardColor,
      colorTableHeaderModal: modalColor,
      checkMarkColor: cardColor,
      checkMarkColorDisabled: textColorDisabledOverlay,
      border: `1px solid ${borderColorOverlay}`,
      borderDisabled: `1px solid ${borderColorOverlay}`,
      borderActive: `1px solid ${primaryColor}`,
      borderFocus: `1px solid ${primaryColor}`,
      boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, { alpha: 0.3 })}`,
      textColor: textColor2Overlay,
      textColorDisabled: textColorDisabledOverlay
    }
  }
}

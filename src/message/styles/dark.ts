import commonVariables from './_common'
import { commonDark } from '../../_styles/new-common'
import type { MessageTheme } from './light'

const messageDark: MessageTheme = {
  name: 'Message',
  common: commonDark,
  self (vars) {
    const {
      textColor2Overlay,
      infoColor,
      successColor,
      errorColor,
      warningColor,
      popoverColor,
      boxShadow2,
      primaryColor,
      lineHeight,
      borderRadius,
      closeColorOverlay,
      closeColorHoverOverlay,
      closeColorPressedOverlay
    } = vars
    return {
      ...commonVariables,
      textColorInfo: textColor2Overlay,
      textColorSuccess: textColor2Overlay,
      textColorError: textColor2Overlay,
      textColorWarning: textColor2Overlay,
      textColorLoading: textColor2Overlay,
      colorInfo: popoverColor,
      colorSuccess: popoverColor,
      colorError: popoverColor,
      colorWarning: popoverColor,
      colorLoading: popoverColor,
      boxShadowInfo: boxShadow2,
      boxShadowSuccess: boxShadow2,
      boxShadowError: boxShadow2,
      boxShadowWarning: boxShadow2,
      boxShadowLoading: boxShadow2,
      iconColorInfo: infoColor,
      iconColorSuccess: successColor,
      iconColorWarning: warningColor,
      iconColorError: errorColor,
      iconColorLoading: primaryColor,
      closeColorInfo: closeColorOverlay,
      closeColorHoverInfo: closeColorHoverOverlay,
      closeColorPressedInfo: closeColorPressedOverlay,
      closeColorSuccess: closeColorOverlay,
      closeColorHoverSuccess: closeColorHoverOverlay,
      closeColorPressedSuccess: closeColorPressedOverlay,
      closeColorError: closeColorOverlay,
      closeColorHoverError: closeColorHoverOverlay,
      closeColorPressedError: closeColorPressedOverlay,
      closeColorWarning: closeColorOverlay,
      closeColorHoverWarning: closeColorHoverOverlay,
      closeColorPressedWarning: closeColorPressedOverlay,
      closeColorLoading: closeColorOverlay,
      closeColorHoverLoading: closeColorHoverOverlay,
      closeColorPressedLoading: closeColorPressedOverlay,
      lineHeight,
      borderRadius,
      loadingColor: primaryColor
    }
  }
}

export default messageDark

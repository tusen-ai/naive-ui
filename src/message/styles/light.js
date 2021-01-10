import commonVariables from './_common'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Message',
  common: commonLight,
  self (vars) {
    const {
      textColor2,
      baseColor,
      closeColor,
      closeColorHover,
      infoColor,
      successColor,
      errorColor,
      warningColor,
      popoverColor,
      boxShadow2,
      primaryColor,
      lineHeight,
      borderRadius
    } = vars
    const coloredBoxShadow = '0px 2px 18px 0px rgba(0, 0, 0, 0.27)'
    return {
      ...commonVariables,
      textColorInfo: baseColor,
      textColorSuccess: baseColor,
      textColorError: baseColor,
      textColorWarning: baseColor,
      textColorLoading: textColor2,
      colorInfo: infoColor,
      colorSuccess: successColor,
      colorError: errorColor,
      colorWarning: warningColor,
      colorLoading: popoverColor,
      boxShadowInfo: coloredBoxShadow,
      boxShadowSuccess: coloredBoxShadow,
      boxShadowError: coloredBoxShadow,
      boxShadowWarning: coloredBoxShadow,
      boxShadowLoading: boxShadow2,
      iconColorInfo: 'rgba(255, 255, 255, .45)',
      iconColorSuccess: 'rgba(255, 255, 255, .45)',
      iconColorWarning: 'rgba(255, 255, 255, .45)',
      iconColorError: 'rgba(255, 255, 255, .45)',
      iconColorLoading: 'rgba(255, 255, 255, .45)',
      closeColorInfo: 'rgba(255, 255, 255, .5)',
      closeColorHoverInfo: 'rgba(255, 255, 255, .6)',
      closeColorPressedInfo: 'rgba(255, 255, 255, .4)',
      closeColorSuccess: 'rgba(255, 255, 255, .5)',
      closeColorHoverSuccess: 'rgba(255, 255, 255, .6)',
      closeColorPressedSuccess: 'rgba(255, 255, 255, .4)',
      closeColorError: 'rgba(255, 255, 255, .5)',
      closeColorHoverError: 'rgba(255, 255, 255, .6)',
      closeColorPressedError: 'rgba(255, 255, 255, .4)',
      closeColorWarning: 'rgba(255, 255, 255, .5)',
      closeColorHoverWarning: 'rgba(255, 255, 255, .6)',
      closeColorPressedWarning: 'rgba(255, 255, 255, .4)',
      closeColorLoading: closeColor,
      closeColorHoverLoading: closeColorHover,
      closeColorPressedLoading: closeColor,
      loadingColor: primaryColor,
      lineHeight,
      borderRadius
    }
  }
}

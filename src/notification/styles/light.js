import { scrollbarLight } from '../../scrollbar/styles'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Notification',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight
  },
  self (vars) {
    const {
      textColor2,
      successColor,
      infoColor,
      warningColor,
      errorColor,
      popoverColor,
      closeColor,
      closeColorHover,
      textColor1Overlay,
      textColor3Overlay,
      borderRadius,
      fontWeightStrong,
      boxShadow2,
      lineHeight,
      fontSize
    } = vars
    return {
      borderRadius,
      lineHeight,
      fontSize,
      headerFontWeight: fontWeightStrong,
      iconColorSuccess: successColor,
      iconColorInfo: infoColor,
      iconColorWarning: warningColor,
      iconColorError: errorColor,
      color: popoverColor,
      textColor: textColor2,
      closeColor: closeColor,
      closeColorHover: closeColorHover,
      closeColorPressed: closeColor,
      headerTextColor: textColor1Overlay,
      descriptionTextColor: textColor3Overlay,
      actionTextColor: textColor2,
      boxShadow: boxShadow2
    }
  }
}

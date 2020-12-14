import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'
import { avatarLight } from '../../avatar/styles'
import { scrollbarLight } from '../../scrollbar/styles'
import { iconLight } from '../../icon/styles'

export default create({
  name: 'Notification',
  theme: 'light',
  peer: [baseLight, iconLight, avatarLight, scrollbarLight],
  getLocalVars (vars) {
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
      boxShadow2
    } = vars
    return {
      borderRadius,
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
      contentTextColor: textColor2,
      descriptionTextColor: textColor3Overlay,
      actionTextColor: textColor2,
      boxShadow: boxShadow2
    }
  }
})

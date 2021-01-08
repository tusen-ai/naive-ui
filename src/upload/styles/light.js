import { changeColor } from 'seemly'
import { buttonLight } from '../../button/styles'
import { iconLight } from '../../icon/styles'
import { progressLight } from '../../progress/styles'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Upload',
  common: commonLight,
  peers: {
    Button: buttonLight,
    Icon: iconLight,
    Progress: progressLight
  },
  self (vars) {
    const {
      iconColorOverlay,
      primaryColor,
      errorColor,
      textColor2,
      successColor,
      opacityDisabled,
      actionColorOverlay,
      borderColor,
      hoverColorOverlay,
      lineHeight,
      borderRadius,
      fontSize
    } = vars
    return {
      fontSize,
      lineHeight,
      borderRadius,
      draggerColor: actionColorOverlay,
      draggerBorder: `1px dashed ${borderColor}`,
      draggerBorderHover: `1px dashed ${primaryColor}`,
      itemColorHover: hoverColorOverlay,
      itemColorHoverError: changeColor(errorColor, {
        alpha: 0.06
      }),
      itemTextColor: textColor2,
      itemTextColorError: errorColor,
      itemTextColorSuccess: successColor,
      itemIconColor: iconColorOverlay,
      itemDisabledOpacity: opacityDisabled
    }
  }
}

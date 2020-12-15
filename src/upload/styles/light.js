import create from '../../_styles/utils/create-component-base'
import { changeColor } from 'seemly'
import { baseLight } from '../../_styles/base'
import { buttonLight } from '../../button/styles'
import { iconLight } from '../../icon/styles'
import { progressLight } from '../../progress/styles'

export default create({
  name: 'Upload',
  theme: 'light',
  peer: [baseLight, buttonLight, iconLight, progressLight],
  getLocalVars (vars) {
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
      borderRadius
    } = vars
    return {
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
})

import create from '../../_styles/utils/create-component-base'
import { changeColor } from 'seemly'
import { baseDark } from '../../_styles/base'
import { buttonDark } from '../../button'
import { iconDark } from '../../icon'
import { progressDark } from '../../progress'

export default create({
  name: 'Upload',
  theme: 'dark',
  peer: [
    baseDark,
    buttonDark,
    iconDark,
    progressDark
  ],
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
      hoverColorOverlay
    } = vars
    return {
      draggerColor: actionColorOverlay,
      draggerBorder: `1px dashed ${borderColor}`,
      draggerBorderHover: `1px dashed ${primaryColor}`,
      itemColorHover: hoverColorOverlay,
      itemColorHoverError: changeColor(errorColor, {
        alpha: 0.09
      }),
      itemTextColor: textColor2,
      itemTextColorError: errorColor,
      itemTextColorSuccess: successColor,
      itemIconColor: iconColorOverlay,
      itemDisabledOpacity: opacityDisabled
    }
  }
})

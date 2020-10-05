import create from '../../_styles/utils/create-component-base'
import { changeColor } from '../../_utils/color'

export default create({
  name: 'Upload',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      iconColorOverlay,
      primaryColor,
      errorColor,
      textColorSecondary,
      successColor,
      opacityDisabled,
      actionColorOverlay,
      borderColor,
      hoverColorOverlay
    } = derived

    return {
      draggerColor: actionColorOverlay,
      draggerBorderColor: borderColor,
      draggerBorderColorHover: primaryColor,
      itemColorHover: hoverColorOverlay,
      itemColorErrorHover: changeColor(errorColor, {
        alpha: 0.06
      }),
      itemTextColor: textColorSecondary,
      itemTextColorError: errorColor,
      itemTextColorSuccess: successColor,
      itemIconColor: iconColorOverlay,
      itemDisabledOpacity: opacityDisabled
    }
  }
})

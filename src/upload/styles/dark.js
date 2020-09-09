import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color'

export default create({
  name: 'Upload',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      iconOverlayColor,
      primaryColor,
      errorColor,
      secondaryTextColor,
      successColor,
      disabledOpacity,
      actionBackgroundOverlayColor,
      borderColor
    } = derived

    return {
      draggerColor: actionBackgroundOverlayColor,
      draggerBorderColor: borderColor,
      draggerBorderColorHover: primaryColor,
      itemColorHover: changeColor(primaryColor, {
        alpha: 0.15
      }),
      itemColorErrorHover: changeColor(errorColor, {
        alpha: 0.15
      }),
      itemTextColor: secondaryTextColor,
      itemTextColorError: errorColor,
      itemTextColorSuccess: successColor,
      itemIconColor: iconOverlayColor,
      itemDisabledOpacity: disabledOpacity
    }
  }
})

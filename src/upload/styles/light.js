import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color'

export default create({
  name: 'Upload',
  theme: 'light',
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
      uploadDraggerBackgroundColor: actionBackgroundOverlayColor,
      uploadDraggerBorderColor: borderColor,
      uploadDraggerBorderColorHover: primaryColor,
      uploadFileItemBackgroundColorHover: changeColor(primaryColor, {
        alpha: 0.1
      }),
      uploadFileItemBackgroundColorErrorHover: changeColor(errorColor, {
        alpha: 0.1
      }),
      uploadInfoTextColor: secondaryTextColor,
      uploadInfoTextColorError: errorColor,
      uploadInfoTextColorSuccess: successColor,
      uploadInfoIconColor: iconOverlayColor,
      uploadDisabledOpacity: disabledOpacity
    }
  }
})

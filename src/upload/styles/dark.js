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
      uploadDraggerBackgroundColor: actionBackgroundOverlayColor,
      uploadDraggerBorderColor: borderColor,
      uploadDraggerBorderColorHover: primaryColor,
      uploadFileItemBackgroundColorHover: changeColor(primaryColor, {
        alpha: 0.15
      }),
      uploadFileItemBackgroundColorErrorHover: changeColor(errorColor, {
        alpha: 0.15
      }),
      uploadInfoTextColor: secondaryTextColor,
      uploadInfoTextColorError: errorColor,
      uploadInfoTextColorSuccess: successColor,
      uploadInfoIconColor: iconOverlayColor,
      uploadDisabledOpacity: disabledOpacity
    }
  }
})

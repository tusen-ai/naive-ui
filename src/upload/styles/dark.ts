import { changeColor } from 'seemly'
import { buttonDark } from '../../button/styles'
import { progressDark } from '../../progress/styles'
import { commonDark } from '../../_styles/common'
import type { UploadTheme } from './light'

const uploadDark: UploadTheme = {
  name: 'Upload',
  common: commonDark,
  peers: {
    Button: buttonDark,
    Progress: progressDark
  },
  self (vars) {
    const {
      iconColor,
      primaryColor,
      errorColor,
      textColor2,
      successColor,
      opacityDisabled,
      actionColor,
      borderColor,
      hoverColor,
      lineHeight,
      borderRadius,
      fontSize
    } = vars
    return {
      fontSize,
      lineHeight,
      borderRadius,
      draggerColor: actionColor,
      draggerBorder: `1px dashed ${borderColor}`,
      draggerBorderHover: `1px dashed ${primaryColor}`,
      itemColorHover: hoverColor,
      itemColorHoverError: changeColor(errorColor, {
        alpha: 0.09
      }),
      itemTextColor: textColor2,
      itemTextColorError: errorColor,
      itemTextColorSuccess: successColor,
      itemIconColor: iconColor,
      itemDisabledOpacity: opacityDisabled
    }
  }
}

export default uploadDark

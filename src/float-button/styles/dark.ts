import { commonDark } from '../../_styles/common'
import type { FloatButtonTheme } from './light'

const floatButtonDark: FloatButtonTheme = {
  name: 'FloatButton',
  common: commonDark,
  self (vars) {
    const {
      popoverColor,
      textColor2,
      buttonColor2Hover,
      primaryColor,
      primaryColorHover
    } = vars
    return {
      color: popoverColor,
      textColor: textColor2,
      boxShadow: '0 2px 8px 0px rgba(0, 0, 0, .12)',
      boxShadowHover: '0 2px 12px 0px rgba(0, 0, 0, .18)',
      boxShadowPressed: '0 2px 12px 0px rgba(0, 0, 0, .18)',
      colorHover: buttonColor2Hover,
      colorPrimary: primaryColor,
      colorPrimaryHover: primaryColorHover,
      textColorPrimary: textColor2
    }
  }
}

export default floatButtonDark

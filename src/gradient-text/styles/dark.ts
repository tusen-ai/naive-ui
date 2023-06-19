import { commonDark } from '../../_styles/common'
import type { GradientTextTheme } from './light'

const gradientTextDark: GradientTextTheme = {
  name: 'GradientText',
  common: commonDark,
  self (vars) {
    const {
      primaryColor,
      successColor,
      warningColor,
      errorColor,
      infoColor,
      primaryColorSuppl,
      successColorSuppl,
      warningColorSuppl,
      errorColorSuppl,
      infoColorSuppl,
      fontWeightStrong
    } = vars
    return {
      fontWeight: fontWeightStrong,
      rotate: '252deg',
      colorStartPrimary: primaryColor,
      colorEndPrimary: primaryColorSuppl,
      colorStartInfo: infoColor,
      colorEndInfo: infoColorSuppl,
      colorStartWarning: warningColor,
      colorEndWarning: warningColorSuppl,
      colorStartError: errorColor,
      colorEndError: errorColorSuppl,
      colorStartSuccess: successColor,
      colorEndSuccess: successColorSuppl
    }
  }
}

export default gradientTextDark

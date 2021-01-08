import { changeColor } from 'seemly'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'GradientText',
  common: commonLight,
  self (vars) {
    const {
      primaryColor,
      successColor,
      warningColor,
      errorColor,
      infoColor,
      fontWeightStrong
    } = vars
    return {
      fontWeight: fontWeightStrong,
      rotate: '252deg',
      colorStartPrimary: changeColor(primaryColor, { alpha: 0.6 }),
      colorEndPrimary: primaryColor,
      colorStartInfo: changeColor(infoColor, { alpha: 0.6 }),
      colorEndInfo: infoColor,
      colorStartWarning: changeColor(warningColor, { alpha: 0.6 }),
      colorEndWarning: warningColor,
      colorStartError: changeColor(errorColor, { alpha: 0.6 }),
      colorEndError: errorColor,
      colorStartSuccess: changeColor(successColor, { alpha: 0.6 }),
      colorEndSuccess: successColor
    }
  }
}

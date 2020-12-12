import create from '../../_styles/utils/create-component-base'
import { changeColor } from 'seemly'
import { baseLight } from '../../_styles/base'

export default create({
  theme: 'light',
  name: 'GradientText',
  peer: [baseLight],
  getLocalVars (vars) {
    const {
      primaryColor,
      successColor,
      warningColor,
      errorColor,
      infoColor
    } = vars
    return {
      fontWeight: vars.fontWeightStrong,
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
})

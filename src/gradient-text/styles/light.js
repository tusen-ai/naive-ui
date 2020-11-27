import create from '../../_styles/utils/create-component-base'
import { changeColor } from 'seemly'

export default create({
  theme: 'light',
  name: 'GradientText',
  getDerivedVariables ({ base, derived }) {
    const {
      primaryColor,
      successColor,
      warningColor,
      errorColor,
      infoColor
    } = derived
    return {
      fontWeight: base.fontWeightStrong,
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

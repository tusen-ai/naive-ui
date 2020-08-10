import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../../src/_utils/color/index'

export default create({
  theme: 'light',
  name: 'GradientText',
  getDerivedVariables ({ derived }) {
    const {
      primaryColor,
      successColor,
      warningColor,
      errorColor,
      infoColor
    } = derived
    return {
      textBackgroundImage: {
        primary: `linear-gradient(252deg, ${changeColor(primaryColor, { alpha: 0.6 })} 0%, ${primaryColor} 100%)`,
        success: `linear-gradient(252deg, ${changeColor(successColor, { alpha: 0.6 })} 0%, ${successColor} 100%)`,
        warning: ` linear-gradient(252deg, ${changeColor(warningColor, { alpha: 0.6 })} 0%, ${warningColor} 100%)`,
        error: `linear-gradient(252deg, ${changeColor(errorColor, { alpha: 0.6 })} 0%, ${errorColor} 100%)`,
        info: `linear-gradient(252deg, ${changeColor(infoColor, { alpha: 0.6 })} 0%, ${infoColor} 100%)`
      }
    }
  }
})

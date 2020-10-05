import create from '../../_styles/utils/create-component-base'
import { changeColor } from '../../../src/_utils/color/index'

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
      backgroundImagePrimary: `linear-gradient(252deg, ${changeColor(primaryColor, { alpha: 0.6 })} 0%, ${primaryColor} 100%)`,
      backgroundImageSuccess: `linear-gradient(252deg, ${changeColor(successColor, { alpha: 0.6 })} 0%, ${successColor} 100%)`,
      backgroundImageWarning: ` linear-gradient(252deg, ${changeColor(warningColor, { alpha: 0.6 })} 0%, ${warningColor} 100%)`,
      backgroundImageError: `linear-gradient(252deg, ${changeColor(errorColor, { alpha: 0.6 })} 0%, ${errorColor} 100%)`,
      backgroundImageInfo: `linear-gradient(252deg, ${changeColor(infoColor, { alpha: 0.6 })} 0%, ${infoColor} 100%)`
    }
  }
})

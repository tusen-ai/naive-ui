import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../../src/_utils/color/index'

export default create({
  theme: 'light',
  name: 'Anchor',
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadius,
      primaryDefault
    } = base
    const alphaAnchor = '0.15'
    const {
      railBackgroundOverlayColor,
      primaryColor,
      secondaryTextOverlayColor
    } = derived
    return {
      borderRadius,
      railActiveBackgroundColor: primaryColor,
      linkBackgroundColor: changeColor(primaryDefault, { alpha: alphaAnchor }),
      railBackgroundColor: railBackgroundOverlayColor,
      action: {
        default: secondaryTextOverlayColor,
        hover: primaryColor,
        active: primaryColor
      }
    }
  }
})

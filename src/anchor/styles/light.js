import create from '../../_styles/utils/create-component-base'
import { changeColor } from '../../../src/_utils/color/index'

export default create({
  theme: 'light',
  name: 'Anchor',
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadius
    } = base
    const {
      railColorOverlay,
      primaryColor,
      primaryColorHover,
      primaryColorPressed,
      textColor2Overlay
    } = derived
    return {
      borderRadius,
      railColor: railColorOverlay,
      railColorActive: primaryColor,
      linkColor: changeColor(primaryColor, { alpha: 0.15 }),
      linkTextColor: textColor2Overlay,
      linkTextColorHover: primaryColorHover,
      linkTextColorActive: primaryColorPressed,
      linkTextColorMatch: primaryColor
    }
  }
})

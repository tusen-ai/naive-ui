import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../../src/_utils/color/index'

export default create({
  theme: 'light',
  name: 'Anchor',
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadius
    } = base
    const {
      railBackgroundOverlayColor,
      primaryColor,
      primaryHoverColor,
      primaryActiveColor,
      secondaryTextOverlayColor
    } = derived
    return {
      borderRadius,
      railColor: railBackgroundOverlayColor,
      railColorActive: primaryColor,
      linkColor: changeColor(primaryColor, { alpha: 0.15 }),
      linkTextColor: secondaryTextOverlayColor,
      linkTextColorHover: primaryHoverColor,
      linkTextColorActive: primaryActiveColor,
      linkTextColorMatch: primaryColor
    }
  }
})

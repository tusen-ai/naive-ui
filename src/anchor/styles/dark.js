import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../../src/_utils/color/index'

export default create({
  theme: 'dark',
  name: 'Anchor',
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadius
    } = base
    const {
      primaryColor,
      primaryHoverColor,
      primaryActiveColor,
      railBackgroundOverlayColor,
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

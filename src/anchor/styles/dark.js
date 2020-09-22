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
      primaryColorHover,
      primaryColorActive,
      railColorOverlay,
      textColorSecondaryOverlay
    } = derived
    return {
      borderRadius,
      railColor: railColorOverlay,
      railColorActive: primaryColor,
      linkColor: changeColor(primaryColor, { alpha: 0.15 }),
      linkTextColor: textColorSecondaryOverlay,
      linkTextColorHover: primaryColorHover,
      linkTextColorActive: primaryColorActive,
      linkTextColorMatch: primaryColor
    }
  }
})

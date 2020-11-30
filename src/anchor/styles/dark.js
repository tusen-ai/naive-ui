import create from '../../_styles/utils/create-component-base'
import { changeColor } from 'seemly'

export default create({
  theme: 'dark',
  name: 'Anchor',
  getDerivedVars (vars) {
    const {
      borderRadius,
      primaryColor,
      primaryColorHover,
      primaryColorPressed,
      railColorOverlay,
      textColor2Overlay
    } = vars
    return {
      borderRadius,
      railColor: railColorOverlay,
      railColorActive: primaryColor,
      linkColor: changeColor(primaryColor, { alpha: 0.15 }),
      linkTextColor: textColor2Overlay,
      linkTextColorHover: primaryColorHover,
      linkTextColorPressed: primaryColorPressed,
      linkTextColorActive: primaryColor
    }
  }
})

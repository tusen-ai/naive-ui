import create from '../../_styles/utils/create-component-base'
import commonVars from './_common'
import { baseLight } from '../../_styles/base'
import { affixLight } from '../../affix/styles'
import { changeColor } from 'seemly'

export default create({
  theme: 'light',
  name: 'Anchor',
  peer: [baseLight, affixLight],
  getLocalVars (vars) {
    const {
      borderRadius,
      railColorOverlay,
      primaryColor,
      primaryColorHover,
      primaryColorPressed,
      textColor2Overlay
    } = vars
    return {
      ...commonVars,
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

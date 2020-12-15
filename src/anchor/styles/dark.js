import create from '../../_styles/utils/create-component-base'
import commonVars from './_common'
import { baseDark } from '../../_styles/base'
import { affixDark } from '../../affix/styles'
import { changeColor } from 'seemly'

export default create({
  theme: 'dark',
  name: 'Anchor',
  peer: [baseDark, affixDark],
  getLocalVars (vars) {
    const {
      borderRadius,
      primaryColor,
      primaryColorHover,
      primaryColorPressed,
      railColorOverlay,
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

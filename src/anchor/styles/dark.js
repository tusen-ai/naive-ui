import { changeColor } from 'seemly'
import { commonDark } from '../../_styles/new-common'
import { affixDark } from '../../affix/styles'
import commonVars from './_common'

export default {
  name: 'Anchor',
  common: commonDark,
  peers: {
    Affix: affixDark
  },
  self (vars) {
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
}

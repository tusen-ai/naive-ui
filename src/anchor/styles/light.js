import { changeColor } from 'seemly'
import { commonLight } from '../../_styles/new-common'
import { affixLight } from '../../affix/styles'
import commonVars from './_common'

export default {
  name: 'Anchor',
  common: commonLight,
  peers: {
    Affix: affixLight
  },
  self (vars) {
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
  },
  peer: [affixLight]
}

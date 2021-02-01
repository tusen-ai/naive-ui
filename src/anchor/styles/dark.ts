import { changeColor } from 'seemly'
import { commonDark } from '../../_styles/common'
import type { AnchorTheme } from './light'
import commonVars from './_common'

const anchorDark: AnchorTheme = {
  name: 'Anchor',
  common: commonDark,
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

export default anchorDark

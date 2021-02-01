import { commonDark } from '../../_styles/common'
import type { DividerTheme } from './light'

const dividerDark: DividerTheme = {
  name: 'Divider',
  common: commonDark,
  self (vars) {
    const { textColor1Overlay, dividerColorOverlay, fontWeightStrong } = vars
    return {
      textColor: textColor1Overlay,
      color: dividerColorOverlay,
      fontWeight: fontWeightStrong
    }
  }
}

export default dividerDark

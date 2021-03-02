import { commonDark } from '../../_styles/common'
import type { DividerTheme } from './light'

const dividerDark: DividerTheme = {
  name: 'Divider',
  common: commonDark,
  self (vars) {
    const { textColor1, dividerColor, fontWeightStrong } = vars
    return {
      textColor: textColor1,
      color: dividerColor,
      fontWeight: fontWeightStrong
    }
  }
}

export default dividerDark

import { commonDark } from '../../_styles/common'
import type { CollapseTheme } from './light'

const collapseDark: CollapseTheme = {
  name: 'Collapse',
  common: commonDark,
  self (vars) {
    const { fontWeight, textColor1, textColor2, dividerColor, fontSize } = vars
    return {
      titleFontSize: fontSize,
      titleFontWeight: fontWeight,
      dividerColor: dividerColor,
      titleTextColor: textColor1,
      fontSize,
      textColor: textColor2,
      arrowColor: textColor2
    }
  }
}

export default collapseDark

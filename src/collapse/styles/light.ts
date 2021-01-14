import { commonLight } from '../../_styles/new-common'
import type { ThemeCommonVars } from '../../_styles/new-common'

const collapseLight = {
  name: 'Collapse',
  common: commonLight,
  self (vars: ThemeCommonVars) {
    const {
      fontWeight,
      textColor1,
      textColor2,
      dividerColorOverlay,
      fontSize
    } = vars
    return {
      titleFontSize: fontSize,
      titleFontWeight: fontWeight,
      dividerColor: dividerColorOverlay,
      titleTextColor: textColor1,
      fontSize: fontSize,
      textColor: textColor2,
      arrowColor: textColor2
    }
  }
}

export default collapseLight
export type CollapseThemeVars = ReturnType<typeof collapseLight.self>

import { changeColor } from 'seemly'
import { tooltipLight } from '../../tooltip/styles'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Menu',
  common: commonLight,
  peers: {
    Tooltip: tooltipLight
  },
  self (vars) {
    const {
      borderRadius,
      textColor3,
      primaryColor,
      textColor2,
      primaryColorHover,
      textColor1,
      fontSize
    } = vars
    return {
      borderRadius: borderRadius,
      groupTextColor: textColor3,
      itemColorActive: changeColor(primaryColor, { alpha: 0.1 }),
      itemTextColor: textColor2,
      itemTextColorHover: primaryColorHover,
      itemTextColorChildActive: primaryColor,
      itemTextColorActive: primaryColor,
      itemExtraTextColor: textColor3,
      itemExtraTextColorHover: primaryColorHover,
      itemExtraTextColorChildActive: primaryColor,
      itemExtraTextColorActive: primaryColor,
      itemIconColor: textColor1,
      itemIconColorHover: primaryColorHover,
      itemIconColorActive: primaryColor,
      itemIconColorChildActive: primaryColor,
      itemIconColorCollapsed: textColor1,
      borderColorHorizontal: 'transparent',
      arrowColor: primaryColor,
      fontSize
    }
  }
}

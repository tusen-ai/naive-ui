import { changeColor } from 'seemly'
import { checkboxDark } from '../../checkbox/styles'
import { commonDark } from '../../_styles/new-common'

export default {
  name: 'Tree',
  common: commonDark,
  peers: {
    Checkbox: checkboxDark
  },
  self (vars) {
    const {
      borderRadiusSmall,
      hoverColorOverlay,
      activeColorOverlay,
      primaryColor,
      textColor3Overlay,
      textColor2Overlay,
      textColorDisabledOverlay,
      fontSize
    } = vars
    return {
      fontSize,
      nodeBorderRadius: borderRadiusSmall,
      nodeColorHover: hoverColorOverlay,
      nodeColorPressed: activeColorOverlay,
      nodeColorActive: changeColor(primaryColor, { alpha: 0.15 }),
      arrowColor: textColor3Overlay,
      nodeTextColor: textColor2Overlay,
      nodeTextColorDisabled: textColorDisabledOverlay,
      loadingColor: primaryColor
    }
  }
}

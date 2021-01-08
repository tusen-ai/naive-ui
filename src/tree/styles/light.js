import { changeColor } from 'seemly'
import { iconLight } from '../../icon/styles'
import { checkboxLight } from '../../checkbox/styles'
import { baseLoadingLight } from '../../_base/loading/styles'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Tree',
  common: commonLight,
  peers: {
    Icon: iconLight,
    Checkbox: checkboxLight,
    BaseLoading: baseLoadingLight
  },
  self (vars) {
    const {
      borderRadiusSmall,
      hoverColorOverlay,
      activeColorOverlay,
      primaryColor,
      textColor3,
      textColor2,
      textColorDisabled,
      fontSize
    } = vars
    return {
      fontSize,
      nodeBorderRadius: borderRadiusSmall,
      nodeColorHover: hoverColorOverlay,
      nodeColorPressed: activeColorOverlay,
      nodeColorActive: changeColor(primaryColor, { alpha: 0.1 }),
      arrowColor: textColor3,
      nodeTextColor: textColor2,
      nodeTextColorDisabled: textColorDisabled,
      loadingColor: primaryColor
    }
  }
}

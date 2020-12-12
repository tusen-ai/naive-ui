import create from '../../_styles/utils/create-component-base'
import { changeColor } from 'seemly'
import { baseLight } from '../../_styles/base'
import { iconLight } from '../../icon/styles'
import { checkboxLight } from '../../checkbox/styles'
import { baseLoadingLight } from '../../_base/loading/styles'

export default create({
  theme: 'light',
  name: 'Tree',
  peer: [baseLight, iconLight, checkboxLight, baseLoadingLight],
  getLocalVars (vars) {
    const {
      borderRadiusSmall,
      hoverColorOverlay,
      activeColorOverlay,
      primaryColor,
      textColor3,
      textColor2,
      textColorDisabled
    } = vars
    return {
      borderRadiusSmall,
      nodeColorHover: hoverColorOverlay,
      nodeColorPressed: activeColorOverlay,
      nodeColorSelected: changeColor(primaryColor, { alpha: 0.1 }),
      arrowColor: textColor3,
      nodeTextColor: textColor2,
      nodeTextColorDisabled: textColorDisabled
    }
  }
})

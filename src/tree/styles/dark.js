import create from '../../_styles/utils/create-component-base'
import { changeColor } from 'seemly'

export default create({
  theme: 'dark',
  name: 'Tree',
  getDerivedVars (vars) {
    const {
      borderRadiusSmall,
      hoverColorOverlay,
      activeColorOverlay,
      primaryColor,
      textColor3Overlay,
      textColor2Overlay,
      textColorDisabledOverlay
    } = vars
    return {
      borderRadiusSmall,
      nodeColorHover: hoverColorOverlay,
      nodeColorPressed: activeColorOverlay,
      nodeColorSelected: changeColor(primaryColor, { alpha: 0.15 }),
      arrowColor: textColor3Overlay,
      nodeTextColor: textColor2Overlay,
      nodeTextColorDisabled: textColorDisabledOverlay
    }
  }
})

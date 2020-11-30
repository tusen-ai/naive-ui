import create from '../../_styles/utils/create-component-base'
import { changeColor } from 'seemly'

export default create({
  theme: 'light',
  name: 'Tree',
  getDerivedVars (vars) {
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

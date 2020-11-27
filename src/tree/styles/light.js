import create from '../../_styles/utils/create-component-base'
import { changeColor } from 'seemly'

export default create({
  theme: 'light',
  name: 'Tree',
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadiusSmall
    } = base
    const {
      hoverColorOverlay,
      activeColorOverlay,
      primaryColor,
      textColor3,
      textColor2,
      textColorDisabled
    } = derived
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

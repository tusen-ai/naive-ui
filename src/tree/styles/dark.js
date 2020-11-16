import create from '../../_styles/utils/create-component-base'
import { changeColor } from '../../_utils/color'

export default create({
  theme: 'dark',
  name: 'Tree',
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadiusSmall
    } = base
    const {
      hoverColorOverlay,
      activeColorOverlay,
      primaryColor,
      textColor3Overlay,
      textColor2Overlay,
      textColorDisabledOverlay
    } = derived
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

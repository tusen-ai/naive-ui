import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color'

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
      textColorTertiary,
      textColorSecondary,
      textColorDisabled
    } = derived
    return {
      borderRadiusSmall,
      nodeColorHover: hoverColorOverlay,
      nodeColorActive: activeColorOverlay,
      nodeColorSelected: changeColor(primaryColor, { alpha: 0.1 }),
      arrowColor: textColorTertiary,
      nodeTextColor: textColorSecondary,
      nodeTextColorDisabled: textColorDisabled
    }
  }
})

import create from '../../styles/_utils/create-component-base'
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
      textColorTertiaryOverlay,
      textColorSecondaryOverlay,
      textColorDisabledOverlay
    } = derived
    return {
      borderRadiusSmall,
      nodeColorHover: hoverColorOverlay,
      nodeColorActive: activeColorOverlay,
      nodeColorSelected: changeColor(primaryColor, { alpha: 0.15 }),
      arrowColor: textColorTertiaryOverlay,
      nodeTextColor: textColorSecondaryOverlay,
      nodeTextColorDisabled: textColorDisabledOverlay
    }
  }
})

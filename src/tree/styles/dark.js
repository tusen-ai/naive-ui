import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color'

export default create({
  theme: 'dark',
  name: 'Tree',
  getDerivedVariables ({ base, derived }) {
    const {
      smallBorderRadius
    } = base
    const {
      pendingBackgroundOverlayColor,
      activeBackgroundOverlayColor,
      primaryColor,
      tertiaryTextOverlayColor,
      secondaryTextOverlayColor,
      disabledTextOverlayColor
    } = derived
    return {
      smallBorderRadius,
      nodeColorHover: pendingBackgroundOverlayColor,
      nodeColorActive: activeBackgroundOverlayColor,
      nodeColorSelected: changeColor(primaryColor, { alpha: 0.15 }),
      arrowColor: tertiaryTextOverlayColor,
      nodeTextColor: secondaryTextOverlayColor,
      nodeTextColorDisabled: disabledTextOverlayColor
    }
  }
})

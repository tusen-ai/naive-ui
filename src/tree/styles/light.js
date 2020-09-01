import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color'

export default create({
  theme: 'light',
  name: 'Tree',
  getDerivedVariables ({ base, derived }) {
    const {
      smallBorderRadius
    } = base
    const {
      pendingBackgroundOverlayColor,
      activeBackgroundOverlayColor,
      primaryColor,
      tertiaryTextColor,
      secondaryTextColor,
      disabledTextColor
    } = derived
    return {
      smallBorderRadius,
      nodeColorHover: pendingBackgroundOverlayColor,
      nodeColorActive: activeBackgroundOverlayColor,
      nodeColorSelected: changeColor(primaryColor, { alpha: 0.1 }),
      arrowColor: tertiaryTextColor,
      nodeTextColor: secondaryTextColor,
      nodeTextColorDisabled: disabledTextColor
    }
  }
})

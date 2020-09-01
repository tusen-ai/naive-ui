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
      color: {
        hover: pendingBackgroundOverlayColor,
        active: activeBackgroundOverlayColor,
        selected: changeColor(primaryColor, { alpha: 0.1 })
      },
      switchColor: tertiaryTextColor,
      contentTextColor: {
        default: secondaryTextColor,
        disabled: disabledTextColor
      }
    }
  }
})

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
      color: {
        hover: pendingBackgroundOverlayColor,
        active: activeBackgroundOverlayColor,
        selected: changeColor(primaryColor, { alpha: 0.15 })
      },
      switchColor: tertiaryTextOverlayColor,
      contentTextColor: {
        default: secondaryTextOverlayColor,
        disabled: disabledTextOverlayColor
      }
    }
  }
})

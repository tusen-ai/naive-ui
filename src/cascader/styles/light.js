import create from '../../styles/_utils/create-component-base'
import { changeColor, composite } from '../../_utils/color'
import sizeVariables from './_common'

export default create({
  theme: 'light',
  name: 'Cascader',
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadius,
      transformDebounceScale,
      popmenuBoxShadow
    } = base
    const {
      popoverBackgroundColor,
      secondaryTextColor,
      primaryColor,
      disabledTextColor,
      disabledOpacity,
      dividerOverlayColor,
      baseBackgroundColor,
      pendingBackgroundOverlayColor
    } = derived
    return {
      ...sizeVariables,
      borderRadius,
      transformDebounceScale,
      menuColor: popoverBackgroundColor,
      optionTextColor: {
        default: secondaryTextColor,
        active: primaryColor,
        disabled: disabledTextColor,
        disabledActive: changeColor(primaryColor, { alpha: disabledOpacity })
      },
      menuBoxShadow: popmenuBoxShadow,
      menuBorderColor: dividerOverlayColor,
      menuTrackingRectColor: composite(baseBackgroundColor, pendingBackgroundOverlayColor),
      optionArrowColor: disabledTextColor,
      itemCheckMarkColor: primaryColor
    }
  }
})

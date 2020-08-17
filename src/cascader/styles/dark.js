import create from '../../styles/_utils/create-component-base'
import { changeColor, composite } from '../../_utils/color'
import sizeVariables from './_common'

export default create({
  theme: 'dark',
  name: 'Cascader',
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadius,
      transformDebounceScale,
      popmenuBoxShadow
    } = base
    const {
      popoverBackgroundColor,
      secondaryTextOverlayColor,
      primaryColor,
      disabledTextOverlayColor,
      disabledOpacity,
      dividerOverlayColor,
      pendingBackgroundOverlayColor,
      iconOverlayColor
    } = derived
    return {
      ...sizeVariables,
      borderRadius,
      transformDebounceScale,
      menuColor: popoverBackgroundColor,
      optionTextColor: {
        default: secondaryTextOverlayColor,
        active: primaryColor,
        disabled: disabledTextOverlayColor,
        disabledActive: changeColor(primaryColor, { alpha: disabledOpacity })
      },
      menuBoxShadow: popmenuBoxShadow,
      menuBorderColor: dividerOverlayColor,
      menuTrackingRectColor: composite(popoverBackgroundColor, pendingBackgroundOverlayColor),
      optionArrowColor: iconOverlayColor,
      itemCheckMarkColor: primaryColor
    }
  }
})

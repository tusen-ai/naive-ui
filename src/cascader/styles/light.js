import create from '../../styles/_utils/create-component-base'
import { composite } from '../../_utils/color'
import sizeVariables from './_common'

export default create({
  theme: 'light',
  name: 'Cascader',
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadius,
      popmenuBoxShadow
    } = base
    const {
      popoverBackgroundColor,
      secondaryTextColor,
      primaryColor,
      disabledTextColor,
      dividerOverlayColor,
      baseBackgroundColor,
      pendingBackgroundOverlayColor
    } = derived
    return {
      ...sizeVariables,
      menuBorderRadius: borderRadius,
      menuColor: popoverBackgroundColor,
      menuBoxShadow: popmenuBoxShadow,
      menuBorderColor: dividerOverlayColor,
      menuTrackingRectColor: composite(baseBackgroundColor, pendingBackgroundOverlayColor),
      optionTextColor: secondaryTextColor,
      optionTextColorMatched: primaryColor,
      optionTextColorDisabled: disabledTextColor,
      optionArrowColor: disabledTextColor,
      optionCheckMarkColor: primaryColor
    }
  }
})

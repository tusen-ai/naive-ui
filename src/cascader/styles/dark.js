import create from '../../styles/_utils/create-component-base'
import { composite } from '../../_utils/color'
import sizeVariables from './_common'

export default create({
  theme: 'dark',
  name: 'Cascader',
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadius,
      popmenuBoxShadow
    } = base
    const {
      popoverBackgroundColor,
      secondaryTextOverlayColor,
      primaryColor,
      disabledTextOverlayColor,
      dividerOverlayColor,
      pendingBackgroundOverlayColor,
      iconOverlayColor
    } = derived
    return {
      ...sizeVariables,
      menuBorderRadius: borderRadius,
      menuColor: popoverBackgroundColor,
      menuBoxShadow: popmenuBoxShadow,
      menuBorderColor: dividerOverlayColor,
      menuTrackingRectColor: composite(popoverBackgroundColor, pendingBackgroundOverlayColor),
      optionTextColor: secondaryTextOverlayColor,
      optionTextColorMatched: primaryColor,
      optionTextColorDisabled: disabledTextOverlayColor,
      optionArrowColor: iconOverlayColor,
      optionCheckMarkColor: primaryColor
    }
  }
})

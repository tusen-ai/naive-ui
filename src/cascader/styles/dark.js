import create from '../../styles/_utils/create-component-base'
import { composite } from '../../_utils/color'
import sizeVariables from './_common'
import baseTrackingRectStyle from '../../_base/tracking-rect/styles/dark'
import baseMenuMaskStyle from '../../_base/menu-mask/styles/dark'
import baseSelectMenuStyle from '../../_base/select-menu/styles/dark'
import baseSelectionStyle from '../../_base/selection/styles/dark'
import baseLoadingStyle from '../../_base/loading/styles/dark'
import scrollbarStyle from '../../scrollbar/styles/dark'
import radioStyle from '../../radio/styles/dark'
import checkboxStyle from '../../checkbox/styles/dark'

export default create({
  theme: 'dark',
  name: 'Cascader',
  peer: [
    baseTrackingRectStyle,
    baseMenuMaskStyle,
    baseSelectMenuStyle,
    baseSelectionStyle,
    baseLoadingStyle,
    scrollbarStyle,
    radioStyle,
    checkboxStyle
  ],
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

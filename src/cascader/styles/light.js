import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'
import { baseLight } from '../../_styles/base'
import { baseMenuMaskLight } from '../../_base/menu-mask/styles'
import { baseLoadingLight } from '../../_base/loading/styles'
import { baseSelectionLight } from '../../_base/selection/styles'
import { baseSelectMenuLight } from '../../_base/select-menu/styles'
import { scrollbarLight } from '../../scrollbar/styles'
import { checkboxLight } from '../../checkbox/styles'

export default create({
  theme: 'light',
  name: 'Cascader',
  peer: [
    baseLight,
    baseMenuMaskLight,
    baseSelectionLight,
    baseSelectMenuLight,
    baseLoadingLight,
    scrollbarLight,
    checkboxLight
  ],
  getLocalVars (vars) {
    const {
      borderRadius,
      boxShadow2,
      popoverColor,
      textColor2,
      textColor3,
      primaryColor,
      textColorDisabled,
      dividerColorOverlay,
      hoverColorOverlay,
      fontSizeMedium
    } = vars
    return {
      ...sizeVariables,
      menuBorderRadius: borderRadius,
      menuColor: popoverColor,
      menuBoxShadow: boxShadow2,
      menuBorderColor: dividerColorOverlay,
      arrowColor: textColor3,
      optionFontSize: fontSizeMedium,
      optionColorHover: hoverColorOverlay,
      optionTextColor: textColor2,
      optionTextColorMatched: primaryColor,
      optionTextColorDisabled: textColorDisabled,
      optionCheckMarkColor: primaryColor
    }
  }
})

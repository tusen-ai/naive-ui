import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'
import { baseDark } from '../../_styles/base'
import { baseMenuMaskDark } from '../../_base/menu-mask/styles'
import { baseLoadingDark } from '../../_base/loading/styles'
import { baseSelectionDark } from '../../_base/selection/styles'
import { baseSelectMenuDark } from '../../_base/select-menu/styles'
import { scrollbarDark } from '../../scrollbar/styles'
import { checkboxDark } from '../../checkbox/styles'

export default create({
  theme: 'dark',
  name: 'Cascader',
  peer: [
    baseDark,
    baseMenuMaskDark,
    baseSelectMenuDark,
    baseSelectionDark,
    baseLoadingDark,
    scrollbarDark,
    checkboxDark
  ],
  getLocalVars (vars) {
    const {
      borderRadius,
      boxShadow2,
      popoverColor,
      textColor2Overlay,
      textColor3Overlay,
      primaryColor,
      textColorDisabledOverlay,
      dividerColorOverlay,
      hoverColorOverlay
    } = vars
    return {
      ...sizeVariables,
      menuBorderRadius: borderRadius,
      menuColor: popoverColor,
      menuBoxShadow: boxShadow2,
      menuBorderColor: dividerColorOverlay,
      arrowColor: textColor3Overlay,
      optionColorHover: hoverColorOverlay,
      optionTextColor: textColor2Overlay,
      optionTextColorMatched: primaryColor,
      optionTextColorDisabled: textColorDisabledOverlay,
      optionCheckMarkColor: primaryColor
    }
  }
})

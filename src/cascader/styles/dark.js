import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'
import { baseDark } from '../../_styles/base'
import { baseMenuMaskDark } from '../../_base/menu-mask'
import { baseLoadingDark } from '../../_base/loading'
import { baseSelectionDark } from '../../_base/selection'
import { baseSelectMenuDark } from '../../_base/select-menu'
import { scrollbarDark } from '../../scrollbar'
import { checkboxDark } from '../../checkbox'

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

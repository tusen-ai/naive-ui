import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'
import {
  baseMenuMaskDark,
  baseSelectMenuDark,
  baseSelectionDark,
  baseLoadingDark,
  scrollbarDark,
  checkboxDark
} from '../../styles'

export default create({
  theme: 'dark',
  name: 'Cascader',
  peer: [
    baseMenuMaskDark,
    baseSelectMenuDark,
    baseSelectionDark,
    baseLoadingDark,
    scrollbarDark,
    checkboxDark
  ],
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadius,
      boxShadow2
    } = base
    const {
      popoverColor,
      textColor2Overlay,
      textColor3Overlay,
      primaryColor,
      textColorDisabledOverlay,
      dividerColorOverlay,
      hoverColorOverlay
    } = derived
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

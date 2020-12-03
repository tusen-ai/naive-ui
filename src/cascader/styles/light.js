import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'
import {
  baseMenuMaskLight,
  baseSelectMenuLight,
  baseLoadingLight,
  scrollbarLight,
  checkboxLight
} from '../../styles'

export default create({
  theme: 'light',
  name: 'Cascader',
  peer: [
    baseMenuMaskLight,
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
      hoverColorOverlay
    } = vars
    return {
      ...sizeVariables,
      menuBorderRadius: borderRadius,
      menuColor: popoverColor,
      menuBoxShadow: boxShadow2,
      menuBorderColor: dividerColorOverlay,
      arrowColor: textColor3,
      optionColorHover: hoverColorOverlay,
      optionTextColor: textColor2,
      optionTextColorMatched: primaryColor,
      optionTextColorDisabled: textColorDisabled,
      optionCheckMarkColor: primaryColor
    }
  }
})

import { baseSelectionLight } from '../../_base/selection/styles'
import { baseSelectMenuLight } from '../../_base/select-menu/styles'
import { scrollbarLight } from '../../scrollbar/styles'
import { checkboxLight } from '../../checkbox/styles'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Cascader',
  common: commonLight,
  peers: {
    BaseSelectMenu: baseSelectMenuLight,
    BaseSelection: baseSelectionLight,
    Scrollbar: scrollbarLight,
    Checkbox: checkboxLight
  },
  self (vars) {
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
      fontSizeMedium,
      heightMedium
    } = vars
    return {
      menuBorderRadius: borderRadius,
      menuColor: popoverColor,
      menuBoxShadow: boxShadow2,
      menuDividerColor: dividerColorOverlay,
      optionArrowColor: textColor3,
      optionHeight: heightMedium,
      optionFontSize: fontSizeMedium,
      optionColorHover: hoverColorOverlay,
      optionTextColor: textColor2,
      optionTextColorActive: primaryColor,
      optionTextColorDisabled: textColorDisabled,
      optionCheckMarkColor: primaryColor
    }
  }
}

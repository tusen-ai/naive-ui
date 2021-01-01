import { baseMenuMaskDark } from '../../_base/menu-mask/styles'
import { baseLoadingDark } from '../../_base/loading/styles'
import { baseSelectionDark } from '../../_base/selection/styles'
import { baseSelectMenuDark } from '../../_base/select-menu/styles'
import { scrollbarDark } from '../../scrollbar/styles'
import { checkboxDark } from '../../checkbox/styles'
import { commonDark } from '../../_styles/new-common'

export default {
  common: commonDark,
  peers: {
    BaseMenuMask: baseMenuMaskDark,
    BaseSelectMenu: baseSelectMenuDark,
    BaseSelection: baseSelectionDark,
    BaseLoading: baseLoadingDark,
    Scrollbar: scrollbarDark,
    Checkbox: checkboxDark
  },
  self (vars) {
    const {
      borderRadius,
      boxShadow2,
      popoverColor,
      textColor2Overlay,
      textColor3Overlay,
      primaryColor,
      textColorDisabledOverlay,
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
      optionArrowColor: textColor3Overlay,
      optionHeight: heightMedium,
      optionFontSize: fontSizeMedium,
      optionColorHover: hoverColorOverlay,
      optionTextColor: textColor2Overlay,
      optionTextColorActive: primaryColor,
      optionTextColorDisabled: textColorDisabledOverlay,
      optionCheckMarkColor: primaryColor
    }
  }
}

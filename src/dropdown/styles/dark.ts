import { commonDark } from '../../_styles/new-common'
import { popoverDark } from '../../popover/styles'
import type { DropdownTheme } from './light'
import commonVariables from './_common'

const dropdownDark: DropdownTheme = {
  name: 'Dropdown',
  common: commonDark,
  peers: {
    NPopover: popoverDark
  },
  self (vars) {
    const {
      primaryColor,
      textColor2,
      boxShadow2,
      dividerColorOverlay,
      hoverColorOverlay,
      popoverColor,
      borderRadius,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      fontSizeHuge,
      heightSmall,
      heightMedium,
      heightLarge,
      heightHuge,
      textColor3Overlay
    } = vars
    return {
      ...commonVariables,
      optionHeightSmall: heightSmall,
      optionHeightMedium: heightMedium,
      optionHeightLarge: heightLarge,
      optionHeightHuge: heightHuge,
      optionTextColor: textColor2,
      optionTextColorActive: primaryColor,
      color: popoverColor,
      dividerColor: dividerColorOverlay,
      borderRadius,
      boxShadow: boxShadow2,
      suffixColor: textColor2,
      prefixColor: textColor2,
      optionColorHover: hoverColorOverlay,
      groupHeaderTextColor: textColor3Overlay,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      fontSizeHuge
    }
  }
}

export default dropdownDark

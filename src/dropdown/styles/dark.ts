import { commonDark } from '../../_styles/common'
import { popoverDark } from '../../popover/styles'
import type { DropdownTheme } from './light'
import commonVariables from './_common'

const dropdownDark: DropdownTheme = {
  name: 'Dropdown',
  common: commonDark,
  peers: {
    Popover: popoverDark
  },
  self (vars) {
    const {
      primaryColor,
      textColor2,
      boxShadow2,
      dividerColor,
      hoverColor,
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
      textColor3
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
      dividerColor: dividerColor,
      borderRadius,
      boxShadow: boxShadow2,
      suffixColor: textColor2,
      prefixColor: textColor2,
      optionColorHover: hoverColor,
      groupHeaderTextColor: textColor3,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      fontSizeHuge
    }
  }
}

export default dropdownDark

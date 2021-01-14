import { commonDark } from '../../_styles/new-common'
import type { ThemeCommonVars } from '../../_styles/new-common'
import type { DropdownThemeVars } from './light'
import commonVariables from './_common'

export default {
  name: 'Dropdown',
  common: commonDark,
  self (vars: ThemeCommonVars): DropdownThemeVars {
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

import commonVariables from './_common'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Dropdown',
  common: commonLight,
  self (vars) {
    const {
      primaryColor,
      textColor2,
      boxShadow2,
      dividerColor,
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
      dividerColor,
      borderRadius,
      boxShadow: boxShadow2,
      suffixColor: textColor2,
      prefixColor: textColor2,
      optionColorHover: hoverColorOverlay,
      groupHeaderTextColor: textColor3,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      fontSizeHuge
    }
  }
}

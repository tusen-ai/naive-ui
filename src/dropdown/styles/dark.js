import { commonDark } from '../../_styles/new-common'
import commonVariables from './_common'

export default {
  name: 'Dropdown',
  common: commonDark,
  self (vars) {
    const {
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
      heightHuge
    } = vars
    return {
      ...commonVariables,
      optionHeightSmall: heightSmall,
      optionHeightMedium: heightMedium,
      optionHeightLarge: heightLarge,
      optionHeightHuge: heightHuge,
      optionTextColor: textColor2,
      color: popoverColor,
      dividerColor: dividerColorOverlay,
      borderRadius,
      boxShadow: boxShadow2,
      suffixColor: textColor2,
      prefixColor: textColor2,
      optionColorHover: hoverColorOverlay,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      fontSizeHuge
    }
  }
}

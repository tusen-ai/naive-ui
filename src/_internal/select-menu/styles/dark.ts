import { emptyDark } from '../../../empty/styles'
import { scrollbarDark } from '../../../scrollbar/styles'
import { commonDark } from '../../../_styles/common'
import commonVariables from './_common'
import type { InternalSelectMenuTheme } from './light'

const internalSelectMenuDark: InternalSelectMenuTheme = {
  name: 'InternalSelectMenu',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark,
    Empty: emptyDark
  },
  self (vars) {
    const {
      borderRadius,
      popoverColor,
      boxShadow2,
      textColor3Overlay,
      dividerColorOverlay,
      textColor2Overlay,
      primaryColorPressed,
      textColorDisabledOverlay,
      opacityDisabled,
      primaryColor,
      hoverColorOverlay,
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
      optionFontSizeSmall: fontSizeSmall,
      optionFontSizeMedium: fontSizeMedium,
      optionFontSizeLarge: fontSizeLarge,
      optionFontSizeHuge: fontSizeHuge,
      optionHeightSmall: heightSmall,
      optionHeightMedium: heightMedium,
      optionHeightLarge: heightLarge,
      optionHeightHuge: heightHuge,
      borderRadius: borderRadius,
      color: popoverColor,
      boxShadow: boxShadow2,
      groupHeaderTextColor: textColor3Overlay,
      actionDividerColor: dividerColorOverlay,
      optionTextColor: textColor2Overlay,
      optionTextColorPressed: primaryColorPressed,
      optionTextColorDisabled: textColorDisabledOverlay,
      optionTextColorActive: primaryColor,
      optionOpacityDisabled: opacityDisabled,
      optionCheckColor: primaryColor,
      optionColorPending: hoverColorOverlay,
      actionTextColor: textColor2Overlay
    }
  }
}

export default internalSelectMenuDark

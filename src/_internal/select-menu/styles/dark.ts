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
      textColor3,
      dividerColor,
      textColor2,
      primaryColorPressed,
      textColorDisabled,
      opacityDisabled,
      primaryColor,
      hoverColor,
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
      groupHeaderTextColor: textColor3,
      actionDividerColor: dividerColor,
      optionTextColor: textColor2,
      optionTextColorPressed: primaryColorPressed,
      optionTextColorDisabled: textColorDisabled,
      optionTextColorActive: primaryColor,
      optionOpacityDisabled: opacityDisabled,
      optionCheckColor: primaryColor,
      optionColorPending: hoverColor,
      actionTextColor: textColor2,
      loadingColor: primaryColor
    }
  }
}

export default internalSelectMenuDark

import { emptyDark } from '../../../empty/styles'
import { scrollbarDark } from '../../../scrollbar/styles'
import { commonDark } from '../../../_styles/new-common'
import commonVariables from './_common'

export default {
  name: 'BaseSelectMenu',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark,
    Empty: emptyDark
  },
  getLocalVars (vars) {
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
      hoverColorOverlay
    } = vars
    return {
      ...commonVariables,
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

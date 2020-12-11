import create from '../../../_styles/utils/create-component-base'
import { scrollbarDark } from '../../../scrollbar/styles'
import commonVariables from './_common'

export default create({
  name: 'BaseSelectMenu',
  theme: 'dark',
  peer: [
    scrollbarDark
  ],
  getLocalVars (vars) {
    return {
      ...commonVariables,
      borderRadius: vars.borderRadius,
      color: vars.popoverColor,
      boxShadow: vars.boxShadow2,
      groupHeaderTextColor: vars.textColor3Overlay,
      actionDividerColor: vars.dividerColorOverlay,
      optionTextColor: vars.textColor2Overlay,
      optionTextColorPressed: vars.primaryColorPressed,
      optionTextColorDisabled: vars.textColorDisabledOverlay,
      optionTextColorSelected: vars.primaryColor,
      optionOpacityDisabled: vars.opacityDisabled,
      optionCheckColor: vars.primaryColor,
      optionColorPending: vars.hoverColorOverlay,
      actionTextColor: vars.textColor2Overlay
    }
  }
})

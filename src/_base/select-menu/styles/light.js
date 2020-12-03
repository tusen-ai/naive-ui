import create from '../../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  name: 'BaseSelectMenu',
  theme: 'light',
  getLocalVars (vars) {
    return {
      ...commonVariables,
      borderRadius: vars.borderRadius,
      color: vars.popoverColor,
      boxShadow: vars.boxShadow2,
      groupHeaderTextColor: vars.textColor3,
      actionDividerColor: vars.dividerColorOverlay,
      optionTextColor: vars.textColor2,
      optionTextColorPressed: vars.primaryColorPressed,
      optionTextColorDisabled: vars.textColorDisabled,
      optionTextColorSelected: vars.primaryColor,
      optionOpacityDisabled: vars.opacityDisabled,
      optionCheckColor: vars.primaryColor,
      optionColorPending: vars.hoverColorOverlay,
      actionTextColor: vars.textColor2
    }
  }
})

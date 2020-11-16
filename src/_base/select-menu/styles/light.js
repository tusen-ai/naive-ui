import create from '../../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  name: 'BaseSelectMenu',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      borderRadius: base.borderRadius,
      color: derived.popoverColor,
      boxShadow: derived.boxShadow2,
      groupHeaderTextColor: derived.textColor3,
      actionDividerColor: derived.dividerColorOverlay,
      optionTextColor: derived.textColor2,
      optionTextColorPressed: derived.primaryColorPressed,
      optionTextColorDisabled: derived.textColorDisabled,
      optionTextColorSelected: derived.primaryColor,
      optionOpacityDisabled: derived.opacityDisabled,
      optionCheckColor: derived.primaryColor,
      optionColorPending: derived.hoverColorOverlay,
      actionTextColor: derived.textColor2
    }
  }
})

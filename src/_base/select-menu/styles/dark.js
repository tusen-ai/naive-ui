import create from '../../../styles/_utils/create-component-base'
import commonVariables from './_common'

export default create({
  name: 'BaseSelectMenu',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      borderRadius: base.borderRadius,
      color: derived.popoverBackgroundColor,
      boxShadow: derived.popoverBoxShadow,
      groupHeaderTextColor: derived.tertiaryTextOverlayColor,
      actionDividerColor: derived.dividerOverlayColor,
      optionTextColor: derived.secondaryTextOverlayColor,
      optionTextColorPressed: derived.primaryActiveColor,
      optionTextColorDisabled: derived.disabledTextOverlayColor,
      optionTextColorSelected: derived.primaryColor,
      optionOpacityDisabled: derived.disabledOpacity,
      optionCheckColor: derived.primaryColor,
      actionTextColor: derived.secondaryTextOverlayColor
    }
  }
})

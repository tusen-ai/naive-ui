import create from '../../../styles/_utils/create-component-base'
import commonVariables from './_common'
import trackingRectStyle from '../../tracking-rect/styles/light'

export default create({
  name: 'BaseSelectMenu',
  theme: 'light',
  peer: [
    trackingRectStyle
  ],
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      borderRadius: base.borderRadius,
      color: derived.popoverColor,
      boxShadow: derived.popoverBoxShadow,
      groupHeaderTextColor: derived.textColorTertiary,
      actionDividerColor: derived.dividerColorOverlay,
      optionTextColor: derived.textColorSecondary,
      optionTextColorPressed: derived.primaryColorPressed,
      optionTextColorDisabled: derived.textColorDisabled,
      optionTextColorSelected: derived.primaryColor,
      optionOpacityDisabled: derived.opacityDisabled,
      optionCheckColor: derived.primaryColor,
      optionColorPending: derived.hoverColorOverlay,
      actionTextColor: derived.textColorSecondary
    }
  }
})

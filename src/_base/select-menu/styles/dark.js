import create from '../../../styles/_utils/create-component-base'
import commonVariables from './_common'
import trackingRectStyle from '../../tracking-rect/styles/dark'

export default create({
  name: 'BaseSelectMenu',
  theme: 'dark',
  peer: [
    trackingRectStyle
  ],
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      borderRadius: base.borderRadius,
      color: derived.popoverColor,
      boxShadow: derived.popoverBoxShadow,
      groupHeaderTextColor: derived.textColorTertiaryOverlay,
      actionDividerColor: derived.dividerColorOverlay,
      optionTextColor: derived.textColorSecondaryOverlay,
      optionTextColorPressed: derived.primaryColorActive,
      optionTextColorDisabled: derived.textColorDisabledOverlay,
      optionTextColorSelected: derived.primaryColor,
      optionOpacityDisabled: derived.opacityDisabled,
      optionCheckColor: derived.primaryColor,
      actionTextColor: derived.textColorSecondaryOverlay
    }
  }
})

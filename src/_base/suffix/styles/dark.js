import create from '../../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  name: 'BaseSuffix',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      crossColor: derived.textColor4Overlay,
      crossColorHover: derived.primaryColorHover,
      crossColorPressed: derived.primaryColorPressed,
      arrowColor: derived.textColor4Overlay,
      arrowColorHover: derived.primaryColorHover,
      arrowColorActive: derived.primaryColorHover,
      arrowColorDisabled: derived.textColor5Overlay,
      crossColorWarning: derived.warningColor,
      crossColorHoverWarning: derived.warningColorHover,
      crossColorPressedWarning: derived.warningColorPressed,
      arrowColorWarning: derived.warningColor,
      arrowColorHoverWarning: derived.warningColorHover,
      arrowColorActiveWarning: derived.warningColorHover,
      arrowColorDisabledWarning: derived.textColor5Overlay,
      crossColorError: derived.errorColor,
      crossColorHoverError: derived.errorColorHover,
      crossColorPressedError: derived.errorColorPressed,
      arrowColorError: derived.errorColor,
      arrowColorHoverError: derived.errorColorHover,
      arrowColorActiveError: derived.errorColorHover,
      arrowColorDisabledError: derived.textColor5Overlay
    }
  }
})

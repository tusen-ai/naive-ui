import create from '../../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  name: 'BaseSuffix',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      crossColor: derived.textColor4Overlay,
      crossColorHover: derived.primaryColorHover,
      crossColorPressed: derived.primaryColorPressed,
      arrowColor: derived.textColor4Overlay,
      arrowColorHover: derived.primaryColorHover,
      arrowColorActive: derived.primaryColorHover,
      arrowColorDisabled: derived.textColor5,
      crossColorWarning: derived.warningColor,
      crossColorHoverWarning: derived.warningColorHover,
      crossColorActiveWarning: derived.warningColorPressed,
      arrowColorWarning: derived.warningColor,
      arrowColorHoverWarning: derived.warningColorHover,
      arrowColorActiveWarning: derived.warningColorHover,
      ArrowColorDisabledWarning: derived.textColor5,
      crossColorError: derived.errorColor,
      crossColorHoverError: derived.errorColorHover,
      crossColorActiveError: derived.errorColorPressed,
      arrowColorError: derived.errorColor,
      arrowColorHoverError: derived.errorColorHover,
      arrowColorActiveError: derived.errorColorHover,
      arrowColorDisabledError: derived.textColor5
    }
  }
})

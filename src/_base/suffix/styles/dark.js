import create from '../../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  name: 'BaseSuffix',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      crossColor: derived.textColor4Overlay,
      hoverCrossColor: derived.primaryColorHover,
      activeCrossColor: derived.primaryColorPressed,
      arrowColor: derived.textColor4Overlay,
      hoverArrowColor: derived.primaryColorHover,
      activeArrowColor: derived.primaryColorHover,
      disabledArrowColor: derived.textColor5Overlay,
      crossColorWarning: derived.warningColor,
      crossColorHoverWarning: derived.warningColorHover,
      crossColorActiveWarning: derived.warningColorPressed,
      arrowColorWarning: derived.warningColor,
      arrowColorHoverWarning: derived.warningColorHover,
      arrowColorActiveWarning: derived.warningColorHover,
      arrowColorDisabledWarning: derived.textColor5Overlay,
      crossColorError: derived.errorColor,
      crossColorHoverError: derived.errorColorHover,
      crossColorActiveError: derived.errorColorPressed,
      arrowColorError: derived.errorColor,
      arrowColorHoverError: derived.errorColorHover,
      arrowColorActiveError: derived.errorColorHover,
      arrowColorDisabledError: derived.textColor5Overlay
    }
  }
})

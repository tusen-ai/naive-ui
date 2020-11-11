import create from '../../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  name: 'BaseSuffix',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      default: {
        crossColor: derived.textColor4Overlay,
        hoverCrossColor: derived.primaryColorHover,
        activeCrossColor: derived.primaryColorPressed,
        arrowColor: derived.textColor4Overlay,
        hoverArrowColor: derived.primaryColorHover,
        activeArrowColor: derived.primaryColorHover,
        disabledArrowColor: derived.textColor5
      },
      warning: {
        crossColor: derived.warningColor,
        hoverCrossColor: derived.warningColorHover,
        activeCrossColor: derived.warningColorPressed,
        arrowColor: derived.warningColor,
        hoverArrowColor: derived.warningColorHover,
        activeArrowColor: derived.warningColorHover,
        disabledArrowColor: derived.textColor5
      },
      error: {
        crossColor: derived.errorColor,
        hoverCrossColor: derived.errorColorHover,
        activeCrossColor: derived.errorColorPressed,
        arrowColor: derived.errorColor,
        hoverArrowColor: derived.errorColorHover,
        activeArrowColor: derived.errorColorHover,
        disabledArrowColor: derived.textColor5
      }
    }
  }
})

import create from '../../../styles/_utils/create-component-base'

export default create({
  name: 'BaseSuffix',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    return {
      default: {
        crossColor: derived.textColorQuaternaryOverlay,
        hoverCrossColor: derived.primaryColorHover,
        activeCrossColor: derived.primaryColorActive,
        arrowColor: derived.textColorQuaternaryOverlay,
        hoverArrowColor: derived.primaryColorHover,
        activeArrowColor: derived.primaryColorHover,
        disabledArrowColor: derived.textColorQuinaryOverlay
      },
      warning: {
        crossColor: derived.warningColor,
        hoverCrossColor: derived.warningColorHover,
        activeCrossColor: derived.warningColorActive,
        arrowColor: derived.warningColor,
        hoverArrowColor: derived.warningColorHover,
        activeArrowColor: derived.warningColorHover,
        disabledArrowColor: derived.textColorQuinaryOverlay
      },
      error: {
        crossColor: derived.errorColor,
        hoverCrossColor: derived.errorColorHover,
        activeCrossColor: derived.errorColorActive,
        arrowColor: derived.errorColor,
        hoverArrowColor: derived.errorColorHover,
        activeArrowColor: derived.errorColorHover,
        disabledArrowColor: derived.textColorQuinaryOverlay
      }
    }
  }
})

import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  name: 'Popover',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      popoverColor,
      textColor2Overlay,
      boxShadow2
    } = derived
    const {
      borderRadius
    } = base
    return {
      ...commonVariables,
      borderRadius,
      color: popoverColor,
      textColor: textColor2Overlay,
      boxShadow: boxShadow2,
      tooltipColor: popoverColor,
      tooltipTextColor: textColor2Overlay
    }
  }
})

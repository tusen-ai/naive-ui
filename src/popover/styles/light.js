import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  name: 'Popover',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      boxShadow2,
      popoverColor,
      textColor2,
      baseColor
    } = derived
    const {
      borderRadius
    } = base
    return {
      ...commonVariables,
      borderRadius,
      color: popoverColor,
      textColor: textColor2,
      boxShadow: boxShadow2,
      tooltipColor: 'rgba(0, 0, 0, .85)',
      tooltipTextColor: baseColor
    }
  }
})

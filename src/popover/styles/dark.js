import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  name: 'Popover',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      popoverColor,
      textColor2Overlay
    } = derived
    const {
      borderRadius
    } = base
    return {
      ...commonVariables,
      borderRadius,
      color: popoverColor,
      textColor: textColor2Overlay,
      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, .12)',
      tooltipColor: popoverColor,
      tooltipTextColor: textColor2Overlay
    }
  }
})

import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'

export default create({
  name: 'Popover',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      popoverBackgroundColor,
      secondaryTextOverlayColor
    } = derived
    const {
      borderRadius
    } = base
    return {
      ...commonVariables,
      borderRadius,
      color: popoverBackgroundColor,
      textColor: secondaryTextOverlayColor,
      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, .12)',
      tooltipColor: popoverBackgroundColor,
      tooltipTextColor: secondaryTextOverlayColor
    }
  }
})

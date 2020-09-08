import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'

export default create({
  name: 'Popover',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      popoverBackgroundColor,
      secondaryTextColor,
      popoverBoxShadow
    } = derived
    const {
      borderRadius,
      transformDebounceScale
    } = base
    return {
      ...commonVariables,
      borderRadius,
      color: popoverBackgroundColor,
      textColor: secondaryTextColor,
      boxShadow: popoverBoxShadow,
      transformDebounceScale
    }
  }
})

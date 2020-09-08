import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'

export default create({
  name: 'Popover',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      popoverBackgroundColor,
      secondaryTextOverlayColor,
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
      textColor: secondaryTextOverlayColor,
      boxShadow: popoverBoxShadow,
      transformDebounceScale
    }
  }
})

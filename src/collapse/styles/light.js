import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'light',
  name: 'Collapse',
  getDerivedVariables ({ base, derived }) {
    const {
      textColorPrimary,
      textColorSecondary,
      dividerColorOverlay
    } = derived
    return {
      dividerColor: dividerColorOverlay,
      titleTextColor: textColorPrimary,
      textColor: textColorSecondary,
      arrowColor: textColorSecondary
    }
  }
})

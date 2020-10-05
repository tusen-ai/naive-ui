import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'dark',
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

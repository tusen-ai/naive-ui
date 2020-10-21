import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'light',
  name: 'Collapse',
  getDerivedVariables ({ base, derived }) {
    const {
      textColor1,
      textColor2,
      dividerColorOverlay
    } = derived
    return {
      dividerColor: dividerColorOverlay,
      titleTextColor: textColor1,
      textColor: textColor2,
      arrowColor: textColor2
    }
  }
})

import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Modal',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      modalColor,
      textColorSecondaryOverlay
    } = derived
    return {
      color: modalColor,
      textColor: textColorSecondaryOverlay
    }
  }
})

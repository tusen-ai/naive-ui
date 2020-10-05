import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'List',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      textColorSecondary,
      cardColor,
      modalColor,
      dividerColorOverlay
    } = derived
    const {
      borderRadius
    } = base
    return {
      textColor: textColorSecondary,
      color: cardColor,
      colorModal: modalColor,
      borderColor: dividerColorOverlay,
      borderRadius
    }
  }
})

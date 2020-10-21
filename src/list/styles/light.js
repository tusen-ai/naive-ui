import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'List',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      textColor2,
      cardColor,
      modalColor,
      dividerColorOverlay
    } = derived
    const {
      borderRadius
    } = base
    return {
      textColor: textColor2,
      color: cardColor,
      colorModal: modalColor,
      borderColor: dividerColorOverlay,
      borderRadius
    }
  }
})

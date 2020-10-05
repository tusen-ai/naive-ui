import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'List',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      textColorSecondaryOverlay,
      cardColor,
      modalColor,
      dividerColorOverlay
    } = derived
    const {
      borderRadius
    } = base
    return {
      textColor: textColorSecondaryOverlay,
      color: cardColor,
      colorModal: modalColor,
      borderColor: dividerColorOverlay,
      borderRadius
    }
  }
})

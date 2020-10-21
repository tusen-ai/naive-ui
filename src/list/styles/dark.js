import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'List',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      textColor2Overlay,
      cardColor,
      modalColor,
      dividerColorOverlay
    } = derived
    const {
      borderRadius
    } = base
    return {
      textColor: textColor2Overlay,
      color: cardColor,
      colorModal: modalColor,
      borderColor: dividerColorOverlay,
      borderRadius
    }
  }
})

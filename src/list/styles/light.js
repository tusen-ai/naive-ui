import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'List',
  theme: 'light',
  getDerivedVars (vars) {
    const {
      textColor2,
      cardColor,
      modalColor,
      dividerColorOverlay,
      borderRadius
    } = vars
    return {
      textColor: textColor2,
      color: cardColor,
      colorModal: modalColor,
      borderColor: dividerColorOverlay,
      borderRadius
    }
  }
})

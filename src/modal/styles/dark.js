import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'Modal',
  theme: 'dark',
  getLocalVars (vars) {
    const {
      modalColor,
      textColor2Overlay,
      boxShadow3
    } = vars
    return {
      color: modalColor,
      textColor: textColor2Overlay,
      boxShadow: boxShadow3
    }
  }
})

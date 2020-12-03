import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'Modal',
  theme: 'light',
  getLocalVars (vars) {
    const {
      modalColor,
      textColor2,
      boxShadow3
    } = vars
    return {
      color: modalColor,
      textColor: textColor2,
      boxShadow: boxShadow3
    }
  }
})

import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'Modal',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      modalColor,
      textColor2Overlay,
      boxShadow3
    } = derived
    return {
      color: modalColor,
      textColor: textColor2Overlay,
      boxShadow: boxShadow3
    }
  }
})

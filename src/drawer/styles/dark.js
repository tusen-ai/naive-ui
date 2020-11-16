import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'Drawer',
  getDerivedVariables ({ derived }) {
    return {
      color: derived.modalColor,
      textColor: derived.textColor2Overlay,
      boxShadow: derived.boxShadow3
    }
  }
})

import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'Drawer',
  getDerivedVariables ({ derived }) {
    return {
      backgroundColor: derived.modalBackgroundColor,
      textColor: derived.secondaryTextOverlayColor
    }
  }
})

import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'Dropdown',
  getDerivedVariables ({ derived }) {
    const {
      secondaryTextOverlayColor
    } = derived
    return {
      suffixColor: secondaryTextOverlayColor
    }
  }
})

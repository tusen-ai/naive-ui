import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'Dropdown',
  getDerivedVariables ({ derived }) {
    const {
      textColorSecondaryOverlay
    } = derived
    return {
      suffixColor: textColorSecondaryOverlay
    }
  }
})

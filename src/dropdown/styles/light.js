import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'light',
  name: 'Dropdown',
  getDerivedVariables ({ derived }) {
    const {
      textColorSecondary
    } = derived
    return {
      suffixColor: textColorSecondary
    }
  }
})

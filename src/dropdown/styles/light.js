import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'light',
  name: 'Dropdown',
  getDerivedVariables ({ derived }) {
    const {
      secondaryTextColor
    } = derived
    return {
      suffixColor: secondaryTextColor
    }
  }
})
